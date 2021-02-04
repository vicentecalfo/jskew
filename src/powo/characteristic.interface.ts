export interface CharacteristicQuery {
	appearance?: any;
	characteristic?: any;
	cloning?: any;
	flower?: any;
	fruit?: any;
	inflorescence?: any;
	leaf?: any;
	seed?: any;
	summary?: any;
	use?: any;
}

export interface CharacteristicResult {
	totalResults?: number;
	page?: number;
	totalPages?: number;
	perPage?: number;
	cursor?: string;
	message?: string;
	results?: Characteristic[];
}

export interface Characteristic {
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
	thumbnail?: string;
	fullsize?: string;
	caption?: string;
}
