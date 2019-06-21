import {Component, OnInit} from '@angular/core';
import {PartyStore} from '../party.store';

@Component({
	selector:    'party-status-panel',
	templateUrl: './party-status-panel.component.html',
	styleUrls:   ['./party-status-panel.component.scss']
})
export class PartyStatusPanelComponent implements OnInit {

	constructor(public store: PartyStore) {
	}

	ngOnInit() {
	}

}
