import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EventRouterService} from '../../common/services/net/event-router.service';
import {InventoryModule} from './inventory/inventory.module';
import {PartyBarComponent} from './party-bar/party-bar.component';
import {PartyHeroBoxComponent} from './party-bar/party-hero-box/party-hero-box.component';
import {PartyEventHandler} from './party.event-handler';
import {PartyService} from './party.service';
import {PartyStore} from './party.store';
import {ResourcesPanelComponent} from './resources/resources-panel/resources-panel.component';
import {PartyStatusPanelComponent} from './party-status-panel/party-status-panel.component';

@NgModule({
	imports:      [
		CommonModule,
		InventoryModule
	],
	declarations: [
		ResourcesPanelComponent,
		PartyStatusPanelComponent,
		PartyBarComponent,
		PartyHeroBoxComponent,
	],
	providers:    [
		PartyStore,
		PartyEventHandler,
		PartyService
	],
	exports:      [
		ResourcesPanelComponent,
		PartyStatusPanelComponent,
		PartyBarComponent,
		PartyHeroBoxComponent,
		InventoryModule
	]
})
export class PartyModule {
	constructor(private eventRouter: EventRouterService, private partyEventHandler: PartyEventHandler, private partyService: PartyService) {
		partyService.connect();
		eventRouter.registerEventHandler('party', partyEventHandler);
	}
}
