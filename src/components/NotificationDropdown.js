import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Dropdown, DropdownToggle, DropdownMenu, Row, Col } from "reactstrap";
import SimpleBar from "simplebar-react";
import Echo from 'laravel-echo';
import { connect } from "react-redux";
import config from '../helpers/config'

import { getNotifService, getNotifCountService, getNotifReadService } from "../helpers/master/user"
import { loginUser, loginUserSuccess, loginUserFail } from "../store/actions";

class NotificationDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: false,
      dataView: [],
      totalCount: '',
      dataCount: []
    };
  }

  componentDidMount() {
    this.getCountNotif()
    this.getDataFromApi()
  }

  getCountNotif = () => {
    const { userid, token } = this.props.data

    const options = {
      broadcaster: 'pusher',
      key: '18b11a0a23e374de892f',
      cluster: 'ap1',
      forceTLS: false,
      encrypted: true,
      authEndpoint: config.api_endpoint + `/broadcasting/auth`,
      auth: {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      },
    };

    const echo = new Echo(options);

    echo.private(`App.User.${userid}`).notification((data) => {
      this.setState({ totalCount: data.totalCount })
      console.log('dataPusher', data);
    });
  }

  getDataFromApi = () => {
    getNotifCountService()
      .then((data) => {
        this.setState({
          dataCount: data.data.data,
        });
      })
      .catch(() => { throw 'Gagal Mengambil Data' })
  }

  toggle = () => {
    getNotifService()
      .then((data) => {
        this.setState({
          dataView: data.data.data,
          menu: !this.state.menu
        });
      })
      .catch(() => { throw 'Gagal Mengambil Data' })
  }

  readNotif = (val) => {

    getNotifReadService(val)
      .then((data) => {
        this.setState({ totalCount: data })
        console.log('data', data)
      })
      .catch(() => { throw 'Gagal Mengambil Data' })
  }



  render() {
    const { dataView, totalCount, dataCount } = this.state
    return (
      <React.Fragment>
        <Dropdown
          isOpen={this.state.menu}
          toggle={this.toggle}
          className="dropdown d-inline-block"
          tag="li"
        >
          <DropdownToggle
            className="btn header-item noti-icon waves-effect"
            id="page-header-notifications-dropdown"
            tag="button"
          >
            <i className="mdi mdi-bell-outline"></i>
            {totalCount ?
              <span className="badge badge-danger badge-pill">{totalCount}</span>
              : ''}
          </DropdownToggle>

          <DropdownMenu className="dropdown-menu-lg p-0" right>
            <div className="p-3">
              <Row className="align-items-center">
                <Col>
                  <h5 className="m-0 font-size-16"> Notifications </h5>
                </Col>
              </Row>
            </div>

            <SimpleBar>

              {dataView.map((item, index) => {
                const detail = JSON.parse(item.data)
                const link = detail.type === 'SURATKELUAR' ? "/outgoing-mail-detail" : "incoming-mail-detail"
                const params = detail.id_reference
                const uuId = item.id
                return (
                  <Link
                    onClick={() => this.readNotif(uuId)}
                    to={{ pathname: link, state: { idRef: params } }}
                    className="text-reset notification-item"
                    key={index}>
                    <div className="media" >
                      <div className="avatar-xs mr-3">
                        <span className="avatar-title bg-success rounded-circle font-size-16">
                          <i className="mdi mdi-cart-outline"></i>
                        </span>
                      </div>
                      <div className="media-body">
                        <h6 className="mt-0 mb-1">{detail.type}</h6>
                        <div className="font-size-12 text-muted">
                          <p className="mb-1">
                            {detail.display}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              })}


            </SimpleBar>
            <div className="p-2 border-top">
              <Link
                className="btn btn-sm btn-link font-size-14 btn-block text-center"
                to="#"
              >
                {" "}
                View all{" "}
              </Link>
            </div>
          </DropdownMenu>
        </Dropdown>
      </React.Fragment>
    );
  }
}

const mapStatetoProps = state => {
  const { error, loading, data } = state.Login;
  return { error, loading, data };
};

export default withRouter(connect(mapStatetoProps, { loginUser, loginUserSuccess, loginUserFail })(NotificationDropdown));
