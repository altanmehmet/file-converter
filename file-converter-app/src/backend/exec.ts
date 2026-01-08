import { spawn } from 'child_process';
import { jobStore } from './jobStore';

interface RunCommandOptions {
  cwd?: string;
  timeoutMs?: number;
  env?: NodeJS.ProcessEnv;
}

// Sanitize log messages to remove sensitive information
const sanitizeLogMessage = (message: string): string | null => {
  if (!message || message.length === 0) return null;
  
  // Remove file paths (absolute and relative)
  let sanitized = message
    .replace(/\/[^\s]+/g, '[PATH]') // Remove absolute paths
    .replace(/\.\.[\/\\]/g, '[PATH]') // Remove relative paths
    .replace(/[A-Z]:\\[^\s]+/g, '[PATH]') // Remove Windows paths
    .replace(/tmp\/[^\s]+/g, '[TMP]') // Remove tmp paths
    .replace(/\/app\/[^\s]+/g, '[APP]'); // Remove app paths
  
  // Remove job IDs and UUIDs
  sanitized = sanitized.replace(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/gi, '[ID]');
  
  // Remove email addresses
  sanitized = sanitized.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '[EMAIL]');
  
  // Limit message length
  if (sanitized.length > 200) {
    sanitized = sanitized.substring(0, 200) + '...';
  }
  
  return sanitized;
};

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
      const sanitized = sanitizeLogMessage(data.toString().trim());
      if (sanitized) {
        jobStore.addLog(jobId, 'info', sanitized);
      }
    });

    child.stderr.on('data', (data) => {
      const sanitized = sanitizeLogMessage(data.toString().trim());
      if (sanitized) {
        jobStore.addLog(jobId, 'error', sanitized);
      }
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
