import React, { Component } from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  Button
} from "reactstrap";
import {
  Validator,
  RequiredRule,
  CompareRule
} from 'devextreme-react/validator';
import { TextBox, ValidationSummary, } from 'devextreme-react';
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import {
  changePasswordUser,
  changePasswordUserSuccess,
  updateMasterUser,
  updateMasterUserSuccess
} from "../../store/business/master-user/actions";

// import images
import user2 from "../../assets/images/users/user-2.jpg";

class UserChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
    };
    this.buttonOptions = {
      text: 'Submit',
      type: 'success',
      // useSubmitBehavior: true,
      onClick: (e) => this.changePassword(e)
    };
    this.passwordOptions = {
      mode: 'password'
    };
  }

  changePassword = (value) => {
    const params = {
      password: this.state.password,
      id: this.props.location.params.id
    }
    this.props.changePasswordUser(params)
  }

  passwordComparison = () => {
    return this.state.password;
  }

  onPasswordChanged = (e) => {
    this.setState({
      password: e.value
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className="container-fluid">
          <Row className="align-items-center">
            <Col sm={6}>
              <div className="page-title-box">
                <h4 className="font-size-18">Ganti Password</h4>
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <Link to="#">User</Link>
                  </li>
                  <li className="breadcrumb-item">Edit Profil</li>
                  <li className="breadcrumb-item active">Ganti Password</li>
                </ol>
              </div>
            </Col>
          </Row>


          <Row>
            <Col xl={12}>
              <Card>
                <CardBody>
                  <Row>
                    <Col md={8}>
                      <form action="your-action" onSubmit={this.handleSubmit}>
                        <div className="dx-fieldset">
                          <div className="dx-field">
                            <div className="dx-field-label">Password</div>
                            <div className="dx-field-value">
                              <TextBox
                                mode="password"
                                value={this.state.password}
                                onValueChanged={this.onPasswordChanged}>
                                <Validator>
                                  <RequiredRule message="Password is required" />
                                </Validator>
                              </TextBox>
                            </div>
                          </div>
                          <div className="dx-field">
                            <div className="dx-field-label">Confirm Password</div>
                            <div className="dx-field-value">
                              <TextBox mode="password">
                                <Validator>
                                  <RequiredRule message="Confirm Password is required" />
                                  <CompareRule message="Password and Confirm Password do not match" comparisonTarget={this.passwordComparison} />
                                </Validator>
                              </TextBox>
                            </div>
                          </div>
                        </div>

                        <div className="dx-fieldset">
                          <ValidationSummary id="summary"></ValidationSummary>
                          <Button
                            color="success"
                            className="btn btn-primary btn-block waves-effect waves-light"
                            onClick={this.changePassword}
                          >
                            Submit
                    </Button>
                        </div>
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
  changePasswordUser,
  changePasswordUserSuccess,
  updateMasterUser,
  updateMasterUserSuccess
})(UserChangePassword));