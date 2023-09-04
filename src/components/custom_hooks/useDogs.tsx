import { Dog } from '@/typings';
import { fetchDogs, fetchDogsById } from '@/utils/fetchDogs';
import { useEffect, useState } from 'react';
import { SelectValue } from 'react-tailwindcss-select/dist/components/type';

function useFetchDogs(
  selectedBreeds: SelectValue,
  selectedZipCodes: SelectValue,
  ageMin: string,
  ageMax: string
) {
  const [dogIds, setDogIds] = useState<string[]>([]);
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const breedList = Array.isArray(selectedBreeds)
        ? selectedBreeds.map((breed) => breed.value)
        : [];
      const zipcodesList = Array.isArray(selectedZipCodes)
        ? selectedZipCodes.map((zipcode) => zipcode.value)
        : [];

      const options = {
        breeds: breedList,
        zipcodes: zipcodesList,
        ageMin: ageMin,
        ageMax: ageMax,
      };

      const data = await fetchDogs(options);
      setDogIds(data);

      const dogsData = await fetchDogsById(data);
      setDogs(dogsData);
    } catch (error) {
      console.error(error);
      setError('Error fetching dogs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data initially when the component mounts
  }, []);

  return { dogs, loading, error, fetchData };
}

export default useFetchDogs;
