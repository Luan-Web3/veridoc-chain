import { Module } from '@nestjs/common';
import { DocumentController } from './document.controller';
import { DocumentService } from './document.service';
import { PrismaModule } from '../prisma/prisma.module';
import { IpfsModule } from '../ipfs/ipfs.module';
import { BitcoinModule } from '../bitcoin/bitcoin.module';

@Module({
  imports: [PrismaModule, IpfsModule, BitcoinModule],
  controllers: [DocumentController],
  providers: [DocumentService],
})
export class DocumentModule { }
