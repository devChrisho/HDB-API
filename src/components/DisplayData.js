import * as MUI from '@material-ui/core';

export default function DisplayData({ maxRecords, data }) {
  const propertyNames = Object.keys(data[0]);
  console.log(propertyNames);
  return (
    <>
      <div>
        <p>Total records: {maxRecords}</p>
      </div>
      <div>
        <p>Total results found: {data ? data.length : ''}</p>
        <MUI.TableContainer component={MUI.Paper}>
          <MUI.Table aria-label='hdb resale prices table'>
            <MUI.TableHead>
              <MUI.TableRow>
                <MUI.TableCell></MUI.TableCell>
              </MUI.TableRow>
            </MUI.TableHead>
          </MUI.Table>
        </MUI.TableContainer>
      </div>
    </>
  );
}
