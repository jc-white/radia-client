import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WorldmapComponent} from './worldmap.component';

@NgModule({
	imports:      [
		CommonModule
	],
	declarations: [
		WorldmapComponent
	],
	exports: [
		WorldmapComponent
	]
})
export class WorldmapModule {
}
