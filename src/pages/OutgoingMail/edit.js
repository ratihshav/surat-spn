import React, { Component } from "react";
import { Row, Col, Card, CardBody, Button, Toast } from "reactstrap";
import Select from "react-select";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { getMasterGroupServices } from "../../helpers/master/group"
import {
  updateOutgoingMailService,
  getDetailOutgoingMailService
} from "../../helpers/master/outgoingMail"
import { searchUserService } from "../../helpers/master/user"
import { searchMasterClassService } from '../../helpers/master/classification'
import toast from '../UI/toast';

const type = [

  { label: "Surat Keterangan", value: "Surat Keterangan" },
  { label: "Surat Biasa", value: "Surat Biasa" },
  { label: "Surat Perintah", value: "Surat Perintah" }

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

class OutgoingMailEdit extends Component {
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
      dataUser: [],
      detailList: [],
      optionsValues: []
    };
  }

  componentDidMount() {
    const idMail = window.localStorage.getItem('idOutMail');
    this.setState({ stateIdMail: idMail })
    this.getDetailList(idMail)
    this.getDataGroup()
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

  getDetailList = (idMail) => {

    getDetailOutgoingMailService(idMail)
      .then((data) => {
        const detailOutgoingMail = data.data.data


        const optionsValue = detailOutgoingMail.length !== 0 ?
          [{ label: detailOutgoingMail.approval_name, value: detailOutgoingMail.approval_user }]
          : null

        this.setState({
          detailList: detailOutgoingMail,
          optionsValues: optionsValue
        })
      })
      .catch(() => { throw 'Gagal Mengubah Data'; });
  }

  getDataUser = () => {
    searchUserService()
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

  updateOutgoingMail = (e) => {
    const {
      detailList,
      selectedClass,
      selectedSubmit,
      selectedType,
      selectedUrgency,
      selectedSignature
    } = this.state

    const params = {
      jenis_surat: detailList.jenis_surat ? detailList.jenis_surat : selectedType,
      klasifikasi_id: detailList.klasifikasi_id ? detailList.klasifikasi_id : selectedClass,
      sifat_surat: detailList.sifat_surat ? detailList.sifat_surat : selectedUrgency,
      tujuan_surat: e.target.destination.value,
      hal_surat: e.target.subject.value,
      lampiran_surat: e.target.attachment.value,
      approval_user: selectedSignature === null ? detailList.sign_user_id : e.target.approval.value,
      to_user: selectedSubmit === null ? detailList.approval_user_id : e.target.sendto.value,
      file: this.state.selectedFile
    }

    updateOutgoingMailService(params)
      .then((data) => {
        this.alertSuccess()
        this.props.history.push('/outgoing-mail');
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
    this.props.history.push('/outgoing-mail')
  }

  render() {
    const {
      selectedType,
      selectedUrgency,
      selectedFile,
      selectedSignature,
      selectedSubmit,
      dataUser,
      detailList,
      optionsValues,
      selectedClass,
      dataClass } = this.state;

    const optionsSignature = dataUser.length !== 0 ?
      dataUser.map((data) => {
        return { label: data.text, value: data.id };
      })
      : null

    const optionsSubmit = dataUser.length !== 0 ?
      dataUser.map((data) => {
        return { value: data.id, label: data.text };
      })
      : null

    const optionsClass = dataClass.length !== 0 ?
      dataClass.map((data) => {
        return { value: data.id, label: data.text };
      })
      : null

    const defValClass = {
      value: detailList.klasifikasi_id,
      label: detailList.klasifikasi_name
    }

    const defValSubmit = {
      value: detailList.to_user,
      label: detailList.to_username
    }

    const defValSignature = {
      value: detailList.approval_user,
      label: detailList.approval_name
    }

    const defValType = {
      value: detailList.jenis_surat,
      label: detailList.jenis_surat
    }

    const defValUrge = {
      value: detailList.sifat_surat,
      label: detailList.sifat_surat
    }

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

          <form action="#" onSubmit={this.updateOutgoingMail}>
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
                          placeholder={[detailList.jenis_surat]}
                          defaultValue={defValType}
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
                          placeholder={[detailList.klasifikasi_name]}
                          options={optionsClass}
                          defaultValue={defValClass}
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
                          placeholder={[detailList.sifat_surat]}
                          defaultValue={defValUrge}
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
                          id="example-text-input"
                          ref={node => (this.inputNode = node)}
                          required
                          defaultValue={detailList.tujuan_surat}

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
                          defaultValue={detailList.hal_surat}
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
                          defaultValue={detailList.lampiran_surat}
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
                          placeholder={[detailList.approval_name]}
                          defaultValue={defValSignature}
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
                          placeholder={[detailList.to_username]}
                          defaultValue={defValSubmit}
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
                              accept=".doc, .docx, .pdf"
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

export default connect()(OutgoingMailEdit);
