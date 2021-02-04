export interface NameQuery {
	author?: any;
	common_name?: any;
	family?: any;
	full_name?: any;
	genus?: any;
	kingdom?: any;
	species?: any;
}

export interface NameResult {
	cursor?: string;
	message?: string;
	page?: number;
	perPage?: number;
	results?: Name[];
	totalPages?: number;
	totalResults?: number;
}

export interface Name {
	accepted?: boolean;
	author?: string;
	family?: string;
	fqId?: string;
	images?: Image[];
	kingdom?: string;
	name?: string;
	rank?: string;
	snippet?: string;
	synonymOf?: SynonymOf;
	url?: string;
}

export interface Image {
	caption?: string;
	fullsize?: string;
	thumbnail?: string;
}

export interface SynonymOf {
	accepted?: boolean;
	author?: string;
	fqId?: string;
	name?: string;
	url?: string;
}
