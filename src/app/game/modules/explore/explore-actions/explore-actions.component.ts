import {Component, OnInit} from '@angular/core';
import {ExploreService} from '../explore.service';

@Component({
	selector:    'explore-actions',
	templateUrl: './explore-actions.component.html',
	styleUrls:   ['./explore-actions.component.scss']
})
export class ExploreActionsComponent implements OnInit {

	constructor(private exploreService: ExploreService) {
	}

	ngOnInit() {
	}

	camp() {
		this.exploreService.sendCommand('camp');
	}

	forage() {
		this.exploreService.sendCommand('forage');
	}

}
