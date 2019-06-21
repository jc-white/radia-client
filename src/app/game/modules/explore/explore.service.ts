import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {filter, take} from 'rxjs/operators';
import * as io from "socket.io-client";
import {GameConfig} from '../../../config/game.config';
import {EventRouterService} from '../../common/services/net/event-router.service';
import {IPacketReceive, IPacketSend} from '../../common/services/net/game-packet.interface';
import {SocketService} from '../../common/services/net/socket.service';
import {WorldMap} from './worldmap/worldmap';

@Injectable()
export class ExploreService {
	public socket;
	private subscriptions: Array<Subscription> = [];

	constructor(private router: Router, private eventRouter: EventRouterService, private socketService: SocketService) {

	}

	connect() {
		console.log('Connecting to explore server.');

		this.socket     = io(GameConfig.wsUrl + '/explore');

		//Handle connection success
		this.socket.on('connected', () => {
			console.log('Connected to explore server.');
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
		WorldMap.unload();

		this.socket.disconnect();

		this.subscriptions.map(sub => sub.unsubscribe());
	}

	sendPacket(packet: IPacketSend<any>) {
		this.socket.emit(packet.eventType, packet.data);
	}

	sendCommand(command: string) {
		this.socket.emit(command);
	}
}