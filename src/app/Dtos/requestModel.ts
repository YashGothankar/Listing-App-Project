// for requesting a service in route
export default class RequestBodyDto {
    socketId: string;
    requestId: string;
    data: any;

    constructor(
        socketId: string = '',
        requestId: string = '',
        data: any = {}
    ) {
        this.socketId = socketId;
        this.requestId = requestId;
        this.data = data;
    }

}