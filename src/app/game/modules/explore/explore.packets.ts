import {ICoordPair} from './explore.interface';
import {Spawn} from './models/spawn.model';

export interface PacketReceiveLoadMap {
	id: string;
	tileset: string;
}

export interface PacketReceiveMoveSuccess extends Array<ICoordPair>{};

export interface PacketReceiveSpawns extends Array<Spawn>{};

export interface PacketReceiveStandardTileProps {
	locationType: string;
	locationName: string;
}