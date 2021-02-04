import { RxHttpRequestResponse } from '@akanass/rx-http-request';
import { Observable } from 'rxjs';
import { Request } from '../request';
import { CharacteristicQuery, CharacteristicResult } from './characteristic.interface';
import { GeographyQuery, GeographyResult } from './geography.interface';
import { NameQuery, NameResult } from './name.interface';
import { CharacteristicTerms, FiltersTerms, GeographyTerms, NameTerms } from './terms';

export class Powo {
	private request = new Request('http://www.plantsoftheworldonline.org/api/2/search');
	constructor() {}

	name(qs: NameQuery, filters: string[] = []): Observable<RxHttpRequestResponse<NameResult>> {
		return this.request.get(qs, NameTerms, filters, FiltersTerms);
	}

	characteristic(
		qs: CharacteristicQuery,
		filters: string[] = []
	): Observable<RxHttpRequestResponse<CharacteristicResult>> {
		return this.request.get(qs, CharacteristicTerms, filters, FiltersTerms);
	}

	geography(qs: GeographyQuery, filters: string[] = []): Observable<RxHttpRequestResponse<GeographyResult>> {
		return this.request.get(qs, GeographyTerms, filters, FiltersTerms);
	}
}
