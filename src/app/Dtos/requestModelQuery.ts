import FilterDto from './filter.dto'


// Query for specifics
export default class RequestModelQuery {
    requestGuid: string;
    children: string[];
    filter: FilterDto;

    constructor(
        requestGuid: string = 'MNP',
        children: string[] = [],
        filter: FilterDto = new FilterDto
    ) {
        this.requestGuid = requestGuid;
        this.children = children;
        this.filter = filter;
    }
}