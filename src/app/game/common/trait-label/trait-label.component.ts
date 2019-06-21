import {Component, Input, OnInit} from '@angular/core';
import {AffinitiesDictionary} from '../dicts/affinities.dict';
import {SkillsDictionary} from '../dicts/skills.dict';
import {TraitsDictionary} from '../dicts/traits.dict';
import {ITrait} from '../interfaces/traits/traits.interface';

@Component({
	selector:    'trait-label',
	templateUrl: './trait-label.component.html',
	styleUrls:   ['./trait-label.component.scss']
})
export class TraitLabelComponent implements OnInit {
	@Input('traitID') traitID: string;

	public skills: typeof SkillsDictionary         = SkillsDictionary;
	public affinities: typeof AffinitiesDictionary = AffinitiesDictionary;
	public trait: ITrait;

	constructor() {
	}

	ngOnInit() {
		this.trait = TraitsDictionary.find(trait => trait.traitID == this.traitID);
	}

}
