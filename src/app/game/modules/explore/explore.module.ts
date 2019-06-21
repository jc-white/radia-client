import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {EventRouterService} from '../../common/services/net/event-router.service';
import {GameLogModule} from '../game-log/game-log.module';
import {PartyModule} from '../party/party.module';
import {ExploreActionsComponent} from './explore-actions/explore-actions.component';
import {ExploreEventHandler} from './explore.event-handler';
import {ExploreService} from './explore.service';
import {ExploreStore} from './explore.store';
import {InteractableLocationModule} from './interactable-location/interactable-location.module';
import {SpawnListModule} from './spawn-list/spawn-list.module';
import {WorldmapModule} from './worldmap/worldmap.module';
import {ExploreComponent} from './explore.component';

@NgModule({
	imports:      [
		CommonModule,
		GameLogModule,
		InteractableLocationModule,
		PartyModule,
		RouterModule,
		SpawnListModule,
		WorldmapModule
	],
	declarations: [
		ExploreComponent,
		ExploreActionsComponent
	],
	providers:    [
		ExploreService,
		ExploreEventHandler,
		ExploreStore
	],
	exports: [
		ExploreActionsComponent
	]
})
export class ExploreModule {
	constructor(private eventRouter: EventRouterService, private exploreEventHandler: ExploreEventHandler) {
		this.eventRouter.registerEventHandler('explore', this.exploreEventHandler);
	}
}
