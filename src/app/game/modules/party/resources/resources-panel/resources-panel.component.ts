import {Component, OnInit} from '@angular/core';
import {PartyStore} from '../../party.store';
import {IPartyResourceDictEntry, ResourcesDict} from '../resources.dictionary';
import {GameConfig} from '../../../../../config/game.config';

@Component({
	selector:    'resources-panel',
	templateUrl: './resources-panel.component.html',
	styleUrls:   ['./resources-panel.component.scss']
})
export class ResourcesPanelComponent implements OnInit {
	dict: Array<IPartyResourceDictEntry> = Object.values(ResourcesDict);
	gameConfig: typeof GameConfig        = GameConfig;

	constructor(public partyStore: PartyStore) {
	}

	ngOnInit() {
	}

}
