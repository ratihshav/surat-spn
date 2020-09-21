import React, { Component } from "react";
import { Row, Col, Card, CardBody, Alert, Button } from "reactstrap";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
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
  }

  componentDidMount() {
    let url = this.props.location.search
    let stringUrl = queryString.parse(url);
    this.setState({ paramsUrl: stringUrl })
  }

  handleSubmit = (e) => {
    const params = {
      password: e.target.password.value,
      confirmPassword: e.target.confirmPassword.value,
    }

    if (params.password !== params.confirmPassword) {
      this.alertError("Password Anda tidak sesuai")
      e.preventDefault()
    } else {
      this.resetPassword(e)
    }
  }

  resetPassword = (e) => {
    const { paramsUrl, password } = this.state
    const params = {
      email: paramsUrl.email,
      konci_pas: paramsUrl.konci_pas,
      password: password
    }
    resetPasswordService(params)
      .then((data) => {
        this.alertSuccess(data.data.messages[0])
        this.props.history.push('/')
      })
      .catch((e) => {
        this.alertError(e)
      });
    e.preventDefault();
  }

  alertSuccess = (e) => {
    toast.success(e)
  };

  alertError = (e) => {
    toast.error(e)
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

                      <form
                        className="form-horizontal mt-4"
                        onSubmit={this.handleSubmit}>
                        <div className="form-group">
                          <input
                            name="email"
                            className="form-control"
                            placeholder="E-mail"
                            type="email"
                            ref={node => (this.inputNode = node)}
                            required
                            value={paramsUrl.email}
                            disabled
                          />
                        </div>
                        <div className="form-group">
                          <input
                            name="password"
                            className="form-control"
                            type="password"
                            id="example-text-input"
                            ref={node => (this.inputNode = node)}
                            required
                            autoComplete="new-password"
                            placeholder="Password Baru"
                          />
                        </div>
                        <div className="form-group">
                          <input
                            name="confirmPassword"
                            className="form-control"
                            type="password"
                            id="confirmPass"
                            ref={node => (this.inputNode = node)}
                            required
                            autoComplete="new-password"
                            placeholder="Konfirmasi Password Baru"
                          />
                        </div>
                        <br /><br />
                        <div className="button-items">
                          <Button
                            color="primary"
                            className="btn btn-primary btn-block waves-effect waves-light">
                            Reset
                                </Button>

                        </div>
                      </form>
                    </div>
                  </CardBody>
                </Card>
                <div className="mt-5 text-center">

                  <p className="mb-0">
                    © {new Date().getFullYear()} Dinas Pendidikan Kab. Kerinci
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
