export interface AuthorQuery {
	forename?: any;
	full_name?: any;
	standard_form?: any;
	surname?: any;
}

export interface AuthorResult {
	page?: number;
	perPage?: number;
	results?: Author[];
	totalPages?: number;
	totalResults?: number;
}

export interface Author {
	alternativeAbbreviations?: string;
	alternativeNames?: string;
	dates?: string;
	examples?: string;
	forename?: string;
	fqId?: string;
	hasBhlLink?: boolean;
	id?: string;
	isoCountries?: string;
	recordType?: string;
	source?: string;
	standardForm?: string;
	summary?: string;
	suppressed?: boolean;
	surname?: string;
	taxonGroups?: string;
	url?: string;
	version?: string;
}
