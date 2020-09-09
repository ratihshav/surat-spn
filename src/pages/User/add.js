import React, { Component } from "react";
import { Row, Col, Card, CardBody, Button, Label, Input } from "reactstrap";
import Select from "react-select";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { searchPositionService } from "../../helpers/master/position"
import { saveMasterUserService } from "../../helpers/master/user"
import toast from '../UI/toast';

class UserAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPosition: null,
      dataUser: [],
      dataPosition: []
    };

    this.input = React.createRef();
  }

  componentDidMount() {
    this.getDataPosition()
  }

  handleSelectPosition = selectedPosition => {
    this.setState({ selectedPosition });
  };

  saveNewUser = (e) => {
    const params = {
      position_id: e.target.type.value,
      username: e.target.username.value,
      full_name: e.target.fullName.value,
      nip: e.target.idEmployee.value,
      email: e.target.email.value,
      ttl: e.target.birthDate.value,
      password: e.target.password.value,
      phone: e.target.phone.value,
      address: e.target.address.value,
      jenis_kelamin: this.input.current.value
    }

    saveMasterUserService(params)
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

  getDataPosition = () => {
    searchPositionService()
      .then((data) => {
        this.setState({
          dataPosition: data.data.data
        })
      })
      .catch(() => { throw 'Gagal Mengambil Data' })
  }

  alertSuccess = () => {
    toast.success('Sukses menyimpan data!')
  };

  alertError = (e) => {
    toast.error(e)
  }

  goBack = () => {
    this.props.history.push('/user')
  }

  render() {
    const {
      selectedPosition,
      dataPosition } = this.state;


    const optionsPosition = dataPosition.length !== 0 ?
      dataPosition.map((data) => {
        return { value: data.id, label: data.text };
      })
      : null


    return (
      <React.Fragment>
        <div className="container-fluid">
          <Row className="align-items-center">
            <Col sm={6}>
              <div className="page-title-box">
                <h4 className="font-size-18">Tambah User Baru</h4>
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <Link to="/user">User</Link>
                  </li>
                  <li className="breadcrumb-item active">Tambah User Baru</li>
                </ol>
              </div>
            </Col>
          </Row>

          <form action="#" onSubmit={this.saveNewUser}>
            <Row>
              <div className="col-12">
                <Card>
                  <CardBody>

                    <Row className="form-group">
                      <label className="col-sm-2 col-form-label">
                        Jabatan
                    </label>
                      <Col sm={10}>
                        <Select
                          value={selectedPosition}
                          onChange={this.handleSelectPosition}
                          options={optionsPosition}
                          name="type"
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
                        Username
                    </label>
                      <Col sm={10}>
                        <input
                          name="username"
                          className="form-control"
                          type="text"
                          defaultValue=""
                          id="example-text-input"
                          ref={node => (this.inputNode = node)}
                        />
                      </Col>
                    </Row>

                    <Row className="form-group">
                      <label
                        htmlFor="example-text-input"
                        className="col-sm-2 col-form-label"
                      >
                        Nama Lengkap
                    </label>
                      <Col sm={10}>
                        <input
                          className="form-control"
                          type="text"
                          defaultValue="Izin Penggunaan Website"
                          id="example-text-input"
                          name="fullName"
                          ref={node => (this.inputNode = node)}
                        />
                      </Col>
                    </Row>

                    <Row className="form-group">
                      <label
                        htmlFor="example-text-input"
                        className="col-sm-2 col-form-label"
                      >
                        Jenis Kelamin
                    </label>
                      <Col sm={10}>
                        <div className="custom-control custom-radio custom-control-inline">
                          <Input
                            type="radio"
                            id="customRadioInline1"
                            name="customRadioInline1"
                            className="custom-control-input"
                            innerRef={this.input}
                            value="laki-laki"
                          />
                          <Label
                            className="custom-control-label"
                            for="customRadioInline1"
                          >
                            Laki-laki
                            </Label>
                        </div>
                          &nbsp;
                          <div className="custom-control custom-radio custom-control-inline">
                          <Input
                            type="radio"
                            id="customRadioInline2"
                            name="customRadioInline1"
                            className="custom-control-input"
                            innerRef={this.input}
                            value="perempuan"
                          />
                          <Label
                            className="custom-control-label"
                            for="customRadioInline2"
                          >
                            Perempuan
                            </Label>
                        </div>
                      </Col>
                    </Row>

                    <Row className="form-group">
                      <label
                        htmlFor="example-text-input"
                        className="col-sm-2 col-form-label"
                      >
                        NIP
                    </label>
                      <Col sm={10}>
                        <input
                          className="form-control"
                          type="number"
                          defaultValue=""
                          id="example-text-input"
                          name="idEmployee"
                          ref={node => (this.inputNode = node)}
                        />
                      </Col>
                    </Row>

                    <Row className="form-group">
                      <label
                        htmlFor="example-text-input"
                        className="col-sm-2 col-form-label"
                      >
                        E-mail
                    </label>
                      <Col sm={10}>
                        <input
                          className="form-control"
                          type="email"
                          defaultValue=""
                          id="example-text-input"
                          name="email"
                          ref={node => (this.inputNode = node)}
                        />
                      </Col>
                    </Row>

                    <Row className="form-group">
                      <label
                        htmlFor="example-text-input"
                        className="col-sm-2 col-form-label"
                      >
                        Tanggal Lahir
                    </label>
                      <Col sm={10}>
                        <input
                          className="form-control"
                          type="date"
                          defaultValue=""
                          id="example-text-input"
                          name="birthDate"
                          ref={node => (this.inputNode = node)}
                        />
                      </Col>
                    </Row>

                    <Row className="form-group">
                      <label
                        htmlFor="example-text-input"
                        className="col-sm-2 col-form-label"
                      >
                        Password
                    </label>
                      <Col sm={10}>
                        <input
                          className="form-control"
                          type="password"
                          defaultValue=""
                          id="example-text-input"
                          name="password"
                          ref={node => (this.inputNode = node)}
                        />
                      </Col>
                    </Row>

                    <Row className="form-group">
                      <label
                        htmlFor="example-text-input"
                        className="col-sm-2 col-form-label"
                      >
                        No. Handphone
                    </label>
                      <Col sm={10}>
                        <input
                          className="form-control"
                          type="text"
                          defaultValue=""
                          id="example-text-input"
                          name="phone"
                          ref={node => (this.inputNode = node)}
                        />
                      </Col>
                    </Row>

                    <Row className="form-group">
                      <label
                        htmlFor="example-text-input"
                        className="col-sm-2 col-form-label"
                      >
                        Alamat
                    </label>
                      <Col sm={10}>
                        <textarea
                          className="form-control"
                          id="w3review"
                          name="address"
                          rows="4"
                          cols="50"
                          ref={node => (this.inputNode = node)} />
                      </Col>
                    </Row>

                    {/* <Row className="form-group">
                      <label
                        htmlFor="example-search-input"
                        className="col-sm-2 col-form-label"
                      >
                        Diajukan Kepada
                    </label>
                      <Col sm={10}>
                        <Select
                          value={selectedSubmit}
                          onChange={this.handleSelectSubmit}
                          options={optionsSubmit}
                          name="sendto"
                          ref={node => (this.inputNode = node)}
                        />
                      </Col>
                    </Row> */}


                    <div className="text-right mt-4">
                      <Button
                        color="success"
                        className="mt-1" >
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

export default connect()(UserAdd);
