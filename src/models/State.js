export class State {
}

export class StateRest extends State {
}

export class StateContent extends State {

    constructor(content) {
        super();
        this.content = content;
    }
}

export class StateError extends State {

    constructor(message, retryCallback) {
        super();
        this.message = message;
        this.retryCallback = retryCallback;
    }
}

export class StateLoading extends State {

}
