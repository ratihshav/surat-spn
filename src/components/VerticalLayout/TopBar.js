import React, { Component } from "react";
import { Link } from "react-router-dom";


// Import other Dropdown
import NotificationDropdown from "../../components/NotificationDropdown";
import ProfileMenu from "../../components/ProfileMenu";

import logoKabKerinci from "../../assets/images/logo-kab-kerinci.png"

class TopBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearchOpen: false
    };

    this.toggleMenu = this.toggleMenu.bind(this);
  }

  /**
   * Toggle sidebar
   */
  toggleMenu() {
    this.props.toggleMenuCallback();
  }

  render() {
    return (
      <React.Fragment>
        <header id="page-topbar">
          <div className="navbar-header">
            <div className="d-flex">
              <div className="navbar-brand-box">
                <Link to="/dashboard" className="logo logo-dark">
                  <span className="logo-sm">
                    <img src={logoKabKerinci} alt="" height="22" />
                  </span>
                  <span className="logo-lg">
                    <img src={logoKabKerinci} alt="" height="17" />
                  </span>
                </Link>

                <Link to="/dashboard" className="logo logo-light">
                  <span className="logo-sm">
                    <img src={logoKabKerinci} alt="" height="22" />
                  </span>
                  <span className="logo-lg">
                    <img src={logoKabKerinci} alt="" height="100" style={{ marginBottom: -50 }} />
                  </span>
                </Link>
              </div>
              <button
                type="button"
                onClick={this.toggleMenu}
                className="btn btn-sm px-3 font-size-24 header-item waves-effect"
                id="vertical-menu-btn">
                <i className="mdi mdi-menu"></i>
              </button>
            </div>

            <div className="d-flex">
              <NotificationDropdown />
              <ProfileMenu />
            </div>
          </div>
        </header>
      </React.Fragment>
    );
  }
}

export default TopBar;
