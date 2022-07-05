import PaginationDto from "./pageination.dto";
import QueryCondition from "./queryCondition.dto";

// this will create the object for query search, in  getAll
export default class FilterDto {
    orderBy: 'ASC' | 'DESC';
    orderByField: string;
    searchTerm: string;
    conditions: Array<QueryCondition>;
    page: PaginationDto;

    constructor(
        orderBy: 'ASC' | 'DESC' = 'ASC',
        conditions: Array<QueryCondition> = [],
        page: PaginationDto = new PaginationDto,
        orderByField: string = 'id',
        searchTerm: string = ''
    ) {
        this.orderBy = 'ASC';
        this.page = page;
        this.conditions = conditions;
        this.orderByField = orderByField;
        this.searchTerm = searchTerm;
    }
}