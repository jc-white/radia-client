import {ESpawnType} from '../../../common/interfaces/misc.enum';
import {NPC} from './npc.model';

export class Spawn {
	spawnVirtualID: string;
	spawnGroupID: number;
	spawnGroupLocMapID: number;
	spawnType: ESpawnType;
	mapID: string;
	x: number;
	y: number;
	objectID: number;

	npc?: NPC;
	object?: any; //TODO: Object spawns
}