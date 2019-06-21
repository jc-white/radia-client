import {Component, OnInit} from '@angular/core';
import {HeroService} from '../../../heroes/hero.service';
import {Hero} from '../../../heroes/models/hero.model';
import {ExploreStore} from '../../explore.store';

@Component({
	selector:    'hero-recruit',
	templateUrl: './hero-recruit.component.html',
	styleUrls:   ['./hero-recruit.component.scss']
})
export class HeroRecruitComponent implements OnInit {

	constructor(public store: ExploreStore, private heroService: HeroService) {
	}

	ngOnInit() {
	}

	viewHero(hero: Hero) {
		this.heroService.openCharacterSheet(hero, true);
	}

}
