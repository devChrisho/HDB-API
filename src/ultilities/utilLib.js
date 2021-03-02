import axios from 'axios';

const fetchLib = {
  getData: (apiObj, apiUrl, setMaxRecords, setData, setIsLoading) => {
    let grandTotal = 0;

    apiObj.forEach(async dataset => {
      try {
        const result = await axios(apiUrl + dataset.resourceID);
        const total = result.data.result.total;
        grandTotal += total;

        const recordsMax = await axios(
          apiUrl + dataset.resourceID + `&limit=${total}`
        );

        const records = recordsMax.data.result.records;
        setMaxRecords(grandTotal);
        setData(prevState => [...prevState, ...records]);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    });
  },
};

export default fetchLib;
