import Breeds from '@/components/Breeds';
import Header from '@/components/Header';
import MatchPopup from '@/components/MatchPopUp';
import Zipcodes from '@/components/ZipCodes';
import useBreeds from '@/components/custom_hooks/useBreeds';
import { Dog } from '@/typings';
import { fetchDogs, fetchDogsById, fetchMatchedDog } from '@/utils/fetchDogs';
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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    fetchDogsByFilters();
  }, [currentPage]);
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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  /**
   * Fetches dogs based on the selected filters
   * @returns {Promise<void>}
   */
  const fetchDogsByFilters = async () => {
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
        page: currentPage,
      };
      const data = await fetchDogs(options);
      setTotalPages(Math.ceil(data.length / 15));
      const dogsData = await fetchDogsById(data);
      setDogs(dogsData);
    } catch (error) {
      console.error(error);
    }
  };
  return (<>
    <Header />
    <div className="flex flex-col md:flex-row justify-center md:items-start">
      <div className="w-1/4 md:w-1/4 px-2 snap-y max-w-sm rounded shadow-lg animate-fade-in">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 justify-between bg-inherit">
          <div className="mb-5">
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
          <div className="flex flex-col mb-4">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 active:bg-blue-800 focus:outline-none">
              search
            </button>
          </div>
        </form>
        <div className="flex flex-col mb-4">
          {selectedDogs.length > 0 && (
            <button className="bg-red-300 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 active:bg-blue-800 focus:outline-none"
              onClick={handleGenerateMatch}
            >
              Find a Match
            </button>
          )}
        </div>
      </div>
      <div className="w-3/4 md:h-auto md:pb-10 p-4 animate-fade-in">
          {dogs.length > 0 ? (
            <CustomDataTable dogs={dogs} toggleFavorite={toggleFavorite} selectedDogs={selectedDogs} page={currentPage} totalPage={totalPages} handlePageChange={handlePageChange}/>
          ) : (
            <div className="flex flex-col items-center justify-center min-h-screen py-2">
              <h1 className="text-6xl font-bold">No Dogs found...</h1>
            </div>
          )}
      </div>
    </div>
    {showPopup && (
      <MatchPopup matchedDog={matchedDog} onClose={handleClosePopup} />
    )}
  </>);
}

export default DogSearchPage;