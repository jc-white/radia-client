import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {GameConfig} from '../../../config/game.config';
import {Item} from '../models/item/item.class';
import {ItemService} from '../services/item/item.service';
import {filter, take} from 'rxjs/operators';

@Component({
	selector:        'item-link',
	templateUrl:     './item-link.component.html',
	styleUrls:       ['./item-link.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemLinkComponent implements OnInit, OnDestroy {
	@Input('itemID') itemID: number;
	@Input('showIcon') showIcon: boolean = true;
	@Input('data') data: any;

	public statics: string = GameConfig.staticsUrl;
	public item: Item;

	private subscriptions: Array<Subscription> = [];

	constructor(private itemService: ItemService, private cd: ChangeDetectorRef) {
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
	}

	ngOnDestroy() {
		this.subscriptions.forEach(sub => sub.unsubscribe());
	}

	info() {
		this.itemService.openWindow(this.itemID);
	}
}
