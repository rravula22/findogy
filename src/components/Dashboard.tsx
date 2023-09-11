import Header from '@/components/Header';
import MatchPopup from '@/components/MatchPopUp';
import { Dog, ZipCodeData } from '@/typings';
import { fetchDogsById, fetchMatchedDog } from '@/utils/service';
import { useState } from 'react';
import 'react-tailwindcss-select/dist/index.css';
import DogFilters from './DogFilters';
import CustomDataTable from './DogTable';

function DogSearchPage() {
  const [selectedDogs, setSelectedDogs] = useState<Dog[]>([]);
  const [matchedDog, setMatchedDog] = useState<Dog | null>(null);
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRows, setTotalRows] = useState(15);
  const [zipCodeData, setZipCodeData] = useState<ZipCodeData[]>([]);
  const [zipCodes, setZipCodes] = useState<string[]>([]);
  
  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const toggleFavorite = (dog: Dog) => {
    if (selectedDogs.includes(dog)) {
      setSelectedDogs(selectedDogs.filter((favoriteDog) => favoriteDog !== dog));
    } else {
      setSelectedDogs([...selectedDogs, dog]);
    }
  };

  const handleGenerateMatch = async () => {
    const dogIds = selectedDogs.map((dog) => dog.id);
    if (dogIds.length === 0) {
      return;
    }
    const { match } = await fetchMatchedDog(dogIds);
    const matchedDog = await fetchDogsById([match]);
    setMatchedDog(matchedDog[0]);
    setShowPopup(true);
  };


  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageRowsChange = (page: number, totalRows: number) => {
    setCurrentPage(page);
    setTotalRows(totalRows);
  };

  return (
    <>
      <Header />
      <div className="flex flex-col md:flex-row justify-center md:items-start overflow-auto">
        <div className="w-full md:w-1/4 px-2 snap-y max-w-sm md:max-w-xs rounded shadow-lg animate-fade-in">
          <DogFilters
            setDogs={setDogs}
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
              page={currentPage}
              totalPage={totalPages}
              handlePageChange={handlePageChange}
              handlePageRowsChange={handlePageRowsChange}
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
