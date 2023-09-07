import { Dog } from "@/typings";
import DataTable, { TableColumn, createTheme } from "react-data-table-component";

interface CustomDataTableProps {
  dogs: Dog[];
  toggleFavorite: (dog: Dog) => void;
  selectedDogs: Dog[];
}

export default function CustomDataTable({ dogs, toggleFavorite, selectedDogs }: CustomDataTableProps) {

  const columns: TableColumn<Dog>[] = [
    {
      name: "Name",
      sortField: "name",
      selector: (row) => row.name,
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
        <div className="flex items-center justify-center">
          <input
            type="checkbox"
            checked={selectedDogs.includes(row)}
            onChange={() => toggleFavorite(row)}
            className="form-checkbox text-blue-500 rounded-lg h-6 w-6"
          />
        </div>
      ),
    },
  ];
  createTheme('solarized', {
    text: {
      primary: '#268bd2',
      secondary: '#2aa198',
    },
    background: {
      default: '#002b36',
    },
    context: {
      background: '#cb4b16',
      text: '#FFFFFF',
    },
    divider: {
      default: '#073642',
    },
    action: {
      button: 'rgba(0,0,0,.54)',
      hover: 'rgba(0,0,0,.08)',
      disabled: 'rgba(0,0,0,.12)',
    },
  }, 'dark');

  return (
    <DataTable
      title="Dogs"
      columns={columns}
      data={dogs}
      pagination={true}
      responsive={true}
      paginationPerPage={10}
      paginationRowsPerPageOptions={[10, 25, 50, 100]}
      paginationComponentOptions={{
        rowsPerPageText: "Rows per page:",
        rangeSeparatorText: "of",
        noRowsPerPage: false,
        selectAllRowsItem: false,
        selectAllRowsItemText: "All",
      }}
      fixedHeader={true}
      theme="solarized"
      fixedHeaderScrollHeight="600px"
      highlightOnHover={true}
      pointerOnHover={true}
      selectableRowsHighlight={true}
      noHeader={true} // Hide the table header for a cleaner look
        striped={true} // Add striped rows
        dense={true} // Increase row density
        customStyles={{
          rows: {
            style: {
              minHeight: "50px", // Customize row height
            },
          },
        }}
    />
  );
}
