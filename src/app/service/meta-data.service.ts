import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import RequestModelQuery from "../Dtos/requestModelQuery";
import { Color, Message, Service } from "../Dtos/services.map";




let employeeQueryData: RequestModelQuery = {
    requestGuid: 'MNP',
    children: [],
    filter: {
        orderBy: 'ASC',
        orderByField: 'id',
        searchTerm: '',
        conditions: [{ columnName: 'name', columnType: 'string' }, { columnName: 'age', columnType: 'number' }],
        page: { pageNumber: 1, pageSize: 4 }
    }
}

let departmentQueryData: RequestModelQuery = {
    requestGuid: 'MNP',
    children: [],
    filter: {
        orderBy: 'ASC',
        orderByField: 'id',
        searchTerm: '',
        conditions: [{ columnName: 'name', columnType: 'string' }],
        page: { pageNumber: 1, pageSize: 4 }
    }
}

@Injectable({
    providedIn: 'root'
})
export class MetaDataService {

    public _count: Record<Service, number> = { 'DEPARTMENT': 0, 'EMPLOYEE': 0 }
    public _queryDetails: Record<Service, RequestModelQuery> = { 'EMPLOYEE': employeeQueryData, 'DEPARTMENT': departmentQueryData }

    private _user: string = 'Jone Doe';
    private _isLoading: boolean = true;
    private _isAuthenticated: boolean = false;
    private _isSocketConnected: boolean = false;
    public isUpdating: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private _socketId: string = '';

    private messages: Record<number, Message> = {};
    public listMessages: Message[] = [];

    public requestedIds: string[] = [];


    get count(): Record<Service, number> {
        return this._count;
    }

    get queryDetails(): Record<Service, RequestModelQuery> {
        return this._queryDetails;
    }

    get user(): string {
        return this._user;
    }

    get isLoading(): boolean {
        return this._isLoading;
    }

    get isAuthenticated(): boolean {
        return this._isAuthenticated;
    }

    get isSocketConnected(): boolean {
        return this._isSocketConnected;
    }

    get socketId(): string {
        return this._socketId;
    }


    set user(data: string) {
        this._user = data;
    }

    set isLoading(data: boolean) {
        this._isLoading = data;
    }

    set isAuthenticated(data: boolean) {
        this._isAuthenticated = data;
    }

    set isSocketConnected(data: boolean) {
        this._isSocketConnected = data;
    }

    set socketId(data: string) {
        sessionStorage.setItem('socketId', data);
        this._socketId = data;
    }


    /**
     * 
     * @param message 
     * @param color 
     */
    showMessage(message: string, color: Color) {
        const id: number = Date.now();
        this.messages[id] = { message, color };
        this.listMessages = Object.values(this.messages);
        setTimeout(() => {
            delete this.messages[id];
            this.listMessages = Object.values(this.messages);
        }, 10000);
    }

    removeRequestFromRequestMap(requestId: string) {
        if (this.requestedIds.includes(requestId)) {
            this.requestedIds.filter(id => id !== requestId);
            this.showMessage('Updated RequestId Map', 'secondary');
        } else {
            this.showMessage('Unable to find RequestId on Map', 'danger');
        }
    }

    subscriptionResolver(sub: Observable<any>, requestId: string): void {
        sub.subscribe(res => {
            if (Number(res?.statusCode) > 399) this.showMessage(res?.message, 'danger');
            else {
                this.isUpdating.next(true);
                this.requestedIds.push(requestId);
                this.showMessage(res?.message, 'success');
            }
        });
    }

}