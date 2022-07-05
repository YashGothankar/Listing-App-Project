import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks';
import authCodeFlowConfig from '../config/openID';


@Injectable({
  providedIn: 'root'
})
export class OpenIDAuthService {

  constructor(private oauthService: OAuthService) { }

  async configureSingleSignOn(): Promise<void> {
    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    await this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }


  logIn(): void {
    this.oauthService.initCodeFlow();
  }

  logOut(): void {
    this.oauthService.logOut();
  }

  get token(): any {
    const res = this.oauthService.getIdentityClaims();
    return res;
  }
}
