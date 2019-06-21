import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Item} from '../../../common/models/item/item.class';
import {PartyService} from '../party.service';
import {PartyStore} from '../party.store';
import {InventoryStore} from './inventory.store';

@Component({
	selector:    'inventory',
	templateUrl: './inventory.component.html',
	styleUrls:   ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
	@ViewChild('discardModalContent') discardModalContent: ElementRef;

	public discardAmount: number = 1;

	constructor(public partyStore: PartyStore, public partyService: PartyService, public store: InventoryStore, private modalService: NgbModal) {

	}

	ngOnInit() {

	}

	selectItem(item: Item) {
		this.store.selectItem(item);
	}

	discardItem(item: Item) {
		this.store.setDiscardingItem(item);
		this.modalService.open(this.discardModalContent).result
			.then(result => {
				this.partyService.discardItem(item.itemID, this.discardAmount);
			});
	}
}
