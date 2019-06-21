import {Component, OnDestroy, OnInit} from '@angular/core';
import {ExploreService} from './explore.service';
import {ExploreStore} from './explore.store';

@Component({
	selector:    'app-explore',
	templateUrl: './explore.component.html',
	styleUrls:   ['./explore.component.scss']
})
export class ExploreComponent implements OnInit, OnDestroy {

	constructor(private exploreService: ExploreService, public store: ExploreStore) {
	}

	ngOnInit() {
		this.exploreService.connect();
	}

	ngOnDestroy() {
		this.exploreService.disconnect();
	}
}
