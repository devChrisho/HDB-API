import * as MUI from '@material-ui/core';
import {DataGrid} from '@material-ui/data-grid'

export default function DisplayData({ maxRecords, data }) {
  const propertyNames = Object.keys(data[0])
  return (
    <>
      <div>
        <p>Total records: {maxRecords}</p>
      </div>
      <div>
        <p>Total results found: {data ? data.length : ''}</p>
       
        <DataGrid rows={data} columns={propertyNames}  pageSize={10 }/>
      </div>
    </>
  );
}
