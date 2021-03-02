// !exp modules
import * as React from 'react';
import * as MUI from '@material-ui/core';
import styled from 'styled-components';

// !exp custom lib
import fetchLib from './ultilities/utilLib';

// !exp own components
import DisplayData from './components/DisplayData';
import apiResource from './data/resource';

const MainContainer = styled.div`
  min-height: 100vh;
  text-align: center;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

function App() {
  // !var states
  const [data, setData] = React.useState([]);
  const [query, setQuery] = React.useState(null);
  const [maxRecords, setMaxRecords] = React.useState();
  const [isLoading, setIsLoading] = React.useState(true);

  // !var
  const apiUrl = `https://data.gov.sg/api/action/datastore_search?resource_id=`;

  // !exp handlers
  const onChangeHandler = event => {
    const value = event.target.value;
    setQuery(value);
  };

  const onKeyPressHandler = event => {
    const keyPress = event.key;
    if (keyPress === 'Enter') {
      search(query);
    }
  };

  const search = searchString => {
    console.log(`Searching for ${searchString}`);
  };

  React.useEffect(() => {
    // this custom function fetches the total records per recourceid and adds the records to data state
    fetchLib.getData(apiResource, apiUrl, setMaxRecords, setData, setIsLoading);
  }, [apiUrl]);

  return (
    <MainContainer>
      <h1>HDB Resale API query</h1>
      <div>
        <label htmlFor='search'>Search:</label>
        <input
          type='text'
          name='search '
          onChange={onChangeHandler}
          onKeyPress={onKeyPressHandler}
          autoComplete='off'
        />
        <button
          onClick={() => {
            search(query);
          }}
        >
          Search
        </button>
      </div>

      {isLoading ? (
        <MUI.CircularProgress />
      ) : (
        <DisplayData maxRecords={maxRecords} data={data} />
      )}
    </MainContainer>
  );
}

export default App;
