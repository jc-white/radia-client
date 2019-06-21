import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import {DropdownPositionDirective} from './dropdown-reposition.directive';

@NgModule({
	imports:      [
		CommonModule,
		NgbDropdownModule
	],
	declarations: [
		DropdownPositionDirective
	],
	exports:      [
		DropdownPositionDirective
	]
})
export class CommonDirectivesModule {
}
