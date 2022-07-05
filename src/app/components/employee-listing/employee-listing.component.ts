import { Component, OnInit } from '@angular/core';
import EmployeeDto from 'src/app/Dtos/employee.dto';
import { BaseApiGatewayService } from 'src/app/service/base-api-gateway.service';
import { MetaDataService } from 'src/app/service/meta-data.service';
import { BaseListingClass } from 'src/app/utils/base-listing';


@Component({
  selector: 'app-employee-listing',
  templateUrl: './employee-listing.component.html',
  styleUrls: ['./employee-listing.component.css']
})
export class EmployeeListingComponent extends BaseListingClass<EmployeeDto> implements OnInit {

  isUpdating: boolean = false;

  constructor(
    api: BaseApiGatewayService,
    metaData: MetaDataService
  ) {
    super('EMPLOYEE', metaData, api);
    this.metaData.isUpdating.subscribe(data => {
      this.isUpdating = data;
      if (!data) {
        this.ngOnInit();
        this.api.setCounts(['EMPLOYEE']);
      }
    })
  }

  ngOnInit(): void {
    this.getQuery();
  }

}
