import { Global, Module } from '@nestjs/common';
import { BitcoinService } from './bitcoin.service';

@Global()
@Module({
    providers: [BitcoinService],
    exports: [BitcoinService],
})
export class BitcoinModule { }
