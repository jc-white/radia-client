import {IVitality} from '../../../common/interfaces/hero/stats.interface';
import {ISkillLevelList} from '../../../common/interfaces/skills/skills.interface';

export class NPC {
	npcID: number;
	npcTypes: Array<string>;
	name: string;
	level: number;
	skills: ISkillLevelList;
	vitality: IVitality;
	battleIcon: string;
	lootGroups: Array<string>;
	isActive: boolean;
}