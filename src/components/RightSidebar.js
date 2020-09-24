import React, { Component } from "react";
import { connect } from "react-redux";

import {
  hideRightSidebar
} from "../store/actions";

class RightSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {}
    };
  /**
   * Hides the right sidebar
   */

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({
        layoutType: this.props.layoutType
      });
    }
  }


  render() {
    return (
      <React.Fragment>
        <div className="rightbar-overlay"></div>
      </React.Fragment>
    );
  }
}

const mapStatetoProps = state => {
  return { ...state.Layout };
};

export default connect(mapStatetoProps, {
  hideRightSidebar
})(RightSidebar);
