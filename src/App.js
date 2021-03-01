// !exp modules
import * as React from 'react';
import axios from 'axios';
import * as MUI from '@material-ui/core'

// !exp styles
import './styles/App.css';

// !exp own components
import DisplayData from './components/DisplayData';
import apiResource from './data/resource';

function App() {
  // !var states
  const [data, setData] = React.useState([]);
  const [query, setQuery] = React.useState(null);
  const [maxRecords, setMaxRecords] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);

  const apiUrl = `https://data.gov.sg/api/action/datastore_search?resource_id=`;
  // !exp handlers
  const inputHandler = e => {
    const inputVal = this.value;
    console.log(inputVal);
    setQuery(inputVal);
  };

  const enterHandler = e => {
    if (e.which === 13) {
      // fetchQuery();
    }
  };

  const buttonHandler = () => {
    // fetchQuery();
  };

  // !exp fetch API
<<<<<<< HEAD
  const fetchQuery = async () => {
    if (query) {
      const result = await axios(apiUrl + `&q=${query}&limit=${maxRecords}`);
      setData(result.data.result.records);
    } else {
      setData('');
    }
  };

  const fetchData = async () => {
    apiResource.forEach(ele => {
      axios(`${apiUrl + ele.resourceID} `)
    }).then(result => {
      const records = result.data.result;
      setData()
    })
  }

  const fetchTotal = async () => {
    let grandTotal=0
    apiResource.forEach(ele => {
      axios(`${apiUrl + ele.resourceID}`)
        .then(result => {
          let total = result.data.result.total;
          grandTotal += total;
          console.log(`Element period: ${ele.period} total: ${total}`)
          setMaxRecords(grandTotal);
          setIsLoading(false);
      }).catch(err=>console.log(err))
    })
    
  };
=======
>>>>>>> e751a8ac8959926d1464d3648169ccd6d8713ff7

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
        <MUI.CircularProgress />
      ) : (
        <DisplayData maxRecords={maxRecords} data={data} />
      )}
    </div>
  );
}

export default App;
