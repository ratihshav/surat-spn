import React, { Component } from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  CardText,
  Row,
  Col,
  CardBody,
  Button
} from "reactstrap";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classnames from "classnames";
import Select from "react-select";

import {
  getDetailUserService,
  updateMasterUserService
} from '../../helpers/master/user';
import { getMasterPositionServices } from '../../helpers/master/position'
import toast from '../UI/toast';

// import images
import config from '../../helpers/config'
import "chartist/dist/scss/chartist.scss";


class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataUser: [],
      activeTabJustify: "1",
      dataPosition: [],
      selectedPosition: null,
      selectedGender: null
    };

  }

  componentDidMount() {
    const idUser = window.localStorage.getItem('id');

    this.getDetailUser(idUser)
    this.getDataPosition()
  }

  getDetailUser = (idUser) => {
    getDetailUserService(idUser)
      .then((data) => {
        this.setState({
          dataUser: data.data.data
        })
      })
      .catch(() => { throw 'Gagal Mengubah Data'; })
  }

  getDataPosition = () => {
    getMasterPositionServices()
      .then((data) => {
        this.setState({
          dataPosition: data.data
        })
      })
      .catch(() => { throw 'Gagal Mengubah Data'; })
  }

  submitUpdatedData = (e) => {
    const params = {
      position_id: e.target.type.value,
      username: e.target.username.value,
      full_name: e.target.fullName.value,
      nip: e.target.idEmployee.value,
      email: e.target.email.value,
      ttl: e.target.birthDate.value,
      phone: e.target.phone.value,
      address: e.target.address.value,
      jenis_kelamin: e.target.gender.value
    }

    updateMasterUserService(params)
      .then((data) => {
        this.alertSuccess()
        this.props.history.push('/user');
      })
      .catch(() => {
        return (
          this.alertError()
        )
      });
    e.preventDefault()
  }

  alertSuccess = () => {
    toast.success('Sukses menyimpan data!')
  };

  alertError = () => {
    toast.error('Gagal menyimpan data')
  }

  goToChangePassword = () => {
    const data = this.props.location.params
    this.props.history.push({
      pathname: '/profile-change-password',
      params: data,
    });
  }

  goToChangePhoto = () => {
    const data = this.props.location.params
    this.props.history.push({
      pathname: '/profile-change-photo',
      params: data,
    });
  }

  goToChangeSignature = () => {
    this.props.history.push('/profile-signature')
  }

  toggleCustomJustified = (tab) => {
    if (this.state.activeTabJustify !== tab) {
      this.setState({
        activeTabJustify: tab
      });
    }
  }

  handleSelectPosition = selectedPosition => {
    this.setState({ selectedPosition })
  }

  handleSelectGroup = selectedGroup => {
    this.setState({ selectedGroup })
  }

  handleChangeGender = selectedGender => {
    this.setState({ selectedGender })
  }

  render() {
    const {
      dataUser,
      dataPosition,
      selectedPosition,
      selectedGender
    } = this.state;

    const optionsPosition = dataPosition.length !== 0 ?
      dataPosition.map(function (data) {
        return { value: data.id, label: data.position_name };
      })
      : null

    const defaValPosition = {
      value: dataUser.position_id,
      label: dataUser.position_name
    }

    return (
      <React.Fragment>
        <div className="container-fluid">
          <Row className="align-items-center">
            <Col sm={6}>
              <div className="page-title-box">
                <h4 className="font-size-18">Profil</h4>

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
                          src={config.url_img + dataUser.path_foto}
                          alt="foto_user"
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
                        <Button
                          color="primary"
                          className="btn btn-primary btn-block waves-effect waves-light"
                          onClick={this.goToChangeSignature}>
                          Ganti Tanda Tangan
                        </Button>
                      </div>
                    </Col>
                    <Col md={8}>
                      <form action="#" onSubmit={this.submitUpdatedData}>
                        <Nav tabs className="nav-tabs-custom nav-justified">
                          <NavItem>
                            <NavLink
                              className={classnames({
                                active: this.state.activeTabJustify === "1"
                              })}
                              onClick={() => {
                                this.toggleCustomJustified("1");
                              }}
                            >
                              <span class="d-none d-sm-block">Data Pribadi</span>
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink
                              className={classnames({
                                active: this.state.activeTabJustify === "6"
                              })}
                              onClick={() => {
                                this.toggleCustomJustified("6");
                              }}
                            >
                              <span class="d-none d-sm-block">Data Jabatan</span>
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink
                              className={classnames({
                                active: this.state.activeTabJustify === "7"
                              })}
                              onClick={() => {
                                this.toggleCustomJustified("7");
                              }}
                            >
                              <span class="d-none d-sm-block">Data Divisi</span>
                            </NavLink>
                          </NavItem>
                        </Nav>

                        <TabContent activeTab={this.state.activeTabJustify}>
                          <TabPane tabId="1" className="p-3">
                            <Row>
                              <Col sm="12">
                                <CardText>
                                  <Row className="form-group">
                                    <label
                                      htmlFor="example-text-input"
                                      className="col-sm-2 col-form-label">
                                      NIP
                                    </label>
                                    <Col sm={10}>
                                      <input
                                        className="form-control"
                                        type="text"
                                        defaultValue={dataUser.nip}
                                        id="example-text-input"
                                        name="idEmployee"
                                        ref={node => (this.inputNode = node)}
                                        required
                                        disabled
                                      />
                                    </Col>
                                  </Row>
                                </CardText>
                              </Col>
                            </Row>

                            <Row>
                              <Col sm="12">
                                <CardText>
                                  <Row className="form-group">
                                    <label
                                      htmlFor="example-text-input"
                                      className="col-sm-2 col-form-label">
                                      Nama Lengkap
                                     </label>
                                    <Col sm={10}>
                                      <input
                                        className="form-control"
                                        type="text"
                                        defaultValue={dataUser.full_name}
                                        id="example-text-input"
                                        name="fullName"
                                        ref={node => (this.inputNode = node)}
                                        required
                                      />
                                    </Col>
                                  </Row>
                                </CardText>
                              </Col>
                            </Row>

                            <Row>
                              <Col sm="12">
                                <CardText>
                                  <Row className="form-group">
                                    <label
                                      htmlFor="example-text-input"
                                      className="col-sm-2 col-form-label">
                                      Username
                                    </label>
                                    <Col sm={10}>
                                      <input
                                        className="form-control"
                                        type="text"
                                        defaultValue={dataUser.username}
                                        id="example-text-input"
                                        name="username"
                                        ref={node => (this.inputNode = node)}
                                        required
                                        disabled
                                      />
                                    </Col>
                                  </Row>

                                  <Row>
                                    <Col sm="12">
                                      <CardText>
                                        <Row className="form-group">
                                          <label
                                            htmlFor="example-text-input"
                                            className="col-sm-2 col-form-label">
                                            E-mail
                                          </label>
                                          <Col sm={10}>
                                            <input
                                              className="form-control"
                                              type="email"
                                              defaultValue={dataUser.email}
                                              id="example-text-input"
                                              name="email"
                                              ref={node => (this.inputNode = node)}
                                              required
                                              disabled
                                            />
                                          </Col>
                                        </Row>
                                      </CardText>
                                    </Col>
                                  </Row>

                                  <Row className="form-group">
                                    <label
                                      htmlFor="example-text-input"
                                      className="col-sm-2 col-form-label">
                                      Tanggal Lahir
                                    </label>
                                    <Col sm={10}>
                                      <input
                                        className="form-control"
                                        type="date"
                                        defaultValue={dataUser.ttl}
                                        id="example-text-input"
                                        name="birthDate"
                                        ref={node => (this.inputNode = node)}
                                      />
                                    </Col>
                                  </Row>

                                  <Row>
                                    <Col sm="12">
                                      <Row className="form-group">
                                        <label
                                          htmlFor="example-text-input"
                                          className="col-sm-2 col-form-label">
                                          Jenis Kelamin
                                           </label>
                                        <Col sm={10}>
                                          <input
                                            type="radio"
                                            id="male"
                                            name="gender"
                                            value="Laki-laki"
                                            checked={dataUser.jenis_kelamin === 'Laki-laki'}
                                            onChange={this.handleChangeGender}
                                            ref={node => (this.inputNode = node)} />&nbsp;
                                            <label htmlFor="accept"> Laki-laki</label>

                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                                            <input
                                            type="radio"
                                            id="female"
                                            name="gender"
                                            value="Perempuan"
                                            checked={dataUser.jenis_kelamin === 'Perempuan'}
                                            onChange={this.handleChangeGender}
                                            ref={node => (this.inputNode = node)} />&nbsp;
                                            <label htmlFor="reject"> Perempuan</label>
                                        </Col>
                                      </Row>
                                    </Col>
                                  </Row>

                                  <Row className="form-group">
                                    <label
                                      htmlFor="example-text-input"
                                      className="col-sm-2 col-form-label">
                                      No. Handphone
                                    </label>
                                    <Col sm={10}>
                                      <input
                                        className="form-control"
                                        type="text"
                                        defaultValue={dataUser.phone}
                                        id="example-text-input"
                                        name="phone"
                                        ref={node => (this.inputNode = node)}
                                      />
                                    </Col>
                                  </Row>

                                  <Row className="form-group">
                                    <label
                                      htmlFor="example-text-input"
                                      className="col-sm-2 col-form-label">
                                      Alamat
                                    </label>
                                    <Col sm={10}>
                                      <textarea
                                        className="form-control"
                                        id="w3review"
                                        name="address"
                                        rows="4"
                                        cols="50"
                                        defaultValue={dataUser.address}
                                        ref={node => (this.inputNode = node)} />
                                    </Col>
                                  </Row>

                                  <Row className="form-group">
                                    <label
                                      htmlFor="example-text-input"
                                      className="col-sm-2 col-form-label">
                                      Tanda Tangan
                                    </label>
                                    <Col sm={10}>
                                      <img
                                        className="img-fluid"
                                        width="200"
                                        height="200"
                                        src={dataUser.ttd}
                                        name="ttd" />
                                    </Col>
                                  </Row>
                                </CardText>
                              </Col>
                            </Row>
                          </TabPane>

                          <TabPane tabId="6" className="p-3">
                            <Row>
                              <Col sm="12">
                                <Row className="form-group">
                                  <label
                                    htmlFor="example-search-input"
                                    className="col-sm-2 col-form-label">
                                    Nama Jabatan
                                  </label>
                                  <Col sm={10}>
                                    <Select
                                      value={selectedPosition === null ? dataUser.position_id : selectedPosition}
                                      placeholder={[dataUser.position_name]}

                                      defaultValue={defaValPosition}
                                      onChange={this.handleSelectPosition}
                                      options={optionsPosition}
                                      name="type"
                                      ref={node => (this.inputNode = node)}
                                    />
                                  </Col>
                                </Row>
                              </Col>
                            </Row>
                          </TabPane>

                          <TabPane tabId="7" className="p-3">
                            <Row>
                              <Col sm="12">
                                <CardText>
                                  <Row className="form-group">
                                    <label
                                      htmlFor="example-text-input"
                                      className="col-sm-2 col-form-label">
                                      Nama Divisi
                                          </label>
                                    <Col sm={10}>
                                      <input
                                        className="form-control"
                                        type="email"
                                        defaultValue={dataUser.group_name}
                                        id="example-text-input"
                                        name="group"
                                        ref={node => (this.inputNode = node)}
                                        required
                                        disabled
                                      />
                                    </Col>
                                  </Row>
                                </CardText>
                              </Col>
                            </Row>

                          </TabPane>
                        </TabContent>
                        <div className="text-right mt-4">
                          <Button
                            color="success"
                            className="mt-1">
                            <i className="typcn typcn-input-checked" />Simpan
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

export default withRouter(connect()(Profile));