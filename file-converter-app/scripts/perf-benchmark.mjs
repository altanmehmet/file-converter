#!/usr/bin/env node

import { spawn } from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const fixtureDir = path.join(rootDir, '.perf-fixtures');
const outputDir = path.join(rootDir, 'benchmarks');
const port = 3010;
const baseUrl = `http://127.0.0.1:${port}`;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const mimeFromExt = (name) => {
  const ext = path.extname(name).toLowerCase();
  if (ext === '.jpg' || ext === '.jpeg') return 'image/jpeg';
  if (ext === '.png') return 'image/png';
  if (ext === '.pdf') return 'application/pdf';
  return 'application/octet-stream';
};

const bytesToMb = (bytes) => bytes / (1024 * 1024);

async function waitForServer(timeoutMs = 120000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(baseUrl, { method: 'GET' });
      if (res.ok) return;
    } catch {
      // noop
    }
    await sleep(700);
  }
  throw new Error(`Server did not start in ${timeoutMs}ms`);
}

async function ensureCleanFixtureDir() {
  await fs.rm(fixtureDir, { recursive: true, force: true });
  await fs.mkdir(fixtureDir, { recursive: true });
}

async function createNoiseImage(filePath, width, height, index) {
  const pixelCount = width * height * 3;
  const raw = Buffer.allocUnsafe(pixelCount);
  for (let i = 0; i < pixelCount; i += 3) {
    const x = (i / 3) % width;
    const y = Math.floor(i / 3 / width);
    raw[i] = (x * 7 + y * 13 + index * 17) % 255;
    raw[i + 1] = (x * 5 + y * 11 + index * 29) % 255;
    raw[i + 2] = (x * 3 + y * 19 + index * 37) % 255;
  }

  await sharp(raw, { raw: { width, height, channels: 3 } }).jpeg({ quality: 92 }).toFile(filePath);
}

async function createPdf(filePath, pageCount, label) {
  const pdf = await PDFDocument.create();
  const font = await pdf.embedFont(StandardFonts.Helvetica);

  for (let i = 0; i < pageCount; i += 1) {
    const page = pdf.addPage([595, 842]);
    page.drawText(`${label} - page ${i + 1}`, {
      x: 45,
      y: 780,
      size: 24,
      font,
      color: rgb(0.08, 0.24, 0.52),
    });

    page.drawRectangle({
      x: 45,
      y: 710,
      width: 480,
      height: 1,
      color: rgb(0.75, 0.8, 0.9),
    });

    for (let row = 0; row < 26; row += 1) {
      page.drawText(`Row ${row + 1} for benchmark content ${label}`, {
        x: 50,
        y: 680 - row * 22,
        size: 11,
        font,
        color: rgb(0.15 + (row % 5) * 0.05, 0.2, 0.22),
      });
    }
  }

  await fs.writeFile(filePath, await pdf.save());
}

async function uploadFiles(filePaths) {
  const form = new FormData();

  for (const filePath of filePaths) {
    const data = await fs.readFile(filePath);
    const filename = path.basename(filePath);
    form.append('files', new Blob([data], { type: mimeFromExt(filename) }), filename);
  }

  const response = await fetch(`${baseUrl}/api/upload`, {
    method: 'POST',
    body: form,
  });
  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.error || 'Upload failed');
  }
  return body.uploaded || [];
}

async function queueConvert({ presetId, fileIds, options, ttlMinutes = 10 }) {
  const response = await fetch(`${baseUrl}/api/convert`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ presetId, fileIds, options, ttlMinutes }),
  });
  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.error || 'Convert failed');
  }
  return body.jobs || [];
}

async function fetchJob(id) {
  const response = await fetch(`${baseUrl}/api/job/${id}`);
  if (!response.ok) {
    throw new Error(`Job fetch failed: ${id}`);
  }
  const body = await response.json();
  return body.job;
}

