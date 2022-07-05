
// response model to client
export default class ResponseModel {
    statusCode: number;
    status: 'SUCCESS' | 'FAILED';
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    message: string;
    data: any;
    socketId: string = '';
    requestId: string = '';

    constructor(
        statusCode: number,
        status: 'SUCCESS' | 'FAILED',
        method: 'GET' | 'POST' | 'PUT' | 'DELETE',
        message: string,
        data: any = {}
    ) {
        this.statusCode = statusCode;
        this.status = status;
        this.method = method;
        this.message = message;
        this.data = data;
    }
}