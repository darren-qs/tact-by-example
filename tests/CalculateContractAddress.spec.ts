import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { CalculateContractAddress } from '../wrappers/CalculateContractAddress';
import '@ton/test-utils';

describe('CalculateContractAddress', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let calculateContractAddress: SandboxContract<CalculateContractAddress>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        calculateContractAddress = blockchain.openContract(await CalculateContractAddress.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await calculateContractAddress.send(
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
            to: calculateContractAddress.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and calculateContractAddress are ready to use
    });
});
