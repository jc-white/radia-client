import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import {TraitLabelComponent} from './trait-label.component';

@NgModule({
	imports:      [
		CommonModule,
		NgbTooltipModule
	],
	declarations: [
		TraitLabelComponent
	],
	exports:      [
		TraitLabelComponent
	]
})
export class TraitLabelModule {
}
