import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { SendingTONCoins } from '../wrappers/SendingTONCoins';
import '@ton/test-utils';

describe('SendingTONCoins', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let sendingTONCoins: SandboxContract<SendingTONCoins>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        sendingTONCoins = blockchain.openContract(await SendingTONCoins.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await sendingTONCoins.send(
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
            to: sendingTONCoins.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and sendingTONCoins are ready to use
    });
});
