import Breeds from '@/components/Breeds';
import CustomDataTable from '@/components/Dashboard';
import Header from '@/components/Header';
import Zipcodes from '@/components/ZipCodes';
import useBreeds from '@/components/custom_hooks/useBreeds';
import useFetchDogs from '@/components/custom_hooks/useDogs';
import { useEffect, useState } from 'react';
import { SelectValue } from 'react-tailwindcss-select/dist/components/type';
import 'react-tailwindcss-select/dist/index.css';
interface Props {}

function DogSearchPage({}: Props) {
  const {breeds, setBreedsList} = useBreeds();
  const [selectedBreeds, setSelectedBreeds] = useState<SelectValue>([]);
  const [selectedZipCodes, setSelectedZipCodes] = useState<SelectValue>([]);
  const [dogName, setDogName] = useState('');
  const [ageMin, setAgeMin] = useState('0');
  const [ageMax, setAgeMax] = useState('25');
  const { dogs, loading, error, fetchData } = useFetchDogs(selectedBreeds, selectedZipCodes, ageMax, ageMin);

  useEffect(() => {
    fetchData();
  }, [selectedBreeds, selectedZipCodes, ageMin, ageMax]);
  

  const handleBreedsChange = (selected: SelectValue) => {
    setSelectedBreeds(selected);
  };

  const handleDogNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDogName(event.target.value);
  };
  const handleZipcodeChange = (selected: SelectValue) => {
    setSelectedZipCodes(selected);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
  <div>
    <Header />
    <div className="min-h-screen py-2">
      <div className="flex flex-col md:flex-row">
        <div className="w-1/4 md:w-1/4 snap-x">
            {breeds.length > 0 ? (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3 justify-between">
                <div className="mb-5 ">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="breeds">
                    Breeds
                  </label>
                  <Breeds breeds={breeds} selectedBreeds={selectedBreeds} handleChangeBreeds={handleBreedsChange} />
                </div>
                <div className="mb-5">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="zipcodes">
                    Zipcodes
                  </label>
                  <Zipcodes selectedZipCodes={selectedZipCodes} handleZipcodeChange={handleZipcodeChange} />
                </div>
                <div className="mb-5">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ageMin">
                    Minimum Age
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="number"
                    id="ageMin"
                    placeholder="Age Min"
                    value={ageMin}
                    onChange={(e) => setAgeMin(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-5">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ageMax">
                    Maximum Age
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="number"
                    id="ageMax"
                    placeholder="Age Max"
                    value={ageMax}
                    onChange={(e) => setAgeMax(e.target.value)}
                    required
                  />
                </div>
                <div className="flex mb-4">
                  <button
                    type="submit"
                    className="mt-4 bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Search
                  </button>
                </div>
              </form>
              ) : (
              <div className="flex flex-col items-center justify-center min-h-screen py-2">
                <h1 className="text-6xl font-bold">Loading...</h1>
              </div>
            )}
        </div>
        <div className="w-3/4 md:w-3/4">
          {dogs.length > 0 ? (
            <CustomDataTable dogs={dogs} />
          ) : (
            <div className="flex flex-col items-center justify-center min-h-screen py-2">
              <h1 className="text-6xl font-bold">Loading...</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>);
}

export default DogSearchPage;
