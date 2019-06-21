import {Injectable} from '@angular/core';
import {action, observable} from 'mobx-angular';
import {ILogMessage} from '../../common/interfaces/misc.interface';

@Injectable()
export class GameLogStore {
	constructor() {

	}

	@observable messages: Array<ILogMessage> = [];

	@action('[Game-log store] Add message')
	addMessage(message: ILogMessage) {
		this.messages.push(message);
	}
}