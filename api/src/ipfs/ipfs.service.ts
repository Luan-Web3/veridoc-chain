import { Injectable, OnModuleInit } from '@nestjs/common';
import { PinataSDK } from "pinata-web3";

@Injectable()
export class IpfsService implements OnModuleInit {
    private ipfs;

    async onModuleInit() {
        this.ipfs = new PinataSDK({
            pinataJwt: process.env.PINATA_JWT,
            pinataGateway: process.env.PINATA_GATEWAY,
        });
    }

    async uploadFile(fileBuffer: any): Promise<any> {
        try {
            const upload = await this.ipfs.upload.file(fileBuffer);
            return upload;
        } catch (error) {
            console.error('Error uploading file:', error);
            throw error;
        }
    }
}
