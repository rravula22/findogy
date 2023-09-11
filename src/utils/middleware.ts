import { DogIdList } from '@/typings';
import { fetchDogs, fetchDogsById, fetchLocations } from './service';
const fetchDogsByFilters: any = async (filters?: any, type?: string) => {
    if(type === 'zipCodes'){
        const locations = await fetchLocations(filters);
        return locations;
    } else {
        const result: DogIdList = await fetchDogs(filters || {});
        if(result?.total === 0) {
            return {dogs: [], total: 0};
        }
        const dogs = await fetchDogsById(result?.resultIds);
        return {dogs: dogs, total: result?.total, next: result?.next, prev: result?.prev} ;
    }
};

export { fetchDogsByFilters };
