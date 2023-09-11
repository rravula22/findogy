import Header from '@/components/Header';
import MatchPopup from '@/components/MatchPopUp';
import {
  Dog,
  DogFilter
} from '@/typings';
import { fetchDogsByFilters } from '@/utils/middleware';
import {
  fetchDogsById,
  fetchMatchedDog,
} from '@/utils/service';
import { useCallback, useEffect, useState } from 'react';
import DogFilters from './DogFilters';
import CustomDataTable from './DogTable';

function DogSearchPage() {
  const [selectedDogs, setSelectedDogs] = useState<Dog[]>([]);
  const [matchedDog, setMatchedDog] = useState<Dog | null>(null);
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalRows, setTotalRows] = useState<number>(0);
  const [perPage, setPerPage] = useState<number>(15);
  const [zipCodes, setZipCodes] = useState<string[]>([]);
  const [dogFilters, setDogFilters] = useState<DogFilter>({
    breeds: [],
    ageMin: 0,
    ageMax: 10,
  });
  const [nextURL, setNextURL] = useState<string | null>(null);
  const [prevURL, setPrevURL] = useState<string | null>(null);
  useEffect(() => {
    fetchAndAssignDogs();
  }, []);
  
  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const toggleFavorite = (dog: Dog) => {
    setSelectedDogs((prevSelectedDogs) => {
      if (prevSelectedDogs.includes(dog)) {
        return prevSelectedDogs.filter((favoriteDog) => favoriteDog !== dog);
      } else {
        return [...prevSelectedDogs, dog];
      }
    });
  };

  const handleGenerateMatch = async () => {
    const dogIds = selectedDogs.map((dog) => dog.id);
    if (dogIds.length === 0) {
      return;
    }
    try {
      const { match } = await fetchMatchedDog(dogIds);
      const matchedDog = await fetchDogsById([match]);
      setMatchedDog(matchedDog[0]);
      setShowPopup(true);
    } catch (error) {
      console.error('Error fetching matched dog:', error);
    }
  };

  const assignZipcodes = (dogsData: Dog[]) => {
    const zips: string[] = dogsData.map((obj: Dog) => obj.zip_code);
    const uniqueZips = [...new Set(zips)];
    setZipCodes(uniqueZips);
  };

  const fetchAndAssignDogs = async (
    options: {
      size?: number;
      zipcodes?: string[];
      url?: string | null;
    } = {}
  ) => {
    const { size, zipcodes, url } = options;
    try {
      const apiOptions = {
        breeds: dogFilters.breeds,
        ageMin: dogFilters.ageMin,
        ageMax: dogFilters.ageMax,
        zipcodes,
        size,
        url: url,
      };
      const { dogs, total, page, next, prev } = await fetchDogsByFilters(
        apiOptions,
        'breeds'
      );
      setDogs(dogs);
      setTotalRows(total);
      setCurrentPage(page);
      setNextURL(next);
      setPrevURL(prev);
      assignZipcodes(dogs);
    } catch (error) {
      console.error('Error fetching dogs:', error);
    }
  };

  const handleDogFilterChange = useCallback (async () => {
    setCurrentPage(1);
    await fetchAndAssignDogs();
  }, [dogFilters]);

  const handlePageChange = useCallback(async (page: number) => {
    if (page > currentPage) {
      await fetchAndAssignDogs({ url: nextURL });
    } else if (page < currentPage) {
      await fetchAndAssignDogs({ url: prevURL });
    }
    setCurrentPage(page);
  },[currentPage]);

  const handlePerRowsChange = async (newPerPage: number, page: number) => {
    setCurrentPage(page);
    setPerPage(newPerPage);
    await fetchAndAssignDogs({ size: newPerPage, zipcodes: zipCodes });
  };

  return (
    <>
      <Header />
      <div className="flex flex-col md:flex-row justify-center md:items-start overflow-auto">
        <div className="w-full md:w-1/4 px-2 snap-y max-w-sm md:max-w-xs rounded shadow-lg animate-fade-in">
          <DogFilters
            setDogs={setDogs}
            zipCodes={zipCodes}
            dogFilters={dogFilters}
            setDogFilters={setDogFilters}
            handleDogFilterChange={handleDogFilterChange}
            setZipCodes={setZipCodes}
          />
          <div className="flex flex-col mb-4">
            {selectedDogs.length > 0 && (
              <button
                className="bg-blue-300 hover:bg-blue-700 text-white font-bold rounded-full transition duration-300 ease-in-out transform hover:scale-105 active:bg-blue-800 focus:outline-none"
                onClick={handleGenerateMatch}
              >
                Find a Match
              </button>
            )}
          </div>
        </div>
        <div className="w-full md:w-3/4 md:h-auto md:pb-10 p-4 animate-fade-in">
          {dogs.length > 0 ? (
            <CustomDataTable
              dogs={dogs}
              toggleFavorite={toggleFavorite}
              selectedDogs={selectedDogs}
              currentPage={currentPage}
              totalRows={totalRows}
              handlePageChange={handlePageChange}
              handlePageRowsChange={handlePerRowsChange}
            />
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
    </>
  );
}

export default DogSearchPage;
