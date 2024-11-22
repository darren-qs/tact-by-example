import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { ParentChildUnboundedContracts } from '../wrappers/ParentChildUnboundedContracts';
import '@ton/test-utils';

describe('ParentChildUnboundedContracts', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let parentChildUnboundedContracts: SandboxContract<ParentChildUnboundedContracts>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        parentChildUnboundedContracts = blockchain.openContract(await ParentChildUnboundedContracts.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await parentChildUnboundedContracts.send(
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
            to: parentChildUnboundedContracts.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and parentChildUnboundedContracts are ready to use
    });
});
