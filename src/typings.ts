import { Option, SelectValue } from "react-tailwindcss-select/dist/components/type"

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
    breeds?: Option[];
    zipcodes?: string[];
    ageMin?: string;
    ageMax?: string;
    size?: string;
    from?: string;
    sort?: string;
    states?: Option[];
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

interface SearchResults {
    results: Location[];
    total: number;
}

interface Breed {
    label: string;
    value: string;
  }
  
interface LocationFilters {
    city: string;
    states: SelectValue;
}

interface DogFilter {
    breeds: SelectValue;
    ageMin: number;
    ageMax: number;
}

interface ZipCodeData {
    city: string;
    latitude: number;
    longitude:  number;
    county: string;
    state: string;
    zip_code: string;
  }
export type { Breed, Dog, DogFilter, DogIdList, Location, LocationFilters, MatchPopupProps, MatchedData, SearchOptions, SearchResults, ZipCodeData }

