import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {ISigninResponse} from '../../core/interfaces/session.interface';
import {AuthService} from '../../core/services/auth.service';

@Component({
	selector:    'signin',
	templateUrl: './signin.component.html',
	styleUrls:   ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
	registering = false;
	email: string;
	password: string;
	passwordConfirm: string;
	remember: boolean = false;

	constructor(private http: HttpClient, public auth: AuthService) {
	}

	ngOnInit() {
	}

	doLogin() {
		this.http.post<ISigninResponse>('/auth/login', {
			email:    this.email,
			password: this.password
		})
			.subscribe(response => {
				if (response.success) {
					this.auth.setUser(response.user);
				}
			});

	}

	doLogout() {
		this.auth.logout()
			.then(response => {
				if (response.success) {
					//TODO: Toasty
				}
			});
	}

	doRegister() {
		this.http.post('/auth/register', {
			email:    this.email,
			password: this.password
		})
			.subscribe(response => {
				console.log('Got register response: ', response);
			});
	}

	toggleRegister() {
		this.registering = !this.registering;
	}
}
