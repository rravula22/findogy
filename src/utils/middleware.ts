import { fetchDogs, fetchDogsById, fetchLocations } from './service';
const fetchDogsByFilters: any = async (filters?: any, type?: string) => {
    if(type === 'zipCodes'){
        const locations = await fetchLocations(filters);
        return locations;
    } else {
        const dogIds = await fetchDogs(filters || {});
        const dogs = await fetchDogsById(dogIds);
        return dogs;
    }
    
};

export { fetchDogsByFilters };
