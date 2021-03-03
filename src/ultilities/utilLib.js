import axios from 'axios';
import { v4 } from 'uuid';

const fetchLib = {
  getData: (apiObj, apiUrl, setMaxRecords, setData, setIsLoading) => {
    let grandTotal = 0;

    apiObj.forEach(async dataset => {
      try {
        const result = await axios(apiUrl + dataset.resourceID);
        const total = result.data.result.total;
        grandTotal += total;
        setMaxRecords(grandTotal);

        const recordsMax = await axios(
          apiUrl + dataset.resourceID + `&limit=${total}`
        );
        const records = recordsMax.data.result.records;
        
        const changed = records.map(item => {
          const uuidv4 = v4()

          const obj = {
            ...item,
            id: uuidv4
          };
          delete obj._id;
          return obj;
        });

        setData(prevState => [...prevState, ...changed]);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    });
  },
};

export default fetchLib;
