import * as MUI from '@material-ui/core'



export default function DataRows({data}) {
  const Rows = data.map(item => {
  return <MUI.TableRow>
      <MUI.TableCell>item.town</MUI.TableCell>
</MUI.TableRow>
})

  return (
    <Rows/>

  );
}
