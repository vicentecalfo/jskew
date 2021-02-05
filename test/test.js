const assert = require('assert');
const chai = require('chai');
const should = chai.should();
const jskew = require('../dist/jskew');
const request = require('../dist/request');

// avoid status code 249 > too many requests (API)
const sleep = (ms = 2000) => new Promise((resolve) => setTimeout(resolve, ms));

const req = new request.Request();
describe('Automated tests for Request Class', () => {
	const qs = {
		genus: 'Poa',
		in_powo: true
	};
	const terms = {
		genus: 'genus',
		in_powo: 'in powo'
	};
	const filters = [ 'genus', 'in_powo' ];
	describe('Format Query - #formatQuery', () => {
		it('Should format object with new keys based on terms.', () => {
			const query = req.formatQuery(qs, terms);
			const termValues = 'genus_in powo';
			const qsValues = 'Poa_true';
			const newQueryKeys = Object.keys(query).join('_'); // genus_in powo
			const queryValues = Object.keys(query).map((key) => query[key]).join('_'); // Poa_true
			const checkValues = qsValues === queryValues;
			const checkNewQueryKeys = termValues === newQueryKeys;
			return checkValues.should.equal(true) && checkNewQueryKeys.should.equal(true);
		});
	});
	describe('Format filters - #formatFilters', () => {
		it('Should translate array based on terms.', () => {
			const query = req.formatFilters(filters, terms);
			const check = [ 'genus', 'in powo' ].join('_') === query.join('_');
			return check.should.equal(true);
		});
	});
	describe('Build query without filters - #formatFilters', () => {
		it('Should return object without f property.', () => {
			const query = req.buildQuery(qs, terms);
			const hasFilterKey = query.hasOwnProperty('f');
			return hasFilterKey.should.equal(false);
		});
	});
	describe('Build query with filters - #formatFilters', () => {
		it('Should return object without f property.', () => {
			const query = req.buildQuery(qs, terms, filters, terms);
			const hasFilterKey = query.hasOwnProperty('f');
			return hasFilterKey.should.equal(true);
		});
	});
	describe('Build query include required properties - #formatFilters', () => {
		it('Should return object with perPage and cursor properties.', () => {
			const query = req.buildQuery(qs, terms, filters, terms);
			const hasKeys = Object.keys(query).join('_');
			const requiredKeys = 'genus_in powo_f_perPage_cursor';
			return (hasKeys === requiredKeys).should.equal(true);
		});
	});
});

