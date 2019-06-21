import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SpawnListComponent} from './spawn-list.component';

@NgModule({
	imports:      [
		CommonModule
	],
	declarations: [
		SpawnListComponent
	],
	exports:      [
		SpawnListComponent
	]
})
export class SpawnListModule {
}
