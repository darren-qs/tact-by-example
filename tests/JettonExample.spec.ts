import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { JettonExample } from '../wrappers/JettonExample';
import '@ton/test-utils';

describe('JettonExample', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let jettonExample: SandboxContract<JettonExample>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        jettonExample = blockchain.openContract(await JettonExample.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await jettonExample.send(
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
            to: jettonExample.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and jettonExample are ready to use
    });
});
