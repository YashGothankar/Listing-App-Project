import { ActivatedRoute, Route, Router } from "@angular/router";
import RequestBodyDto from "../Dtos/requestModel";
import { Service } from "../Dtos/services.map";
import { BaseApiGatewayService } from "../service/base-api-gateway.service";
import { MetaDataService } from "../service/meta-data.service";




export class BaseAddEditClass<TDto> {

    process: string = '';
    id: number = 0;
    public object = { name: undefined, age: undefined };

    constructor(
        private activatedRoute: ActivatedRoute,
        private metaData: MetaDataService,
        private api: BaseApiGatewayService,
        private router: Router,
        private redirectUrl: string,
        private service: Service
    ) {
        this.activatedRoute.params.subscribe(params => {
            if (params['task'] === 'add' || params['task'] === 'edit') {
                this.process = params['task'];
                if (this.process === 'edit') {
                    this.activatedRoute.queryParams.subscribe(queries => {
                        this.id = queries['id'];
                        if (!this.id) {
                            this.metaData.showMessage('Edit id not given', 'danger');
                            this.router.navigateByUrl(this.redirectUrl);
                        } else {
                            this.api.getById(this.service, this.id).subscribe(data => {
                                this.object = data.data;
                            })
                        }
                    })
                }
            } else {
                this.router.navigateByUrl(this.redirectUrl);
            }
        })
    }

    onSubmit(data: TDto) {

        const requestId = Date.now().toString();
        const body: RequestBodyDto = new RequestBodyDto(this.metaData.socketId, requestId, data);
        if (this.process === 'add') {
            this.metaData.subscriptionResolver(this.api.create(this.service, body), requestId);
        } else {
            this.metaData.subscriptionResolver(this.api.update(this.service, this.id, body), requestId);
        }
        this.router.navigateByUrl(this.redirectUrl);
    }
}