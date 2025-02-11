import { Global, Module } from '@nestjs/common';
import { IpfsService } from './ipfs.service';

@Global()
@Module({
    providers: [IpfsService],
    exports: [IpfsService],
})
export class IpfsModule { }