const ipni = new jskew.Ipni();
const ipniResultKeys = [ 'page', 'perPage', 'results', 'totalPages', 'totalResults', 'cursor' ];
describe('Automated tests for IPNI API', () => {
	describe('Name', () => {
		const genus = 'Poa';
		const species = 'annua';
		const in_powo = false;
		const filters = [ 'infraspecific' ];
		describe('Basic search', () =>
			it('Should return values ​​consistent with the search fields.', async () => {
				const result = await ipni.name({ genus, species, in_powo }).toPromise();
				await sleep();
				const rGenus = result.body.results[0].genus;
				const rSpecies = result.body.results[0].species;
				const sInPowo = result.body.results[0].inPowo;
				const rStatusCode = result.response.statusCode;
				return (
					rStatusCode.should.equal(200) &&
					rGenus.should.equal(genus) &&
					rSpecies.should.equal(species) &&
					sInPowo.should.equal(in_powo)
				);
			}));
		describe('Search using filters', () =>
			it('Should return values ​​consistent with the search fields.', async () => {
				const result = await ipni.name({ genus, species, in_powo }, filters).toPromise();
				await sleep();
				const rGenus = result.body.results[0].genus;
				const rSpecies = result.body.results[0].species;
				const sInPowo = result.body.results[0].inPowo;
				const rStatusCode = result.response.statusCode;
				return (
					rStatusCode.should.equal(200) &&
					rGenus.should.equal(genus) &&
					rSpecies.should.equal(species) &&
					sInPowo.should.equal(in_powo)
				);
			}));
		describe('Result structure', () =>
			it('Should return the correct result structure.', async () => {
				const result = await ipni.name({ genus, species, in_powo }).toPromise();
				await sleep();
				const keys = Object.keys(result.body).map((key) => ipniResultKeys.includes(key));
				return keys.includes(false).should.equal(false);
			}));
	});

	describe('Author', () => {
		const forename = 'Alison E. L.';
		describe('Basic search', () =>
			it('Should return values ​​consistent with the search fields.', async () => {
				const result = await ipni.author({ forename }).toPromise();
				await sleep();
				const rForename = result.body.results[0].forename;
				const rStatusCode = result.response.statusCode;
				return rStatusCode.should.equal(200) && rForename.should.equal(forename);
			}));
		describe('Result structure', () =>
			it('Should return the correct result structure.', async () => {
				const result = await ipni.author({ forename }).toPromise();
				await sleep();
				const keys = Object.keys(result.body).map((key) => ipniResultKeys.includes(key));
				return keys.includes(false).should.equal(false);
			}));
	});

	describe('Publication', () => {
		const title = 'Contributions from the United States National Herbarium. Smithsonian Institution';
		const lc_number = 'QK1.U6755';
		const bph_number = 'BPH/S  p. 288';
		describe('Basic search', () =>
			it('Should return values ​​consistent with the search fields.', async () => {
				const result = await ipni.pub({ title, lc_number, bph_number }).toPromise();
				await sleep();
				const rTitle = result.body.results[0].title;
				const rLcNumber = result.body.results[0].lcNumber;
				const rBphNumber = result.body.results[0].bphNumber;
				const rStatusCode = result.response.statusCode;
				return (
					rStatusCode.should.equal(200) &&
					rTitle.should.equal(title) &&
					rBphNumber.should.equal(bph_number) &&
					rLcNumber.should.equal(lc_number)
				);
			}));
		describe('Result structure', () =>
			it('Should return the correct result structure.', async () => {
				const result = await ipni.pub({ title, lc_number, bph_number }).toPromise();
				await sleep();
				const keys = Object.keys(result.body).map((key) => ipniResultKeys.includes(key));
				return keys.includes(false).should.equal(false);
			}));
	});
});

const powo = new jskew.Powo();
const powoResultKeys = [ 'cursor', 'message', 'page', 'perPage', 'results', 'totalPages', 'totalResults' ];
const powoLookupResultKeys = [
	'modified',
	'bibliographicCitation',
	'genus',
	'taxonomicStatus',
	'kingdom',
	'phylum',
	'family',
	'nomenclaturalCode',
	'source',
	'namePublishedInYear',
	'taxonRemarks',
	'nomenclaturalStatus',
	'synonym',
	'plantae',
	'fungi',
	'fqId',
	'name',
	'authors',
	'species',
	'rank',
	'reference',
	'classification',
	'basionym',
	'synonyms'
];

