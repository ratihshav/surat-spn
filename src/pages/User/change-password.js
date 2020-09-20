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
      confirmPassword: ''
    };
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
      this.changePassword(e)
    }
  }


  changePassword = (e) => {
    const idUser = window.localStorage.getItem('idUser');

    const params = {
      password: e.target.password.value,
      id: idUser
    }

    changePasswordUserService(params)
      .then((data) => {
        this.alertSuccess(data.data.messages[0])
        this.props.history.push('/user-edit');
      })
      .catch((e) => {
        return (
          this.alertError(e)
        )
      });
    e.preventDefault()
  }

  alertSuccess = (e) => {
    toast.success(e)
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


          <form action="your-action" onSubmit={this.handleSubmit}>
            <Row>
              <div className="col-12">
                <Card>
                  <CardBody>
                    <Row className="form-group">
                      <label
                        htmlFor="example-text-input"
                        className="col-sm-2 col-form-label"
                      >
                        Password Baru
                    </label>
                      <Col sm={10}>
                        <input
                          name="password"
                          className="form-control"
                          type="password"
                          id="example-text-input"
                          ref={node => (this.inputNode = node)}
                          required
                          autoComplete="new-password"
                        />
                      </Col>
                    </Row>

                    <Row className="form-group">
                      <label
                        htmlFor="confirmPass"
                        className="col-sm-2 col-form-label"
                      >
                        Konfirmasi Password Baru
                    </label>
                      <Col sm={10}>
                        <input
                          name="confirmPassword"
                          className="form-control"
                          type="password"
                          id="confirmPass"
                          ref={node => (this.inputNode = node)}
                          required
                          autoComplete="new-password"
                        />
                      </Col>
                    </Row>
                    <div className="text-right mt-4">
                      <Button
                        color="success"
                        className="mt-1">
                        <i className="typcn typcn-input-checked" />Simpan
                    </Button>
                    </div>

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