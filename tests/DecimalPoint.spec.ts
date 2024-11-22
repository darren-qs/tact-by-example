import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { DecimalPoint } from '../wrappers/DecimalPoint';
import '@ton/test-utils';

describe('DecimalPoint', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let decimalPoint: SandboxContract<DecimalPoint>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        decimalPoint = blockchain.openContract(await DecimalPoint.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await decimalPoint.send(
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
            to: decimalPoint.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and decimalPoint are ready to use
    });
});
