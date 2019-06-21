export interface IPacketReceive<T> {
	eventHandler: string;
	eventType: string;
	data: T;
}

export interface IPacketSend<T> {
	eventType: string;
	data: T;
}