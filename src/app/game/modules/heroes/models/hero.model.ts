import {EGender} from '../../../common/interfaces/hero/hero-misc.enum';
import {IBaseHeroDocument, IEquipment} from '../../../common/interfaces/hero/hero.interface';
import {IStatList} from '../../../common/interfaces/hero/stats.interface';
import {ISkillList} from '../../../common/interfaces/skills/skills.interface';

export class Hero implements IBaseHeroDocument {
	heroID: number                 = null;
	userID: number                 = null;
	name: string                   = 'Unknown';
	gender: EGender                = 1;
	level: number                  = 1;
	backstoryID: string            = null;
	traits: Array<string>          = [];
	stats: {
		str: number,
		int: number,
		dex: number,
		con: number,
		luk: number
	}                              = {
		str: 0,
		int: 0,
		dex: 0,
		con: 0,
		luk: 0
	};
	skills?: ISkillList            = {};
	vitality: {
		health: [number, number],
		stamina: [number, number],
		mana: [number, number]
	};
	calculated: {
		vitality: {
			health: [number, number],
			stamina: [number, number],
			mana: [number, number]
		},
		stats: IStatList;
		skills: {
			[skillName: string]: number;
		};
		traits: Array<string>;
	};
	equipment: Partial<IEquipment> = {};

	get vitPct(): {
		health: number,
		stamina: number,
		mana: number
	} {
		return {
			health:  this.calculated.vitality.health[0] / this.calculated.vitality.health[1] * 100,
			stamina: this.calculated.vitality.stamina[0] / this.calculated.vitality.stamina[1] * 100,
			mana:    this.calculated.vitality.mana[0] / this.calculated.vitality.mana[1] * 100
		}
	}

	constructor(hero: Hero) {
		if (!hero.heroID) hero.heroID = (new Date()).getTime();

		Object.keys(hero).forEach(prop => {
			if (hero[prop]) {
				this[prop] = hero[prop];
			}
		});

		this.calcVitPct();
	}

	calcVitPct() {
		Object.assign(this.vitPct, {
			health:  this.calculated.vitality.health[0] / this.calculated.vitality.health[1] * 100,
			stamina: this.calculated.vitality.stamina[0] / this.calculated.vitality.stamina[1] * 100,
			mana:    this.calculated.vitality.mana[0] / this.calculated.vitality.mana[1] * 100
		});
	}
}