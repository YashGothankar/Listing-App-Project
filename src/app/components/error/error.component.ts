import { Component, OnInit } from '@angular/core';
import { MetaDataService } from 'src/app/service/meta-data.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  errorMessage: string = 'Your Are Inside A Black Hole : 404';

  constructor(private metaData: MetaDataService) {
  }

  ngOnInit(): void {
  }

}
