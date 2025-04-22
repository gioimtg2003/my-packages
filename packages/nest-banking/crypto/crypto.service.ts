import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import * as NodeRSA from 'node-rsa';

@Injectable()
export class CryptoService {
  hash256(data: string): string {
    return crypto.createHash('sha256').update(data).digest('hex');
  }

  compareHash256(data: string, hash: string): boolean {
    return this.hash256(data) === hash;
  }

  encryptRsa(text: string, publicKey: string): string {
    const key = new NodeRSA(publicKey);

    const encrypted = key.encrypt(text, 'base64');
    return encrypted;
  }

  md5(text: string): string {
    return crypto.createHash('md5').update(text).digest('hex');
  }
}
