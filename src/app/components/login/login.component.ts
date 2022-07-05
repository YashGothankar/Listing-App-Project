import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OpenIDAuthService } from 'src/app/service/openId-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private openIDAuthService: OpenIDAuthService) {

  }

  ngOnInit(): void {
    if (this.openIDAuthService.token) {
      this.router.navigateByUrl('/home');
    }
  }

  async handleLogin() {
    console.log('login in process...');
    this.openIDAuthService.logIn();
  }

}
