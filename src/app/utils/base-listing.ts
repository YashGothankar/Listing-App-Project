import { Component } from "@angular/core";
import RequestBodyDto from "../Dtos/requestModel";
import RequestModelQuery from "../Dtos/requestModelQuery";
import { Search, Service } from "../Dtos/services.map";
import { BaseApiGatewayService } from "../service/base-api-gateway.service";
import { MetaDataService } from "../service/meta-data.service";


export class BaseListingClass<TDto> {

    private service: Service;
    public metaData: MetaDataService;
    protected api: BaseApiGatewayService;

    public ascending: boolean = true;
    public List: TDto[] = [];
    queryDetails: RequestModelQuery;

    constructor(
        service: Service,
        metaData: MetaDataService,
        api: BaseApiGatewayService
    ) {
        this.service = service;
        this.api = api;
        this.metaData = metaData;
        this.queryDetails = this.metaData.queryDetails[this.service];
    }

    get pageNumber(): number {
        return this.queryDetails.filter.page.pageNumber;
    }

    get pageSize(): number {
        return this.queryDetails.filter.page.pageSize;
    }

    set pageNumber(data: number) {
        this.queryDetails.filter.page.pageNumber = data;
    }

    set searchTerm(data: string) {
        this.queryDetails.filter.searchTerm = data;
    }


    getQuery(): void {
        // console.log(this.service, this.queryDetails);  
        this.api.getQuery(this.service, this.queryDetails)
            .subscribe(res => {
                if (Number(res?.statusCode) > 400) this.metaData.showMessage(res?.message, 'danger');
                else {
                    this.List = res?.data?.list;
                }
            })
    }

    getSearch(s: Search) {
        this.searchTerm = s.search;
        this.pageNumber = 1
        this.getQuery();
    }

    clear() {
        this.pageNumber = 1;
        this.searchTerm = '';
        this.getQuery();  
    }

    onSort(column: string & keyof TDto) {
        this.pageNumber = 1;
        this.queryDetails.filter.orderBy = this.queryDetails.filter.orderBy === 'ASC' ? 'DESC' : 'ASC';
        this.ascending = !this.ascending;
        this.queryDetails.filter.orderByField = column;
        this.getQuery();
    }

    changePageSize(size: string) {
        this.pageNumber = 1;
        this.queryDetails.filter.page.pageSize = parseInt(size);
        this.getQuery();
    }

    changePage(page: string) {
        if (page === 'next' && this.metaData.count[this.service] > this.pageNumber * this.pageSize) {
            this.pageNumber += 1;
            this.getQuery();
        }
        if (page === 'prev' && this.pageNumber > 1) {
            this.pageNumber -= 1;
            this.getQuery();
        }
    }

    Delete(id: number) {
        if (confirm("Are you want to delete ...")) {
            const requestId = Date.now().toString();
            const requestModel = new RequestBodyDto(this.metaData.socketId, requestId);
            this.metaData.subscriptionResolver(this.api.delete(this.service, id, requestModel), requestId);
            this.getQuery();
        }
    }
}