async function waitJobs(jobIds, timeoutMs = 180000) {
  const start = Date.now();
  const states = new Map();

  while (Date.now() - start < timeoutMs) {
    let done = 0;

    for (const id of jobIds) {
      const job = await fetchJob(id);
      states.set(id, job);
      if (job.status === 'done' || job.status === 'failed') {
        done += 1;
      }
    }

    if (done === jobIds.length) {
      return Array.from(states.values());
    }

    await sleep(600);
  }

  throw new Error(`Jobs timeout after ${timeoutMs}ms`);
}

function summarizeScenario(name, inputBytes, elapsedMs, jobs) {
  const outputBytes = jobs.reduce(
    (sum, job) => sum + (job.outputFiles || []).reduce((inner, file) => inner + (file.size || 0), 0),
    0,
  );
  const failed = jobs.filter((job) => job.status === 'failed');

  return {
    scenario: name,
    elapsedMs,
    inputBytes,
    outputBytes,
    inputMb: Number(bytesToMb(inputBytes).toFixed(2)),
    outputMb: Number(bytesToMb(outputBytes).toFixed(2)),
    throughputMbPerSec: Number((bytesToMb(inputBytes) / Math.max(elapsedMs / 1000, 0.001)).toFixed(2)),
    compressionPct: inputBytes > 0 ? Number(((1 - outputBytes / inputBytes) * 100).toFixed(2)) : 0,
    jobsTotal: jobs.length,
    jobsFailed: failed.length,
    success: failed.length === 0,
  };
}

async function prepareFixtures() {
  await ensureCleanFixtureDir();

  const imageFiles = [];
  for (let i = 1; i <= 8; i += 1) {
    const target = path.join(fixtureDir, `img-${i}.jpg`);
    await createNoiseImage(target, 2200, 1400, i);
    imageFiles.push(target);
  }

  const mergePdfFiles = [];
  for (let i = 1; i <= 5; i += 1) {
    const target = path.join(fixtureDir, `merge-${i}.pdf`);
    await createPdf(target, 12, `merge-${i}`);
    mergePdfFiles.push(target);
  }

  const splitPdfFile = path.join(fixtureDir, 'split-source.pdf');
  await createPdf(splitPdfFile, 36, 'split-source');

  return { imageFiles, mergePdfFiles, splitPdfFile };
}

async function runScenarioImageConvert(imageFiles) {
  const uploads = await uploadFiles(imageFiles);
  const inputBytes = (await Promise.all(imageFiles.map((f) => fs.stat(f)))).reduce((s, st) => s + st.size, 0);

  const queued = await queueConvert({
    presetId: 'image_convert',
    fileIds: uploads.map((f) => f.id),
    options: {
      format: 'webp',
      quality: 80,
      maxWidth: 1800,
      stripMetadata: true,
    },
    ttlMinutes: 20,
  });

  const start = performance.now();
  const jobs = await waitJobs(queued.map((j) => j.id));
  const elapsedMs = performance.now() - start;

  return summarizeScenario('image_convert_8_files', inputBytes, elapsedMs, jobs);
}

async function runScenarioPdfMerge(mergePdfFiles) {
  const uploads = await uploadFiles(mergePdfFiles);
  const inputBytes = (await Promise.all(mergePdfFiles.map((f) => fs.stat(f)))).reduce((s, st) => s + st.size, 0);

  const queued = await queueConvert({
    presetId: 'pdf_merge',
    fileIds: uploads.map((f) => f.id),
    options: {},
    ttlMinutes: 20,
  });

  const start = performance.now();
  const jobs = await waitJobs(queued.map((j) => j.id));
  const elapsedMs = performance.now() - start;

  return summarizeScenario('pdf_merge_5_files', inputBytes, elapsedMs, jobs);
}

async function runScenarioPdfSplit(splitPdfFile) {
  const uploads = await uploadFiles([splitPdfFile]);
  const stat = await fs.stat(splitPdfFile);

  const queued = await queueConvert({
    presetId: 'pdf_split',
    fileIds: uploads.map((f) => f.id),
    options: {
      ranges: '',
      every: 6,
    },
    ttlMinutes: 20,
  });

  const start = performance.now();
  const jobs = await waitJobs(queued.map((j) => j.id));
  const elapsedMs = performance.now() - start;

  return summarizeScenario('pdf_split_36_pages_every_6', stat.size, elapsedMs, jobs);
}

