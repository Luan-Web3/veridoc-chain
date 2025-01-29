import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { createHelia } from 'helia';
import { unixfs } from '@helia/unixfs';
import { CID } from 'multiformats/cid';

@Injectable()
export class IpfsService implements OnModuleInit, OnModuleDestroy {
    private helia;
    private fs;

    async onModuleInit() {
        this.helia = await createHelia();

        this.fs = unixfs(this.helia);
    }

    async uploadFile(fileBuffer: Buffer): Promise<string> {
        const cid = await this.fs.addBytes(fileBuffer);
        return cid.toString();
    }

    async downloadFile(cidString: string): Promise<Buffer> {
        const cid = CID.parse(cidString);
        const chunks: Array<any> = [];

        for await (const chunk of this.fs.cat(cid)) {
            chunks.push(chunk);
        }

        return Buffer.concat(chunks);
    }

    async onModuleDestroy() {
        await this.helia.stop();
    }
}
