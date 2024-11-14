import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { HelloWorld } from '../wrappers/HelloWorld';
import '@ton/test-utils';

describe('HelloWorld', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let helloWorld: SandboxContract<HelloWorld>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        helloWorld = blockchain.openContract(await HelloWorld.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await helloWorld.send(
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
            to: helloWorld.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and helloWorld are ready to use
    });

    it.only('should return the string hello world', async () => {
        const helloMessage = await helloWorld.getGreeting();
        expect(helloMessage).toEqual("Hello TACT!");
        console.log("Result: ", helloMessage);
    })
});
