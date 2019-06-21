import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	EventEmitter,
	Input, OnDestroy,
	OnInit,
	Output, ViewChild
} from '@angular/core';
import {NgbDropdown} from '@ng-bootstrap/ng-bootstrap';
import {Subscription} from 'rxjs';
import {filter, take} from 'rxjs/operators';
import {GameConfig} from '../../../../../config/game.config';
import {Item} from '../../../../common/models/item/item.class';
import {HeroStore} from '../../../heroes/hero.store';
import {PartyService} from '../../party.service';
import {InventoryStore} from '../inventory.store';
import {ItemService} from '../../../../common/services/item/item.service';

@Component({
	selector:        'inventory-item',
	templateUrl:     './inventory-item.component.html',
	styleUrls:       ['./inventory-item.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class InventoryItemComponent implements OnInit, OnDestroy {
	@Input('itemID') itemID: number;
	@Input('count') count: number;
	@Output('onSelect') onSelect: EventEmitter<Item> = new EventEmitter<Item>();
	@Output('onDiscard') onDiscard: EventEmitter<Item> = new EventEmitter<Item>();

	@ViewChild('equipDrop') equipDrop: NgbDropdown;
	@ViewChild('useDrop') useDrop: NgbDropdown;

	public statics: string = GameConfig.staticsUrl;
	public item: Item;

	private subscriptions: Array<Subscription> = [];

	constructor(public itemService: ItemService, public store: InventoryStore, private cd: ChangeDetectorRef, public heroStore: HeroStore, private partyService: PartyService) {

	}

	ngOnInit() {
		this.subscriptions.push(this.itemService.$cachedItemIDs
			.pipe(
				filter(itemIDs => itemIDs.indexOf(this.itemID.toString()) > -1),
				take(1)
			)
			.subscribe(itemIDs => {
				this.item = this.itemService.cache[this.itemID];
				this.cd.markForCheck();
			}));

		this.subscriptions.push(this.store.$currentItem
			.subscribe(selectedItem => {
				if (selectedItem && selectedItem !== this.item) {
					this.closeDrops();
				}

				this.cd.markForCheck();
			}));
	}

	ngOnDestroy() {
		this.subscriptions.forEach(sub => sub.unsubscribe());
	}

	select() {
		this.onSelect.emit(this.item);
		this.cd.markForCheck();
	}

	closeDrops() {
		if (this.equipDrop) this.equipDrop.close();
		if (this.useDrop) this.useDrop.close();
	}

	info() {
		this.itemService.openWindow(this.itemID);
	}

	equip(heroID: number, slot: string) {
		if (!this.item.isEquippable) return;

		this.partyService.sendEquipItemPacket(this.itemID, heroID, slot);
		this.closeDrops();
	}

	use(heroID?: number) {
		if (!this.item.isUsable) return;

		this.partyService.useItem(this.itemID, heroID);
		this.closeDrops();
	}

	discard() {
		this.onDiscard.emit(this.item);
	}
}
