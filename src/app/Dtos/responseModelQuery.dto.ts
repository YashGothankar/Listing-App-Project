//  response model for qurying for specifics
export default class ResponseModelQueryDto {
    count: number;
    list: any;

    constructor(
        count: number = 0,
    ) {
        this.count = count;
    }
}