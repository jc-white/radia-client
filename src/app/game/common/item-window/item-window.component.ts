import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {GameConfig} from '../../../config/game.config';
import {GameComponent} from '../../game.component';
import {Item} from '../models/item/item.class';
import {ItemService} from '../services/item/item.service';

@Component({
	selector:    'item-window',
	templateUrl: './item-window.component.html',
	styleUrls:   ['./item-window.component.scss']
})
export class ItemWindowComponent implements OnInit {
	@Input('item') item: Item;
	@ViewChild('dragWindow') dragWindow: ElementRef;

	public statics: string = GameConfig.staticsUrl;
	public isOpen: boolean = false;

	constructor(public gc: GameComponent, public itemService: ItemService) {
	}

	ngOnInit() {
		setTimeout(() => {
			this.isOpen = true;
		}, 1);
	}

	focus() {
		this.dragWindow.nativeElement.focus();
	}

	close() {
		this.isOpen = false;

		setTimeout(() => {
			this.itemService.closeWindow(this.item.itemID);
		}, 100);
	}
}
