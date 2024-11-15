import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { Strings } from '../wrappers/Strings';
import '@ton/test-utils';

describe('Strings', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let strings: SandboxContract<Strings>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        strings = blockchain.openContract(await Strings.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await strings.send(
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
            to: strings.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and strings are ready to use
    });

    it('should dump all the strings state to the console', async () => {
        const caller = await blockchain.treasury('caller');
        await strings.send(
            caller.getSender(),
            {
                value: toNano('0.05'),
            },
            "show all"
        );
    })

    it('should dump all the strings operations examples to the console', async () => {
        const caller = await blockchain.treasury('caller');
        await strings.send(
            caller.getSender(),
            {
                value: toNano('0.05'),
            },
            "show ops"
        );
    })
});
