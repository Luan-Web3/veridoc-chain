import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Multer } from 'multer';
import * as crypto from 'crypto';
import { IpfsService } from '../ipfs/ipfs.service';
import { BitcoinService } from '../bitcoin/bitcoin.service';

@Injectable()
export class DocumentService {

  constructor(
    private readonly prisma: PrismaService,
    private readonly ipfs: IpfsService,
    private readonly bitcoin: BitcoinService,
  ) { }

  async saveTemporaryFile(file: Multer.File) {
    try {
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
    } catch (error) {
      console.error('Error saving temporary file:', error);
      throw error;
    }
  }

  async processPaymentAndSaveToIPFS(id: number) {
    try {
      const tempDoc = await this.prisma.temporaryDocument.findUnique({ where: { id } });
      if (!tempDoc) {
        throw new NotFoundException('File not found');
      }

      if (tempDoc.isPaid) {
        throw new Error('File already paid and processed.');
      }

      const txid = await this.bitcoin.sendFromAddress(tempDoc.paymentAmount);

      const blob = new Blob([tempDoc.fileBuffer], { type: 'application/octet-stream' });

      const ipfsResult = await this.ipfs.uploadFile(blob);
      const cid = ipfsResult.IpfsHash;
      console.log({ cid })

      await this.prisma.document.create({
        data: {
          txid,
          cid,
        },
      });

      await this.prisma.temporaryDocument.update({
        where: { id },
        data: {
          isPaid: true,
        },
      });

      return {
        message: 'File processed successfully!',
        txid,
        cid,
      };
    } catch (error) {
      console.error('Error processing payment and saving to IPFS:', error);
      throw error;
    }
  }
}

