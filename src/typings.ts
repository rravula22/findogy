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
    size?: string;
    from?: string;
    sort?: string;
    [key: string]: any;
}

interface DogIdList {
    resultIds: string[];
    total: number;
    next?: string;
    prev?: string;
}

interface MatchedData {
    match: string;
}

  
interface MatchPopupProps {
    matchedDog: Dog | null;
    onClose: () => void;
}


export type { Dog, DogIdList, Location, MatchPopupProps, MatchedData, SearchOptions }

