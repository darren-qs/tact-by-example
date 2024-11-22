# TACT by Example

Source is [here](https://tact-by-example.org/all). Enjoy!

## Install

Use NodeJS v22 or higher.

```bash
nvm install 22
nvm use 22
```

Then install yarn and project dependencies.

```bash
npm i -g yarn
yarn
yarn build --all
yarn test
```

## Run specific tests

To run a specific test add the `.only` annotation to the test you want to run and then run the specific file.

```bash
npx jest tests/HelloWorld.spec.ts
```

## Project structure

-   `contracts` - source code of all the smart contracts of the project and their dependencies.
-   `wrappers` - wrapper classes (implementing `Contract` from ton-core) for the contracts, including any [de]serialization primitives and compilation functions.
-   `tests` - tests for the contracts.
-   `scripts` - scripts used by the project, mainly the deployment scripts.

## How to use

### Build

`npx blueprint build` or `yarn blueprint build`

### Test

`npx blueprint test` or `yarn blueprint test`

### Deploy or run another script

`npx blueprint run` or `yarn blueprint run`

### Add a new contract

`npx blueprint create ContractName` or `yarn blueprint create ContractName`
