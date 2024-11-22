import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { CurrentTime } from '../wrappers/CurrentTime';
import '@ton/test-utils';

describe('CurrentTime', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let currentTime: SandboxContract<CurrentTime>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        currentTime = blockchain.openContract(await CurrentTime.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await currentTime.send(
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
            to: currentTime.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and currentTime are ready to use
    });
});
