/*
 * Example smart contract written in JavaScript
 *
 */

import { NearContract, NearBindgen, near, call, view, Vector } from 'near-sdk-js'

// If the user attaches more than 0.01N the message is premium
const PREMIUM_PRICE = BigInt('10000000000000000000000');

/** 
 * Creating a new class PostedMessage to keep track of important information
 */
class PostedMessage {
    constructor(text) {
        this.premium = near.attachedDeposit() >= PREMIUM_PRICE;
        this.sender = near.predecessorAccountId();
        this.text = text;
    }
}

// Define the contract structure
@NearBindgen
class Contract extends NearContract {
    // Define the constructor, which sets the message equal to the default message.
    constructor() {
        super()
        this.messages = [];
    }

    @call
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
}