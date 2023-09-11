import { signOut } from 'next-auth/react';
import { Dog, DogIdList, MatchedData, SearchOptions, SearchResults } from '../typings';


const fetchDogs = (options?: SearchOptions): Promise<DogIdList> => {

    const optionsObj: any = { ...options, breeds: options?.breeds?.map((breed) => breed?.value)};
    const queryString = buildQueryString(optionsObj);


    return fetch(`${optionsObj.url ? process.env.NEXT_PUBLIC_API_URL + optionsObj.url : process.env.NEXT_PUBLIC_API_URL + "/dogs/search/" + queryString }`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      if (!response.ok && response.status !== 404 ) {
        signOut({ callbackUrl: '/'});
        throw new Error('Not Authorized');
      }
      return response.json();
    })
    .then((data: any) => {
      return data;
    })
    .catch((err) => {
      console.error(err);
      return { dogs: [], total: 0 };
    });
  };
  
const fetchDogsById = (ids: string[]): Promise<Dog[]> => {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/dogs`, {
        method: 'POST',
        credentials: 'include',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(ids),
    })
    .then((response) => {
    if (!response.ok) {
      signOut({ callbackUrl: '/'});
      throw new Error('Network response was not ok');
    }
    return response.json();
    })
    .then((data) => {
    return data || []; // Return an empty array if data is falsy
    })
    .catch((err) => {
    console.error(err);
    return [];
    });
};
  
const fetchMatchedDog = (ids: string[]): Promise<MatchedData> => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/dogs/match`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    body: JSON.stringify(ids)
  })
  .then((matchResponse) => {
    if (matchResponse.status === 200 && matchResponse.ok) {
      return matchResponse.json();
      
    } else {
      throw new Error(`Request failed with status ${matchResponse.status}`);
    }
  })
  .then((matchData) => {
      return matchData;
  })
  .catch((error) => {
      console.error(error);
      return { match: "" };
  });
};

const fetchLocations = (options?: SearchOptions): Promise<SearchResults> => {
    const optionsArray: any = { ...options, states: options?.states?.map((state) => state?.value)};
    
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/locations/search`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',

        },
        body: JSON.stringify(optionsArray),
    })
    .then((locationResponse) => {
        if (locationResponse.status === 200 && locationResponse.ok) {
            return locationResponse.json();
        } else {
            throw new Error(`Request failed with status ${locationResponse.status}`);
        }
    })
    .then((locationData) => {
        return locationData;
    })
    .catch((error) => {
        console.error(error);
        return { results: [], total: 0 };
    });
};

const fetchLocationByZipcodes = (zipcodes: string[])=> {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/locations`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(zipcodes),
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      return data || [];
    })
    .catch((err) => {
      console.error(err);
      return [];
    });
};
   

function buildQueryString(options?: SearchOptions): string {

    let queryString = '?';
    
    Object.keys(options || {}).forEach((key) => {
        if (options && options[key]) {
          if(Array.isArray(options[key])) {
            const optionsArray = options[key] as string[];
            optionsArray.forEach((option) => {
              queryString += `${key}=${option}&`;
            });
          } else {
            queryString += `${key}=${options[key]}&`;
          }
        }
    });
    return queryString;
}

function signOutUser(): Promise<boolean> {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return true;
  });
}

export { fetchDogs, fetchDogsById, fetchLocationByZipcodes, fetchLocations, fetchMatchedDog, signOutUser };

