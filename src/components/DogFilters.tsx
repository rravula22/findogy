import { DogFilters, LocationFilters } from '@/typings';
import { fetchDogsByFilters } from '@/utils/middleware';
import { fetchLocationByZipcodes } from '@/utils/service';
import stateList from '@/utils/states';
import React, { useEffect, useState } from 'react';
import Select from 'react-tailwindcss-select';
import Breeds from './Breeds';
import GeoMap from './GeoMap';
import useBreeds from './custom_hooks/useBreeds';

type Props = {
  setDogs: (dogs: any) => void;
}
function Filters({setDogs }: Props) {
  const [dogFilters, setDogFilters] = useState<DogFilters>({
    breeds: [],
    ageMin: 0,
    ageMax: 10,
  });
  const [locationFilters, setLocationFilters] = useState<LocationFilters>({
    city: '',
    states: [],
  });
  const [zipCodes, setZipCodes] = useState<string[]>([]);
  const [zipCodeData, setZipCodeData] = useState<any[]>([]);
  
  let states = stateList();
  const breedList = useBreeds();
  useEffect(() => {
    fetchLocationByZipcodes(zipCodes)
    .then((res: any) => {
      setZipCodeData(res);
    })

  }, [zipCodes]);
  const assignZipcodes = async (res:any) => {
    const zips: string[] = res.map((obj: any) => obj.zip_code);
    const uniqueZips = [...new Set(zips)];
    setZipCodes(uniqueZips);
  }
  const handleDogFilterChange = () => {
    fetchDogsByFilters(dogFilters, "breeds")
      .then((res: any) => {
        if(res && res.length > 0) setDogs(res);
        assignZipcodes(res);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  const handleLocationFilterChange = async () => {
    const res = await fetchDogsByFilters(locationFilters, "zipCodes");
    if(res.results && res.results.length > 0) {
      await assignZipcodes(res.results);
      const dogs = await fetchDogsByFilters({...dogFilters, zipcodes: zipCodes}, "breeds");
      setDogs(dogs);
    }
  };

  return (
    <div className="p-4 rounded-lg">
      <div className="space-y-2">
        <label className="block">Select Breeds:</label>
        <Breeds breeds={breedList} selectedBreeds={dogFilters.breeds} handleChangeBreeds={(e)=>{
          setDogFilters({ ...dogFilters, breeds: e})
        }} />
        <label className="block">Select Age:</label>
        <div className="flex space-x-2">
          <input
            type="number"
            placeholder="Min Age"
            className="w-1/2 h-10 px-2 text-black border rounded focus:outline-none focus:ring focus:border-blue-500"
            value={dogFilters.ageMin}
            onChange={(e) => setDogFilters({ ...dogFilters, ageMin: Number(e.target.value) })}
          />
          <input
            type="number"
            placeholder="Max Age"
            className="w-1/2 h-10 px-2 text-black border rounded focus:outline-none focus:ring focus:border-blue-500"
            value={dogFilters.ageMax}
            onChange={(e) => setDogFilters({ ...dogFilters, ageMax:Number(e.target.value) })}
          />
        </div>

        <button className="w-full h-10 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={handleDogFilterChange}>
          Apply Dog Filters
        </button>
      </div>
      <div className="">
        <label className="block">Select Location:</label>
        <input
          type="text"
          placeholder="Select City"
          className="w-full h-10 px-2 text-black border rounded focus:outline-none focus:ring focus:border-blue-500"
          value={locationFilters.city}
          onChange={(e) => setLocationFilters({ ...locationFilters, city: e.target.value })}
        />
        <label className="block">Select State:</label>
        <Select
            primaryColor="blue"
            value={locationFilters.states}
            onChange={(e)=>{ setLocationFilters({ ...locationFilters, states: e})}}
            options={states}
            isSearchable={true}
            isMultiple={true}
            searchInputPlaceholder="Search States"
            placeholder='Select States'
            isClearable={true}
        />
        <button className="w-full p-y-4 h-10 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={handleLocationFilterChange}>
          Apply Location Filters
        </button>
        <GeoMap zipCodeData={zipCodeData}/>
      </div>
    </div>
  );
}

export default React.memo(Filters);
