export interface LookupResult {
	modified?: Date;
	bibliographicCitation?: string;
	genus?: string;
	taxonomicStatus?: string;
	kingdom?: string;
	phylum?: string;
	family?: string;
	nomenclaturalCode?: string;
	source?: string;
	namePublishedInYear?: number;
	taxonRemarks?: string;
	nomenclaturalStatus?: string;
	synonym?: boolean;
	plantae?: boolean;
	fungi?: boolean;
	fqId?: string;
	name?: string;
	authors?: string;
	species?: string;
	rank?: string;
	reference?: string;
	classification?: Basionym[];
	basionym?: Basionym;
	synonyms?: Basionym[];
}

export interface Basionym {
	fqId?: string;
	name?: string;
	author?: string;
	rank?: string;
	taxonomicStatus?: string;
}
