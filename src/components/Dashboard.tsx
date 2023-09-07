import Breeds from '@/components/Breeds';
import Header from '@/components/Header';
import MatchPopup from '@/components/MatchPopUp';
import Zipcodes from '@/components/ZipCodes';
import useBreeds from '@/components/custom_hooks/useBreeds';
import { Dog } from '@/typings';
import { fetchDogs, fetchDogsById, fetchMatchedDog } from '@/utils/fetchDogs';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { SelectValue } from 'react-tailwindcss-select/dist/components/type';
import 'react-tailwindcss-select/dist/index.css';
import CustomDataTable from './DogTable';

function DogSearchPage() {
  const {breeds} = useBreeds();
  const [selectedBreeds, setSelectedBreeds] = useState<SelectValue>([]);
  const [selectedZipCodes, setSelectedZipCodes] = useState<SelectValue>([]);
  const [selectedDogs, setSelectedDogs] = useState<Dog[]>([]);
  const [ageMin, setAgeMin] = useState('0');
  const [ageMax, setAgeMax] = useState('25');
  const [matchedDog, setMatchedDog] = useState<Dog | null>(null);
  const [dogs, setDogs] = useState<Dog | any>([]);
  const [showPopup, setShowPopup] = useState(false);

  const { data: session } = useSession();

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    fetchDogsByFilters();
  }, []);
  const handleBreedsChange = (selected: SelectValue) => {
    setSelectedBreeds(selected);
  };

  const handleZipcodeChange = (selected: SelectValue) => {
    setSelectedZipCodes(selected);
  };
  const toggleFavorite = (dog: Dog) => {
    if (selectedDogs.includes(dog)) {
      setSelectedDogs(selectedDogs.filter((favoriteDog) => favoriteDog !== dog));
    } else {
      setSelectedDogs([...selectedDogs, dog]);
    }
  };

  /**
   * Fetches a matched dog based on the selected dogs
   * @returns {Promise<void>}
   */
  const handleGenerateMatch = async (): Promise<void> => {
    const dogIds = selectedDogs.map((dog) => dog.id);
    if (dogIds.length === 0) {
      return;
    }
    const { match }= await fetchMatchedDog(dogIds);
    const matchedDog = await fetchDogsById([match]);
    setMatchedDog(matchedDog[0]);
    setShowPopup(true);
  };
  /**
   * Handles the submit of the form
   * @param event
   */
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await fetchDogsByFilters();
  };

  /**
   * Fetches dogs based on the selected filters
   * @returns {Promise<void>}
   */
  const fetchDogsByFilters = async () => {
    setSelectedBreeds([]);
    try {
      const breedList = Array.isArray(selectedBreeds)
        ? selectedBreeds.map((breed) => breed.value)
        : [];
      const zipcodesList = Array.isArray(selectedZipCodes)
        ? selectedZipCodes.map((zipcode) => zipcode.value)
        : [];

      const options = {
        breeds: breedList,
        zipCodes: zipcodesList,
        ageMin: ageMin,
        ageMax: ageMax,
      };
      const data = await fetchDogs(options);
      const dogsData = await fetchDogsById(data);
      setDogs(dogsData);
    } catch (error) {
      console.error(error);
    }
  };
  return (<div>
    <Header />
    <div className="top-0 min-h-screen py-2 overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="w-1/4 md:w-1/4 px-2 snap-y max-w-sm rounded overflow-hidden shadow-lg">
          {breeds.length > 0 ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 justify-between bg-inherit">
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
                <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                  search
                </button>
              </div>
            </form>
            ) : (
            <div className="flex flex-col items-center justify-center min-h-screen py-2">
              <h1 className="text-6xl font-bold">Loading...</h1>
            </div>
          )}
        </div>
        <div className="w-3/4 md:w-3/4 sm:h-50% lg:h-screen">
          <div className="h-3/4 md:h-auto md:pb-10 p-4">
            {dogs.length > 0 ? (
              <CustomDataTable dogs={dogs} toggleFavorite={toggleFavorite} selectedDogs={selectedDogs}/>
            ) : (
              <div className="flex flex-col items-center justify-center min-h-screen py-2">
                <h1 className="text-6xl font-bold">No Dogs found...</h1>
              </div>
            )}
          </div>
        </div>
      </div>
    H</div>
    {selectedDogs.length > 0 && (
      <div className="fixed bottom-0 left-0 right-0 p-10 bg-white border-t border-gray-300">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-auto block"
          onClick={handleGenerateMatch}
        >
          Generate Match
        </button>
      </div>
    )}

    {showPopup && (
      <MatchPopup matchedDog={matchedDog} onClose={handleClosePopup} />
    )}
  </div>);
}

export default DogSearchPage;
