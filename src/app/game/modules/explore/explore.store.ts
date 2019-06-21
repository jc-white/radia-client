import {Injectable} from '@angular/core';
import {action, observable} from 'mobx-angular';
import {Hero} from '../heroes/models/hero.model';
import {PacketReceiveStandardTileProps} from './explore.packets';
import {Spawn} from './models/spawn.model';

@Injectable()
export class ExploreStore {
	@observable spawns: Array<Spawn>                                      = [];
	@observable currentTileProps: Partial<PacketReceiveStandardTileProps> = {};
	@observable recruits: Array<Hero>                                     = [];

	@action('[Explore-store] Update spawns')
	updateSpawns(spawns: Array<Spawn>) {
		this.spawns = spawns;
	}

	@action('[Explore-store] Set current tile props')
	updateTileProps(props: PacketReceiveStandardTileProps) {
		this.currentTileProps = props;
	}

	@action('[Explore-store] Update recruitable heroes')
	updateRecruitableHeroes(heroes: Array<Hero>) {
		this.recruits = heroes;
	}
}