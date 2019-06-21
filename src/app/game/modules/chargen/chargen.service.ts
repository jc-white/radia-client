import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {IChargenFormData} from './chargen.interface';

@Injectable()
export class ChargenService {
	constructor(private http: HttpClient) {

	}

	getBackstories() {
		return this.http.get('/chargen/backstory')
			.toPromise();
	}

	createCharacter(formData: IChargenFormData) {
		return this.http.post('/chargen/submit', {
			formData: formData
		})
			.toPromise();
	}
}