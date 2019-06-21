import {ISkillLevelList, ISkillList} from '../skills/skills.interface';
import {EGender} from './hero-misc.enum';
import {IStatList, IVitality} from './stats.interface';

export interface IBaseHeroDocument {
	heroID: number;
	userID: number;
	name: string;
	gender: EGender;
	backstoryID: string;
	traits: Array<string>;
	stats: IStatList;
	skills?: ISkillList;
	vitality: IVitality;
	calculated: {
		vitality: IVitality;
		stats: IStatList;
		skills: ISkillLevelList;
		traits: Array<string>;
	}
}

export interface IBackstory {
	id: string;
	name: string;
	desc: string;
	traits: Array<string>;
}

export interface IEquipment {
	head: number;
	chest: number;
	legs: number;
	feet: number;
	hands: number;
	neck: number;
	finger: number;
	primary: number;
	secondary: number;
}

export interface IAffinity {
	name: string;
}

export interface IAffinityList {
	[affinity: string]: IAffinity
}