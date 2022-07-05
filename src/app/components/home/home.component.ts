import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { BaseApiGatewayService } from 'src/app/service/base-api-gateway.service';
import { MetaDataService } from 'src/app/service/meta-data.service';
import { OpenIDAuthService } from 'src/app/service/openId-auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  constructor(
    private router: Router,
    private socket: Socket,
    private openIDAuthService: OpenIDAuthService,
    private api: BaseApiGatewayService,
    public metaData: MetaDataService
  ) {
  }

  ngOnInit(): void {
    if (!this.openIDAuthService.token) {
      setTimeout(async () => {
        if (this.openIDAuthService.token) {
          let user = this.openIDAuthService.token?.name;
          if (user) {
            this.metaData.user = user
          }
          this.metaData.isLoading = false;
          this.metaData.socketId = this.socket.ioSocket.id;
          this.metaData.showMessage(`Setting socketId : ${this.metaData.socketId}`, 'info');
          this.metaData.isSocketConnected = true;
          this.configSocket();
          this.authenticate();
        } else {
          this.router.navigateByUrl('/login');
        }
      }, 5000)
    } else {
      let user = this.openIDAuthService.token?.name;
      if (user) {
        this.metaData.user = user;
      }
      this.metaData.showMessage('Reconnecting with socket... ', 'warning');
      this.configSocket();
      this.metaData.isLoading = false;
    }
  }

  authenticate() {
    try {
      this.api.authenticate().subscribe(data => {
        console.log(data);
        if (Number(data?.statusCode) > 399) throw Error(data?.message);
        this.metaData.isAuthenticated = true;
        this.metaData.showMessage(data?.message, 'success');
        console.log(this.metaData.socketId);
        this.api.setCounts(['DEPARTMENT', 'EMPLOYEE']);
      });
    } catch (error) {
      this.metaData.showMessage('Error occured while authenticating...', 'danger');
    }
  }

  configSocket() {
    this.socket.on('connect', () => {
      console.log('connected to socket');
    })

    this.socket.on("socketIdFromServer", async (data: any) => {
      console.log('socket recieved : ', data);
      this.metaData.isSocketConnected = true;
      this.metaData.socketId = data?.socketId;
      this.metaData.showMessage(`Setting socketId : ${this.metaData.socketId}`, 'info');
      // Authenticate
      this.authenticate();
    });

    this.socket.on("successResponseFromServer", (data: any) => {
      console.log(data);
      if (Number(data?.statusCode) > 399) this.metaData.showMessage(data.message, 'danger');
      else {
        this.metaData.showMessage(data.message, 'primary');
      }
      this.metaData.isUpdating.next(false);
      this.metaData.removeRequestFromRequestMap(data.requestId);
    });

    this.socket.on("errorResponseFromServer", (data: any) => {
      console.log(data);
      if (Number(data?.statusCode) > 399) this.metaData.showMessage(data.message, 'danger');
      else {
        this.metaData.showMessage(data.message, 'primary');
      }
      this.metaData.isUpdating.next(false);
      this.metaData.removeRequestFromRequestMap(data.requestId);
    });
  }


  logout() {
    this.metaData.isAuthenticated = false;
    this.socket.disconnect();
    console.log('logout processing...');
    sessionStorage.removeItem('socketId');
    this.openIDAuthService.logOut();
  }

}
