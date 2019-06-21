import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {GameCommonModule} from './common/game-common.module';
import {GameLayoutModule} from './game-layout/game-layout.module';
import {DashboardModule} from './modules/dashboard/dashboard.module';
import {ChargenModule} from './modules/chargen/chargen.module';
import {RouterModule} from '@angular/router';
import {GameRoutes} from './game.routes';
import {ExploreModule} from './modules/explore/explore.module';
import {HeroesModule} from './modules/heroes/heroes.module';
import {PartyModule} from './modules/party/party.module';
import {EventRouterService} from './common/services/net/event-router.service';
import {GameComponent} from './game.component';

@NgModule({
	imports:      [
		CommonModule,
		ChargenModule,
		DashboardModule,
		ExploreModule,
		FormsModule,
		GameCommonModule,
		GameLayoutModule,
		HeroesModule,
		PartyModule,
		RouterModule.forChild(GameRoutes)
	],
	declarations: [
		GameComponent
	],
	providers:    [
		EventRouterService
	]
})
export class GameModule {
	constructor() {

	}
}