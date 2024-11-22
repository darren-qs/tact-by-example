import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { MessagesBetweenContracts } from '../wrappers/MessagesBetweenContracts';
import '@ton/test-utils';

describe('MessagesBetweenContracts', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let messagesBetweenContracts: SandboxContract<MessagesBetweenContracts>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        messagesBetweenContracts = blockchain.openContract(await MessagesBetweenContracts.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await messagesBetweenContracts.send(
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
            to: messagesBetweenContracts.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and messagesBetweenContracts are ready to use
    });
});
