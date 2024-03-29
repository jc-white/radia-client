import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home.component';
import {RouterModule} from '@angular/router';
import {HomeRoutes} from './home.routes';

@NgModule({
	imports:      [
		CommonModule,
		RouterModule.forChild(HomeRoutes)
	],
	declarations: [
		HomeComponent
	]
})
export class HomeModule {
}
