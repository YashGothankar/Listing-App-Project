import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import EmployeeDto from 'src/app/Dtos/employee.dto';
import { BaseApiGatewayService } from 'src/app/service/base-api-gateway.service';
import { MetaDataService } from 'src/app/service/meta-data.service';
import { BaseAddEditClass } from 'src/app/utils/base-add-edit';

@Component({
  selector: 'app-employee-add-edit',
  templateUrl: './employee-add-edit.component.html',
  styleUrls: ['./employee-add-edit.component.css']
})
export class EmployeeAddEditComponent extends BaseAddEditClass<EmployeeDto> {


  constructor(
    activatedRoute: ActivatedRoute,
    metaData: MetaDataService,
    api: BaseApiGatewayService,
    router: Router
  ) {
    super(activatedRoute, metaData, api, router, '/home/employee', 'EMPLOYEE')
  }

}
