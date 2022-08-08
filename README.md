# Guest Book JS Example

## Overview

Our Guest Book example is a simple app composed by two main components:

1. A smart contract that stores messages from users, allowing to attach money to them.
2. A simple web-based frontend that displays the last 10 messages posted.

## Installation & Setup

To clone run:

```bash
git clone https://github.com/near-examples/guest-book-js.git
```

enter the folder with:

```bash
cd guest-book-js
```

To download dependencies run:

```bash
yarn
```

or

```bash
npm i
```

## Building Your Smart Contract

The Smart Contract consists of two methods available for the user to call.

```javascript @call
    // Adds a new message under the name of the sender's account id.
    add_message({ text }) {
        const message = new PostedMessage(text);
        near.log(message);
        this.messages.push(message);
    }

    @view
    // Returns an array of last N messages.
    get_messages() {
        return this.messages;
    }

```

A `call` method stores or modifies information that exists in state on the NEAR blockchain. Call methods do incur a gas fee. `Call` methods return no values

A `view` method retrieves information stored on the blockchain. No fee is charged for a view method. View methods always return a value.

`NearBindgen` is a decorator that exposes the state and methods to the user.

To build your smart contract run

```bash
yarn build

```

or

```bash
npm run build
```

This build script will build your smart contract and compile it down to a `.wasm` file, in this case named `contract.wasm`.

Once you have built out your smart contract you can deploy it to a NEAR account using:

```bash
near dev-deploy build/contract.wasm
```

`dev-deploy` will create a new dev account on NEAR's testnet, and deploy the selected `.wasm` file onto it.

The output should display the dev account name as follows.

example:

```
dev-1659920584637-66821958258766
```

Once a smart contract has been deployed it must be initialized.

Initialize This contract by running the following

```bash
near call <dev-account> init --accountId <your-account.testnet>
```

## Calling methods from terminal

This will store the string `"hi user"` onto the NEAR blockchain using the change method defined earlier

```bash
near call <dev account> add_message '{"text":"hi user"}' --accountId <your-account-name.testnet>
```

This will return and display your stored message

```bash
near view <dev account> get_messages '{}' --accountId <your-account.testnet>

```

## Running Frontend

To spin up the frontend run

```bash
yarn start
```

or

```bash
npm run start
```

From there you should be able to modify the greeting.

## Run Tests

This example repo comes with integration tests written in rust and assembly type script.

To run tests run the following in your terminal:

```bash
yarn test
```

or

```bash
npm run test
```

Integration tests are generally written in javascript. They automatically deploy your contract and execute methods on it. In this way, integration tests simulate interactions from users in a realistic scenario. You will find the integration tests for hello-near in integration-tests/.
