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
	totalResults?: number;
	page?: number;
	totalPages?: number;
	perPage?: number;
	cursor?: string;
	message?: string;
	results?: Name[];
}

export interface Name {
	accepted?: boolean;
	author?: string;
	kingdom?: string;
	family?: string;
	name?: string;
	rank?: string;
	snippet?: string;
	url?: string;
	fqId?: string;
	images?: Image[];
	synonymOf?: SynonymOf;
}

export interface Image {
	thumbnail?: string;
	fullsize?: string;
	caption?: string;
}

export interface SynonymOf {
	accepted?: boolean;
	author?: string;
	name?: string;
	url?: string;
	fqId?: string;
}
