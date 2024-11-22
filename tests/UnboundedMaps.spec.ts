import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { UnboundedMaps } from '../wrappers/UnboundedMaps';
import '@ton/test-utils';

describe('UnboundedMaps', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let unboundedMaps: SandboxContract<UnboundedMaps>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        unboundedMaps = blockchain.openContract(await UnboundedMaps.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await unboundedMaps.send(
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
            to: unboundedMaps.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and unboundedMaps are ready to use
    });
});
