import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { Getters } from '../wrappers/Getters';
import '@ton/test-utils';

describe('Getters', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let getters: SandboxContract<Getters>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        getters = blockchain.openContract(await Getters.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await getters.send(
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
            to: getters.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and getters are ready to use
    });

    it('should return each value from the getter cals', async () => {
        const g1 = await getters.getAnd(true, false);
        const g2 = await getters.getAnswer(42n);
        const g3 = await getters.getCounter();
        const g4 = await getters.getGreeting();
        const g5 = await getters.getLocation();
        const g6 = await getters.getSum(40n,2n);
        console.log("g1: ", g1);
        console.log("g2: ", g2);
        console.log("g3: ", g3);
        console.log("g4: ", g4);
        console.log("g5: ", g5);
        console.log("g6: ", g6);
    })
});
