import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PinataSDK } from "pinata-web3";

@Injectable()
export class IpfsService implements OnModuleInit {
    private ipfs;

    async onModuleInit() {
        this.ipfs = new PinataSDK({
            pinataJwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJiYmI3N2Q4Yy1jODRkLTQ2ZGEtODczZC0yNmE2Yzg1ZjY0M2YiLCJlbWFpbCI6Imx1YW5zaWx2YWxlbWVzLndlYjNAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiRlJBMSJ9LHsiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiTllDMSJ9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjI5OTUxMDIzMmUzMDcwY2MyMTE2Iiwic2NvcGVkS2V5U2VjcmV0IjoiZmFhYjBlOTNhMTFkMzI3MDdhOWIxZDVhMWVhYmFkMzg5Y2YzN2RlMmM5NzNiYjI3M2VmYWIzOGVhZjJiYTY2MyIsImV4cCI6MTc2OTcwMjI0OX0.8TYFvZyAdatcvZVwCNfBuYp22OVOVS-T6xahjPVPQtI",
            pinataGateway: "aqua-charming-tahr-9.mypinata.cloud",
        });
    }

    async uploadFile(fileBuffer: any): Promise<any> {
        const upload = await this.ipfs.upload.file(fileBuffer);
        return upload;
    }

    // async downloadFile(cidString: string): Promise<Buffer> {
    //     const cid = CID.parse(cidString);
    //     const chunks: Array<any> = [];

    //     for await (const chunk of this.fs.cat(cid)) {
    //         chunks.push(chunk);
    //     }

    //     return Buffer.concat(chunks);
    // }
}
