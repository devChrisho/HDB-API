import * as MUI from '@material-ui/core';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';

const currencyFormatter = new Intl.NumberFormat('en-SG', {
  style: 'currency',
  currency: 'SGD',
});

const columns = [
  // { field: 'id', headerName: 'id', width: 70 },
  { field: 'town', headerName: 'Town', width: 140 },
  {
    field: 'model',
    headerName: 'Flat Type',
    width: 240,
    valueGetter: params => `${params.row.flat_type} ${params.row.flat_model}`,
  },
  {
    field: 'floor_area_sqm',
    headerName: 'Area',
    renderHeader: () => (
      <span>
        {'Area(m'}
        <sup>2</sup>
        {')'}
      </span>
    ),
    width: 110,
  },
  { field: 'street_name', headerName: 'Street', width: 220 },
  {
    field: 'resale_price',
    headerName: 'Price',
    width: 150,
    valueFormatter: ({ value }) => currencyFormatter.format(Number(value)),
  },
  // { field:  , headerName:   , width:    },
  // { field:  , headerName:   , width:    },
  // { field:  , headerName:   , width:    },
  // { field:  , headerName:   , width:    },
  // { field:  , headerName:   , width:    },
  // { field:  , headerName:   , width:    },
  // {field:  , headerName:   , width:    },
];

export default function DisplayData({ maxRecords, data, isLoading }) {
  const propertyNames = Object.keys(data[0]);
  console.log(propertyNames);
  return (
    <>
      <div>
        <p>Total records: {maxRecords}</p>
      </div>
      <div>
        <p>Total results found: {data ? data.length : ''}</p>
        <div style={{ display: 'flex', height: '100%', width: '80vw' }}>
          <DataGrid
            rows={data}
            columns={columns}
            pageSize={10}
            autoHeight={true}
            loading={isLoading}
            components={{Toolbar: GridToolbar}}
          />
        </div>
      </div>
    </>
  );
}
