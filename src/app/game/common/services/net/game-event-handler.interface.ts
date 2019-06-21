import {IPacketReceive} from './game-packet.interface';

export class GameEventHandler {
	constructor() {

	}

	onIncomingEvent(packet: IPacketReceive<any>) {
		this.handleEvent(packet);
	}

	handleEvent(packet: IPacketReceive<any>) {
		if (this[packet.eventType]) {
			(this[packet.eventType] as Function).call(this, packet);
		} else {
			console.log('Invalid event type', packet.eventType);
		}
	}
}