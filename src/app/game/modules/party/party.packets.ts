import {IPacketSend} from '../../common/services/net/game-packet.interface';

export class PacketSendEquipItem implements IPacketSend<{ itemID: number, heroID: number, slot: string }> {
	eventType = 'equipItem';
	data      = {
		itemID: null,
		heroID: null,
		slot:   null
	};

	constructor(itemID: number, heroID: number, slot: string) {
		Object.assign(this.data, {
			itemID: itemID,
			heroID: heroID,
			slot:   slot
		});
	}
}

export class PacketSendUnequipItem implements IPacketSend<{ heroID: number, slot: string }> {
	eventType = 'unequipItem';
	data      = {
		heroID: null,
		slot:   null
	};

	constructor(heroID: number, slot: string) {
		Object.assign(this.data, {
			heroID: heroID,
			slot:   slot
		});
	}
}

export class PacketSendUseItem implements IPacketSend<{ itemID: number, heroID?: number }> {
	eventType = 'useItem';
	data      = {
		itemID: null,
		heroID: null
	};

	constructor(itemID: number, heroID?: number) {
		Object.assign(this.data, {
			itemID: itemID,
			heroID: heroID
		});
	}
}

export class PacketSendDiscardItem implements IPacketSend<{ itemID: number, amount: number }> {
	eventType = 'discardItem';
	data      = {
		itemID: null,
		amount: null
	};

	constructor(itemID: number, amount: number) {
		Object.assign(this.data, {
			itemID: itemID,
			amount: amount
		});
	}
}