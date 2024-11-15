import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { Structs, Point } from '../wrappers/Structs';
import '@ton/test-utils';

describe('Structs', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let structs: SandboxContract<Structs>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        structs = blockchain.openContract(await Structs.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await structs.send(
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
            to: structs.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and structs are ready to use
    });

    it('should receive and process a show ops message', async () => {
        const pointBefore = await structs.getPoint();
        expect(pointBefore.x).toEqual(2n);
        expect(pointBefore.y).toEqual(3n);

        // console.log(`Point Before x=${pointBefore.x} y=${pointBefore.y}`);

        const caller = await blockchain.treasury('caller');

        await structs.send(
            caller.getSender(),
            {
                value: toNano('0.05'),
            },
            'show ops'
        );

        const pointAfter = await structs.getPoint();
        expect(pointAfter.x).toEqual(4n);
        expect(pointAfter.y).toEqual(5n);

        // console.log(`Point After x=${pointAfter.x} y=${pointAfter.y}`);
    });

    it('should receive and process an Add message', async () => {
        const pointBefore = await structs.getPoint();
        expect(pointBefore.x).toEqual(2n);
        expect(pointBefore.y).toEqual(3n);

        // console.log(`Point Before x=${pointBefore.x} y=${pointBefore.y}`);

        const increaseXBy = BigInt(Math.floor(Math.random() * 100));
        const increaseYBy = BigInt(Math.floor(Math.random() * 100));

        const caller = await blockchain.treasury('caller');

        await structs.send(
            caller.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Add',
                point: {
                    $$type: 'Point',
                    x: increaseXBy,
                    y: increaseYBy
                }
            }
        );

        const pointAfter = await structs.getPoint();
        expect(pointAfter.x).toEqual(pointBefore.x + increaseXBy);
        expect(pointAfter.y).toEqual(pointBefore.y + increaseYBy);

        // console.log(`Point After x=${pointAfter.x} y=${pointAfter.y}`);
    });

    it('should return the params from the getter', async () => {
        const params = await structs.getParams();
        expect(params.name).toEqual("Satoshi");
        expect(params.age).toBeNull();
        expect(params.point.x).toEqual(2n);
        expect(params.point.y).toEqual(3n);
    })
});
