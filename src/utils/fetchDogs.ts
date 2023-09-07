import { signOut } from 'next-auth/react';
import { Dog, MatchedData, SearchOptions } from '../typings';

const fetchDogs = (options?: SearchOptions): Promise<[]> => {
  const query = buildQueryString(options);

    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/dogs/search`, {
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
  const breeds = options?.breeds || [];
  const zipCodes = options?.zipCodes || [];
  const queryParams = new URLSearchParams({
    breeds: breeds.join(","),
    zipCodes: zipCodes.join(","),

  });
  if(!options) {
    return '';
  }
  const query = Object.keys(options).map((key) => {
    return `${key}=${options[key]}`;

  });
  return query.length ? `?${query.join('&')}` : '';
}

export { fetchDogs, fetchDogsById, fetchMatchedDog };
