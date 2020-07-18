import React, { Component } from "react";
import { Row, Col, Card, CardBody, Alert, Button } from "reactstrap";
import {
  Validator,
  RequiredRule,
  CompareRule
} from 'devextreme-react/validator';
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { TextBox } from 'devextreme-react';
import { AvForm } from "availity-reactstrap-validation";
import { userForgetPassword } from "../../store/actions";
import { resetPasswordService } from "../../helpers/master/user"
import logoKabKerinci from "../../assets/images/logo-kab-kerinci.png"
import queryString from 'query-string';
import toast from '../UI/toast';

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      paramsUrl: ''
    };
    this.passwordOptions = {
      mode: 'password'
    };
  }

  componentDidMount() {
    let url = this.props.location.search
    let stringUrl = queryString.parse(url);
    this.setState({ paramsUrl: stringUrl })
    console.log('stringUrl', stringUrl);
  }

  handleValidSubmit = (e) => {
    const { paramsUrl, password } = this.state
    const params = {
      email: paramsUrl.email,
      konci_pas: paramsUrl.konci_pas,
      password: password
    }
    resetPasswordService(params)
      .then((data) => {
        this.alertSuccess()
        this.props.history.push('/')
      })
      .catch(() => {
        this.alertError()
      });
    e.preventDefault();
  }

  alertSuccess = () => {
    toast.success('Sukses mereset password!')
  };

  alertError = () => {
    toast.error('Gagal')
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
    const {
      paramsUrl
    } = this.state
    return (
      <React.Fragment>
        <div className="container">
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <div className="position-relative">

                <div className="text-primary text-center p-4">
                  <Link to="#" className="logo logo-admin">
                    <img src={logoKabKerinci} height="150" alt="" />
                    <h1 className="text-blue">
                      e-Office Dinas Pendidikan
                            <br />
                          Kabupaten Kerinci
                        </h1>
                  </Link>
                </div>

                <Card className="overflow-hidden">
                  <div className="bg-primary">
                    <div className="text-primary text-center p-4">
                      <h5 className="text-white font-size-24">
                        Reset Password
                        </h5>
                      <p className="text-white">
                        Buat password baru untuk akun Anda
                        </p>
                    </div>
                  </div>

                  <CardBody className="p-4">
                    <div className="p-3">
                      {this.props.forgetError && this.props.forgetError ? (
                        <Alert color="danger" style={{ marginTop: "13px" }}>
                          {this.props.forgetError}
                        </Alert>
                      ) : null}
                      {this.props.forgetSuccess ? (
                        <Alert color="success" style={{ marginTop: "13px" }}>
                          {this.props.forgetSuccess}
                        </Alert>
                      ) : null}

                      <AvForm
                        className="form-horizontal mt-4"
                        onValidSubmit={this.handleValidSubmit}>
                        <div className="dx-field">
                          <div className="dx-field-label">Email</div>
                          <div className="dx-field-value">
                            <TextBox
                              mode="text"
                              value={paramsUrl.email}
                              disabled />
                          </div>
                        </div>
                        <div className="dx-field">
                          <div className="dx-field-label">Password Baru</div>
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
                          <div className="dx-field-label">Konfirmasi Password</div>
                          <div className="dx-field-value">
                            <TextBox mode="password">
                              <Validator>
                                <RequiredRule message="Confirm Password is required" />
                                <CompareRule message="Password and Confirm Password do not match" comparisonTarget={this.passwordComparison} />
                              </Validator>
                            </TextBox>
                          </div>
                        </div>
                        <br /><br />
                        <div className="button-items">
                          <Button
                            color="primary"
                            className="btn btn-primary btn-block waves-effect waves-light">
                            Reset
                                </Button>

                        </div>
                      </AvForm>
                    </div>
                  </CardBody>
                </Card>
                <div className="mt-5 text-center">

                  <p className="mb-0">
                    © {new Date().getFullYear()} Ikhwan Komputer. All Rights Reserved
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

const mapStatetoProps = state => {
  const { forgetError, forgetSuccessMsg } = state.ForgetPassword;
  return { forgetError, forgetSuccessMsg };
};

export default withRouter(
  connect(mapStatetoProps, { userForgetPassword })(ResetPassword)
);
