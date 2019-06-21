import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../core/services/auth.service';
import {GameLayoutService} from './game-layout/game-layout.service';
import {ItemService} from './common/services/item/item.service';
import {SocketService} from './common/services/net/socket.service';

@Component({
	selector:    'app-game',
	templateUrl: './game.component.html',
	styleUrls:   ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy {
	public currentScreen: string;
	@ViewChild('contentArea') public contentArea: ElementRef;

	constructor(private auth: AuthService, private socketService: SocketService, private route: ActivatedRoute, public layoutService: GameLayoutService, public itemService: ItemService) {
	}

	ngOnInit() {
		this.socketService.connect();

		this.layoutService.setContentArea(this.contentArea);

		if (this.route.snapshot.children.length) {
			switch (this.route.snapshot.children[0].routeConfig.path) {
				case 'explore':
					this.currentScreen = 'explore';
					break;
			}
		}
	}

	ngOnDestroy() {
		this.socketService.disconnect();
	}
}
