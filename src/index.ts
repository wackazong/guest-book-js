/*
 * Example smart contract written in JavaScript
 *
 */

import { NearContract, NearBindgen, near, call, view } from 'near-sdk-js'

// If the user attaches more than 0.01N the message is premium
const PREMIUM_PRICE = BigInt('10000000000000000000000');

/** 
 * Creating a new class PostedMessage to keep track of important information
 */
class PostedMessage {
    premium: boolean;
    sender: string;
    text: string;

    constructor(text) {
        this.premium = near.attachedDeposit() >= PREMIUM_PRICE;
        this.sender = near.predecessorAccountId();
        this.text = text;
    }
}

// Define the contract structure
@NearBindgen
class Contract extends NearContract {
    messages: PostedMessage[];

    // Define the constructor, which sets the message equal to the default message.
    constructor() {
        super()
        this.messages = [];
    }

    @call
    // Adds a new message under the name of the sender's account id.
    add_message({ text }: { text: string }): PostedMessage {
        const message = new PostedMessage(text);
        near.log(message);
        this.messages.push(message);
        return message;
    }
    
    @view
    // Returns an array of last N messages.
    get_messages({ from_index = 0, limit = 10 }: { from_index: number, limit: number }): PostedMessage[] {
        // Paginate the messages using the from_index and limit parameters
        return this.messages.slice(from_index, from_index + limit);
    }
}