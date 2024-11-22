import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano, Dictionary } from '@ton/core';
import { Maps } from '../wrappers/Maps';
import '@ton/test-utils';

describe('Maps', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let maps: SandboxContract<Maps>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        // TODO create the dictionay object to create the contract deployment
        // const dict: Dictionary<bigint, boolean> = {
        //     [BigInt(10).toString()]: true,
        // };

        // const dict: Dictionary<bigint, boolean> = new Dictionary([[BigInt(10), true]]);

        // maps = blockchain.openContract(await Maps.fromInit(dict);

        // const newLocal = deployer = await blockchain.treasury('deployer');

        // const deployResult = await maps.send(
        //     deployer.getSender(),
        //     {
        //         value: toNano('0.05'),
        //     },
        //     {
        //         $$type: 'Deploy',
        //         queryId: 0n,
        //     }
        // );

        // expect(deployResult.transactions).toHaveTransaction({
        //     from: deployer.address,
        //     to: maps.address,
        //     deploy: true,
        //     success: true,
        // });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and maps are ready to use
    });
});
