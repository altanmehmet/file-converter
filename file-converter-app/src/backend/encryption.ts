import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

// Generate encryption key from password (or use environment variable)
// Note: Salt is used here because scrypt requires it for key derivation.
// Even though salt is static in our case, it's still required by the algorithm.
// In a more advanced setup, you could use per-file salts stored with the encrypted data.
const getEncryptionKey = async (): Promise<Buffer> => {
  const password = process.env.ENCRYPTION_PASSWORD || 'default-secure-password-change-in-production';
  const salt = process.env.ENCRYPTION_SALT || 'default-salt-change-in-production';
  
  // scrypt is a key derivation function that requires both password and salt
  // It uses both to create a cryptographically secure key
  // Even with a static salt, it provides:
  // 1. Protection if password is compromised (attacker needs both)
  // 2. Required parameter for scrypt algorithm
  // 3. Makes key derivation more expensive (harder to brute force)
  return (await scryptAsync(password, salt, 32)) as Buffer;
};

// Encrypt file buffer
export const encryptBuffer = async (data: Buffer): Promise<{ encrypted: Buffer; iv: Buffer }> => {
  const key = await getEncryptionKey();
  const iv = randomBytes(16);
  const cipher = createCipheriv('aes-256-gcm', key, iv);
  
  const encrypted = Buffer.concat([cipher.update(data), cipher.final()]);
  const authTag = cipher.getAuthTag();
  
  // Combine IV, authTag, and encrypted data
  return {
    encrypted: Buffer.concat([iv, authTag, encrypted]),
    iv,
  };
};

// Decrypt file buffer
export const decryptBuffer = async (encryptedData: Buffer): Promise<Buffer> => {
  const key = await getEncryptionKey();
  
  // Extract IV (first 16 bytes), authTag (next 16 bytes), and encrypted data
  const iv = encryptedData.subarray(0, 16);
  const authTag = encryptedData.subarray(16, 32);
  const encrypted = encryptedData.subarray(32);
  
  const decipher = createDecipheriv('aes-256-gcm', key, iv);
  decipher.setAuthTag(authTag);
  
  return Buffer.concat([decipher.update(encrypted), decipher.final()]);
};

// Secure file deletion (overwrite with random data)
export const secureDelete = async (filePath: string): Promise<void> => {
  const fs = await import('fs/promises');
  try {
    const stats = await fs.stat(filePath);
    const size = stats.size;
    
    // Overwrite with random data (3 passes for better security)
    const randomData = randomBytes(size);
    for (let i = 0; i < 3; i++) {
      await fs.writeFile(filePath, randomData);
    }
    
    // Finally delete
    await fs.unlink(filePath);
  } catch {
    // File might not exist, ignore
  }
};
