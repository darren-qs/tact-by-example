import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { MultipleContractAddresses } from '../wrappers/MultipleContractAddresses';
import '@ton/test-utils';

describe('MultipleContractAddresses', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let multipleContractAddresses: SandboxContract<MultipleContractAddresses>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        multipleContractAddresses = blockchain.openContract(await MultipleContractAddresses.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await multipleContractAddresses.send(
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
            to: multipleContractAddresses.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and multipleContractAddresses are ready to use
    });
});
