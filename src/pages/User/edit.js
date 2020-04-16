import React, { Component } from "react";
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
import Form, {
  Item,
  ButtonItem,
  GroupItem,
  SimpleItem,
  Label,
  CompareRule,
  EmailRule,
  PatternRule,
  RangeRule,
  RequiredRule,
  StringLengthRule,
  AsyncRule
} from 'devextreme-react/form';
import TabPanel from 'devextreme-react/tab-panel';
import { Link } from "react-router-dom";
import classnames from "classnames";

// import images
import user2 from "../../assets/images/users/user-2.jpg";
import "chartist/dist/scss/chartist.scss";

const dataUsers = {
  id: 33,
  group_name: null,
  group_id: null,
  username: "Prof. Marian O'Connell",
  full_name: "Estefania Bartoletti",
  email: "marjolaine07@example.org",
  phone: "081352",
  address: "9045 Britney Neck↵Casperland, KY 80676",
  last_login: null,
  date_of_birth: new Date(1964, 2, 16)
}

class UserEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataUser: '',
    };
    this.groupedItems = {
      // systemInformation: [
      //   'ID', 'FirstName', 'LastName', 'HireDate', 'Position', 'OfficeNo'
      // ],
      // personalData: [
      //   'BirthDate',
      //   {
      //     itemType: 'group',
      //     caption: 'Home Address',
      //     items: ['Address', 'City', 'State', 'Zipcode']
      //   }

      // ],
      contactInformation: [{
        itemType: 'tabbed',
        tabPanelOptions: {
          deferRendering: false
        },
        tabs: [{
          title: 'Basic Information',
          items: ['id', 'full_name', 'username', 'email']
        }, {
          title: 'Personal Data',
          items: ['full_name', 'date_of_birth', 'address', 'phone']
        }, {
          title: 'Jabatan',
          items: ['group_name']
        }]
      }
      ]
    };
  }

  componentDidMount() {
    console.log('param', this.props.location.params)
    this.setState({
      dataUser: this.props.location.params
    })
  }

  render() {
    const { animationEnabled, loop, selectedIndex, swipeEnabled, dataUser } = this.state;
    console.log('dataUser', this.props.location.params)
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
                          Ganti Foto
                    </Button>
                      </div>
                    </Col>
                    <Col md={8}>
                      <form action="your-action" onSubmit={this.handleSubmit}>
                        <Form
                          formData={dataUsers}
                          readOnly={false}
                          showColonAfterLabel={true}
                          showValidationSummary={true}
                          validationGroup="customerData"
                        >
                          <Item itemType="group" items={this.groupedItems.contactInformation} />
                        </Form>
                      </form>
                    </Col>
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

export default UserEdit;
