import {Component, OnInit} from '@angular/core';
import {ESpawnType} from '../../../common/interfaces/misc.enum';
import {ExploreStore} from '../explore.store';

@Component({
	selector:    'spawn-list',
	templateUrl: './spawn-list.component.html',
	styleUrls:   ['./spawn-list.component.scss']
})
export class SpawnListComponent implements OnInit {
	public spawnTypes: typeof ESpawnType = ESpawnType;

	constructor(public store: ExploreStore) {
	}

	ngOnInit() {
	}
}
