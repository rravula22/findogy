import { signOut } from 'next-auth/react';
import { Dog, MatchedData, SearchOptions } from '../typings';

const fetchDogs = (options?: SearchOptions): Promise<[]> => {
    const queryString = buildQueryString(options);

    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/dogs/search/${queryString}`, {
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
        return data?.resultIds || [];
      })
      .catch((err) => {
        console.error(err);
        return [];
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
function buildQueryString(options?: SearchOptions): string {

    let queryString = '?';
    if (options) {
      const { breeds, zipCodes, ageMin, ageMax, size, from, sort } = options;
      if (breeds && breeds.length > 0) {
        queryString += `breeds=${ breeds.join(',')}&`;
      }
      if (zipCodes && zipCodes.length > 0) {
        queryString += `zipCodes=${zipCodes.join(',')}&`;
      }
      if (size) {
        queryString += `size=${size}&`;
      }
      if (from) {
        queryString += `from=${from}&`;
      }
      if (sort) {
        queryString += `sort=${sort}&`;
      }
      if (ageMin) {
        queryString += `ageMin=${ageMin}&`;
      }
      if (ageMax) {
        queryString += `ageMax=${ageMax}`;
      }
    }
    return queryString;
}

export { fetchDogs, fetchDogsById, fetchMatchedDog };
