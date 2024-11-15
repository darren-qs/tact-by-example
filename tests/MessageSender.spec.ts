import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { MessageSender } from '../wrappers/MessageSender';
import '@ton/test-utils';

describe('MessageSender', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let messageSender: SandboxContract<MessageSender>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        messageSender = blockchain.openContract(await MessageSender.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await messageSender.send(
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
            to: messageSender.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and messageSender are ready to use
    });

    it('should receive and process a who message (IS dployer!)', async () => {
        const caller = await blockchain.treasury('caller');

        const txResult = await messageSender.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            "who"
        );

        // check console for dump output from contract ('deployer')
    });

    it('should receive and process a who message (NOT dployer!)', async () => {
        const caller = await blockchain.treasury('caller');

        const txResult = await messageSender.send(
            caller.getSender(),
            {
                value: toNano('0.05'),
            },
            "who"
        );

        // check console for dump output from contract ('deployer')
    });

    it('should receive and process a hello message and detect of the sender is same as last', async () => {
        const caller = await blockchain.treasury('caller');

        await messageSender.send(
            caller.getSender(),
            {
                value: toNano('0.05'),
            },
            "hello"
        );
        console.log('called as caller user (new uesr)')
        // check console for dump output from contract ('hello new sender!')

        await messageSender.send(
            caller.getSender(),
            {
                value: toNano('0.05'),
            },
            "hello"
        );

        console.log('called as caller user (same user)')
        // check console for dump output from contract - no output

        await messageSender.send(
            caller.getSender(),
            {
                value: toNano('0.05'),
            },
            "hello"
        );
        
        console.log('called as caller user (same user)')
        // check console for dump output from contract - no output

        await messageSender.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            "hello"
        );
        
        console.log('called as deployer user (NEW user)')
        // check console for dump output from contract - ('hello new sender!')
    });
});
