import React, { Component } from "react";
import { Row, Col, Card, CardBody, Button, Toast } from "reactstrap";
import Select from "react-select";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { updateIncomingMailService, getDetailIncomingMailService } from "../../helpers/master/incomingMail"
import { searchUserSMService } from "../../helpers/master/user"
import { searchMasterClassService } from '../../helpers/master/classification'
import toast from '../UI/toast';
import moment from 'moment';

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

// const urgency = [
//   {
//     label: "Pilih Sifat Surat",
//     options: [
//       { label: "Biasa", value: "Biasa" },
//       { label: "Segera", value: "Segera" },
//       { label: "Penting", value: "Penting" }
//     ]
//   }
// ]

class IncomingMailEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      selectedSignature: null,
      selectedSubmit: null,
      selectedClass: null,
      dataClass: [],
      dataUser: [],
      detailList: []
    };
  }

  componentDidMount() {
    const idMail = window.localStorage.getItem('idInMail');
    this.setState({ stateIdMail: idMail })
    this.getDetailList(idMail)
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

  getDetailList = (idMail) => {

    getDetailIncomingMailService(idMail)
      .then((data) => {
        const detail = data.data.data

        this.setState({
          detailList: detail,
        })
      })
      .catch(() => { throw 'Gagal Mengubah Data'; });
  }


  handleSelectClass = selectedClass => {
    this.setState({ selectedClass });
  };

  handleSelectSignature = selectedSignature => {
    this.setState({ selectedSignature })
  }

  handleSelectSubmit = selectedSubmit => {
    this.setState({ selectedSubmit })
  }

  onFileChange = event => {
    this.setState({ selectedFile: event.target.files[0] });
  };

  updateIncomingMail = (e) => {
    const {
      detailList,
      selectedClass,
      selectedSubmit
    } = this.state

    const params = {
      asal_surat: e.target.origin.value,
      perihal: e.target.subject.value,
      nomor_surat: e.target.numMail.value,
      tgl_surat: e.target.date.value,
      to_user_id: detailList.to_user_id ? detailList.to_user_id : selectedSubmit,
      sifat_surat: e.target.type.value,
      lampiran: e.target.attachment.value,
      // prioritas: e.target.urgency.value,
      klasifikasi_id: detailList.klasifikasi_id ? detailList.klasifikasi_id : selectedClass,
      keterangan: e.target.description.value,
      file: this.state.selectedFile
    }

    updateIncomingMailService(params)
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
      selectedFile,
      dataUser,
      selectedSubmit,
      detailList,
      selectedClass,
      dataClass
    } = this.state;

    const optionsSubmit = dataUser.length !== 0 ?
      dataUser.map((data) => {
        return { value: data.id, label: data.text };
      })
      : null

    const optionsClass = dataClass.length !== 0 ?
      dataClass.map(function (data) {
        return { value: data.id, label: data.text };
      })
      : null

    const defValPosition = {
      value: detailList.to_user_id,
      label: detailList.to_user_name
    }

    const defValClass = {
      value: detailList.klasifikasi_id,
      label: detailList.klasifikasi_name
    }

    return (
      <React.Fragment>
        <div className="container-fluid">
          <Row className="align-items-center">
            <Col sm={6}>
              <div className="page-title-box">
                <h4 className="font-size-18">Edit Surat Masuk</h4>
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <Link to="#">Surat</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="/incoming-mail">Surat Masuk</Link>
                  </li>
                  <li className="breadcrumb-item active">Edit Surat Masuk</li>
                </ol>
              </div>
            </Col>
          </Row>

          <form action="#" onSubmit={this.updateIncomingMail}>
            <Row>
              <div className="col-12">
                <Card>
                  <CardBody>

                    <Row className="form-group">
                      <label
                        htmlFor="asalSurat"
                        className="col-sm-2 col-form-label">
                        Asal Surat
                        </label>
                      <Col sm={10}>
                        <input
                          name="origin"
                          className="form-control"
                          type="text"
                          defaultValue={detailList.asal_surat}
                          id="asalSurat"
                          ref={node => (this.inputNode = node)}
                          required
                        />
                      </Col>
                    </Row>

                    <Row className="form-group">
                      <label
                        htmlFor="perihal"
                        className="col-sm-2 col-form-label">
                        Perihal
                        </label>
                      <Col sm={10}>
                        <input
                          className="form-control"
                          type="text"
                          defaultValue={detailList.perihal}
                          id="perihal"
                          name="subject"
                          ref={node => (this.inputNode = node)}
                          required
                        />
                      </Col>
                    </Row>

                    <Row className="form-group">
                      <label
                        htmlFor="nomorSurat"
                        className="col-sm-2 col-form-label">
                        Nomor Surat
                        </label>
                      <Col sm={10}>
                        <input
                          className="form-control"
                          type="text"
                          defaultValue={detailList.nomor_surat}
                          id="nomorSurat"
                          name="numMail"
                          ref={node => (this.inputNode = node)}
                          required
                        />
                      </Col>
                    </Row>

                    <Row className="form-group">
                      <label
                        htmlFor="tglSurat"
                        className="col-sm-2 col-form-label"
                      >
                        Tanggal Surat
                      </label>
                      <Col sm={10}>
                        <input
                          className="form-control"
                          type="date"
                          id="tglSurat"
                          name="date"
                          value={detailList.tgl_surat}
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
                          placeholder={[detailList.to_user_name]}
                          defaultValue={defValPosition}
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
                        Sifat Surat
                      </label>
                      <Col sm={10}>
                        <input
                          className="form-control"
                          type="text"
                          id="example-text-input"
                          name="type"
                          ref={node => (this.inputNode = node)}
                          required
                          defaultValue={detailList.sifat_surat}
                        />
                      </Col>
                    </Row>

                    <Row className="form-group">
                      <label
                        htmlFor="lampiran"
                        className="col-sm-2 col-form-label"
                      >
                        Lampiran Surat
                      </label>
                      <Col sm={10}>
                        <input
                          className="form-control"
                          type="text"
                          defaultValue={detailList.lampiran}
                          id="lampiran"
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
                          placeholder={[detailList.klasifikasi_name]}
                          onChange={this.handleSelectClass}
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
                        htmlFor="keterangan"
                        className="col-sm-2 col-form-label">
                        Keterangan
                        </label>
                      <Col sm={10}>
                        <input
                          name="description"
                          className="form-control"
                          defaultValue={detailList.keterangan}
                          type="text"
                          id="keterangan"
                          ref={node => (this.inputNode = node)}
                          required
                        />
                      </Col>
                    </Row>

                    <Row className="form-group">
                      <label
                        htmlFor="dokumen"
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
                              accept=".doc, .docx, .pdf"
                              name="file"
                              ref={node => (this.inputNode = node)}
                              defaultValue={detailList.file_path}
                            />
                            <label
                              className="custom-file-label"
                              htmlFor="dokumen"
                              style={{ zIndex: 0 }}>
                              {(selectedFile !== null && selectedFile !== undefined) ? selectedFile.name : detailList.file_name}
                            </label>
                          </div>
                        </form>
                      </Col>
                    </Row>

                    <div className="text-right mt-4">
                      <Button
                        color="success"
                        className="mt-1"
                      >
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

export default connect()(IncomingMailEdit);
