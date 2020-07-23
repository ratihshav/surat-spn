
import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, Row } from 'reactstrap';
import { withRouter, Link } from 'react-router-dom';
import { logoutUserService } from '../helpers/master/user'
import { connect } from "react-redux";
import { loginUser, loginUserSuccess, loginUserFail } from "../store/actions";
import config from '../helpers/config'
import userAva from "../assets/images/users/avatar-1.jpg"

class ProfileMenu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      menu: false,
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      menu: !prevState.menu
    }));
  }

  logout = () => {
    // logoutUserService()
    //   .then((data) => {
    window.localStorage.clear()
    window.location = '/'
    // })
    // .catch(() => { throw 'Gagal Mengubah Data'; });
  }

  render() {
    const { data } = this.props
    return (
      <React.Fragment >
        <Dropdown isOpen={this.state.menu} toggle={this.toggle} className="d-inline-block" >
          <DropdownToggle className="btn header-item waves-effect" id="page-header-user-dropdown" tag="button" >
            <Row>
              <img className="rounded-circle header-profile-user" src={data.path_foto ? config.url_img + data.path_foto : userAva} alt="Header Avatar" />
              <p style={{ fontWeight: 'bold', margin: 0, marginLeft: 10, alignSelf: 'center' }}>{data.full_name}</p>
            </Row>
          </DropdownToggle>
          <DropdownMenu right>
            <Link
              to='/profile'
              className="dropdown-item">
              <i className="mdi mdi-account-circle font-size-17 align-middle mr-1"></i>
              <span>Profile</span>
            </Link>
            <div className="dropdown-divider"></div>
            <Link
              to='/'
              className="dropdown-item">
              <i className="mdi mdi-logout font-size-17 align-middle mr-1"></i>
              <span onClick={this.logout}>Logout</span>
            </Link>
          </DropdownMenu>
        </Dropdown>
      </React.Fragment >
    );
  }
}
const mapStatetoProps = state => {
  const { error, loading, data } = state.Login;
  return { error, loading, data };
};

export default withRouter(connect(mapStatetoProps, { loginUser, loginUserSuccess, loginUserFail })(ProfileMenu));


