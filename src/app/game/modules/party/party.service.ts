import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {filter, take} from 'rxjs/operators';
import * as io from "socket.io-client";
import {GameConfig} from '../../../config/game.config';
import {EventRouterService} from '../../common/services/net/event-router.service';
import {IPacketSend} from '../../common/services/net/game-packet.interface';
import {SocketService} from '../../common/services/net/socket.service';
import {WorldMap} from '../explore/worldmap/worldmap';
import {PacketSendDiscardItem, PacketSendEquipItem, PacketSendUnequipItem, PacketSendUseItem} from './party.packets';

@Injectable()
export class PartyService {
	public socket;
	private subscriptions: Array<Subscription> = [];

	constructor(private router: Router, private eventRouter: EventRouterService, private socketService: SocketService) {

	}

	connect() {
		console.log('Connecting to explore server.');

		this.socket = io(GameConfig.wsUrl + '/party');

		//Handle connection success
		this.socket.on('connected', () => {
			console.log('Connected to party server.');
		});

		//Handle reconnect
		this.socket.on('reconnect', () => {
			this.init();
		});

		//Send the init signal
		this.init();

		WorldMap.socket = this.socket;
	}

	init() {
		this.socketService.connected$
			.pipe(
				filter(connected => connected === true),
				take(1)
			)
			.subscribe(() => {
				this.socket.emit('init', {});
			});
	}

	disconnect() {
		this.socket.disconnect();

		this.subscriptions.map(sub => sub.unsubscribe());
	}

	sendPacket(packet: IPacketSend<any>) {
		this.socket.emit(packet.eventType, packet.data);
	}

	sendCommand(command: string) {
		this.socket.emit(command);
	}

	//Packet dispatchers
	sendEquipItemPacket(itemID: number, heroID: number, slot: string) {
		this.sendPacket(new PacketSendEquipItem(itemID, heroID, slot));
	}

	sendUnequipItemPacket(heroID: number, slot: string) {
		this.sendPacket(new PacketSendUnequipItem(heroID, slot));
	}

	useItem(itemID: number, heroID?: number) {
		this.sendPacket(new PacketSendUseItem(itemID, heroID));
	}

	discardItem(itemID: number, amount: number) {
		this.sendPacket(new PacketSendDiscardItem(itemID, amount));
	}
}