import { Component, OnInit } from '@angular/core';
import { OpenIDAuthService } from './service/openId-auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [OpenIDAuthService]
})
export class AppComponent implements OnInit {
    title = 'client';

    constructor(private openIDAuthService: OpenIDAuthService) {

    }

    async ngOnInit(): Promise<void> {
        await this.openIDAuthService.configureSingleSignOn()
    }
}
