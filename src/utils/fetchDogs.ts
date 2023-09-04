import { Dog, SearchOptions } from '../typings';


const fetchDogs = (options?: SearchOptions): Promise<[]> => {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/dogs/search${buildQueryString(options)}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
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
  

function buildQueryString(options?: SearchOptions): string {
if (!options) return '';
let params = "?";
if (options.breeds && options.breeds.length > 0) {
    params += `breeds=${options.breeds.join(',')}`;
}
if (options.zipcodes && options.zipcodes.length > 0) {
    params += `&zipCodes=${options.zipcodes.join(',')}`;
}
if (options.ageMin) {
    params += `&ageMin=${options.ageMin}`;
}
if (options.ageMax) {
    params += `&ageMax=${options.ageMax}`;
}
if (options.size) {
    params += `&size=${options.size}`;
}
if (options.from) {
    params += `&from=${options.from}`;
}
if (options.sort) {
    params += `&sort=${options.sort}`;
}

return params;
}

export { fetchDogs, fetchDogsById };
