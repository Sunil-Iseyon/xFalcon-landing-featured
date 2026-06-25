import crypto from 'crypto';

const SECRET = process.env.DEMO_URL_SECRET ?? 'xfalcon-demo-url-default-secret-k';

let _key: Buffer | null = null;

function getKey(): Buffer {
  if (!_key) {
    _key = crypto.scryptSync(SECRET, 'xfalcon-salt', 32);
  }
  return _key;
}

function getIv(): Buffer {
  return crypto.createHash('md5').update(SECRET + 'xfalcon-iv').digest();
}

export function encryptDemoPath(path: string): string {
  const cipher = crypto.createCipheriv('aes-256-ctr', getKey(), getIv());
  const encrypted = Buffer.concat([cipher.update(path, 'utf8'), cipher.final()]);
  return encrypted.toString('base64url');
}

export function decryptDemoToken(token: string): string | null {
  try {
    const encrypted = Buffer.from(token, 'base64url');
    const decipher = crypto.createDecipheriv('aes-256-ctr', getKey(), getIv());
    const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
    return decrypted.toString('utf8');
  } catch {
    return null;
  }
}
