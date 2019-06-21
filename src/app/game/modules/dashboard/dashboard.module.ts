import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './dashboard.component';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {DashboardRoutes} from './dashboard.routes';

@NgModule({
	imports:      [
		CommonModule,
		FormsModule,
		RouterModule.forChild(DashboardRoutes)
	],
	declarations: [DashboardComponent]
})
export class DashboardModule {
}
