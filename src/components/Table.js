import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import cyan from '@material-ui/core/colors/cyan';
import red from '@material-ui/core/colors/red';
import blue from '@material-ui/core/colors/blue';

class TableList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    }

    this.handleDone   = this.handleDone.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleEdit   = this.handleEdit.bind(this)
  }

  handleDone(id) {
    let params = {
      id        : id,
      completed : false
    }
    this.props.doneTodo(params)
  }

  handleDelete(id) {
    let params = {
      id        : id,
      completed : true
    }
    this.props.deleteTodo(params)
  }

  handleCancel(id) {
    let params = {
      id        : id,
      completed : true
    }
    this.props.doneTodo(params)
  }

  handleEdit(row) {
    this.props.changeLink(row)
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Grid container spacing={24}>
          <Grid item lg={6} className={classes.pos}>
            TODO
            <Paper className={classes.root}>
              <div className={classes.tableWrapper}>
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <TableCell className={classes.noWidth}>No</TableCell>
                      <TableCell>Todo Value</TableCell>
                      <TableCell className={classes.actionColumn} align="center">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.props.rowTodo.map((row, index) => (
                      <TableRow key={index + 1}>
                        <TableCell>
                          {index + 1}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {row.text}
                        </TableCell>
                        <TableCell align="center">
                          <Button size="small" variant="contained" className={classes.buttonCyan} onClick={() => this.handleEdit(row)}>Edit</Button>
                          <Button size="small" variant="contained" className={classes.buttonBlue} onClick={() => this.handleDone(row.id)}>Done</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Paper>
          </Grid>

          <Grid item lg={6} className={classes.pos}>
          DONE
          <Paper className={classes.root}>
            <div className={classes.tableWrapper}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.noWidth}>No</TableCell>
                    <TableCell>Todo Value</TableCell>
                    <TableCell className={classes.actionColumn} align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.props.rowDone.map((row, index) => (
                    <TableRow key={index + 1}>
                      <TableCell className={classes.doneNumb}>
                        {index + 1}
                      </TableCell>
                      <TableCell component="th" scope="row" className={classes.doneText}>
                        {row.text}
                      </TableCell>
                      <TableCell align="center">
                        <Button size="small" variant="contained" className={classes.buttonBlue} onClick={() => this.handleCancel(row.id)}>Cancel</Button>
                        <Button size="small" variant="contained" className={classes.buttonRed} onClick={() => this.handleDelete(row.id)}>Delete</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Paper>
        </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  buttonCyan: {
    margin: theme.spacing.unit,
    backgroundColor: cyan[500],
    '&:hover': {
      backgroundColor: cyan[700],
    },
    color: '#ffffff'
  },
  buttonRed: {
    margin: theme.spacing.unit,
    backgroundColor: red[500],
    '&:hover': {
      backgroundColor: red[700],
    },
    color: '#ffffff'
  },
  buttonBlue: {
    margin: theme.spacing.unit,
    backgroundColor: blue[500],
    '&:hover': {
      backgroundColor: blue[700],
    },
    color: '#ffffff'
  },
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 100,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  noWidth: {
    width: '50px'
  },
  ageWidth: {
    width: '50px',
    align: 'right'
  },
  actionColumn: {
    width: '210px',
    align: 'center'
  },
  doneText: {
    color: '#888888',
    textDecoration: 'line-through'
  },
  doneNumb: {
    color: '#888888',
  },
});

const mapStateToProps = (state) => {
  var rowTodo = state.listTodos.filter(function (item) {
    return item.completed === true;
  });

  var rowDone = state.listTodos.filter(function (item) {
    return item.completed === false;
  });

  return {
    rowTodo,
    rowDone,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    doneTodo: (value) => dispatch({
      type: "DONE_TODO",
      payLoad: {
        id        : value.id,
        completed : value.completed
      }
    }),
    deleteTodo: (value) => dispatch({
      type: "DELETE_TODO",
      payLoad: {
        id        : value.id,
        completed : value.completed
      }
    }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TableList));