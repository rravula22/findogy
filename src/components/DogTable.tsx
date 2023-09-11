import { Dog } from "@/typings";
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMemo } from "react";
import DataTable, { TableColumn, createTheme } from "react-data-table-component";

interface CustomDataTableProps {
  dogs: Dog[];
  toggleFavorite: (dog: Dog) => void;
  selectedDogs: Dog[];
  currentPage: number;
  totalRows: number;
  handlePageChange: (page: number) => void;
  handlePageRowsChange: (page: number, totalRows: number) => void;
}

export default function CustomDataTable({ dogs, toggleFavorite, selectedDogs, currentPage, totalRows, handlePageChange, handlePageRowsChange }: CustomDataTableProps) {
  const columns: TableColumn<Dog>[] = useMemo(
    () => [
    {
      name: "Name",
      sortField: "name",
      selector: (row) => row.name,
      wrap: false,
      cell: (row) => (
        <div className="flex items-center justify-center group relative">
          <img
            src={row.img}
            alt={row.name}
            className="rounded-full h-10 w-10 transition-transform transform group-hover:scale-110 opacity-100 group-hover:opacity-75"
          />
          <div className="absolute top-0 lg:left-20 md:left-0 sm:left-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity">
            <img
              src={row.img}
              alt={row.name}
              className="rounded-full h-20 w-20 transition-transform transform group-hover:scale-110"
            />
          </div>
          <p className="px-2">{row.name}</p>
        </div>
      ),
      sortable: true,
    },
    {
      name: "Breed",
      sortField: "breed",
      selector: (row) => row.breed,
      sortable: true,
    },
    {
      name: "Age",
      sortField: "age",
      selector: (row) => row.age,
      sortable: true,
    },
    {
      name: "Zipcode",
      sortField: "zip_code",
      selector: (row) => row.zip_code,
      sortable: true,
    },
    {
      name: "Favorite",
      cell: (row) => (
          <FontAwesomeIcon
            icon={faHeart}
            onClick={() => toggleFavorite(row)}
            style={{
              cursor: 'pointer',
              fontSize: '24px',
              color: selectedDogs.includes(row) ? 'red' : 'grey',
              transition: 'transform 0.2s', // Add a transition for smooth scaling
            }}
            className={`transform scale-100 group-hover:scale-110`}
          />
      ),
      sortable: false,
    }
    
  ], [selectedDogs  ]);
  createTheme('solarized', {
    text: {
      primary: '#073642',
      secondary: 'white',
      hover: 'white',
    },
    background: {
      default: 'inherit',
    },
    divider: {
      default: '#073642',
    },
    action: {
      button: 'rgba(0,0,0,.54)',
      hover: 'rgba(0,0,0,.08)',
      disabled: 'rgba(0,0,0,.12)',
    },
  }, 'light');
  
  const customStyles = {
    headRow: {
      style: {
        border: 'none',
      },
    },
    headCells: {
      style: {
        color: '!important #FFFFFF',
        fontSize: '14px',
      },
    },
    rows: {
      highlightOnHoverStyle: {
        borderBottomColor: '#FFFFFF',
        borderRadius: '25px',
        outline: '1px solid #FFFFFF',
        outlineOffset: '-1px',
      },
    },
    pagination: {
      style: {
        border: 'none',
        backgroundColor: '#ccc',
      },
    },
  };
  return (
    <DataTable
      title="Dogs"
      columns={columns}
      data={dogs}
      responsive
      pagination
      paginationServer
      paginationTotalRows={totalRows}
      paginationPerPage={15}
      paginationDefaultPage={currentPage}
      onChangeRowsPerPage={handlePageRowsChange}
      onChangePage={handlePageChange}
      fixedHeader={true}
      theme="solarized"
      fixedHeaderScrollHeight="600px"
      highlightOnHover={true}
      pointerOnHover={true}
      selectableRowsHighlight={true}
      noHeader={true}
      dense={true}
      customStyles={customStyles}
    />
  );
}
