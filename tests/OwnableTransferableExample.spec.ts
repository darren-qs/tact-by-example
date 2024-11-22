import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { OwnableTransferableExample } from '../wrappers/OwnableTransferableExample';
import '@ton/test-utils';

describe('OwnableTransferableExample', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let ownableTransferableExample: SandboxContract<OwnableTransferableExample>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        ownableTransferableExample = blockchain.openContract(await OwnableTransferableExample.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await ownableTransferableExample.send(
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
            to: ownableTransferableExample.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and ownableTransferableExample are ready to use
    });
});
