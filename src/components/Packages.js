import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

/**
 * 
 * Modifies TableContainer 
 */
const TableWithStyles = withStyles({
  root: {
    marginTop: 50,
  }
})(TableContainer);

export default class Packages extends React.Component {

  async fetchPackages() {
    const URL = 'https://api.ziyuno.com/api/package/packages/en?Connection=keep-alive';
    const myHeaders = new Headers();
    myHeaders.append("X-Requested-With", "XMLHttpRequest");

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(URL, requestOptions)
      .then(res => res.json())
      .then(
        (result) => {
          this._isMounted && this.setState({
            isLoaded: true,
            rows: result.result,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  /**
   *  
   */
  onDeleteRow(id) {

    const index = this.state.rows.map(row => row.id).indexOf(id);

    if (index !== -1) {
      this.setState(prevState => {

        let newRows = prevState.rows.slice();
        newRows.splice(index, 1);

        return {
          isLoaded: true,
          rows: newRows
        };
      })
    }

  }

  /**
   *  
   */
  componentDidMount() {
    this._isMounted = true;
    this.fetchPackages();
  }

  /**
   * 
   */
  constructor(props) {
    super(props);
    this._isMounted = false;

    this.state = {
      error: null,
      isLoaded: false,
      rows: []
    };

  }

  /**
   *  
   */
  render() {

    const { rows } = this.state;

    return (
      <Container maxWidth="md">

        <TableWithStyles component={Paper}>
          <Table aria-label="caption table" className="table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Price</TableCell>
                <TableCell align="left">Operation</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell align="left" component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="left">{row.price}</TableCell>
                  <TableCell align="left">
                    <Button color="primary" variant="outlined" onClick={() => this.onDeleteRow(row.id)} >Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableWithStyles>
      </Container>
    );
  }

  /**
   * 
   */
  componentWillUnmount() {
    this._isMounted = false;
  }

}