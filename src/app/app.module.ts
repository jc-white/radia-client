import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';
import {ApiInterceptor} from './core/providers/http/api.interceptor';
import {AuthService} from './core/services/auth.service';
import {MobxAngularModule} from 'mobx-angular';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {GameModule} from './game/game.module';
import {SocketService} from './game/common/services/net/socket.service';
import {HomeModule} from './pages/home/home.module';
import {AppRoutes} from './app.routes';
import {Angular2FontawesomeModule} from 'angular2-fontawesome';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SigninModule} from './pages/signin/signin.module';

export function sessionLoaderFactory(auth: AuthService) {
	return () => auth.getSession();
}

@NgModule({
	declarations: [
		AppComponent
	],
	imports:      [
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		HttpClientModule,
		RouterModule.forRoot(AppRoutes, {
			enableTracing: false
		}),
		HomeModule,
		GameModule,
		MobxAngularModule,
		SigninModule,
		Angular2FontawesomeModule,
		NgbModule.forRoot()
	],
	providers:    [
		AuthService,
		SocketService,
		{
			provide:    APP_INITIALIZER,
			useFactory: sessionLoaderFactory,
			deps:       [AuthService],
			multi:      true
		},
		{
			provide:  HTTP_INTERCEPTORS,
			useClass: ApiInterceptor,
			multi:    true
		}
	],
	bootstrap:    [AppComponent]
})
export class AppModule {
}
