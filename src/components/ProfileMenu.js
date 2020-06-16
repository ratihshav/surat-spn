
import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, Label } from 'reactstrap';
import { withRouter, Link } from 'react-router-dom';

// users
import user4 from '../assets/images/users/user-4.jpg';
import { logoutUserService } from '../helpers/auth'
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
    logoutUserService()
      .then((data) => {
        this.props.history.push('/login')
      })
      .catch(() => { throw 'Gagal Mengubah Data'; });
  }


  render() {

    return (
      <React.Fragment>
        <Dropdown isOpen={this.state.menu} toggle={this.toggle} className="d-inline-block" >
          <DropdownToggle className="btn header-item waves-effect" id="page-header-user-dropdown" tag="button">
            <img className="rounded-circle header-profile-user" src={user4} alt="Header Avatar" />
          </DropdownToggle>
          <DropdownMenu right>
            <Link
              to='/profile'
              className="dropdown-item">
              <i className="mdi mdi-account-circle font-size-17 align-middle mr-1"></i>
              <span>Profile</span>
            </Link>
            <div className="dropdown-divider"></div>
            <Label
              className="dropdown-item">
              <i className="mdi mdi-logout font-size-17 align-middle mr-1"></i>
              <span onClick={this.logout}>Logout</span>
            </Label>
          </DropdownMenu>
        </Dropdown>
      </React.Fragment>
    );
  }
}

export default withRouter(ProfileMenu);


