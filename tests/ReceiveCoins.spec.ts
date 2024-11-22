import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { ReceiveCoins } from '../wrappers/ReceiveCoins';
import '@ton/test-utils';

describe('ReceiveCoins', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let receiveCoins: SandboxContract<ReceiveCoins>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        receiveCoins = blockchain.openContract(await ReceiveCoins.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await receiveCoins.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: receiveCoins.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and receiveCoins are ready to use
    });

    it('should receive and process a increment message', async () => {
        const caller = await blockchain.treasury('caller');

        const txResult = await receiveCoins.send(
            caller.getSender(),
            {
                value: toNano('0.05'),
            },
            'increment'
        );

        const balance = await receiveCoins.getBalance();
        expect(balance).toEqual(46767600n); // contract keeps the change!
    });

    it('should receive, process and refund the TON a increment message', async () => {
        const caller = await blockchain.treasury('caller');

        const txResult = await receiveCoins.send(
            caller.getSender(),
            {
                value: toNano('0.05'),
            },
            'refunding increment'
        );

        expect(txResult.transactions).toHaveTransaction({
            from: receiveCoins.address,
            to: caller.address,
            success: true,
            value: 44909200n // change returned to caller
        });

        const balance = await receiveCoins.getBalance();
        expect(balance).toEqual(0n); // contract returns the change!
    });

    it('should revert when sending > 3 TON to the fallback (empty) receive handler', async () => {
        const caller = await blockchain.treasury('caller');

        const txResult = await receiveCoins.send(
            caller.getSender(),
            {
                value: toNano('1'),
            },
            null // defaults to the empty receive message handler
        );

        // expect(txResult.transactions).toHaveTransaction({
        //     from: receiveCoins.address,
        //     to: caller.address,
        //     success: true,
        //     value: 44909200n // change returned to caller
        // });

        const balance = await receiveCoins.getBalance();
        console.log(balance);
        // expect(balance).toEqual(998574800n); // contract returns the change!
    });
});
