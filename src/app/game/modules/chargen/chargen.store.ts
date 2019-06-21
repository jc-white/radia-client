import {Injectable} from '@angular/core';
import {action, computed, observable} from 'mobx-angular';
import {EGender} from '../../common/interfaces/misc.enum';
import {ChargenService} from './chargen.service';
import {Dictionary} from 'lodash';
import * as _ from 'lodash';
import {IChargenFormData} from './chargen.interface';
import {IBackstory} from '../../common/interfaces/hero/hero.interface';
import {ITrait} from '../../common/interfaces/traits/traits.interface';
import {TraitsDictionary} from '../../common/dicts/traits.dict';
import {SkillsDictionary} from '../../common/dicts/skills.dict';
import {AffinitiesDictionary} from '../../common/dicts/affinities.dict';

@Injectable()
export class ChargenStore {
	@observable step: number               = 1;
	@observable formData: IChargenFormData = {
		name:        'Test',
		gender:      EGender.Male,
		backstoryID: null,
		traitIDs:    []
	};

	backstories: Array<IBackstory>;
	traits: Dictionary<ITrait>;
	positiveTraits = TraitsDictionary;
	skills         = SkillsDictionary;
	affinities     = AffinitiesDictionary;

	@observable selectedBackstory: IBackstory = null;
	@observable selectedTraits: {
		[string: string]: boolean
	}= {};

	@observable skillModifiers: Array<{
		skill: string,
		value: number
	}> = [];

	@observable affinityModifiers: Array<{
		affinity: string,
		value: number
	}> = [];


	constructor(private chargenService: ChargenService) {

	}

	@computed
	get nextStepEnabled() {
		let enabled = true;

		switch (this.step) {
			case 1:
				enabled = !!this.formData.name;
				break;
			case 2:
				enabled = !!this.formData.backstoryID;
				break;
			case 3:
				enabled = (Object.keys(this.selectedTraits).length == 2);
		}

		return enabled;
	}

	@computed
	get isMale() {
		return this.formData.gender == EGender.Male;
	}

	@computed
	get isFemale() {
		return this.formData.gender == EGender.Female;
	}

	@computed
	get numSelectedTraits() {
		return Object.values(this.selectedTraits || []).filter(val => val === true).length;
	}

	@action
	nextStep() {
		this.step = Math.min(4, this.step + 1);

		this.updateAvailableTraits();
	}

	@action
	previousStep() {
		this.step = Math.max(0, this.step - 1);
	}

	@action
	submit() {
		this.formData.traitIDs = Object.keys(this.selectedTraits);

		this.chargenService.createCharacter(this.formData)
			.then(response => {

			});
	}

	@action
	genderMale() {
		this.formData.gender = EGender.Male;
	}

	@action
	genderFemale() {
		this.formData.gender = EGender.Female;
	}

	@action
	getBackstories() {
		this.chargenService.getBackstories()
			.then(backstories => {
				this.backstories = Object.values(backstories);
				this.traits      = _.keyBy(TraitsDictionary, 'traitID');

				this.positiveTraits = TraitsDictionary.filter(t => t.polarity == 1);
			});
	}

	@action
	selectBackstory($event: any, bs: IBackstory) {
		if (this.selectedBackstory && (this.selectedBackstory.id == bs.id)) {
			$event.preventDefault(); //Prevent unchecking checkboxes so it behaves more like a radio button
		}

		setTimeout(() => {
			Object.assign(this.formData, {
				backstoryID: bs.id
			});

			this.selectedBackstory = bs;

			this.updateModifiers();
		});
	}

	@action
	updateAvailableTraits() {
		if (!this.selectedBackstory) return;

		this.positiveTraits = TraitsDictionary.filter(t => t.polarity > -1 && t.chargen && this.selectedBackstory.traits.indexOf(t.traitID) == -1);
	}

	@action
	private addSkillModifiersFromTrait(trait) {
		if (this.traits[trait].skills) {
			this.traits[trait].skills.forEach(skill => {
				if (!this.skillModifiers[skill.skill]) this.skillModifiers[skill.skill] = 0;
				this.skillModifiers[skill.skill] += skill.value;
			});
		}
	}

	@action
	private addAffinityModifiersFromTrait(trait) {
		if (this.traits[trait].affinities) {
			this.traits[trait].affinities.forEach(affinity => {
				if (!this.skillModifiers[affinity.affinity]) this.affinityModifiers[affinity.affinity] = 0;
				this.affinityModifiers[affinity.affinity] += affinity.value;
			});
		}
	}

	@action
	updateModifiers() {
		this.skillModifiers    = [];
		this.affinityModifiers = [];

		if (this.selectedBackstory) {
			this.selectedBackstory.traits.forEach(trait => {
				this.addSkillModifiersFromTrait(trait);
				this.addAffinityModifiersFromTrait(trait);
			});
		}

		if (this.selectedTraits) {
			_.keys(this.selectedTraits).filter(trait => !!this.selectedTraits[trait]).forEach(trait => {
				this.addSkillModifiersFromTrait(trait);
				this.addAffinityModifiersFromTrait(trait);
			});

			this.selectedTraits = _.omitBy(this.selectedTraits, val => !val);
		}
	}
}