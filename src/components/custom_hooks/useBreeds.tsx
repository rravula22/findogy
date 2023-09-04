import { useState } from 'react';
import { Options } from 'react-tailwindcss-select/dist/components/type';

function useBreeds() {
    const [breeds, setBreedsList] = useState<Options>([]);
    if(localStorage.getItem("breeds") === null || localStorage.getItem("breeds") === undefined) {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/dogs/breeds`, {
            method: 'GET',
            credentials: 'include',
          }).then(breedsResponse => {
            if (breedsResponse.status === 200 && breedsResponse.ok) {
              return breedsResponse.json();
            } else {
              throw new Error(`Request failed with status ${breedsResponse.status}`);
            }
          })
          .then(breedsData => {
            breedsData = breedsData.map((breed: string) =>{
              return { "label": breed, "value": breed }
            });
            localStorage.setItem("breeds", JSON.stringify(breedsData));
            setBreedsList(breedsData);
          })
          .catch(error => {
            console.error(error);
            alert("Error fetching dog breeds");
          });
    }
    else {
        const breedsData = localStorage.getItem("breeds");
        if (breedsData) {
            setBreedsList(JSON.parse(breedsData));
        }
    }
    return { breeds, setBreedsList };
}
export default useBreeds;