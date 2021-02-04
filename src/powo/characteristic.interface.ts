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
	cursor?: string;
	message?: string;
	page?: number;
	perPage?: number;
	results?: Characteristic[];
	totalPages?: number;
	totalResults?: number;
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
	caption?: string;
	fullsize?: string;
	thumbnail?: string;
}
