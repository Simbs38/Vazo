export class CountryApi {
    iso2: string;
    iso3: string;
    country: string;
    cities: Array<string>;

    constructor (iso2: string, iso3: string, country: string, cities: Array<string>) {
        this.iso2 = iso2
        this.iso3 = iso3
        this.country = country
        this.cities = cities
    }
}

export class Country {
    code: string;
    name: string;
    cities: Array<string>;

    constructor (code: string, name: string, cities: Array<string>) {
        this.code = code
        this.name = name
        this.cities = cities
    }
}
