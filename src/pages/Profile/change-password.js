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
import { TextBox } from 'devextreme-react';
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { changePasswordUserService } from '../../helpers/master/user';
import toast from '../UI/toast';

class ProfileChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
    };
    this.passwordOptions = {
      mode: 'password'
    };
  }

  changePassword = (e) => {
    const idUser = window.localStorage.getItem('id');

    const params = {
      password: this.state.password,
      id: idUser
    }

    changePasswordUserService(params)
      .then((data) => {
        this.alertSuccess()
        this.props.history.push('/profile');
      })
      .catch((e) => {
        return (
          this.alertError(e)
        )
      });
    e.preventDefault()
  }

  alertSuccess = () => {
    toast.success('Sukses menyimpan data!')
  };

  alertError = (e) => {
    toast.error(e)
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
                    <Link to="/profile">Profile</Link>
                  </li>
                  <li className="breadcrumb-item active">Ganti Password</li>
                </ol>
              </div>
            </Col>
          </Row>


          <form action="your-action" onSubmit={this.changePassword}>
            <Row>
              <div className="col-12">
                <Card>
                  <CardBody>
                    <Row className="form-group">
                      <Col md={8}>
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
                        <div className="text-right">
                          <Button
                            color="success"
                            className="mt-1">
                            <i className="typcn typcn-input-checked" />Submit
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </div>
            </Row>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(connect()(ProfileChangePassword));