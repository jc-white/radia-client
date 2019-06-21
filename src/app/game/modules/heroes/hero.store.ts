import {Injectable} from '@angular/core';
import {action, observable} from 'mobx-angular';
import {Hero} from './models/hero.model';

@Injectable()
export class HeroStore {
	constructor() {

	}

	@observable heroes: Array<Hero> = [];

	@action('[Hero-store] Update heroes')
	updateHeroes(heroes: Array<Hero>) {
		heroes.forEach(hero => {
			const index = this.heroes.findIndex(existingHero => existingHero && existingHero.heroID == hero.heroID);

			if (index > -1) {
				Object.assign(this.heroes[index], hero);
			} else {
				this.heroes.push(new Hero(hero));
			}
		});
	}
}