export interface GeographyQuery {
	distribution?: any;
}

export interface GeographyResult {
	cursor?: string;
	message?: string;
	page?: number;
	perPage?: number;
	results?: Geography[];
	totalPages?: number;
	totalResults?: number;
}

export interface Geography {
	accepted?: boolean;
	author?: string;
	family?: string;
	fqId?: string;
	images?: Image[];
	kingdom?: string;
	name?: string;
	rank?: string;
	snippet?: string;
	url?: string;
}

export interface Image {
	caption?: string;
	fullsize?: string;
	thumbnail?: string;
}