async function runBenchmarks() {
  const fixtures = await prepareFixtures();
  const scenarios = [];

  scenarios.push(await runScenarioImageConvert(fixtures.imageFiles));
  scenarios.push(await runScenarioPdfMerge(fixtures.mergePdfFiles));
  scenarios.push(await runScenarioPdfSplit(fixtures.splitPdfFile));

  return scenarios;
}

function toMarkdown(results, totalMs) {
  const header = [
    '# Performance Benchmark',
    '',
    `Date: ${new Date().toISOString()}`,
    `Runtime: Next.js dev server on port ${port}`,
    `Total benchmark duration: ${(totalMs / 1000).toFixed(1)}s`,
    '',
    '| Scenario | Input (MB) | Output (MB) | Time (s) | Throughput (MB/s) | Compression % | Failed Jobs |',
    '|---|---:|---:|---:|---:|---:|---:|',
  ];

  const rows = results.map((item) =>
    `| ${item.scenario} | ${item.inputMb.toFixed(2)} | ${item.outputMb.toFixed(2)} | ${(item.elapsedMs / 1000).toFixed(2)} | ${item.throughputMbPerSec.toFixed(2)} | ${item.compressionPct.toFixed(2)} | ${item.jobsFailed} |`,
  );

  return [...header, ...rows, ''].join('\n');
}

async function main() {
  const server = spawn('npm', ['run', 'dev', '--', '--hostname', '127.0.0.1', '--port', String(port)], {
    cwd: rootDir,
    env: { ...process.env, NEXT_TELEMETRY_DISABLED: '1' },
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  let serverStdout = '';
  let serverStderr = '';

  server.stdout.on('data', (chunk) => {
    serverStdout += chunk.toString();
    if (serverStdout.length > 6000) serverStdout = serverStdout.slice(-6000);
  });

  server.stderr.on('data', (chunk) => {
    serverStderr += chunk.toString();
    if (serverStderr.length > 6000) serverStderr = serverStderr.slice(-6000);
  });

  const startedAt = performance.now();
  try {
    await waitForServer();
    const results = await runBenchmarks();
    const totalMs = performance.now() - startedAt;

    await fs.mkdir(outputDir, { recursive: true });
    const payload = {
      generatedAt: new Date().toISOString(),
      port,
      totalMs,
      results,
    };

    await fs.writeFile(path.join(outputDir, 'perf-latest.json'), `${JSON.stringify(payload, null, 2)}\n`);
    await fs.writeFile(path.join(outputDir, 'perf-latest.md'), toMarkdown(results, totalMs));

    console.log('\nPerformance benchmark completed.');
    for (const item of results) {
      console.log(
        `${item.scenario}: ${item.inputMb.toFixed(2)}MB -> ${item.outputMb.toFixed(2)}MB in ${(item.elapsedMs / 1000).toFixed(2)}s (failed: ${item.jobsFailed})`,
      );
    }
    console.log(`\nSaved: ${path.join(outputDir, 'perf-latest.json')}`);
    console.log(`Saved: ${path.join(outputDir, 'perf-latest.md')}`);
  } catch (error) {
    console.error('\nBenchmark failed.');
    console.error(error instanceof Error ? error.message : String(error));
    if (serverStdout.trim()) {
      console.error('\nLast server stdout:\n' + serverStdout);
    }
    if (serverStderr.trim()) {
      console.error('\nLast server stderr:\n' + serverStderr);
    }
    process.exitCode = 1;
  } finally {
    server.kill('SIGTERM');
    await sleep(500);
    if (!server.killed) {
      server.kill('SIGKILL');
    }
    if (process.env.KEEP_PERF_FIXTURES !== '1') {
      await fs.rm(fixtureDir, { recursive: true, force: true });
    }
  }
}

main();
