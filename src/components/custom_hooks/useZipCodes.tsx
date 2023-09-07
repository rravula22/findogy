import { useEffect, useState } from "react";
const path = "http://" + process.env.NEXT_PUBLIC_BASE_URL + '/api/zipcodes';
const myURL = new URL(path);
function useZipcode() {
    const [zipCodes, setZipCodes] = useState([]);
    useEffect(() => {
        console.log("inside zip use")
        if(localStorage.getItem("zipcodes") === null || localStorage.getItem("zipcodes") === undefined) {
            fetch(myURL.href, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then((response) => response.json())
            .then((data) => {
                localStorage.setItem("zipcodes", JSON.stringify(data));
                setZipCodes(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }
        else {
            const zipCodesData = localStorage.getItem("zipcodes");
            if (zipCodesData) {
                setZipCodes(JSON.parse(zipCodesData));
            }
        }
    }, []);
    return { zipCodes, setZipCodes };
}

export default useZipcode;