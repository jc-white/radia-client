import {Injectable} from '@angular/core';
import {action, observable} from 'mobx-angular';
import {BehaviorSubject} from 'rxjs';
import {Item} from '../../common/models/item/item.class';
import {ItemService} from '../../common/services/item/item.service';
import {Party} from './models/party.model';

@Injectable()
export class PartyStore {
	@observable party: Party;

	$partyLoaded: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

	constructor(private itemService: ItemService) {

	}

	@action('[Party-store] Set party')
	setParty(party: Party) {
		if (this.party) {
			Object.assign(this.party, party);
		} else {
			this.party = new Party(party);
		}

		this.$partyLoaded.next(true);
		this.party.onUpdate();
	}

	@action('[Party-store] Set fatigue')
	setFatigue(value: number) {
		if (!this.party) return;

		Object.assign(this.party, {
			fatigue: value
		});
	}

	@action('[Party-store] Cache item')
	cacheItem(item: Item) {
		this.itemService.cacheItem(item);
	}

	@action('[Party-store] Cache items')
	cacheItems(items: Array<Item>) {
		items.forEach(item => this.itemService.cacheItem(item));
	}
}