import React, {Component} from "react";
import { Route, Link, withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';

class BankFilter extends Component {
  constructor(props) {
    super(props);
  }

  handleSetBankFilterEvent(e) {
    const bankfilter = {
      nordea: {name: "Nordea", checked: false},
      handelsbanken: {name: "Handelsbanken", checked: true},
      seb: {name: "SEB", checked: false},
      swedbank: {name: "Swedbank", checked: false},
    };
    this.props.filter = bankfilter;
  }

render() {
  return (
    <div>
      <FormControl component="fieldset">
        <FormLabel component="legend">Report content</FormLabel>
        <FormGroup>
          {this.props.filter.map(x =>
            (
          <FormControlLabel
            control={
              <Checkbox checked={x.checked} onChange={console.log(x.name)} value={x.checked} />
            }
            label={x.name}
          />
      ))}
        </FormGroup>
        <FormHelperText>The selected banks will be part of the report.</FormHelperText>
      </FormControl>
    </div>
  )
}
}

// Store handling

const mapStateToProps = state => ({
  filter: state.filter.banks,
});

const mapDispatchToProps = dispatch => ({
    getTheFilter: (sid) => {
      console.log("implement dispatch(getBankFilter(sid)");
  },
});

const BankFilterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BankFilter);

export default withRouter(BankFilterContainer);
