import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgbDropdownModule, NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {NgObjectPipesModule, NgStringPipesModule} from 'ngx-pipes';
import {CommonDirectivesModule} from '../../../../common/directives/common-directives.module';
import {GameCommonModule} from '../../../common/game-common.module';
import {InventoryItemComponent} from './inventory-item/inventory-item.component';
import {InventoryComponent} from './inventory.component';
import {InventoryStore} from './inventory.store';

@NgModule({
	imports:      [
		CommonDirectivesModule,
		CommonModule,
		FormsModule,
		GameCommonModule,
		NgbDropdownModule,
		NgbModalModule,
		NgObjectPipesModule,
		NgStringPipesModule
	],
	declarations: [
		InventoryComponent,
		InventoryItemComponent
	],
	providers:    [
		InventoryStore
	],
	exports: [
		InventoryComponent,
		InventoryItemComponent
	]
})
export class InventoryModule {
}
