import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Dropdown, DropdownToggle, DropdownMenu, Row, Col } from "reactstrap";
import SimpleBar from "simplebar-react";
import { getNotifService } from "../helpers/master/user"

class NotificationDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: false,
      data: []
    };
  }

  toggle = () => {
    getNotifService()
      .then((data) => {
        this.setState({
          data: data.data.data,
          menu: !this.state.menu
        });
      })
      .catch(() => { throw 'Gagal Mengambil Data' })

  }
  render() {
    const { data } = this.state
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
            <span className="badge badge-danger badge-pill">3</span>
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
              <Link to="" className="text-reset notification-item">
                <div className="media">
                  <div className="avatar-xs mr-3">
                    <span className="avatar-title bg-success rounded-circle font-size-16">
                      <i className="mdi mdi-email-send"></i>
                    </span>
                  </div>
                  {data.map((item, index) => {
                    return (
                      <div className="media-body" key={index}>
                        <h6 className="mt-0 mb-1">{item.type}</h6>
                        <div className="font-size-12 text-muted">
                          <p className="mb-1">
                            {item.display}
                          </p>
                        </div>
                      </div>
                    )
                  })}

                </div>
              </Link>

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
export default NotificationDropdown;
