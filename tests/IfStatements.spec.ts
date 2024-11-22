import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { IfStatements } from '../wrappers/IfStatements';
import '@ton/test-utils';

describe('IfStatements', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let ifStatements: SandboxContract<IfStatements>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        ifStatements = blockchain.openContract(await IfStatements.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await ifStatements.send(
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
            to: ifStatements.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and ifStatements are ready to use
    });
});
