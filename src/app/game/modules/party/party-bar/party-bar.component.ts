import {Component, OnInit} from '@angular/core';
import {GameLayoutService} from '../../../game-layout/game-layout.service';
import {HeroStore} from '../../heroes/hero.store';
import {ItemService} from '../../../common/services/item/item.service';

@Component({
	selector:    'party-bar',
	templateUrl: './party-bar.component.html',
	styleUrls:   ['./party-bar.component.scss']
})
export class PartyBarComponent implements OnInit {

	constructor(public store: HeroStore, public invService: ItemService, public layoutService: GameLayoutService) {
	}

	ngOnInit() {
	}

	toggleInventory() {
		//this.invService.toggle();
		this.layoutService.toggleRightPanel('inventory');
	}
}
