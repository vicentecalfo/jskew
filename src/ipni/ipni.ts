import { RxHttpRequestResponse } from '@akanass/rx-http-request';
import { Observable } from 'rxjs';
import { AuthorQuery, AuthorResult } from './author.interface';
import { NameQuery, NameResult } from './name.interface';
import { PubQuery, PubResult } from './pub.interface';
import { AuthorTerms, FiltersTerms, NameTerms, PubTerms } from './terms';
import { Request } from '../request';

export class Ipni {
	private request = new Request('http://beta.ipni.org/api/1/search');
	constructor() {}

	name(qs: NameQuery, filters: string[] = []): Observable<RxHttpRequestResponse<NameResult>> {
		return this.request.get(qs, NameTerms, filters, FiltersTerms);
	}

	author(qs: AuthorQuery, filters: string[] = []): Observable<RxHttpRequestResponse<AuthorResult>> {
		return this.request.get(qs, AuthorTerms, filters, FiltersTerms);
    }
    
    pub(qs: PubQuery, filters: string[] = []): Observable<RxHttpRequestResponse<PubResult>> {
		return this.request.get(qs, PubTerms, filters, FiltersTerms);
	}
}
