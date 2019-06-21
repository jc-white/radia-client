import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Angular2FontawesomeModule} from 'angular2-fontawesome';
import {FormsModule} from '@angular/forms';
import {SigninComponent} from './signin.component';
import {SignInRoutes} from './signin.routes';
import {RouterModule} from '@angular/router';

@NgModule({
	imports:      [
		CommonModule,
		FormsModule,
		HttpClientModule,
		RouterModule.forChild(SignInRoutes),
		Angular2FontawesomeModule
	],
	declarations: [SigninComponent]
})
export class SigninModule {
}
