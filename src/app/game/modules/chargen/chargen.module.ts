import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgbAlertModule, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import {ChargenComponent} from './chargen.component';
import {Angular2FontawesomeModule} from 'angular2-fontawesome';
import {BrowserModule} from '@angular/platform-browser';
import {ChargenStore} from './chargen.store';
import {ChargenService} from './chargen.service';
import {CommonPipesModule} from '../../../common/pipes/common-pipes.module';

@NgModule({
	imports:      [
		Angular2FontawesomeModule,
		BrowserModule,
		CommonModule,
		CommonPipesModule,
		FormsModule,
		HttpClientModule,
		NgbAlertModule,
		NgbTooltipModule
	],
	declarations: [ChargenComponent],
	providers: [
		ChargenStore,
		ChargenService
	]
})
export class ChargenModule {
}