describe('Automated tests for POWO API', () => {
	const genus = 'Poa';
	const species = 'annua';
	const filters = [ 'species' ];
	const flower = 'Lodicules';
	const leaf = 'blade';
	const distribution = 'Africa';
	const fqId = 'urn:lsid:ipni.org:names:77108956-1';
	const include = [ 'distribution' ];
	describe('Name', () => {
		describe('Basic search', () =>
			it('Should return values ​​consistent with the search fields.', async () => {
				const result = await powo.name({ genus, species }).toPromise();
				await sleep();
				const rName = result.body.results[0].name.split(' ');
				const rStatusCode = result.response.statusCode;
				return (
					rStatusCode.should.equal(200) &&
					rName.includes(genus).should.equal(true) &&
					rName.includes(species).should.equal(true)
				);
			}));
		describe('Complex search (different modules)', () =>
			it('Should return values ​​consistent with the search fields.', async () => {
				const result = await powo.name({ genus, distribution }).toPromise();
				await sleep();
				const rName = result.body.results[0].name.split(' ');
				const checkDistribution = result.body.results[0].snippet.includes(distribution);
				const rStatusCode = result.response.statusCode;
				return (
					rStatusCode.should.equal(200) &&
					rName.includes(genus).should.equal(true) &&
					checkDistribution.should.equal(true)
				);
			}));
		describe('Search using filter', () =>
			it('Should return values ​​consistent with the search fields.', async () => {
				const result = await powo.name({ genus, species }, filters).toPromise();
				await sleep();
				const rName = result.body.results[0].name.split(' ');
				const rFilter = result.body.results[0].rank.toLocaleLowerCase().trim();
				const rStatusCode = result.response.statusCode;
				return (
					rStatusCode.should.equal(200) &&
					rName.includes(genus).should.equal(true) &&
					rName.includes(species).should.equal(true) &&
					rFilter.should.equal(filters[0].toLocaleLowerCase().trim())
				);
			}));
		describe('Result structure', () =>
			it('Should return the correct result structure.', async () => {
				const result = await powo.name({ genus, species }).toPromise();
				await sleep();
				const keys = Object.keys(result.body).map((key) => powoResultKeys.includes(key));
				return keys.includes(false).should.equal(false);
			}));
	});
	describe('Characteristic', () => {
		describe('Basic search', () => {
			it('Should return values ​​consistent with the search fields.', async () => {
				const result = await powo.characteristic({ flower, leaf }).toPromise();
				await sleep();
				const resultsSize = result.body.results.length > 0;
				const checkFlower = result.body.results[0].snippet.includes(flower);
				const checkLeaf = result.body.results[0].snippet.includes(leaf);
				const rStatusCode = result.response.statusCode;
				return (
					rStatusCode.should.equal(200) &&
					resultsSize.should.equal(true) &&
					checkFlower.should.equal(true) &&
					checkLeaf.should.equal(true)
				);
			});
		});
		describe('Result structure', () =>
			it('Should return the correct result structure.', async () => {
				const result = await powo.characteristic({ flower, leaf }).toPromise();
				await sleep();
				const keys = Object.keys(result.body).map((key) => powoResultKeys.includes(key));
				return keys.includes(false).should.equal(false);
			}));
	});
	describe('Geography', () => {
		describe('Basic search', () => {
			it('Should return values ​​consistent with the search fields.', async () => {
				const result = await powo.geography({ distribution }).toPromise();
				await sleep();
				const resultsSize = result.body.results.length > 0;
				const checkDistribution = result.body.results[0].snippet.includes(distribution);
				const rStatusCode = result.response.statusCode;
				return (
					rStatusCode.should.equal(200) &&
					resultsSize.should.equal(true) &&
					checkDistribution.should.equal(true)
				);
			});
		});
		describe('Result structure', () =>
			it('Should return the correct result structure.', async () => {
				const result = await powo.geography({ distribution }).toPromise();
				await sleep();
				const keys = Object.keys(result.body).map((key) => powoResultKeys.includes(key));
				return keys.includes(false).should.equal(false);
			}));
	});
	describe('Lookup', () => {
		describe('Basic search ', () =>
			it('Should return values ​​consistent with the search fields.', async () => {
				const result = await powo.lookup(fqId).toPromise();
				await sleep();
				const rFqId = result.body.fqId;
				return rFqId.should.equal(fqId);
			}));
		describe('Search using includes ', () =>
			it('Should return values ​​consistent with the search fields.', async () => {
				const result = await powo.lookup(fqId, { include: include }).toPromise();
				await sleep();
				const checkInclude = typeof result.body[include[0]] !== 'undefined';
				return checkInclude.should.equal(true);
			}));
		describe('Result structure', () =>
			it('Should return the correct result structure.', async () => {
				const result = await powo.lookup(fqId).toPromise();
				await sleep();
				const keys = Object.keys(result.body).map((key) => powoLookupResultKeys.includes(key));
				return keys.includes(false).should.equal(false);
			}));
	});
});
