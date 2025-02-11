import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DocumentService } from './document.service';
import { Multer } from 'multer';

@Controller('documents')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) { }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Multer.File) {
    if (!file) {
      throw new BadRequestException('The file is required!');
    }

    return this.documentService.saveTemporaryFile(file);
  }

  @Post('process/:id')
  async processPaymentAndSaveToIPFS(@Param('id', ParseIntPipe) id: number) {
    return this.documentService.processPaymentAndSaveToIPFS(id);
  }
}
