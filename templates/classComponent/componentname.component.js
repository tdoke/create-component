import PropTypes from "prop-types";
import React, { Component } from "react";
import './componentname.scss';

class componentname extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <div className='componentcssclass-container'>componentname</div>;
  }
}

componentname.propTypes = {};

export default componentname;
