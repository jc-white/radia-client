import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AngularDraggableModule} from 'angular2-draggable';
import {NgObjectPipesModule} from 'ngx-pipes';
import {ItemLinkComponent} from './item-link/item-link.component';
import {ItemWindowComponent} from './item-window/item-window.component';
import {ItemService} from './services/item/item.service';
import {TraitLabelModule} from './trait-label/trait-label.module';

@NgModule({
	imports:      [
		AngularDraggableModule,
		CommonModule,
		NgObjectPipesModule,
		TraitLabelModule
	],
	declarations: [
		ItemLinkComponent,
		ItemWindowComponent
	],
	exports:      [
		ItemLinkComponent,
		ItemWindowComponent,
		TraitLabelModule
	],
	providers: [
		ItemService
	]
})
export class GameCommonModule {
}
