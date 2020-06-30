import React, { Component } from "react";
import { Row, Col, Card, CardBody, Alert, Button } from "reactstrap";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { userForgetPassword } from "../../store/actions";
import logoKabKerinci from "../../assets/images/logo-kab-kerinci.png"
import { forgetPasswordService } from "../../helpers/master/user"
import toast from '../UI/toast';

class ForgetPasswordPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    // handleValidSubmit
    // this.handleValidSubmit = this.handleValidSubmit.bind(this);
  }

  // handleValidSubmit
  handleValidSubmit = (e, values) => {
    console.log('values', values)
    forgetPasswordService(values)
      .then((data) => {
        this.alertSuccess()
      })
      .catch(() => {
        this.alertError()
      });
    e.preventDefault();
  }

  alertSuccess = () => {
    toast.success('Sukses! Silahkan cek e-mail Anda')
  };

  alertError = () => {
    toast.error('Gagal')
  }

  render() {
    return (
      <React.Fragment>
        <div className="account-pages my-5 pt-5">
          <div className="container">
            <Row className="justify-content-center">
              <Col md={8} lg={6} xl={5}>
                <div className="position-relative">

                  <div className="text-primary text-center p-4">
                    <Link to="/" className="logo logo-admin">
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
                          Lupa Password
                        </h5>
                        <p className="text-white">
                          Masukkan e-mail Anda yang terdaftar. Kami akan mengirimkan kode verifikasi untuk atur ulang password ke e-mail Anda.
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
                          <div className="form-group">
                            <AvField
                              name="email"
                              className="form-control"
                              placeholder="Masukkan e-mail Anda"
                              type="email"
                              required
                            />
                          </div>
                          <br /><br />
                          <div className="button-items">
                            <Button
                              color="primary"
                              className="btn btn-primary btn-block waves-effect waves-light">
                              Kirim
                                </Button>

                          </div>
                        </AvForm>
                      </div>
                    </CardBody>
                  </Card>
                  <div className="mt-5 text-center">
                    <p>
                      Kembali ke{" "}
                      <Link
                        to="pages-login"
                        className="font-weight-medium text-primary"
                      >
                        Login
                      </Link>{" "}
                    </p>
                    <p className="mb-0">
                      © {new Date().getFullYear()} Ikhwan Komputer. All Rights Reserved
                  </p>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
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
  connect(mapStatetoProps, { userForgetPassword })(ForgetPasswordPage)
);
