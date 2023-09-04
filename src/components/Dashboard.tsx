import { Dog } from "@/typings";
import DataTable, { TableColumn } from "react-data-table-component";



export default function CustomDataTable({dogs}: Dog | any) {
  const columns: TableColumn<Dog>[] = [
    {
        name: "Name",
        sortField: "name",
        selector: row=>row.name,
        sortable: true,
    },
    {
        name: "Breed",
        sortField: "breed",
        selector: row=>row.breed,
        sortable: true,
    },
    {
        name: "Age",
        sortField: "age",
        selector: row=>row.age,
        sortable: true,
    },
    {
        name: "Zipcode",
        sortField: "zip_code",
        selector: row=>row.zip_code,
        sortable: true,
    }
  ];

  return (
    <DataTable
        columns={columns}
        data={dogs}
        pagination = {true}
        selectableRows = {true}
        responsive={true}
        paginationPerPage={10}
        paginationRowsPerPageOptions={[10, 25, 50, 100]}
        paginationComponentOptions={{
            rowsPerPageText: 'Rows per page:',
            rangeSeparatorText: 'of',
            noRowsPerPage: false,
            selectAllRowsItem: false,
            selectAllRowsItemText: 'All',
        }}
        fixedHeader={true}
        fixedHeaderScrollHeight="600px"
        highlightOnHover={true}
        pointerOnHover={true}
        selectableRowsHighlight={true}

    />
  );
}
