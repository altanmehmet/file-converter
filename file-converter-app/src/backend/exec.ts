import { spawn } from 'child_process';
import { jobStore } from './jobStore';

interface RunCommandOptions {
  cwd?: string;
  timeoutMs?: number;
  env?: NodeJS.ProcessEnv;
}

export const runCommand = async (
  jobId: string,
  command: string,
  args: string[],
  options: RunCommandOptions = {},
) => {
  return new Promise<void>((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: options.cwd,
      env: { ...process.env, ...options.env },
    });

    const killTimer =
      options.timeoutMs &&
      setTimeout(() => {
        child.kill('SIGKILL');
        reject(new Error(`Command timeout after ${options.timeoutMs}ms`));
      }, options.timeoutMs);

    child.stdout.on('data', (data) => {
      jobStore.addLog(jobId, 'info', `${command}: ${data.toString().trim()}`);
    });

    child.stderr.on('data', (data) => {
      jobStore.addLog(jobId, 'error', `${command}: ${data.toString().trim()}`);
    });

    child.on('error', (err) => {
      if (killTimer) clearTimeout(killTimer);
      reject(err);
    });

    child.on('close', (code) => {
      if (killTimer) clearTimeout(killTimer);
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`${command} exited with code ${code}`));
      }
    });
  });
};
