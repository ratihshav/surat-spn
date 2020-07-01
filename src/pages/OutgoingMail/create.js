import React, { Component } from "react";
import { Row, Col, Card, CardBody, Button, Toast } from "reactstrap";
import Select from "react-select";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { getMasterGroupServices } from "../../helpers/master/group"
import { createOutgoingMailService } from "../../helpers/master/outgoingMail"
import { searchUserService } from "../../helpers/master/user"
import { searchMasterClassService } from '../../helpers/master/classification'
import toast from '../UI/toast';

const type = [
  {
    label: "Pilih Tipe Surat",
    options: [
      { label: "Surat Keterangan", value: "Surat Keterangan" },
      { label: "Surat Biasa", value: "Surat Biasa" },
      { label: "Surat Perintah", value: "Surat Perintah" }
    ]
  },
];

const urgency = [
  {
    label: "Pilih Sifat Surat",
    options: [
      { label: "Biasa", value: "Biasa" },
      { label: "Segera", value: "Segera" },
      { label: "Penting", value: "Penting" }
    ]
  }
]


class OutgoingMailCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedUrgency: null,
      selectedFile: null,
      selectedSignature: null,
      selectedSubmit: null,
      selectedType: null,
      selectedClass: null,
      dataClass: [],
      dataUser: []
    };
  }

  componentDidMount() {
    this.getDataUser()
    this.getDataClass()
  }

  getDataUser = () => {
    searchUserService()
      .then((data) => {
        this.setState({ dataUser: data.data.data })
      })
      .catch(() => { throw 'Gagal Mengubah Data'; });
  }

  getDataClass = () => {
    searchMasterClassService()
      .then((data) => {
        this.setState({
          dataClass: data.data.data
        })
      })
      .catch(() => { throw 'Gagal Mengubah Data'; });
  }

  handleSelectClass = selectedClass => {
    this.setState({ selectedClass });
  };

  handleSelectType = selectedType => {
    this.setState({ selectedType });
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

  saveOutgoingMail = (e) => {
    const params = {
      jenis_surat: e.target.type.value,
      klasifikasi_id: e.target.classification.value,
      sifat_surat: e.target.urgency.value,
      tujuan_surat: e.target.destination.value,
      hal_surat: e.target.subject.value,
      lampiran_surat: e.target.attachment.value,
      approval_user: e.target.approval.value,
      to_user: e.target.sendto.value,
      file: this.state.selectedFile
    }

    createOutgoingMailService(params)
      .then((data) => {
        this.alertSuccess()
        this.props.history.push('/outgoing-mail');
      })
      .catch(() => {
        return (
          this.alertError()
        )
      });
    e.preventDefault();
  }

  alertSuccess = () => {
    toast.success('Sukses menyimpan data!')
  };

  alertError = () => {
    toast.error('Gagal menyimpan data')
  }

  goBack = () => {
    this.props.history.push('/outgoing-mail')
  }

  render() {
    const {
      selectedUrgency,
      selectedFile,
      selectedSignature,
      selectedSubmit,
      dataUser,
      selectedType,
      selectedClass,
      dataClass } = this.state;

    const optionsSignature = dataUser.length !== 0 ?
      dataUser.map(function (data) {
        return { value: data.id, label: data.text };
      })
      : null

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

    return (
      <React.Fragment>
        <div className="container-fluid">
          <Row className="align-items-center">
            <Col sm={6}>
              <div className="page-title-box">
                <h4 className="font-size-18">Buat Surat Keluar</h4>
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <Link to="#">Surat</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="/outgoing-mail">Surat</Link>
                  </li>
                  <li className="breadcrumb-item active">Buat Surat Keluar</li>
                </ol>
              </div>
            </Col>
          </Row>

          <form action="#" onSubmit={this.saveOutgoingMail}>
            <Row>
              <div className="col-12">
                <Card>
                  <CardBody>

                    <Row className="form-group">
                      <label className="col-sm-2 col-form-label">
                        Tipe Surat
                    </label>
                      <Col sm={10}>
                        <Select
                          value={selectedType}
                          onChange={this.handleSelectType}
                          options={type}
                          name="type"
                          ref={node => (this.inputNode = node)}
                          required
                        />
                      </Col>
                    </Row>

                    <Row className="form-group">
                      <label
                        htmlFor="example-search-input"
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
                        htmlFor="example-search-input"
                        className="col-sm-2 col-form-label"
                      >
                        Sifat Surat
                    </label>
                      <Col sm={10}>
                        <Select
                          value={selectedUrgency}
                          onChange={this.handleSelectUrgency}
                          options={urgency}
                          name="urgency"
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
                        Tujuan Surat
                    </label>
                      <Col sm={10}>
                        <input
                          name="destination"
                          className="form-control"
                          type="text"
                          defaultValue="Ikhwan Komputer"
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
                        Hal Surat
                    </label>
                      <Col sm={10}>
                        <input
                          className="form-control"
                          type="text"
                          defaultValue="Izin Penggunaan Website"
                          id="example-text-input"
                          name="subject"
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
                        Lampiran Surat
                    </label>
                      <Col sm={10}>
                        <input
                          className="form-control"
                          type="text"
                          defaultValue=""
                          id="example-text-input"
                          name="attachment"
                          ref={node => (this.inputNode = node)}
                          required
                        />
                      </Col>
                    </Row>

                    <Row className="form-group">
                      <label
                        htmlFor="example-search-input"
                        className="col-sm-2 col-form-label"
                      >
                        Penandatanganan Surat
                    </label>
                      <Col sm={10}>
                        <Select
                          value={selectedSignature}
                          onChange={this.handleSelectSignature}
                          options={optionsSignature}
                          name="approval"
                          ref={node => (this.inputNode = node)}
                          required
                        />
                      </Col>
                    </Row>

                    <Row className="form-group">
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
                          required
                        />
                      </Col>
                    </Row>
                    <Row className="form-group">
                      <label
                        htmlFor="example-search-input"
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
                              id="validatedCustomFile"
                              required
                              onChange={this.onFileChange}
                              accept=".doc, .docx"
                              name="file"
                              ref={node => (this.inputNode = node)}
                            />
                            <label
                              className="custom-file-label"
                              htmlFor="validatedCustomFile"
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

export default connect()(OutgoingMailCreate);
