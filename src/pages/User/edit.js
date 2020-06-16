import React, { Component } from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
} from "reactstrap";
import Form, {
  Item,
  ButtonItem,
} from 'devextreme-react/form';
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import {
  updateMasterUser,
  updateMasterUserSuccess
} from "../../store/business/master-user/actions";

// import images
import user2 from "../../assets/images/users/user-2.jpg";
import "chartist/dist/scss/chartist.scss";

const idUser = window.localStorage.getItem('idUser');

class UserEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataUser: '',
    };
    this.groupedItems = {
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
          title: 'Divisi',
          items: ['group_name']
        }]
      }
      ]
    };
    this.buttonOptions = {
      text: 'Submit',
      type: 'success',
      // useSubmitBehavior: true,
      onClick: (e) => this.submitUpdatedData(e)
    };
  }

  componentDidMount() {
    this.setState({
      dataUser: this.props.location.params
    })
  }

  submitUpdatedData = (value) => {
    this.props.updateMasterUser(this.props.location.params)
  }

  goToChangePassword = () => {
    const data = this.props.location.params
    this.props.history.push({
      pathname: '/user-change-password',
      params: data,
    });
  }

  goToChangePhoto = () => {
    const data = this.props.location.params
    this.props.history.push({
      pathname: '/user-change-photo',
      params: data,
    });
  }

  render() {
    const { animationEnabled, loop, selectedIndex, swipeEnabled, dataUser } = this.state;
    return (
      <React.Fragment>
        <div className="container-fluid">
          <Row className="align-items-center">
            <Col sm={6}>
              <div className="page-title-box">
                <h4 className="font-size-18">Edit Profil</h4>
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <Link to="#">User</Link>
                  </li>
                  <li className="breadcrumb-item active">Edit Profil</li>
                </ol>
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
                          onClick={this.goToChangePhoto}>
                          Ganti Foto
                    </Button>
                        <Button
                          color="primary"
                          className="btn btn-primary btn-block waves-effect waves-light"
                          onClick={this.goToChangePassword}>
                          Ganti Password
                    </Button>
                      </div>
                    </Col>
                    <Col md={8}>
                      <form action="your-action" onSubmit={this.handleSubmit}>
                        <Form
                          formData={dataUser}
                          readOnly={false}
                          showColonAfterLabel={true}
                        >
                          <Item itemType="group" items={this.groupedItems.contactInformation} />
                          <ButtonItem horizontalAlignment="right"
                            buttonOptions={this.buttonOptions}
                          />
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

const mapStatetoProps = state => {
  const { error, loading, response } = state.MasterUser;
  return { error, loading, response };
};

export default withRouter(connect(mapStatetoProps, {
  updateMasterUser,
  updateMasterUserSuccess
})(UserEdit));