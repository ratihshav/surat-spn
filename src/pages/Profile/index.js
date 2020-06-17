import React, { Component } from "react";
import SettingMenu from "../Shared/SettingMenu";
import {
  Row,
  Col,
  Button,
  Input,
  Card,
  CardBody,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  CardText,
  Table
} from "reactstrap";
import classnames from "classnames";
import user2 from "../../assets/images/users/user-2.jpg";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "1",
      activeTab1: "5",
      activeTab2: "9",
      activeTab3: "13",
      customActiveTab: "1",
      activeTabJustify: "5",
      col1: true,
      col2: false,
      col3: false,
      col5: true
    };
    this.toggle = this.toggle.bind(this);
    this.toggle1 = this.toggle1.bind(this);

    this.t_col1 = this.t_col1.bind(this);
    this.t_col2 = this.t_col2.bind(this);
    this.t_col3 = this.t_col3.bind(this);
    this.t_col5 = this.t_col5.bind(this);

    this.toggle2 = this.toggle2.bind(this);
    this.toggle3 = this.toggle3.bind(this);

    this.toggleCustomJustified = this.toggleCustomJustified.bind(this);
    this.toggleCustom = this.toggleCustom.bind(this);
  }

  t_col1() {
    this.setState({ col1: !this.state.col1 });
  }
  t_col2() {
    this.setState({ col2: !this.state.col2 });
  }
  t_col3() {
    this.setState({ col3: !this.state.col3 });
  }
  t_col5() {
    this.setState({ col5: !this.state.col5 });
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  toggle1(tab) {
    if (this.state.activeTab1 !== tab) {
      this.setState({
        activeTab1: tab
      });
    }
  }
  toggle2(tab) {
    if (this.state.activeTab2 !== tab) {
      this.setState({
        activeTab2: tab
      });
    }
  }
  toggle3(tab) {
    if (this.state.activeTab3 !== tab) {
      this.setState({
        activeTab3: tab
      });
    }
  }

  toggleCustomJustified(tab) {
    if (this.state.activeTabJustify !== tab) {
      this.setState({
        activeTabJustify: tab
      });
    }
  }

  toggleCustom(tab) {
    if (this.state.customActiveTab !== tab) {
      this.setState({
        customActiveTab: tab
      });
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="container-fluid">
          <Row className="align-items-center">
            <Col sm={6}>
              <div className="page-title-box">
                <h4 className="font-size-18">Profile</h4>
              </div>
            </Col>
          </Row>


          <Row>
            <Col xl={12}>
              <Card>
                <CardBody>
                  <Row>
                    <Col lg={2}>
                      <div>
                        <img
                          className="rounded-circle center"
                          src={user2}
                          alt="veltrix"
                          width="150"
                          data-holder-rendered="true"
                        />
                        <br /> <br />
                        <Button
                          color="primary"
                          className="btn btn-primary btn-block waves-effect waves-light"
                        >
                          Edit Profil
                    </Button>
                      </div>
                    </Col>
                    {/* <Col lg={5}>
                      <Row> */}
                    <Col md={8}>
                      <div className="card">
                        <div className="card-body">

                          <Nav tabs className="nav-tabs-custom nav-justified">
                            <NavItem>
                              <NavLink
                                className={classnames({
                                  active: this.state.activeTabJustify === "5"
                                })}
                                onClick={() => {
                                  this.toggleCustomJustified("5");
                                }}
                              >
                                <span class="d-none d-sm-block">Basic Information</span>
                              </NavLink>
                            </NavItem>
                            <NavItem>
                              <NavLink
                                className={classnames({
                                  active: this.state.activeTabJustify === "6"
                                })}
                                onClick={() => {
                                  this.toggleCustomJustified("6");
                                }}
                              >
                                <span class="d-none d-sm-block">Profile</span>
                              </NavLink>
                            </NavItem>
                            <NavItem>
                              <NavLink
                                className={classnames({
                                  active: this.state.activeTabJustify === "7"
                                })}
                                onClick={() => {
                                  this.toggleCustomJustified("7");
                                }}
                              >
                                <span class="d-none d-sm-block">Messages</span>
                              </NavLink>
                            </NavItem>
                            <NavItem>
                              <NavLink
                                className={classnames({
                                  active: this.state.activeTabJustify === "8"
                                })}
                                onClick={() => {
                                  this.toggleCustomJustified("8");
                                }}
                              >
                                <span class="d-none d-sm-block">Settings</span>
                              </NavLink>
                            </NavItem>
                          </Nav>

                          <TabContent activeTab={this.state.activeTabJustify}>
                            <TabPane tabId="5" className="p-3">
                              <Row>
                                <Col sm="12">
                                  <div className="table-responsive">
                                    <Table responsive striped className="mb-0">
                                      <thead>
                                        <tr>
                                          <th style={{ width: "50%" }}>Nama Lengkap</th>
                                          <th>Afdal Zikri</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr>
                                          <td>Simple Text Field</td>
                                          <td>
                                            a
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>Empty text field, required</td>
                                          <td>
                                            a
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>Select, local array, custom display</td>
                                          <td>
                                            a
                                          </td>
                                        </tr>

                                        <tr>
                                          <td>Combodate</td>
                                          <td>
                                            a
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>Textarea, buttons below. Submit by ctrl+enter</td>
                                          <td>
                                            a
                                          </td>
                                        </tr>
                                      </tbody>
                                    </Table>
                                  </div>
                                </Col>
                              </Row>
                            </TabPane>
                            <TabPane tabId="6" className="p-3">
                              <Row>
                                <Col sm="12">
                                  <CardText>
                                    Food truck fixie locavore, accusamus mcsweeney's
                                    marfa nulla single-origin coffee squid. Exercitation
                                    +1 labore velit, blog sartorial PBR leggings next
                                    level wes anderson artisan four loko farm-to-table
                                    craft beer twee. Qui photo booth letterpress,
                                    commodo enim craft beer mlkshk aliquip jean shorts
                                    ullamco ad vinyl cillum PBR. Homo nostrud organic,
                                    assumenda labore aesthetic magna delectus mollit.
                                    Keytar helvetica VHS salvia yr, vero magna velit
                                    sapiente labore stumptown. Vegan fanny pack odio
                                    cillum wes anderson 8-bit.
                          </CardText>
                                </Col>
                              </Row>
                            </TabPane>
                            <TabPane tabId="7" className="p-3">
                              <Row>
                                <Col sm="12">
                                  <CardText>
                                    Etsy mixtape wayfarers, ethical wes anderson tofu
                                    before they sold out mcsweeney's organic lomo retro
                                    fanny pack lo-fi farm-to-table readymade. Messenger
                                    bag gentrify pitchfork tattooed craft beer, iphone
                                    skateboard locavore carles etsy salvia banksy hoodie
                                    helvetica. DIY synth PBR banksy irony. Leggings
                                    gentrify squid 8-bit cred pitchfork. Williamsburg
                                    banh mi whatever gluten-free, carles pitchfork
                                    biodiesel fixie etsy retro mlkshk vice blog.
                                    Scenester cred you probably haven't heard of them,
                                    vinyl craft beer blog stumptown. Pitchfork
                                    sustainable tofu synth chambray yr.
                          </CardText>
                                </Col>
                              </Row>
                            </TabPane>

                            <TabPane tabId="8" className="p-3">
                              <Row>
                                <Col sm="12">
                                  <CardText>
                                    Trust fund seitan letterpress, keytar raw denim
                                    keffiyeh etsy art party before they sold out master
                                    cleanse gluten-free squid scenester freegan cosby
                                    sweater. Fanny pack portland seitan DIY, art party
                                    locavore wolf cliche high life echo park Austin.
                                    Cred vinyl keffiyeh DIY salvia PBR, banh mi before
                                    they sold out farm-to-table VHS viral locavore cosby
                                    sweater. Lomo wolf viral, mustache readymade
                                    thundercats keffiyeh craft beer marfa ethical. Wolf
                                    salvia freegan, sartorial keffiyeh echo park vegan.
                          </CardText>
                                </Col>
                              </Row>
                            </TabPane>
                          </TabContent>
                        </div>
                      </div>
                    </Col>
                    {/* </Row>
                    </Col> */}
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

export default Dashboard;
