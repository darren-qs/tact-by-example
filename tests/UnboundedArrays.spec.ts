import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { UnboundedArrays } from '../wrappers/UnboundedArrays';
import '@ton/test-utils';

describe('UnboundedArrays', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let unboundedArrays: SandboxContract<UnboundedArrays>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        unboundedArrays = blockchain.openContract(await UnboundedArrays.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await unboundedArrays.send(
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
            to: unboundedArrays.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and unboundedArrays are ready to use
    });
});
