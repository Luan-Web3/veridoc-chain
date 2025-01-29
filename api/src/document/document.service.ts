import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Multer } from 'multer';
import * as crypto from 'crypto';
// import * as bitcoin from 'bitcoinjs-lib';

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

  async processPaymentAndSaveToIPFS(id: number) {
    return { id }
    // // 1. Buscar o arquivo temporário no SQLite
    // const tempDoc = await this.prisma.temporaryDocument.findUnique({ where: { id } });
    // if (!tempDoc) {
    //   throw new NotFoundException('Arquivo não encontrado');
    // }

    // // 2. Simular o pagamento (por enquanto apenas um passo fictício)
    // if (tempDoc.isPaid) {
    //   throw new Error('Arquivo já foi pago e processado.');
    // }

    // // 3. Salvar o arquivo no IPFS
    // const ipfsResult = await this.ipfsClient.add(tempDoc.fileBuffer);
    // const ipfsCid = ipfsResult.cid.toString();

    // console.log(`Arquivo salvo no IPFS com CID: ${ipfsCid}`);

    // // 4. Registrar o hash e o CID na blockchain Regtest
    // // const regtestNetwork = bitcoin.networks.regtest;
    // // const keyPair = bitcoin.ECPair.makeRandom({ network: regtestNetwork });

    // // const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey, network: regtestNetwork });
    // // console.log(`Registrando na blockchain com endereço: ${address}`);

    // const transactionHex = `Registro do IPFS - Hash: ${tempDoc.hash}, CID: ${ipfsCid}`;
    // console.log(`Transação na blockchain: ${transactionHex}`);

    // // 5. Atualizar o status no SQLite
    // await this.prisma.temporaryDocument.update({
    //   where: { id },
    //   data: {
    //     isPaid: true,
    //   },
    // });

    // return {
    //   message: 'Arquivo processado com sucesso!',
    //   ipfsCid,
    //   transactionHex,
    // };
  }
}
