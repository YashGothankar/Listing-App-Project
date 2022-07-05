import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import DepartmentDto from 'src/app/Dtos/department.dto';
import { BaseApiGatewayService } from 'src/app/service/base-api-gateway.service';
import { MetaDataService } from 'src/app/service/meta-data.service';
import { BaseAddEditClass } from 'src/app/utils/base-add-edit';

@Component({
  selector: 'app-department-add-edit',
  templateUrl: './department-add-edit.component.html',
  styleUrls: ['./department-add-edit.component.css']
})
export class DepartmentAddEditComponent extends BaseAddEditClass<DepartmentDto>{

  constructor(
    activatedRoute: ActivatedRoute,
    metaData: MetaDataService,
    api: BaseApiGatewayService,
    router: Router
  ) {
    super(activatedRoute, metaData, api, router, '/home/department', 'DEPARTMENT')
  }

}
