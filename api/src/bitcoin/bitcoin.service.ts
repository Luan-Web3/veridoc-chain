// @ts-ignore
import Client from 'bitcoin-core';

import { Injectable, OnModuleInit } from '@nestjs/common';


@Injectable()
export class BitcoinService implements OnModuleInit {
    private client: Client;

    onModuleInit() {
        this.client = new Client({
            network: 'regtest',
            username: process.env.RPC_USER,
            password: process.env.RPC_PASSWORD,
            host: process.env.RPC_HOST,
            port: parseInt(process.env.RPC_PORT, 10),
            wallet: process.env.RPC_WALLET,
        });
    }

    async sendFromAddress(amount: number): Promise<string> {
        try {
            const fromAddress = process.env.FROM_ADDRESS;
            const toAddress = process.env.TO_ADDRESS;
            const utxos = await this.client.listUnspent(1, 9999999, [fromAddress]);

            if (utxos.length === 0) {
                throw new Error(`No UTXOs found for address ${fromAddress}`);
            }

            let selectedUtxos = [];
            let totalInput = 0;
            const fee = 0.0005;

            for (const utxo of utxos) {
                selectedUtxos.push({
                    txid: utxo.txid,
                    vout: utxo.vout
                });

                totalInput += utxo.amount;
                if (totalInput >= amount + fee) break;
            }

            if (totalInput < amount + fee) {
                throw new Error(`Insufficient balance on address ${fromAddress}`);
            }

            const outputs: any = {};
            outputs[toAddress] = amount.toFixed(8);

            const change = totalInput - amount - fee;
            if (change > 0) {
                outputs[fromAddress] = change.toFixed(8);
            }

            const rawTx = await this.client.createRawTransaction(selectedUtxos, outputs);

            const signedTx = await this.client.signRawTransactionWithWallet(rawTx);

            if (!signedTx.complete) {
                throw new Error('Error signing transaction');
            }

            const txid = await this.client.sendRawTransaction(signedTx.hex);
            return txid;
        } catch (error) {
            console.error('Error sending Bitcoin:', error);
            throw error;
        }
    }
}
