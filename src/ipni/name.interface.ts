export interface NameQuery {
	added?: any;
	author?: any;
	basionym_author?: any;
	basionym?: any;
	bibliographic_reference?: any;
	citation_type?: any;
	collection_number?: any;
	collectors?: any;
	distribution?: any;
	family?: any;
	full_name?: any;
	genus?: any;
	in_powo?: any;
	infrafamily?: any;
	infragenus?: any;
	infraspecies?: any;
	modified?: any;
	name_status?: any;
	published_in?: any;
	published?: any;
	publishing_author?: any;
	rank?: any;
	scientific_name?: any;
	species_author?: any;
	species?: any;
	version?: any;
}

export interface NameResult {
	page?: number;
	perPage?: number;
	results?: Name[];
	totalPages?: number;
	totalResults?: number;
	cursor?: any;
}

export interface Name {
	authors?: string;
	authorTeam?: AuthorTeam[];
	basionymAuthorStr?: string;
	basionymStr?: string;
	bhlLink?: string;
	citationType?: string;
	collectionDate1?: string;
	collectorTeam?: string;
	distribution?: string;
	family?: string;
	fqId?: string;
	genus?: string;
	hasLinks?: boolean;
	hasNomenclaturalNotes?: boolean;
	hasOriginalData?: boolean;
	hasTypeData?: boolean;
	hybrid?: boolean;
	hybridGenus?: boolean;
	id?: string;
	infraspecies?: string;
	inPowo?: boolean;
	linkedPublication?: LinkedPublication;
	locality?: string;
	name?: string;
	originalBasionym?: string;
	originalBasionymAuthorTeam?: string;
	pageAsText?: string;
	publication?: string;
	publicationId?: string;
	publicationYear?: number;
	publicationYearNote?: string;
	publishingAuthor?: string;
	rank?: string;
	recordType?: string;
	reference?: string;
	referenceCollation?: string;
	remarks?: string;
	species?: string;
	speciesAuthor?: string;
	suppressed?: boolean;
	topCopy?: boolean;
	typeLocations?: string;
	url?: string;
	version?: string;
}

export interface AuthorTeam {
	id?: string;
	name?: string;
	order?: number;
	summary?: null;
	type?: string;
	url?: string;
}

export interface LinkedPublication {
	abbreviation?: string;
	bhlPageLink?: string;
	bhlTitleLink?: string;
	bphNumber?: string;
	date?: string;
	fqId?: string;
	hasBhlLinks?: boolean;
	hasBhlPageLink?: boolean;
	hasBhlTitleLink?: boolean;
	id?: string;
	isbn?: string;
	issn?: string;
	lcNumber?: string;
	precededBy?: string;
	recordType?: string;
	remarks?: string;
	supercededBy?: string;
	suppressed?: boolean;
	title?: string;
	tl2Author?: string;
	tl2Number?: string;
	url?: string;
	version?: string;
}
