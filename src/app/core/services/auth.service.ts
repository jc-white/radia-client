import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import * as _ from 'lodash';
import {action, computed, observable} from 'mobx-angular';
import {User} from '../../common/models/user/user.model';
import {IStdApiResponseSingle} from '../interfaces/std-api.interface';
import {IAuthApiResponse} from './auth.interface';

@Injectable()
export class AuthService {
	@observable user: User = null;

	constructor(private http: HttpClient) {
	}

	@action setUser(userObj) {
		this.user = _.assign({}, userObj);
	}

	@computed get loggedIn() {
		return !!this.user;
	}

	@action getSession(): Promise<any> {
		return this.http.get<IAuthApiResponse>('/auth/session')
			.toPromise()
			.then(response => {
				if (!response.success) {
					console.log('No session');
				} else {
					this.setUser(response.user);
				}
			});
	}

	@action logout(): Promise<any> {
		return this.http.get<IStdApiResponseSingle>('/auth/logout')
			.toPromise()
			.then(response => {
				if (response.success) {
					this.user = null;
				}

				return response;
			});
	}

}
