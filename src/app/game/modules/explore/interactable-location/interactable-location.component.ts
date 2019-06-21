import {Component, OnInit} from '@angular/core';
import {GameLayoutService} from '../../../game-layout/game-layout.service';
import {ExploreService} from '../explore.service';
import {ExploreStore} from '../explore.store';
import {HeroRecruitComponent} from './hero-recruit/hero-recruit.component';

@Component({
	selector:    'interactable-location',
	templateUrl: './interactable-location.component.html',
	styleUrls:   ['./interactable-location.component.scss']
})
export class InteractableLocationComponent implements OnInit {

	constructor(public store: ExploreStore, private exploreService: ExploreService, private layoutService: GameLayoutService) {
	}

	ngOnInit() {
	}

	openShopWindow() {

	}

	openHeroRecruitWindow() {
		this.exploreService.sendCommand('getRecruitableHeroes');

		this.layoutService.openWindow(HeroRecruitComponent, {
			settings: {
				width: 700,
				height: 600,
				header: 'Recruit Heroes'
			}
		})
	}

	openRumorsWindow() {

	}
}
