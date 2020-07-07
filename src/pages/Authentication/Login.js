import React, { Component } from "react";
import { Row, Col, Card, CardBody, Alert, Button } from "reactstrap";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { AvForm, AvField } from "availity-reactstrap-validation";
import Loader from "../../components/Loader";
import { loginUser, loginUserSuccess, loginUserFail } from "../../store/actions";
import logoKabKerinci from "../../assets/images/logo-kab-kerinci.png"

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleValidSubmit = (event, values) => {
    this.props.loginUser(values);
  }



  render() {

    return (
      < React.Fragment >
        <div>
          <div className="account-pages my-5 pt-5">
            <div className="container">
              <Row className="justify-content-center">
                <Col md={8} lg={6} xl={5}>
                  <div className="position-relative">
                    {this.props.loading ? <Loader /> : null}

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

                    {/* </div> */}
                    <Card className="overflow-hidden">
                      <div className="bg-primary">
                        <div className="text-primary text-center p-3">
                          <h5 className="text-white font-size-20">
                            Silahkan Masuk
                        </h5>
                        </div>
                      </div>

                      <CardBody className="p-4">
                        <div className="">
                          <Alert color="info">
                            <strong>Selamat Datang</strong> di e-Office Dinas Pendidikan Kabupaten Kerinci
                              </Alert>
                        </div>

                        <div className="p-2">
                          <AvForm
                            className="form-horizontal mt-4"
                            onValidSubmit={this.handleValidSubmit}
                          >
                            {this.props.error ? (
                              <Alert color="danger">{this.props.error}</Alert>
                            ) : null}

                            <div className="form-group">
                              <AvField
                                name="email"
                                label="Email"
                                className="form-control"
                                defaultValue="admin@ratafd.xyz"
                                value=""
                                placeholder="Enter email"
                                required
                              />
                            </div>
                            <div className="form-group">
                              <AvField
                                name="password"
                                label="Password"
                                type="password"
                                defaultValue="admin"
                                required
                                value=""
                                placeholder="Enter Password"
                              />
                            </div>

                            <Row className="form-group">
                              <Col sm={6}>
                                <div className="custom-control custom-checkbox">
                                  <input type="checkbox" className="custom-control-input" id="customControlInline" />
                                  <label className="custom-control-label" htmlFor="customControlInline">Ingat Saya</label>
                                </div>
                              </Col>
                              <Col sm={6} className="text-right">
                                <Link to="/forget-password">
                                  <i className="mdi mdi-lock"></i> Lupa
                                  password?
                                    </Link>

                              </Col>
                            </Row>

                            <div className="button-items">
                              <Button
                                color="primary"
                                className="btn btn-primary btn-block waves-effect waves-light"
                              >
                                Log In
                                </Button>

                            </div>
                          </AvForm>
                        </div>
                      </CardBody>
                    </Card>
                  </div>
                  <div className="mt-5 text-center">
                    {/* <p>
                        Don't have an account ?{" "}
                        <Link
                          to="pages-register"
                          className="font-weight-medium text-primary"
                        >
                          {" "}
                          Signup now{" "}
                        </Link>{" "}
                      </p> */}
                    <p className="mb-0">
                      © {new Date().getFullYear()} Ikhwan Komputer. All Rights Reserved
                  </p>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </div>

      </React.Fragment>
    );
  }
}

const mapStatetoProps = state => {
  console.log('login', state.Login)
  const { error, loading, data } = state.Login;
  return { error, loading, data };
};

// const mapStatetoProps = (response) => ({response});

export default withRouter(connect(mapStatetoProps, { loginUser, loginUserSuccess, loginUserFail })(Login));
