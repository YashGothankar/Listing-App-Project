import { Component, OnInit } from '@angular/core';
import DepartmentDto from 'src/app/Dtos/department.dto';
import { BaseApiGatewayService } from 'src/app/service/base-api-gateway.service';
import { MetaDataService } from 'src/app/service/meta-data.service';
import { BaseListingClass } from 'src/app/utils/base-listing';

@Component({
  selector: 'app-department-listing',
  templateUrl: './department-listing.component.html',
  styleUrls: ['./department-listing.component.css']
})
export class DepartmentListingComponent extends BaseListingClass<DepartmentDto> implements OnInit {

  isUpdating: boolean = false;

  constructor(
    api: BaseApiGatewayService,
    metaData: MetaDataService
  ) {
    super('DEPARTMENT', metaData, api);
    this.metaData.isUpdating.subscribe(data => {
      this.isUpdating = data;
      if (!data) {
        this.ngOnInit();
        this.api.setCounts(['DEPARTMENT']);
      }
    })
  }

  ngOnInit(): void {
    this.getQuery();
  }


}
