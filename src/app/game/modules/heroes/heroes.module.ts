import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EventRouterService} from '../../common/services/net/event-router.service';
import {CharacterSheetModule} from './character-sheet/character-sheet.module';
import {HeroService} from './hero.service';
import {HeroStore} from './hero.store';
import {HeroesEventHandler} from './heroes.event-handler';

@NgModule({
	imports:      [
		CharacterSheetModule,
		CommonModule
	],
	exports:      [
		CharacterSheetModule
	],
	providers:    [
		HeroService,
		HeroStore,
		HeroesEventHandler
	]
})
export class HeroesModule {
	constructor(private eventRouter: EventRouterService, private heroesEventHandler: HeroesEventHandler) {
		eventRouter.registerEventHandler('heroes', heroesEventHandler);
	}
}
