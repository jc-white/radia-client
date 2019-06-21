import {Injectable} from '@angular/core';
import {Dictionary} from 'lodash';
import {BehaviorSubject} from 'rxjs';
import {Item} from '../../models/item/item.class';
import * as _ from 'lodash';

@Injectable()
export class ItemService {
	$expanded: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	_expanded: boolean                  = false;

	cache: Dictionary<Item> = {};

	$cachedItemIDs: BehaviorSubject<Array<string>> = new BehaviorSubject<Array<string>>([]);

	openWindows: Array<Item> = [];

	constructor() {

	}

	toggle() {
		this.$expanded.next(!this.$expanded.getValue());
		this._expanded = !this._expanded;
	}

	cacheItem(itemData: any) {
		const item = new Item(itemData);

		if (!this.cache[item.itemID]) {
			this.cache[item.itemID] = item;

			this.$cachedItemIDs.next(Object.keys(this.cache));
		}
	}

	getItem(itemID: number) {
		if (this.cache[itemID]) {
			return this.cache[itemID];
		}

		return null;
	}

	openWindow(itemID: number) {
		if (this.openWindows.find(item => item.itemID == itemID)) {
			return;
		}

		this.openWindows.push(this.getItem(itemID));
	}

	closeWindow(itemID: number) {
		const index = this.openWindows.findIndex(item => item.itemID == itemID);

		if (index > -1) {
			_.pullAt(this.openWindows, index);
		}
	}
}