export interface PubQuery {
	bph_number?: any;
	date?: any;
	isbn?: any;
	issn?: any;
	lc_number?: any;
	preceded_by?: any;
	standard_form?: any;
	superceded_by?: any;
	title?: any;
	tl2_author?: any;
	tl2_number?: any;
}

export interface PubResult {
	page?: number;
	perPage?: number;
	results?: Publication[];
	totalPages?: number;
	totalResults?: number;
}

export interface Publication {
	abbreviation?: string;
	bphNumber?: string;
	date?: string;
	fqId?: string;
	hasBhlLinks?: boolean;
	hasBhlPageLink?: boolean;
	hasBhlTitleLink?: boolean;
	id?: string;
	lcNumber?: string;
	precededBy?: string;
	recordType?: string;
	remarks?: string;
	suppressed?: boolean;
	title?: string;
	url?: string;
	version?: string;
}
