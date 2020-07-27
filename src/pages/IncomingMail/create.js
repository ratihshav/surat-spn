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
import toast from '../UI/toast';

// const type = [
//   {
//     label: "Pilih Tipe Surat",
//     options: [
//       { label: "Surat Keterangan", value: "Surat Keterangan" },
//       { label: "Surat Biasa", value: "Surat Biasa" },
//       { label: "Surat Perintah", value: "Surat Perintah" }
//     ]
//   },
// ];

//  for later
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
      dataClass: []
    };
  }

  componentDidMount() {
    this.getDataUser()
    this.getDataClass()
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

  getDataUser = () => {
    searchUserSMService()
      .then((data) => {
        this.setState({ dataUser: data.data.data })
      })
      .catch(() => { throw 'Gagal Mengubah Data'; });
  }

  getDataGroup = () => {
    getMasterGroupServices()
      .then((data) => {
        this.setState({
          dataGroup: data.data
        })
      })
      .catch(() => { throw 'Gagal Mengambil Data' })
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
      sifat_surat: e.target.type.value,
      lampiran: e.target.attachment.value,
      // prioritas: e.target.urgency.value,
      klasifikasi_id: e.target.classification.value,
      keterangan: e.target.description.value,
      file: this.state.selectedFile
    }

    createIncomingMailService(params)
      .then((data) => {
        this.alertSuccess()
        this.props.history.push('/incoming-mail');
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
      dataClass
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
                        htmlFor="example-text-input"
                        className="col-sm-2 col-form-label">
                        Asal Surat
                      </label>
                      <Col sm={10}>
                        <input
                          name="origin"
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
                        className="col-sm-2 col-form-label">
                        Perihal
                      </label>
                      <Col sm={10}>
                        <input
                          className="form-control"
                          type="text"
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
                        className="col-sm-2 col-form-label">
                        Nomor Surat
                      </label>
                      <Col sm={10}>
                        <input
                          className="form-control"
                          type="text"
                          id="example-text-input"
                          name="numMail"
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
                        Tanggal Surat
                    </label>
                      <Col sm={10}>
                        <input
                          className="form-control"
                          type="date"
                          id="example-text-input"
                          name="date"
                          ref={node => (this.inputNode = node)}
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

                    {/* for later */}
                    {/* <Row className="form-group">
                      <label
                        htmlFor="example-search-input"
                        className="col-sm-2 col-form-label"
                      >
                        Prioritas
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
                    </Row> */}

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
                        htmlFor="example-text-input"
                        className="col-sm-2 col-form-label">
                        Keterangan
                      </label>
                      <Col sm={10}>
                        <input
                          name="description"
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
                              accept=".pdf"
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

export default connect()(IncomingMailCreate);
