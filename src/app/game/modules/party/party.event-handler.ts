import {Injectable} from '@angular/core';
import {filter} from 'rxjs/operators';
import {Item} from '../../common/models/item/item.class';
import {GameEventHandler} from '../../common/services/net/game-event-handler.interface';
import {IPacketReceive} from '../../common/services/net/game-packet.interface';
import {WorldMap} from '../explore/worldmap/worldmap';
import {ItemService} from '../../common/services/item/item.service';
import {Party} from './models/party.model';
import {PartyStore} from './party.store';

@Injectable()
export class PartyEventHandler extends GameEventHandler {
	constructor(private partyStore: PartyStore) {
		super();
	}

	partyUpdate(packet: IPacketReceive<Party>) {
		this.partyStore.setParty(packet.data);

		if (!WorldMap.loaded$.getValue()) {
			WorldMap.loaded$
				.pipe(filter(loaded => loaded == true))
				.subscribe(() => {
					console.log('Setting player location');

					WorldMap.player.setLocation(this.partyStore.party.posX, this.partyStore.party.posY);
				});
		}
	}

	setFatigue(packet: IPacketReceive<number>) {
		this.partyStore.setFatigue(packet.data);
	}

	item(packet: IPacketReceive<Item>) {
		this.partyStore.cacheItem(packet.data);
	}

	items(packet: IPacketReceive<Array<Item>>) {
		this.partyStore.cacheItems(packet.data);
	}
}