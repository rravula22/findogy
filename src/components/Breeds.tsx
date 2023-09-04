import Select from "react-tailwindcss-select";
import { Options, SelectValue } from "react-tailwindcss-select/dist/components/type";
import "react-tailwindcss-select/dist/index.css";

type Props = {
    breeds: Options,
    selectedBreeds: SelectValue,
    handleChangeBreeds: (value: SelectValue) => void
}

export default ({breeds, selectedBreeds, handleChangeBreeds}: Props) => {
  let isSelected: boolean = false;
    return (
      <div className="shadow w-full appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
        <Select
            primaryColor="blue"
            value={selectedBreeds}
            onChange={handleChangeBreeds}
            options={breeds}
            isSearchable={true}
            isMultiple={true}
            searchInputPlaceholder="Search for breeds"
        />
      </div>
    );
  }


