import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import red from '@material-ui/core/colors/red';

class FormInput extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      name  : '',
      isEdit: false,
      show  : false,
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleClearData = this.handleClearData.bind(this);
    this.keyPress = this.keyPress.bind(this);
  }
  
  componentWillReceiveProps(nextProps) {
    if (nextProps.textFromTable !== this.state.name) {
      this.setState({ name: nextProps.textFromTable, isEdit: true });
    }
  }

  keyPress(e) {
    if (e.keyCode === 13) {
      alert('Click Save To Add Todo')
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault()

    if (!this.state.name) {
      alert('Please Insert Todo Value Before Submit')
    } else {
      let params = {
        id        : Math.floor(Math.random() * 100) + 1,
        text      : this.state.name,
        completed : true
      }

      this.props.postTodos(params)

      this.setState({
        name  : '',
        isEdit: false,
      })
    }
  }

  handleUpdate(event) {
    event.preventDefault()

    if (!this.state.name) {
      alert('Todo Value Cannot Empty')
    } else {
      let params = {
        id        : this.props.idFromTable,
        text      : this.state.name,
        completed : true
      }

      this.props.updateTodos(params)

      this.setState({
        name  : '',
        isEdit: false,
      })
    }
  }

  handleClearData(event) {
    event.preventDefault()
    this.props.clearData()
    this.setState({
      name: '',
      isEdit: false,
    })
  }

  render() {
    const { classes } = this.props;
    const isEdit = this.state.isEdit;
    let button;

    if (isEdit === true) {
      button = <Button size="small" variant="contained" color="default" className={classes.button} onClick={this.handleUpdate}>Update</Button>;
    } else {
      button = <Button size="small" variant="contained" color="primary" className={classes.button} onClick={this.handleSubmit}>Save</Button>;
    }
    
    return (
      <React.Fragment>
        <Grid item lg={12} className={classes.pos}>
          <TextField
            id="todosInput"
            label="Todo Value"
            className={classes.textField}
            value={this.state.name} 
            name="name"
            onChange={this.handleChange}
            onKeyDown={this.keyPress}
            margin="normal"
            type="text"
            placeholder="Input your todo value..."
          />
        </Grid>
        {button}
        <Button size="small" variant="contained" color="secondary" className={classes.buttonRed} onClick={this.handleClearData}>Clear Data</Button>
      </React.Fragment>
    );
  }
}

const styles = () => ({
  textField: {
    width: '100%'
  },
  pos: {
    marginBottom: 12,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  buttonRed: {
    marginLeft: '10px',
    backgroundColor: red[500],
    '&:hover': {
      backgroundColor: red[700],
    },
    color: '#ffffff'
  },
})

const mapDispatchToProps = dispatch => {
  return {
    postTodos: (value) => dispatch({ 
      type: "ADD_TODO", 
      payLoad: {
        id        : value.id,
        text      : value.text,
        completed : value.completed
      }
    }),
    updateTodos: (value) => dispatch({
      type: "UPDATE_TODO",
      payLoad: {
        id        : value.id,
        text      : value.text,
        completed : value.completed
      }
    }),
    clearData: () => dispatch({
      type: "CLEAR_DATA"
    })
  };
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(FormInput));
