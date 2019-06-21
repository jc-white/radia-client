import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';

export class ApiInterceptor implements HttpInterceptor {
	constructor() {

	}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		request = request.clone({
			url:             environment.origin + request.url,
			withCredentials: true
		});

		return next.handle(request);
	}
}
