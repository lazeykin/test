export interface IToken {
    code: string,
    status: string
    message: string,
    result: {
        token: string,
        expiredAt: number
    }
}