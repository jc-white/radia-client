import {Injectable} from '@angular/core';
import {GameEventHandler} from './game-event-handler.interface';
import {IPacketReceive} from './game-packet.interface';

@Injectable()
export class EventRouterService {
	constructor() {

	}

	handlers: {
		[handlerName: string]: GameEventHandler
	} = {};

	handleIncomingEvent(packet: IPacketReceive<any>) {
		if (this.handlers[packet.eventHandler]) {
			this.handlers[packet.eventHandler].onIncomingEvent(packet);
		} else {
			console.error('No handler defined for incoming packet', packet);
		}
	}

	registerEventHandler(handlerName: string, handler: GameEventHandler) {
		if (!this.handlers[handlerName]) {
			console.log('Registered new event handler:', handlerName);
			this.handlers[handlerName] = handler;
		}
	}
}