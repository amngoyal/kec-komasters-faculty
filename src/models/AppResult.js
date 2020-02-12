export class AppResult {

}

export class ErrorResult extends AppResult {
    constructor(code) {
        super();
        this.code = code;
    }
}

export class SuccessResult extends AppResult {

    constructor(content) {
        super();
        this.content = content;
    }
}
