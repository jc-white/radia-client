import {Routes} from '@angular/router';
import {GameComponent} from './game.component';
import {ChargenRoutes} from './modules/chargen/chargen.routes';
import {DashboardComponent} from './modules/dashboard/dashboard.component';
import {ExploreRoutes} from './modules/explore/explore.routes';

export const GameRoutes: Routes = [
	{
		path:      'game',
		component: GameComponent,
		children:  [
			...ChargenRoutes,
			...ExploreRoutes,
			{
				path:      'dashboard',
				component: DashboardComponent
			}
		]
	}
];