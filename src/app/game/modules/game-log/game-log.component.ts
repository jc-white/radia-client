import {AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {ILogMessage} from '../../common/interfaces/misc.interface';
import {SocketService} from '../../common/services/net/socket.service';
import {GameLogStore} from './game-log.store';

@Component({
	selector:    'game-log',
	templateUrl: './game-log.component.html',
	styleUrls:   ['./game-log.component.scss']
})
export class GameLogComponent implements OnInit, OnDestroy {
	@ViewChild('scroll') private scrollContainer: ElementRef;

	private subscriptions: Array<Subscription> = [];

	constructor(public store: GameLogStore, private socketService: SocketService) {
	}

	ngOnInit() {
		this.subscriptions.push(this.socketService.messageEvents.subscribe((message: ILogMessage) => {
			this.store.addMessage(message);
		}));
	}

	ngOnDestroy() {
		this.subscriptions.forEach(sub => sub.unsubscribe());
	}
}
