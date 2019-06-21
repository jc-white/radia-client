import {LogMessageType} from './misc.enum';

export interface ILogMessage {
	text: string;
	type: LogMessageType;
	time: number;
}

export interface IToast {
	text: string;
	type: 'error' | 'warning' | 'info' | 'success';
}