import { AuthConfig } from 'angular-oauth2-oidc';

const authCodeFlowConfig: AuthConfig = {
    // Url of the Identity Provider
    issuer: 'https://idsvr4.azurewebsites.net',

    // URL of the SPA to redirect the user to after login
    redirectUri: window.location.origin + '/home',

    // The SPA's id. The SPA is registerd with this id at the auth-server
    // clientId: 'server.code',
    clientId: 'spa',

    // logout Url
    logoutUrl: window.location.origin + '/login',

    // Just needed if your auth server demands a secret. In general, this
    // is a sign that the auth server is not configured with SPAs in mind
    // and it might not enforce further best practices vital for security
    // such applications.
    // dummyClientSecret: 'secret',

    responseType: 'code',

    // set the scope for the permissions the client should request
    // The first four are defined by OIDC.
    // Important: Request offline_access to get a refresh token
    // The api scope is a usecase specific one
    scope: 'openid profile email offline_access api',

    showDebugInformation: true,
    // issuer: "https://cognito-idp.us-east-2.amazonaws.com/us-east-2_iePaYk3wU/",
    // clientId: "60heaf1oc6mr4l21khcl66gd52",
    // "response_type": "code",
    // scope: "openid profile email aws.cognito.signin.user.admin",
    // "filterProtocolClaims": true,
    // "loadUserInfo": true,
    // "automaticSilentRenew": true,
    // "includeIdTokenInSilentRenew": true,
    // "revokeAccessTokenOnSignout": true,
    // "validateAccessTokenFromServer": true,
    // "create_user": true,
    // "api_token": "d3d2af20-ecbc-4754-9490-5a5c5a72e04b",
    // "pool_id": "us-east-2_iePaYk3wU",
    // "is_username_equals_email": false

};

export default authCodeFlowConfig;