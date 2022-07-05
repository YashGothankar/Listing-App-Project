import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import RequestBodyDto from '../Dtos/requestModel';
import RequestModelQuery from '../Dtos/requestModelQuery';
import { Service } from '../Dtos/services.map';
import { MetaDataService } from './meta-data.service';

@Injectable({
  providedIn: 'root'
})
export class BaseApiGatewayService {

  private hostUrl: string = 'http://localhost:3001';
  private serviceName: string = 'IOT_SERVICE';


  constructor(
    private httpClient: HttpClient,
    private metaData: MetaDataService
  ) {
  }

  get baseUrl(): string {
    return this.hostUrl + "/" + this.metaData.socketId + "/" + this.serviceName;
  }

  authenticate(): Observable<any> {
    return this.httpClient.get(this.hostUrl + "/connectdevice/" + Date.now().toString() + "/" + this.metaData.socketId);
  }

  setCounts(services: Service[]) {
    try {
      for (let service of services) {
        this.getQuery(service, new RequestModelQuery()).subscribe((data) => {
          if (Number(data?.statusCode) > 399 || Number(data?.status) > 399) throw Error(data?.message);
          this.metaData.count[service] = data?.data?.count;
        });
      }
      this.metaData.showMessage('Fetched Counts successfully...', 'success');
    } catch (error) {
      this.metaData.showMessage('Error ocuured while trying fetch count...', 'danger');
    }
  }

  getQuery(service: Service, query: RequestModelQuery): Observable<any> {
    return this.httpClient.get(this.baseUrl + "/" + service + "?query=" + JSON.stringify(query));
  }

  getById(service: Service, id: number): Observable<any> {
    return this.httpClient.get(this.baseUrl + "/" + service + "/" + id);
  }

  create(service: Service, body: RequestBodyDto): Observable<any> {
    return this.httpClient.post(this.baseUrl + "/" + service, body);
  }

  update(service: Service, id: number, body: RequestBodyDto): Observable<any> {
    return this.httpClient.put(this.baseUrl + "/" + service + "/" + id, body);
  }

  delete(service: Service, id: number, body: RequestBodyDto): Observable<any> {
    return this.httpClient.delete(this.baseUrl + "/" + service + "/" + id + "?body=" + JSON.stringify(body));
  }

}

