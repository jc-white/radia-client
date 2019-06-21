import {IStatList} from '../../interfaces/hero/stats.interface';
import {EquipSlot, ItemSubType, ItemType} from '../../interfaces/item/item.interface';
import {Dictionary} from 'lodash';
import * as _ from 'lodash';

export class Item {
	itemID: number;
	itemType: ItemType;
	itemSubTypes: Array<ItemSubType>;
	name: string;
	stats: IStatList;
	skills: Dictionary<number>;
	levelReq: number;
	icon: string;
	equipSlots: Array<EquipSlot>;
	scripts: {
		[trigger: string]: string
	};
	meta: any;
	info: string;
	tags: Array<string>;

	subTypesMap: Dictionary<boolean> = {};

	constructor(itemData: Item) {
		if (itemData) {
			Object.assign<Item, Item>(this, itemData);
		}

		console.log(this.itemSubTypes, typeof this.itemSubTypes);

		if (this.itemSubTypes && this.itemSubTypes.length) {
			this.itemSubTypes.forEach(type => {
				this.subTypesMap[type] = true;
			});
		}
	}

	//region Usable
	get isUsable() {
		return this.itemType == 'usable';
	}

	get usableRequiresTarget() {
		return this.isUsable && this.meta && this.meta.target === 'single';
	}
	//endregion

	//region Equippable
	get isEquippable() {
		return this.itemType == 'equipment';
	}
	//endregion


	//region Misc
	hasTag(tag: string) {
		return Array.isArray(this.tags) && this.tags.indexOf(tag) > -1;
	}

	canDiscard() {
		return !this.hasTag('no-discard');
	}
	//endregion
}