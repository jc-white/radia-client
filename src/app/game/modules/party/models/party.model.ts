import {computed} from 'mobx-angular';
import {Item} from '../../../common/models/item/item.class';
import {IPartyResources} from '../resources/resources.interface';

export interface IInventory {
	items: {
		[itemID: number]: number
	}
}

export class Party {
	partyID: number;
	userID: string;
	inventory: IInventory               = {
		items: {}
	};
	resources: Partial<IPartyResources> = {};
	maxWeight: number;
	map: string;
	posX: number;
	posY: number;
	fatigue: number;

	$iterableItemIDs: Array<string> = [];

	constructor(partyData: Party) {
		Object.assign(this, partyData);

		this.setIterableItems();
	}

	onUpdate() {
		this.setIterableItems();
	}

	setIterableItems() {
		this.$iterableItemIDs = Object.keys(this.inventory.items);
	}
}