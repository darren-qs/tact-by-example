import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { ContractDeployAnotherContract } from '../wrappers/ContractDeployAnotherContract';
import '@ton/test-utils';

describe('ContractDeployAnotherContract', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let contractDeployAnotherContract: SandboxContract<ContractDeployAnotherContract>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        contractDeployAnotherContract = blockchain.openContract(await ContractDeployAnotherContract.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await contractDeployAnotherContract.send(
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
            to: contractDeployAnotherContract.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and contractDeployAnotherContract are ready to use
    });
});
