import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {GameWindowRef} from '../../../../game-layout/game-layout.interface';
import {GameLayoutService} from '../../../../game-layout/game-layout.service';
import {CharacterSheetComponent} from '../../../heroes/character-sheet/character-sheet.component';
import {Hero} from '../../../heroes/models/hero.model';

@Component({
	selector:    'party-hero-box',
	templateUrl: './party-hero-box.component.html',
	styleUrls:   ['./party-hero-box.component.scss']
})
export class PartyHeroBoxComponent implements OnInit, OnDestroy {
	@Input('hero') hero: Hero;

	window: GameWindowRef;

	private subscriptions: Array<Subscription> = [];

	constructor(public layoutService: GameLayoutService) {
	}

	ngOnInit() {
	}

	ngOnDestroy() {
		this.subscriptions.forEach(sub => sub.unsubscribe());
	}

	openCharacterSheet() {
		if (this.window) return;

		this.window = this.layoutService.openWindow(CharacterSheetComponent, {
			settings: {
				header: this.hero.name,
				height: 500,
				width: 600
			},
			inputs:   {
				hero: this.hero
			}
		});

		this.subscriptions.push(this.window.containerRef.instance.onHide.subscribe(() => {
			this.window = null;
		}));
	}
}
