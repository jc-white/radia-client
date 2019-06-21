import {Injectable} from '@angular/core';
import {HeroStore} from './hero.store';
import {EventRouterService} from '../../common/services/net/event-router.service';
import {GameEventHandler} from '../../common/services/net/game-event-handler.interface';
import {IPacketReceive} from '../../common/services/net/game-packet.interface';
import {PacketReceiveHeroUpdate} from './heroes.packet';

@Injectable()
export class HeroesEventHandler extends GameEventHandler {
	constructor(private heroStore: HeroStore) {
		super();
	}

	heroUpdate(packet: IPacketReceive<PacketReceiveHeroUpdate>) {
		this.heroStore.updateHeroes(packet.data);
	}
}