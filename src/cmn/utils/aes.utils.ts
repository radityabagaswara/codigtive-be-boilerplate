import { createCipheriv, createDecipheriv, createHash } from 'crypto';
import { Buffer } from 'buffer';

export const SecurityUtils = {
  decrypt: (key: string, data: string): string | null => {
    const md5Hex: string = createHash('md5').update(key).digest('hex');
    const iv: string = md5Hex.length > 16 ? md5Hex.substring(0, 16) : md5Hex;

    return SecurityUtils.cryptoAesDecrypt(data, iv, key);
  },

  encrypt: (key: string, data: string): string => {
    const md5Hex: string = createHash('md5').update(key).digest('hex');
    const iv: string = md5Hex.length > 16 ? md5Hex.substring(0, 16) : md5Hex;

    return SecurityUtils.cryptoAesEncrypt(data, iv, key);
  },

  cryptoAesEncrypt: (
    value: string,
    initVector: string,
    key: string,
  ): string => {
    try {
      const iv = Buffer.from(initVector, 'utf8');
      const skeySpec = Buffer.from(key, 'utf8');

      const cipher = createCipheriv('aes-128-cbc', skeySpec, iv);
      let encrypted = cipher.update(value, 'utf8', 'base64');
      encrypted += cipher.final('base64');

      return encrypted;
    } catch (ex) {
      console.error(ex);
      return value;
    }
  },

  cryptoAesDecrypt: (
    encrypted: string,
    initVector: string,
    key: string,
  ): string | null => {
    try {
      const iv = Buffer.from(initVector, 'utf8');
      const skeySpec = Buffer.from(key, 'utf8');

      const decipher = createDecipheriv('aes-128-cbc', skeySpec, iv);
      let decrypted = decipher.update(encrypted, 'base64', 'utf8');
      decrypted += decipher.final('utf8');

      return decrypted;
    } catch (ex) {
      console.error(ex);
      return null;
    }
  },
};
