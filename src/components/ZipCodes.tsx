import useZipCodes from '@/components/custom_hooks/useZipCodes';
import { ChangeEvent, useEffect, useState } from 'react';
import Select from "react-tailwindcss-select";
import { SelectValue } from "react-tailwindcss-select/dist/components/type";
import "react-tailwindcss-select/dist/index.css";

type Props = {
  selectedZipCodes: SelectValue;
  handleZipcodeChange: (value: SelectValue) => void;
};

const Zipcodes = ({ selectedZipCodes, handleZipcodeChange }: Props) => {
  const { zipCodes, setZipCodes } = useZipCodes();
  const [filteredList, setFilteredList] = useState([]);
  useEffect(() => {
  }, []);
  const handleZipcodes = (event: ChangeEvent) => {
    const key = (event.target as HTMLInputElement).value;
    const regex = new RegExp(key, 'i');
    setFilteredList(()=>{
      return zipCodes.filter((item: { label: string; }) => item.label.startsWith(key));
    });
  };
 
  return (
    <div className="shadow w-full appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
        <Select
            primaryColor="blue"
            value={selectedZipCodes}
            onChange={handleZipcodeChange}
            options={filteredList}
            isSearchable={true}
            isMultiple={true}
            onSearchInputChange={handleZipcodes}
            searchInputPlaceholder="Search for zipcodes"
        />
    </div>
  );
};

export default Zipcodes;
