import {Injectable} from '@angular/core';
import {action, observable} from 'mobx-angular';
import {BehaviorSubject} from 'rxjs';
import {Item} from '../../../common/models/item/item.class';
import {PartyStore} from '../party.store';

@Injectable()
export class InventoryStore {
	@observable public currentItem: Item;
	@observable public discardingItem: Item;

	public $currentItem: BehaviorSubject<Item> = new BehaviorSubject<Item>(null);

	constructor(private partyStore: PartyStore) {

	}

	@action('[Inventory-store] Select item')
	selectItem(item: Item) {
		this.currentItem = item;
		this.$currentItem.next(item);
	}

	@action('[Inventory-store] Set discarding item')
	setDiscardingItem(item: Item) {
		this.discardingItem = item;
	}
}