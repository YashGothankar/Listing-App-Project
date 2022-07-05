# Application Flow:
    - When app load redirect host to login page
    - Authenticate with OpenId client(here im using `angular-oauth2-oidc`).
        - openId redirect to home page 
            - home page claim the identity (HttpInterceptor intercept all the request and add access token to authorization header)
                - app connect the socket with Api Gateway.
                - app authenticate with Api gateway.
            - not found identity will redirect to login page.