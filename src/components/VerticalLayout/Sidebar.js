import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import MetisMenu from "metismenujs";
import { connect } from "react-redux";
import { loginUser, loginUserSuccess, loginUserFail } from "../../store/actions";
import SimpleBar from "simplebar-react";

const SidebarContent = props => {
  const suratKeluar = props.data.perms.includes('suratKeluar_list');
  const suratMasuk = props.data.perms.includes('suratMasuk_list');
  const divisi = props.data.perms.includes('divisi_list');
  const klasifikasi = props.data.perms.includes('klasifikasi_list');
  const template = props.data.perms.includes('templateSurat_list');
  const jabatan = props.data.perms.includes('jabatan_list');
  const user = props.data.perms.includes('user_list');
  const isAdmin = props.data.perms.includes('is_admin')

  return (
    <div id="sidebar-menu">
      <br /><br />
      <p style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 22, margin: 0 }}>e-Office <br /> Dinas Pendidikan <br /> Kabupaten Kerinci </p>
      <ul className="metismenu list-unstyled" id="side-menu">
        <li className="menu-title"> </li>
        <br></br>
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

            {suratKeluar || isAdmin ?
              <li>
                <Link to="/incoming-mail">
                  <i className="mdi mdi-email-receive"></i>
                  <span>Surat Masuk</span>
                </Link>
              </li>
              : null}

            {suratMasuk || isAdmin ?
              <li>
                <Link to="/outgoing-mail">
                  <i className="mdi mdi-email-send"></i>
                  <span>Surat Keluar</span>
                </Link>
              </li>
              : null}

          </ul>
        </li>


        <li>
          {jabatan || template || user || isAdmin ?
            <Link to="/#" className="has-arrow waves-effect">
              <i className="fas fa-database"></i>
              <span>Master Data</span>
            </Link>
            : null
          }
          <ul className="sub-menu" aria-expanded="false">
            {user || isAdmin ?
              <li>
                <Link to="/user">
                  <i className="fas fa-user-alt"></i>
                  <span>Data User</span>
                </Link>
              </li>
              : null
            }
            <li>
              <Link to="/group">Data Divisi</Link>
            </li>

            {jabatan || isAdmin ?
              <li>
                <Link to="/position">Data Jabatan</Link>
              </li>
              : null
            }

            <li>
              <Link to="/classification">Data Klasifikasi Surat</Link>
            </li>

            {template || isAdmin ?
              <li>
                <Link to="/template-mail">Template Surat</Link>
              </li>
              : null
            }

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
    console.log('siderbar', this.props.location);

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
    const data = this.props.data
    return (
      <React.Fragment>
        {this.props.type !== "condensed" ? (
          <SimpleBar style={{ maxHeight: "100%" }}>
            <SidebarContent data={data} />
          </SimpleBar>
        ) : (
            <SidebarContent data={data} />
          )}
      </React.Fragment>
    );
  }
}

const mapStatetoProps = state => {
  const { error, loading, data } = state.Login;
  return { error, loading, data };
};

export default withRouter(connect(mapStatetoProps, { loginUser, loginUserSuccess, loginUserFail })(Sidebar));

