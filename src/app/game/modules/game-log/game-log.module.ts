import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GameLogComponent} from './game-log.component';
import {GameLogStore} from './game-log.store';
import { LogMessageComponent } from './log-message/log-message.component';

@NgModule({
	imports:      [
		CommonModule
	],
	declarations: [
		GameLogComponent,
		LogMessageComponent
	],
	providers:    [
		GameLogStore
	],
	exports:      [
		GameLogComponent
	]
})
export class GameLogModule {
}
