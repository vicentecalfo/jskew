# @vicentecalfo/jskew
## Javascript interface to Kew data

Package for easy access to Kew’s nomenclatural and taxonomic services.

The official package is written in python and can be [found here](https://pypi.org/project/pykew/). However, this javascript version has the same functionality.

**This is not an official package from the Kew team.**

## Installation
`npm install @vicentecalfo/jskew --save`

## Usage
### IPNI
[https://www.ipni.org](https://www.ipni.org/)

To build complex queries, use the search terms available in Ipni terms. Query term are grouped into the modules `Name`, `Author`, and `Publication`.

```javascript

import { Ipni } from '@vicentecalfo/jskew';

const ipni = new Ipni();

ipni.name(
	{
		genus:'poa',
		species: 'annua'
	}
).subscribe(
	(data) => console.log(data.body),
	(error) => console.log(error)
);
```
#### Name
**Method** 
```javascript
ipni.name(
    // Query parameters
    {
		genus:'poa',
		species: 'annua'
	}
    ).subscribe(
	(data) => console.log(data.body), //json data "data.body"
	(error) => console.log(error)
);
```
**Terms (query parameters)**
```javascript
{
    added,
    author,
    basionym,
    basionym_author,
    bibliographic_reference,
    citation_type,
    collection_number,
    collectors,
    distribution,
    family,
    full_name,
    genus,
    in_powo,
    infrafamily,
    infragenus,
    infraspecies,
    modified,
    name_status,
    published,
    published_in,
    publishing_author,
    rank,
    scientific_name,
    species,
    species_author,
    version
}
```
#### Author
**Method** 
```javascript
ipni.author(
    // Query parameters
    {
		forename: 'Alison E. L.'
	}
    ).subscribe(
	(data) => console.log(data.body), //json data "data.body"
	(error) => console.log(error)
);
```
**Terms (query parameters)**
```javascript
{
    forename,
    full_name,
    standard_form,
    surname
}
```

#### Publication
**Method** 
```javascript
ipni.pub(
    // Query parameters
    {
        title:'Contributions from the United States National Herbarium. Smithsonian Institution',
        lc_number:'QK1.U6755',
        bph_number:'BPH/S  p. 288'
    }
    ).subscribe(
	(data) => console.log(data.body), //json data "data.body"
	(error) => console.log(error)
);
```
**Terms (query parameters)**
```javascript
{
    standard_form,
    bph_number,
    date,
    isbn,
    issn,
    lc_number,
    preceded_by,
    superceded_by,
    title,
    tl2_author,
    tl2_number
}
```

#### Filtering
You can filter a given result set by taxonomic rank.

```javascript
ipni.name(
    // Query parameters
    {
		genus:'poa'
    },
    ['infraspecific']
    ).subscribe(
	(data) => console.log(data.body), //json data "data.body"
	(error) => console.log(error)
);
```
**Avaiable filters**

* familial
* infrafamilial
* generic
* infrageneric
* specific
* infraspecific

### Using results
```javascript
{
    page: number;
	perPage: number;
	results: array; // The search results are here.
	totalPages: number;
	totalResults: number;
}
```

```javascript
ipni.name({genus:'poa'}).subscribe(
	(data) => {
        const results = data.body.results;
        // Do something with the result.
    },
	(error) => console.log(error)
);

// You can also use promises.
ipni
	.name({ genus: 'Poa'})
	.toPromise()
	.then((data) => {
		const results = data.body.results;
		console.log(results);
	})
	.catch((error) => console.log(error));
```

### POWO
[http://www.plantsoftheworldonline.org](http://www.plantsoftheworldonline.org)

Class for searching POWO data and looking up individual records. Taxonomic data is returned by default, but other associated such as distributions and descriptive text can also be retrieved.

To build complex queries, use the search terms available in powo terms. Query term are grouped into the modules `Name`, `Characteristic`, and `Geography`.

```javascript
import { Powo } from '@vicentecalfo/jskew';
const powo = new Powo();

powo.name({
	genus:'Poa',
	species: 'annua'
})
.subscribe(
	(data) => console.log(data.body),
	(error) => console.log(error)
);
```

#### Name
```javascript
powo.name(
     // Query parameters
    {
        genus,
        species
    }
).subscribe(
	(data) => console.log(data.body),
	(error) => console.log(error)
);
```
**Terms (query parameters)**
```javascript
{
    full_name,
    common_name,
    kingdom,
    family,
    genus,
    species,
    author
}
```
#### Characteristic
```javascript
powo.characteristic(
    // Query parameters
    {
	    flower,
	    leaf
    }
)
.subscribe(
	(data) => console.log(data.body),
	(error) => console.log(error)
);
```
**Terms (query parameters)**
```javascript
{
    summary,
    appearance,
    characteristic,
    flower,
    fruit,
    leaf,
    inflorescence,
    seed,
    cloning,
    use
}
```

#### Geography
```javascript
powo.geography(
    // Query parameters
	{
		distribution
	}
)
.subscribe(
	(data) => console.log(data.body),
	(error) => console.log(error)
);
```
**Terms (query parameters)**
```javascript
{
    distribution
}
```

#### Filtering
You can filter a given result set by taxonomic rank.

```javascript
powo.name(
    // Query parameters
    {
	    genus:'Poa'
    },
    ['accepted','species']
).subscribe(
	(data) => console.log(data.body), //json data "data.body"
	(error) => console.log(error)
);
```
**Avaiable filters**

* accepted
* has_images
* families
* genera
* species
* infraspecies

### API error handling
You can access the status code.
**Sample**
```javascript
// Inpi or Powo classes
ipni
	.name({ genus: 'Poa', species: 'annua' })
	.toPromise()
	.then((data) => {
        const statusCode = data.response.statusCode; 
        // example: 249 > too many requests, now you can retry after X seconds
        // Do something with the status code result.
	})
	.catch((error) => console.log(error));
```