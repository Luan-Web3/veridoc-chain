declare module 'bitcoin-core' {
    export interface ClientOptions {
        network: string;
        username: string;
        password: string;
        host: string;
        port: number;
        wallet: string;
    }

    interface SignedRawTransaction {
        hex: string;
        complete: boolean;
    }

    export default class Client {
        constructor(options: ClientOptions);
        command<T = any>(method: string, ...params: any[]): Promise<T>;
        createRawTransaction(addresses: string[], amounts: { [key: string]: number }): Promise<string>;
        signRawTransactionWithWallet(rawTx: string): Promise<SignedRawTransaction>;
        sendRawTransaction(signedTx: string): Promise<string>;
        listUnspent(minconf: number, maxconf: number, addrs: string[]): Promise<any>;
        // getBlockCount(): Promise<number>;
        // getBlockHash(index: number): Promise<string>;
        // getBlock(hash: string): Promise<any>;
        // listTransactions(account: string, count: number, skip: number): Promise<any[]>;
    }
}
