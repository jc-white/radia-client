import {Injectable} from '@angular/core';
import {take} from 'rxjs/operators';
import {GameWindowRef} from '../../game-layout/game-layout.interface';
import {GameLayoutService} from '../../game-layout/game-layout.service';
import {CharacterSheetComponent} from './character-sheet/character-sheet.component';
import {Hero} from './models/hero.model';
import {Dictionary} from 'lodash';

@Injectable()
export class HeroService {
	private windows: Dictionary<GameWindowRef> = {};

	constructor(private layoutService: GameLayoutService) {

	}

	openCharacterSheet(hero: Hero, readOnly: boolean = false) {
		if (this.windows[hero.heroID]) return;

		this.windows[hero.heroID] = this.layoutService.openWindow(CharacterSheetComponent, {
			settings: {
				header: hero.name,
				height: 500,
				width:  600
			},
			inputs:   {
				hero:     hero,
				readOnly: readOnly
			}
		});

		this.windows[hero.heroID].containerRef.instance.onHide
			.pipe(take(1))
			.subscribe(() => {
				this.windows[hero.heroID] = undefined;
			});
	}
}
