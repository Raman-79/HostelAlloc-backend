export type ServerError = {
    type:string;
    message: string;
};
export function isServerError(error: any): error is ServerError {
    return (error as ServerError).type !== 'server';
}
