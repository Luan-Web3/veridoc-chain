import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Multer } from 'multer';
import * as crypto from 'crypto';

@Injectable()
export class DocumentService {
  constructor(private readonly prisma: PrismaService) { }

  async saveTemporaryFile(file: Multer.File) {
    const hash = crypto.createHash('sha256').update(file.buffer).digest('hex');

    const fileSizeInMB = file.size / 1_048_576;
    const paymentAmount = fileSizeInMB * 0.001;

    const tempDoc = await this.prisma.temporaryDocument.create({
      data: {
        hash,
        filename: file.originalname,
        size: file.size,
        paymentAmount,
        fileBuffer: file.buffer,
        isPaid: false,
      },
    });

    return {
      id: tempDoc.id,
      hash,
      paymentAmount,
      message: 'File saved temporarily. Please complete payment to continue',
    };
  }
}
