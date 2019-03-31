import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import FormInput from './components/Form';
import TableList from './components/Table';
class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title : 'Todo Dashboard',
      name  : '',
      id    : ''
    }

    this.onGetEditValue = this.onGetEditValue.bind(this)
  }

  onGetEditValue(newText) {
    this.setState({
      id  : newText.id,
      name: newText.text
    })
  }

  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            {this.state.title}
          </Typography>
          <Grid container spacing={24}>
            <Grid item lg={2} md={2} sm={12} xs={12}>
              <FormInput textFromTable={this.state.name} idFromTable={this.state.id}></FormInput>
            </Grid>
            <Grid item lg={10} md={10} sm={12} xs={12}>
              <TableList changeLink={this.onGetEditValue.bind(this)} ></TableList>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}

const styles = theme => ({
  card: {
    minWidth: 100,
  },
  title: {
    fontSize: 14,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  button: {
    margin: theme.spacing.unit,
  },
});


export default withStyles(styles)(Todo);
