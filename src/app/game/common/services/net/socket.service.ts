import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import {Subscription, Observable, BehaviorSubject} from "rxjs";
import {Router} from '@angular/router';
import {GameConfig} from '../../../../config/game.config';
import {ILogMessage, IToast} from '../../interfaces/misc.interface';
import {EventRouterService} from './event-router.service';
import {IPacketReceive} from './game-packet.interface';

@Injectable()
export class SocketService {
	public socket;
	public chatEvents: Observable<any>;
	public messageEvents: Observable<any>;
	public connected$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

	private subscriptions: Array<Subscription> = [];

	constructor(private router: Router, private eventRouter: EventRouterService) {

	}

	connect() {
		console.log('Connecting to game server.');

		this.socket     = io(GameConfig.wsUrl + '/main');

		if (!this.chatEvents) {
			this.chatEvents = new Observable(observer => {
				this.socket.on('chat', (data) => {
					observer.next(data);
				});
			});
		}

		if (!this.messageEvents) {
			this.messageEvents = new Observable(observer => {
				this.socket.on('message', (data: ILogMessage) => {
					observer.next(data);
				});
			});
		}

		this.socket.on('toast', (data: IToast) => {
			//TODO: Toasty
		});

		//Handle all incoming game events
		this.socket.on('event', (data: IPacketReceive<any>) => {
			this.eventRouter.handleIncomingEvent(data);
		});

		this.socket.on('redirect', (data) => {
			console.log('Received redirect: ', data);
			this.router.navigateByUrl(data);
		});

		//Handle connection success
		this.socket.on('connected', () => {
			//TODO: Toasty
			console.log('Connected to game server.');

			if (this.connected$.getValue() == false) {
				this.connected$.next(true);
			}
		});

		this.socket.on('disconnect', () => {
			//TODO: Toasty
			console.log('DISCONNECTED!');
			this.connected$.next(false);
		});

		//Handle reconnect
		this.socket.on('reconnect', () => {
			//TODO: Toasty
			this.socket.emit('init', {});
		});

		//Send the init signal
		this.socket.emit('init', {});
	}

	disconnect() {
		this.socket.disconnect();

		this.subscriptions.map(sub => sub.unsubscribe());
	}

	send(packet: IPacketReceive<any>) {
		this.socket.emit(packet.eventHandler, packet);
	}
}
