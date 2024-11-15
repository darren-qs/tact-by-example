import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { Errors } from '../wrappers/Errors';
import '@ton/test-utils';

describe('Errors', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let errors: SandboxContract<Errors>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        errors = blockchain.openContract(await Errors.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await errors.send(
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
            to: errors.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and errors are ready to use
    });

    it('should revert when sending no access message', async () => {
        const caller = await blockchain.treasury('caller');

        const txResult = await errors.send(
            caller.getSender(),
            {
                value: toNano('0.05'),
            },
            "no access"
        );

        // the aborted message in the contract
        expect(txResult.transactions).toHaveTransaction({
            from: caller.address,
            to: errors.address,
            success: false,
            aborted: true,
            exitCode: 132
        });

        // the bounced message back to the sender
        expect(txResult.transactions).toHaveTransaction({
            from: errors.address, 
            to: caller.address,
            success: true,
            inMessageBounced: true
        });
    });

    it('should revert when sending increment message more than 4 times', async () => {
        const caller = await blockchain.treasury('caller');

        let i=1n;

        // send the increment message 4 times to increment the counter to 4
        while (i<5) {
            await errors.send(caller.getSender(), { value: toNano('0.05') }, "increment");
            expect((await errors.getValue())).toEqual(i);
            i++;
        }

        const txResult = await errors.send(caller.getSender(), { value: toNano('0.05') }, "increment");

        // counter is too high so the require statment will cause the transaction to revert
        expect(txResult.transactions).toHaveTransaction({
            from: caller.address,
            to: errors.address,
            success: false,
            aborted: true,
            exitCode: 46042 // TVM exit code??
        });

        // the bounced message back to the sender
        expect(txResult.transactions).toHaveTransaction({
            from: errors.address, 
            to: caller.address,
            success: true,
            inMessageBounced: true
        });
        
        // counter will still be 4
        expect((await errors.getValue())).toEqual(4n);
    });

    it('should receive and revert a Divide message when the by is zero', async () => {
        const caller = await blockchain.treasury('caller');
        const by = 0n

        const txResult = await errors.send(
            caller.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Divide',
                by: by,
            }
        );
        
        expect(txResult.transactions).toHaveTransaction({
            from: caller.address,
            to: errors.address,
            success: false,
            aborted: true,
            exitCode: 4 // divide by zero exit code
        });
    });
});
