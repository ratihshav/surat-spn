import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import MetisMenu from "metismenujs";

import SimpleBar from "simplebar-react";

const SidebarContent = props => {
  return (
    <div id="sidebar-menu">
      <ul className="metismenu list-unstyled" id="side-menu">
        <li className="menu-title">Main</li>

        <li>
          <Link to="/dashboard" className="waves-effect">
            <i className="ti-home"></i>
            <span className="badge badge-pill badge-primary float-right">
              2
            </span>
            <span>Dashboard</span>
          </Link>
        </li>


        <li>
          <Link to="/#" className="has-arrow waves-effect">
            <i className="ti-email"></i>
            <span>Surat</span>
          </Link>
          <ul className="sub-menu" aria-expanded="false">
            <li>
              <Link to="/email-read">Surat Masuk</Link>
            </li>
            <li>
              <Link to="/outgoing-mail-create">Surat Keluar</Link>
            </li>
          </ul>
        </li>


        <li>
          <Link to="/#" className="has-arrow waves-effect">
            <i className="ti-email"></i>
            <span>Master Data</span>
          </Link>
          <ul className="sub-menu" aria-expanded="false">
            <li>
              <Link to="/user">Data User</Link>
            </li>
            <li>
              <Link to="/group">Data Divisi</Link>
            </li>
            <li>
              <Link to="/email-compose">Data Jabatan</Link>
            </li>
          </ul>
        </li>

        <li className="menu-title">Extras</li>

        {/* <li>
          <Link to="/#" className="waves-effect">
            <i className="ti-receipt"></i>
            <span className="badge badge-pill badge-success float-right">
              6
            </span>
            <span>Forms</span>
          </Link>
          <ul className="sub-menu" aria-expanded="false">
            <li>
              <Link to="form-elements">Form Elements</Link>
            </li>
            <li>
              <Link to="form-validation">Form Validation</Link>
            </li>
            <li>
              <Link to="form-advanced">Form Advanced</Link>
            </li>
            <li>
              <Link to="form-editors">Form Editors</Link>
            </li>
            <li>
              <Link to="form-uploads">Form File Upload</Link>
            </li>
            <li>
              <Link to="form-xeditable">Form Xeditable</Link>
            </li>
            <li>
              <Link to="form-repeater">Form Repeater</Link>
            </li>
            <li>
              <Link to="form-wizard">Form Wizard</Link>
            </li>
            <li>
              <Link to="form-mask">Form Mask</Link>
            </li>
          </ul>
        </li> */}

        <li>
          <Link to="/#" className="has-arrow waves-effect">
            <i className="ti-support"></i>
            <span> Extra Pages </span>
          </Link>
          <ul className="sub-menu" aria-expanded="false">
            <li>
              <Link to="pages-timeline">Timeline</Link>
            </li>
            <li>
              <Link to="pages-invoice">Invoice</Link>
            </li>
            <li>
              <Link to="pages-directory">Directory</Link>
            </li>
            <li>
              <Link to="pages-blank">Blank Page</Link>
            </li>
            <li>
              <Link to="pages-404">Error 404</Link>
            </li>
            <li>
              <Link to="pages-500">Error 500</Link>
            </li>
            <li>
              <Link to="pages-pricing">Pricing</Link>
            </li>
            <li>
              <Link to="pages-gallery">Gallery</Link>
            </li>
            <li>
              <Link to="pages-maintenance">Maintenance</Link>
            </li>
            <li>
              <Link to="pages-comingsoon">Coming Soon</Link>
            </li>
            <li>
              <Link to="pages-faq">FAQs</Link>
            </li>
          </ul>
        </li>

        <li>
          <Link to="/#" className="has-arrow waves-effect">
            <i className="ti-bookmark-alt"></i>
            <span> Email Templates </span>
          </Link>
          <ul className="sub-menu" aria-expanded="false">
            <li>
              <Link to="/email-template-basic">Basic Action Email</Link>
            </li>
            <li>
              <Link to="/email-template-Alert">Alert Email</Link>
            </li>
            <li>
              <Link to="/email-template-Billing">Billing Email</Link>
            </li>
          </ul>
        </li>

        <li>
          <Link to="/#" className="has-arrow waves-effect">
            <i className="ti-more"></i>
            <span>Multi Level</span>
          </Link>
          <ul className="sub-menu" aria-expanded="true">
            <li>
              <Link to="/#">Level 1.1</Link>
            </li>
            <li>
              <Link to="/#" className="has-arrow">
                Level 1.2
              </Link>
              <ul className="sub-menu" aria-expanded="true">
                <li>
                  <Link to="/#">Level 2.1</Link>
                </li>
                <li>
                  <Link to="/#">Level 2.2</Link>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.initMenu();
  }

  componentDidUpdate(prevProps) {
    if (this.props.type !== prevProps.type) {
      this.initMenu();
    }
  }

  initMenu() {
    if (this.props.type !== "condensed" || this.props.isMobile) {
      new MetisMenu("#side-menu");

      var matchingMenuItem = null;
      var ul = document.getElementById("side-menu");
      var items = ul.getElementsByTagName("a");
      for (var i = 0; i < items.length; ++i) {
        if (this.props.location.pathname === items[i].pathname) {
          matchingMenuItem = items[i];
          break;
        }
      }
      if (matchingMenuItem) {
        this.activateParentDropdown(matchingMenuItem);
      }
    }
  }

  activateParentDropdown = item => {
    item.classList.add("mm-active");
    const parent = item.parentElement;

    if (parent) {
      parent.classList.add("mm-active"); // li
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add("mm-show");

        const parent3 = parent2.parentElement;

        if (parent3) {
          parent3.classList.add("mm-active"); // li
          parent3.childNodes[0].classList.add("mm-active"); //a
          const parent4 = parent3.parentElement;
          if (parent4) {
            parent4.classList.add("mm-active");
          }
        }
      }
      return false;
    }
    return false;
  };

  render() {
    return (
      <React.Fragment>
        {this.props.type !== "condensed" ? (
          <SimpleBar style={{ maxHeight: "100%" }}>
            <SidebarContent />
          </SimpleBar>
        ) : (
            <SidebarContent />
          )}
      </React.Fragment>
    );
  }
}

export default withRouter(Sidebar);
