const fetchZipCodes = ()=> {
    if(localStorage.getItem('zipcodes')) {
        return localStorage.getItem('zipcodes') || '[]';
    }
    return fetch("../public/zipcodes.csv")
    .then(response => response.text())
    .then(data => {
        const zipcodes = data.split("\n");
        localStorage.setItem('zipcodes', JSON.stringify(zipcodes));
        return zipcodes;
    })
    .catch(err => console.log(err));
}

export { fetchZipCodes };

