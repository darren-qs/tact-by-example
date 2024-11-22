import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { ParentChildCommunication } from '../wrappers/ParentChildCommunication';
import '@ton/test-utils';

describe('ParentChildCommunication', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let parentChildCommunication: SandboxContract<ParentChildCommunication>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        parentChildCommunication = blockchain.openContract(await ParentChildCommunication.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await parentChildCommunication.send(
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
            to: parentChildCommunication.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and parentChildCommunication are ready to use
    });
});
