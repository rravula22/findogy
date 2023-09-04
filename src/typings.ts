interface Dog {
    id: string
    img: string
    name: string
    age: number
    zip_code: string
    breed: string
}

interface Location {
    zip_code: string
    latitude: number
    longitude: number
    city: string
    state: string
    county: string
}

interface SearchOptions {
    breeds?: string[];
    zipcodes?: string[];
    ageMin?: string;
    ageMax?: string;
    size?: number;
    from?: string;
    sort?: string;
}

interface DogIdList {
    resultIds: string[];
    total: number;
    next?: string;
    prev?: string;
}


export type { Dog, DogIdList, Location, SearchOptions }

