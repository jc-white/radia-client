import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeroRecruitComponent} from './hero-recruit/hero-recruit.component';
import {InteractableLocationComponent} from './interactable-location.component';

@NgModule({
	imports:      [
		CommonModule
	],
	declarations: [
		InteractableLocationComponent,
		HeroRecruitComponent
	],
	exports: [
		InteractableLocationComponent
	],
	entryComponents: [
		HeroRecruitComponent
	]
})
export class InteractableLocationModule {
}
