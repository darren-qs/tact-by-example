import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { Receivers } from '../wrappers/Receivers';
import '@ton/test-utils';

describe('Receivers', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let receivers: SandboxContract<Receivers>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        receivers = blockchain.openContract(await Receivers.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await receivers.send(
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
            to: receivers.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and receivers are ready to use
    });

    it('should receive and process a Add message', async () => {
        const valueBefore = await receivers.getValue();
        const caller = await blockchain.treasury('caller');
        const increaseBy = BigInt(Math.floor(Math.random() * 100));

        const txResult = await receivers.send(
            caller.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Add',
                amount: increaseBy,
            }
        );
        
        expect(txResult.transactions).toHaveTransaction({
            from: caller.address,
            to: receivers.address,
            success: true,
        });

        const valueAfter = await receivers.getValue();
        expect(valueAfter).toEqual(valueBefore + increaseBy);
    });

    it('should receive and process a Subtract message', async () => {
        const valueBefore = await receivers.getValue();
        const caller = await blockchain.treasury('caller');
        const decreaseBy = BigInt(Math.floor(Math.random() * 100));

        const txResult = await receivers.send(
            caller.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Subtract',
                amount: decreaseBy,
            }
        );
        
        expect(txResult.transactions).toHaveTransaction({
            from: caller.address,
            to: receivers.address,
            success: true,
        });

        const valueAfter = await receivers.getValue();
        expect(valueAfter).toEqual(valueBefore - decreaseBy);
    });

    it('should receive and process a MultiMath message', async () => {
        const valueBefore = await receivers.getValue();
        const caller = await blockchain.treasury('caller');
        const increaseBy = BigInt(Math.floor(Math.random() * 100));
        const decreaseBy = BigInt(Math.floor(Math.random() * 100));
        const multiplyBy = BigInt(Math.floor(Math.random() * 100));

        const txResult = await receivers.send(
            caller.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'MultiMath',
                add: increaseBy,
                subtract: decreaseBy,
                multiply: multiplyBy,
            }
        );
        
        expect(txResult.transactions).toHaveTransaction({
            from: caller.address,
            to: receivers.address,
            success: true,
        });

        const valueAfter = await receivers.getValue();
        expect(valueAfter).toEqual((valueBefore + increaseBy - decreaseBy) * multiplyBy);
    });

    it('should receive and process a increment message', async () => {
        const caller = await blockchain.treasury('caller');

        const txResult = await receivers.send(
            caller.getSender(),
            {
                value: toNano('0.05'),
            },
            'increment'
        );
        
        expect(txResult.transactions).toHaveTransaction({
            from: caller.address,
            to: receivers.address,
            success: true,
        });

        const valueAfter = await receivers.getValue();
        expect(valueAfter).toEqual(1n);
    });

    it('should receive and process a decrement message', async () => {
        const caller = await blockchain.treasury('caller');

        const txResult = await receivers.send(
            caller.getSender(),
            {
                value: toNano('0.05'),
            },
            'decrement'
        );
        
        expect(txResult.transactions).toHaveTransaction({
            from: caller.address,
            to: receivers.address,
            success: true,
        });

        const valueAfter = await receivers.getValue();
        expect(valueAfter).toEqual(-1n);
    });
});
