import React, { Component } from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  Button
} from "reactstrap";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { changePasswordUserService } from '../../helpers/master/user';
import toast from '../UI/toast';

class UserChangePassword extends Component {
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
    const idUser = window.localStorage.getItem('idUser');

    const params = {
      password: this.state.password,
      id: idUser
    }

    changePasswordUserService(params)
      .then((data) => {
        this.alertSuccess()
        this.props.history.push('/user-edit');
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
                    <Link to="/user">User</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="/user-edit">Edit User</Link>
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
                      <label
                        htmlFor="example-text-input"
                        className="col-sm-2 col-form-label"
                      >
                        Password
                    </label>
                      <Col sm={10}>
                        <input
                          name="destination"
                          className="form-control"
                          type="text"
                          id="example-text-input"
                          ref={node => (this.inputNode = node)}
                          required
                        />
                      </Col>
                    </Row>

                    <Row className="form-group">
                      <label
                        htmlFor="example-text-input"
                        className="col-sm-2 col-form-label"
                      >
                        Konfirmasi Password
                    </label>
                      <Col sm={10}>
                        <input
                          name="destination"
                          className="form-control"
                          type="text"
                          id="example-text-input"
                          ref={node => (this.inputNode = node)}
                          required
                        />
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

export default withRouter(connect()(UserChangePassword));