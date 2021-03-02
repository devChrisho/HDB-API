// !exp modules
import * as React from 'react';
import axios from 'axios';

import * as MUI from '@material-ui/core';

// !exp styles
import './styles/App.css';

// !exp own components
import DisplayData from './components/DisplayData';
import apiResource from './data/resource';

function App() {
  // !var states
  const [data, setData] = React.useState();
  const [query, setQuery] = React.useState(null);
  const [maxRecords, setMaxRecords] = React.useState();
  const [isLoading, setIsLoading] = React.useState(true);
  const apiUrl = `https://data.gov.sg/api/action/datastore_search?resource_id=`;

  // !exp handlers
  const inputHandler = e => {
    const inputVal = e.target.value;
    setQuery(inputVal);
  };

  const enterHandler = e => {
    if (e.which == 13) {

    }
  };

  const buttonHandler = () => {
 
  };

  // !exp fetch API



  React.useEffect(() => {

    let grandTotal = 0;
    apiResource.forEach(async dataset => {
      try {
        const result = await axios(apiUrl + dataset.resourceID);
        const total = result.data.result.total;
        grandTotal += total;
        setMaxRecords(grandTotal);
        const recordsMax = await axios(
          apiUrl + dataset.resourceID + `&limit=${total}`
        );
        const records = recordsMax.data.result.records;
        setData(d => [...d, ...records]);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
      console.log(data);
    });
  }, [apiUrl]);


  return (
    <div className='App'>
      <h1>HDB Resale API query</h1>
      <div>
        <label htmlFor='search'>Search:</label>
        <input
          type='text'
          name='search '
          onChange={inputHandler}
          autoComplete='off'
          onKeyPress={enterHandler}
        />
        <button onClick={buttonHandler}>Search</button>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <DisplayData maxRecords={maxRecords} data={data} />
      )}
    </div>
  );
}

export default App;
