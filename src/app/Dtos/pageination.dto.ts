
// this will give the pagination details
export default class PaginationDto {
    pageSize: number;
    pageNumber: number;
    totalRecordds?: number;

    constructor(
        pageSize: number = 4,
        pageNumber: number = 1,
    ) {
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;
    }
}