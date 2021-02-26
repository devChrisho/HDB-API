export default function DisplayData({ maxRecords, data }) {
  return (
    <>
      <div>
        <p>Total records: {maxRecords}</p>
      </div>
      <div>
        <p>Total results found: {data? data.length: ""}</p>
      </div>
    </>
  );
}
