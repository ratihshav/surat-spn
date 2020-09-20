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
import { withRouter, Link } from "react-router-dom";
import classnames from "classnames";
import Select from "react-select";
import {
  getDetailUserService,
  updateMasterUserService
} from '../../helpers/master/user';
import { searchPositionService } from '../../helpers/master/position'
import toast from '../UI/toast';

// import images
import config from '../../helpers/config'
import "chartist/dist/scss/chartist.scss";
import userAva from "../../assets/images/users/avatar-1.jpg"

class UserEdit extends Component {
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
    const idUser = window.localStorage.getItem('idUser');

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
      .catch((e) => {
        return (
          this.alertError(e)
        )
      });
  }

  getDataPosition = () => {
    searchPositionService()
      .then((data) => {
        this.setState({
          dataPosition: data.data.data
        })
      })
      .catch(() => { throw 'Gagal Mengubah Data'; })
  }

  submitUpdatedData = (e) => {
    const { selectedPosition, dataUser } = this.state
    const params = {
      isFromEditUser: true,
      position_id: selectedPosition === null ? dataUser.position_id : e.target.type.value,
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

  handleChangeGender = e => {
    this.setState({ selectedGender: e.target.value })
  }

  goBack = () => {
    this.props.history.push('/user')
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
        return { value: data.id, label: data.text };
      })
      : null

    const defaValPosition = {
      value: dataUser.position_id,
      label: dataUser.position_name
    }
    const valMale = dataUser.length !== 0 ?
      dataUser.jenis_kelamin === 'Laki-laki' ? true : false
      : null

    const valFemale = dataUser.length !== 0 ?
      dataUser.jenis_kelamin === 'Perempuan' ? true : false
      : null

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
                          src={dataUser.path_foto ? config.url_img + dataUser.path_foto : userAva}
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
                      <form action="#" onSubmit={this.submitUpdatedData}>
                        <Nav tabs className="nav-tabs-custom nav-justified">
                          <NavItem style={{cursor: "pointer"}}>
                            <NavLink
                              className={classnames({
                                active: this.state.activeTabJustify === "1"
                              })}
                              onClick={() => {
                                this.toggleCustomJustified("1");
                              }}>
                              <span class="d-none d-sm-block">Data Pribadi</span>
                            </NavLink>
                          </NavItem>
                          <NavItem style={{cursor: "pointer"}}>
                            <NavLink
                              className={classnames({
                                active: this.state.activeTabJustify === "6"
                              })}
                              onClick={() => {
                                this.toggleCustomJustified("6");
                              }}>
                              <span class="d-none d-sm-block">Data Jabatan</span>
                            </NavLink>
                          </NavItem>
                          <NavItem style={{cursor: "pointer"}}>
                            <NavLink
                              className={classnames({
                                active: this.state.activeTabJustify === "7"
                              })}
                              onClick={() => {
                                this.toggleCustomJustified("7");
                              }}>
                              <span class="d-none d-sm-block">Data Unit</span>
                            </NavLink>
                          </NavItem>
                        </Nav>

                        <TabContent activeTab={this.state.activeTabJustify}>
                          <TabPane tabId="1" className="p-3">
                            <Row>
                              <Col sm="12">
                                <CardText>
                                  <Row className="form-group">
                                    <label htmlFor="idEmployee"
                                      className="col-sm-2 col-form-label"> NIP
                                    </label>
                                    <Col sm={10}>
                                      <input className="form-control"
                                        type="text"
                                        defaultValue={dataUser.nip}
                                        id="idEmployee"
                                        name="idEmployee"
                                        ref={node => (this.inputNode = node)}
                                        style={{backgroundColor: "#cdcbcb9c"}}
                                        readOnly
                                      />
                                    </Col>
                                  </Row>
                                  <Row className="form-group">
                                    <label htmlFor="username"
                                      className="col-sm-2 col-form-label"> Username
                                    </label>
                                    <Col sm={10}>
                                      <input className="form-control"
                                        type="text"
                                        defaultValue={dataUser.username}
                                        id="username"
                                        name="username"
                                        ref={node => (this.inputNode = node)}
                                        style={{backgroundColor: "#cdcbcb9c"}}
                                        readOnly
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
                                    <label htmlFor="fullName"
                                      className="col-sm-2 col-form-label"> Nama Lengkap
                                     </label>
                                    <Col sm={10}>
                                      <input className="form-control"
                                        type="text"
                                        defaultValue={dataUser.full_name}
                                        id="fullName"
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
                                  <Row>
                                    <Col sm="12">
                                      <CardText>
                                        <Row className="form-group">
                                          <label htmlFor="email"
                                            className="col-sm-2 col-form-label"> E-mail
                                          </label>
                                          <Col sm={10}>
                                            <input className="form-control"
                                              type="email"
                                              defaultValue={dataUser.email}
                                              id="email"
                                              name="email"
                                              ref={node => (this.inputNode = node)}
                                              required />
                                          </Col>
                                        </Row>
                                      </CardText>
                                    </Col>
                                  </Row>

                                  <Row className="form-group">
                                    <label htmlFor="birthDate"
                                      className="col-sm-2 col-form-label"> Tanggal Lahir
                                    </label>
                                    <Col sm={10}>
                                      <input className="form-control"
                                        type="date"
                                        defaultValue={dataUser.ttl}
                                        id="birthDate"
                                        name="birthDate"
                                        ref={node => (this.inputNode = node)} />
                                    </Col>
                                  </Row>

                                  <Row>
                                    <Col sm="12">
                                      <Row className="form-group">
                                        <label htmlFor="gender"
                                          className="col-sm-2 col-form-label"> Jenis Kelamin
                                        </label>
                                        <Col sm={10}>
                                          <input type="radio"
                                            id="male"
                                            name="gender"
                                            value="Laki-laki"
                                            defaultChecked={valMale}
                                            onChange={this.handleChangeGender}
                                            ref={node => (this.inputNode = node)} />&nbsp;
                                          <label htmlFor="male"> Laki-laki</label>
                                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                          <input type="radio"
                                            id="female"
                                            name="gender"
                                            value="Perempuan"
                                            defaultChecked={valFemale}
                                            onChange={this.handleChangeGender}
                                            ref={node => (this.inputNode = node)} />&nbsp;
                                          <label htmlFor="female"> Perempuan</label>
                                        </Col>
                                      </Row>
                                    </Col>
                                  </Row>

                                  <Row className="form-group">
                                    <label htmlFor="phone"
                                      className="col-sm-2 col-form-label"> No. Handphone
                                    </label>
                                    <Col sm={10}>
                                      <input className="form-control"
                                        type="text"
                                        defaultValue={dataUser.phone}
                                        id="phone"
                                        name="phone"
                                        ref={node => (this.inputNode = node)} />
                                    </Col>
                                  </Row>

                                  <Row className="form-group">
                                    <label htmlFor="address"
                                      className="col-sm-2 col-form-label"> Alamat
                                    </label>
                                    <Col sm={10}>
                                      <textarea
                                        className="form-control"
                                        id="address"
                                        name="address"
                                        rows="4"
                                        cols="50"
                                        defaultValue={dataUser.address}
                                        ref={node => (this.inputNode = node)} />
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
                                  <label className="col-sm-2 col-form-label">
                                    Nama Jabatan
                                  </label>
                                  <Col sm={10}>
                                    <Select value={selectedPosition}
                                      placeholder={[dataUser.position_name]}
                                      defaultValue={defaValPosition}
                                      onChange={this.handleSelectPosition}
                                      options={optionsPosition}
                                      name="type"
                                      ref={node => (this.inputNode = node)} />
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
                                    <label htmlFor="group"
                                      className="col-sm-2 col-form-label"> Unit Kerja 
                                    </label>
                                    <Col sm={10}>
                                      <input className="form-control"
                                        type="text"
                                        defaultValue={dataUser.group_name}
                                        id="group"
                                        name="group"
                                        ref={node => (this.inputNode = node)}
                                        style={{backgroundColor: "#cdcbcb9c"}}
                                        readOnly />
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
                          &nbsp; &nbsp;
                          <Button
                            color="grayMed"
                            className="mt-1"
                            onClick={this.goBack}>
                            <i className="ion ion-md-arrow-round-back" /> Kembali
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

export default withRouter(UserEdit);