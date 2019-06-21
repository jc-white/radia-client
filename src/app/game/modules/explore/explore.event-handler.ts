import {Injectable, NgZone} from '@angular/core';
import {GameEventHandler} from '../../common/services/net/game-event-handler.interface';
import {IPacketReceive} from '../../common/services/net/game-packet.interface';
import {Hero} from '../heroes/models/hero.model';
import {
	PacketReceiveLoadMap,
	PacketReceiveMoveSuccess,
	PacketReceiveSpawns,
	PacketReceiveStandardTileProps
} from './explore.packets';
import {ExploreStore} from './explore.store';
import {WorldMap} from './worldmap/worldmap';

@Injectable()
export class ExploreEventHandler extends GameEventHandler {
	constructor(private zone: NgZone, private store: ExploreStore) {
		super();
	}

	loadMap(packet: IPacketReceive<PacketReceiveLoadMap>) {
		this.zone.runOutsideAngular(function () {
			WorldMap.setMap(packet.data);

			if (!WorldMap.game) {
				WorldMap.load();
			}
		});
	}

	moveSuccess(packet: IPacketReceive<PacketReceiveMoveSuccess>) {
		this.zone.runOutsideAngular(function () {
			WorldMap.player.move(packet.data);
		});
	}

	receiveSpawns(packet: IPacketReceive<PacketReceiveSpawns>) {
		this.store.updateSpawns(packet.data);
	}

	receiveTileProps(packet: IPacketReceive<PacketReceiveStandardTileProps>) {
		this.store.updateTileProps(packet.data);
	}

	receiveRecruitableHeroes(packet: IPacketReceive<Array<Hero>>) {
		this.store.updateRecruitableHeroes(packet.data);
	}
}