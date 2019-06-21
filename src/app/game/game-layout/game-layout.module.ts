import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AngularDraggableModule} from 'angular2-draggable';
import {GameLayoutService} from './game-layout.service';
import {WindowFactoryService} from './game-window-host/game-window-factory.service';
import {SlidePanelComponent} from './slide-panel/slide-panel.component';
import { GameWindowHostComponent } from './game-window-host/game-window-host.component';
import { GameWindowContainerComponent } from './game-window-container/game-window-container.component';

@NgModule({
	imports:      [
		AngularDraggableModule,
		CommonModule
	],
	declarations: [
		SlidePanelComponent,
		GameWindowHostComponent,
		GameWindowContainerComponent
	],
	providers: [
		GameLayoutService,
		WindowFactoryService
	],
	exports:      [
		SlidePanelComponent,
		GameWindowHostComponent,
		GameWindowContainerComponent
	],
	entryComponents: [
		GameWindowContainerComponent
	]
})
export class GameLayoutModule {
}
