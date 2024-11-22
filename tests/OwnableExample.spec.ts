import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { OwnableExample } from '../wrappers/OwnableExample';
import '@ton/test-utils';

describe('OwnableExample', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let ownableExample: SandboxContract<OwnableExample>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        ownableExample = blockchain.openContract(await OwnableExample.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await ownableExample.send(
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
            to: ownableExample.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and ownableExample are ready to use
    });
});
