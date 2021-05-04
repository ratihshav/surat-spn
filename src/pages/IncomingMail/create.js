import React, { Component } from "react";
import { Row, Col, Card, CardBody, Button, Toast } from "reactstrap"
import Select from "react-select";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { createIncomingMailService } from "../../helpers/master/incomingMail"
import { searchUserSMService } from "../../helpers/master/user"
import { getMasterGroupServices } from "../../helpers/master/group"
import { searchMasterClassService } from '../../helpers/master/classification'
import { searchMasterCharMailService } from "../../helpers/master/charMail"
import { searchMasterTypeMailService } from "../../helpers/master/typeMail"
import toast from '../UI/toast';

class IncomingMailCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedUrgency: null,
      selectedFile: null,
      selectedSignature: null,
      selectedSubmit: null,
      selectedType: null,
      selectedClass: null,
      dataGroup: [],
      dataUser: [],
      dataClass: [],
      dataSifatSurat: [],
      dataTipeSurat: []
    };
  }

  componentDidMount() {
    this.getDataUser()
    this.getDataClass()
    this.getSifatSurat()
    this.getTipeSurat()
  }

  getTipeSurat = () => {
    searchMasterTypeMailService()
      .then((data) => {
        this.setState({ dataTipeSurat: data.data.data })
      })
      .catch((e) => { throw e });
  }

  getSifatSurat = () => {
    searchMasterCharMailService()
      .then((data) => {
        this.setState({ dataSifatSurat: data.data.data })
      })
      .catch((e) => { throw e });
  }

  getDataClass = () => {
    searchMasterClassService()
      .then((data) => {
        this.setState({
          dataClass: data.data.data
        })
      })
      .catch((e) => { throw e });
  }

  getDataUser = () => {
    searchUserSMService()
      .then((data) => {
        this.setState({ dataUser: data.data.data })
      })
      .catch((e) => { throw e });
  }

  getDataGroup = () => {
    getMasterGroupServices()
      .then((data) => {
        this.setState({
          dataGroup: data.data
        })
      })
      .catch((e) => { throw e })
  }

  handleSelectType = selectedType => {
    this.setState({ selectedType });
  };

  handleSelectClass = selectedClass => {
    this.setState({ selectedClass });
  };

  handleSelectUrgency = selectedUrgency => {
    this.setState({ selectedUrgency })
  }

  handleSelectSignature = selectedSignature => {
    this.setState({ selectedSignature })
  }

  handleSelectSubmit = selectedSubmit => {
    this.setState({ selectedSubmit })
  }

  onFileChange = event => {
    this.setState({ selectedFile: event.target.files[0] });
  };

  saveIncomingMail = (e) => {
    const params = {
      asal_surat: e.target.origin.value,
      perihal: e.target.subject.value,
      nomor_surat: e.target.numMail.value,
      tgl_surat: e.target.date.value,
      to_user_id: e.target.sendto.value,
      sifat_surat: e.target.urgency.value,
      lampiran: e.target.attachment.value,
      jenis_surat: e.target.type.value,
      klasifikasi_id: e.target.classification.value,
      keterangan: e.target.description.value,
      file: this.state.selectedFile
    }

    createIncomingMailService(params)
      .then((data) => {
        this.alertSuccess()
        this.props.history.push('/incoming-mail');
      })
      .catch((e) => {
        return (
          this.alertError(e)
        )
      });
    e.preventDefault();
  }

  alertSuccess = () => {
    toast.success('Sukses menyimpan data!')
  };

  alertError = (e) => {
    toast.error(e)
  }

  goBack = () => {
    this.props.history.push('/incoming-mail')
  }

  render() {
    const {
      selectedUrgency,
      selectedFile,
      dataUser,
      selectedSubmit,
      selectedType,
      selectedClass,
      dataClass,
      dataTipeSurat,
      dataSifatSurat
    } = this.state;

    const optionsSubmit = dataUser.length !== 0 ?
      dataUser.map(function (data) {
        return { value: data.id, label: data.text };
      })
      : null

    const optionsClass = dataClass.length !== 0 ?
      dataClass.map(function (data) {
        return { value: data.id, label: data.text };
      })
      : null

    const optionsTipe = dataTipeSurat.length !== 0 ?
      dataTipeSurat.map(function (data) {
        return { value: data.text, label: data.text };
      })
      : 'Tidak ada data'

    const optionsSifat = dataSifatSurat.length !== 0 ?
      dataSifatSurat.map(function (data) {
        return { value: data.text, label: data.text };
      })
      : 'Tidak ada data'

    return (
      <React.Fragment>
        <div className="container-fluid">
          <Row className="align-items-center">
            <Col sm={6}>
              <div className="page-title-box">
                <h4 className="font-size-18">Buat Surat Masuk</h4>
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <Link to="#">Surat</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="/incoming-mail">Surat Masuk</Link>
                  </li>
                  <li className="breadcrumb-item active">Buat Surat Masuk</li>
                </ol>
              </div>
            </Col>
          </Row>

          <form action="#" onSubmit={this.saveIncomingMail}>
            <Row>
              <div className="col-12">
                <Card>
                  <CardBody>
                    <Row className="form-group">
                      <label
                        htmlFor="origin"
                        className="col-sm-2 col-form-label">
                        Asal Surat
                      </label>
                      <Col sm={10}>
                        <input
                          name="origin"
                          className="form-control"
                          type="text"
                          id="origin"
                          ref={node => (this.inputNode = node)}
                          required
                        />
                      </Col>
                    </Row>

                    <Row className="form-group">
                      <label
                        htmlFor="subject"
                        className="col-sm-2 col-form-label">
                        Perihal
                      </label>
                      <Col sm={10}>
                        <input
                          className="form-control"
                          type="text"
                          id="subject"
                          name="subject"
                          ref={node => (this.inputNode = node)}
                          required
                        />
                      </Col>
                    </Row>

                    <Row className="form-group">
                      <label
                        htmlFor="numMail"
                        className="col-sm-2 col-form-label">
                        Nomor Surat
                      </label>
                      <Col sm={10}>
                        <input
                          className="form-control"
                          type="text"
                          id="numMail"
                          name="numMail"
                          ref={node => (this.inputNode = node)}
                          required
                        />
                      </Col>
                    </Row>

                    <Row className="form-group">
                      <label
                        htmlFor="date"
                        className="col-sm-2 col-form-label"
                      >
                        Tanggal Surat
                    </label>
                      <Col sm={10}>
                        <input
                          className="form-control"
                          type="date"
                          id="date"
                          name="date"
                          ref={node => (this.inputNode = node)}
                        />
                      </Col>
                    </Row>

                    <Row className="form-group">
                      <label
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
                          required
                        />
                      </Col>
                    </Row>

                    <Row className="form-group">
                      <label className="col-sm-2 col-form-label">
                        Tipe Surat
                    </label>
                      <Col sm={10}>
                        <Select
                          value={selectedType}
                          onChange={this.handleSelectType}
                          options={optionsTipe}
                          name="type"
                          ref={node => (this.inputNode = node)}
                          required
                        />
                      </Col>
                    </Row>

                    <Row className="form-group">
                      <label
                        className="col-sm-2 col-form-label"
                      >
                        Sifat Surat
                    </label>
                      <Col sm={10}>
                        <Select
                          value={selectedUrgency}
                          onChange={this.handleSelectUrgency}
                          options={optionsSifat}
                          name="urgency"
                          ref={node => (this.inputNode = node)}
                          required
                        />
                      </Col>
                    </Row>
                    <Row className="form-group">
                      <label
                        htmlFor="attachment"
                        className="col-sm-2 col-form-label"
                      >
                        Lampiran Surat
                    </label>
                      <Col sm={10}>
                        <input
                          className="form-control"
                          type="text"
                          defaultValue=""
                          id="attachment"
                          name="attachment"
                          ref={node => (this.inputNode = node)}
                          required
                        />
                      </Col>
                    </Row>

                    <Row className="form-group">
                      <label
                        className="col-sm-2 col-form-label"
                      >
                        Klasifikasi Surat
                    </label>
                      <Col sm={10}>
                        <Select
                          value={selectedClass}
                          onChange={this.handleSelectClass}
                          options={optionsClass}
                          name="classification"
                          ref={node => (this.inputNode = node)}
                          required
                        />
                      </Col>
                    </Row>

                    <Row className="form-group">
                      <label
                        htmlFor="description"
                        className="col-sm-2 col-form-label">
                        Keterangan
                      </label>
                      <Col sm={10}>
                        <input
                          name="description"
                          className="form-control"
                          type="text"
                          id="description"
                          ref={node => (this.inputNode = node)}
                          required
                        />
                      </Col>
                    </Row>

                    <Row className="form-group">
                      <label
                        className="col-sm-2 col-form-label"
                      >
                        Dokumen
                    </label>
                      <Col sm={10}>
                        <form action="#">
                          <div className="custom-file">
                            <input
                              type="file"
                              className="form-control"
                              id="dokumen"
                              required
                              onChange={this.onFileChange}
                              accept=".pdf"
                              name="file"
                              ref={node => (this.inputNode = node)}
                            />
                            <label
                              className="custom-file-label"
                              htmlFor="dokumen"
                              style={{ zIndex: 0 }}>
                              {selectedFile !== null && selectedFile !== undefined ? selectedFile.name : 'No file chosen'}
                            </label>
                          </div>
                        </form>
                      </Col>
                    </Row>

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

export default connect()(IncomingMailCreate);
