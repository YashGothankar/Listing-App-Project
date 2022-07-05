"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MetaDataService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var employeeQueryData = {
    requestGuid: 'MNP',
    children: [],
    filter: {
        orderBy: 'ASC',
        orderByField: 'id',
        searchTerm: '',
        conditions: [{ columnName: 'name', columnType: 'string' }, { columnName: 'age', columnType: 'number' }],
        page: { pageNumber: 1, pageSize: 4 }
    }
};
var departmentQueryData = {
    requestGuid: 'MNP',
    children: [],
    filter: {
        orderBy: 'ASC',
        orderByField: 'id',
        searchTerm: '',
        conditions: [{ columnName: 'name', columnType: 'string' }],
        page: { pageNumber: 1, pageSize: 4 }
    }
};
var MetaDataService = /** @class */ (function () {
    function MetaDataService() {
        this._count = { 'DEPARTMENT': 0, 'EMPLOYEE': 0 };
        this._queryDetails = { 'EMPLOYEE': employeeQueryData, 'DEPARTMENT': departmentQueryData };
        this._user = 'Jone Doe';
        this._isLoading = true;
        this._isAuthenticated = false;
        this._isSocketConnected = false;
        this.isUpdating = new rxjs_1.BehaviorSubject(false);
        this._socketId = '';
        this.messages = {};
        this.listMessages = [];
        this.requestedIds = [];
    }
    Object.defineProperty(MetaDataService.prototype, "count", {
        get: function () {
            return this._count;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MetaDataService.prototype, "queryDetails", {
        get: function () {
            return this._queryDetails;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MetaDataService.prototype, "user", {
        get: function () {
            return this._user;
        },
        set: function (data) {
            this._user = data;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MetaDataService.prototype, "isLoading", {
        get: function () {
            return this._isLoading;
        },
        set: function (data) {
            this._isLoading = data;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MetaDataService.prototype, "isAuthenticated", {
        get: function () {
            return this._isAuthenticated;
        },
        set: function (data) {
            this._isAuthenticated = data;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MetaDataService.prototype, "isSocketConnected", {
        get: function () {
            return this._isSocketConnected;
        },
        set: function (data) {
            this._isSocketConnected = data;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MetaDataService.prototype, "socketId", {
        get: function () {
            return this._socketId;
        },
        set: function (data) {
            sessionStorage.setItem('socketId', data);
            this._socketId = data;
        },
        enumerable: false,
        configurable: true
    });
    /**
     *
     * @param message
     * @param color
     */
    MetaDataService.prototype.showMessage = function (message, color) {
        var _this = this;
        var id = Date.now();
        this.messages[id] = { message: message, color: color };
        this.listMessages = Object.values(this.messages);
        setTimeout(function () {
            delete _this.messages[id];
            _this.listMessages = Object.values(_this.messages);
        }, 10000);
    };
    MetaDataService.prototype.removeRequestFromRequestMap = function (requestId) {
        if (this.requestedIds.includes(requestId)) {
            this.requestedIds.filter(function (id) { return id !== requestId; });
            this.showMessage('Updated RequestId Map', 'secondary');
        }
        else {
            this.showMessage('Unable to find RequestId on Map', 'danger');
        }
    };
    MetaDataService.prototype.subscriptionResolver = function (sub, requestId) {
        var _this = this;
        sub.subscribe(function (res) {
            if (Number(res === null || res === void 0 ? void 0 : res.statusCode) > 399)
                _this.showMessage(res === null || res === void 0 ? void 0 : res.message, 'danger');
            else {
                _this.isUpdating.next(true);
                _this.requestedIds.push(requestId);
                _this.showMessage(res === null || res === void 0 ? void 0 : res.message, 'success');
            }
        });
    };
    MetaDataService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], MetaDataService);
    return MetaDataService;
}());
exports.MetaDataService = MetaDataService;
