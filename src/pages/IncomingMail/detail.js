import React, { Component } from "react";
import { Row, Col, Card, CardBody, Button, Modal } from "reactstrap";
import { Link, withRouter } from "react-router-dom";
import Select from "react-select";
import { connect } from "react-redux";
import moment from 'moment'
import { searchUserSKService } from "../../helpers/master/user"
import {
  getDetailIncomingMailService,
  createDisposeIncomingMailService,
  closeIncomingMailService
} from "../../helpers/master/incomingMail"
import toast from '../UI/toast';
import logoPdf from "../../assets/images/logo-pdf.png";
import config from '../../helpers/config'

class IncomingMailDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailList: [],
      visible: false,
      modalCenter: false,
      selectedSignature: null,
      dataUser: [],
      status: '',
      selectedFile: null,
      stateIdMail: '',
      modalConfirm: false,
      numPages: null,
      pageNumber: 1,
    };
  }

  componentDidMount() {
    const idRef = this.props.location.state ? this.props.location.state.idRef : null
    const idMail = window.localStorage.getItem('idInMail');
    const idIncomingMail = idRef ? idRef : idMail

    this.setState({ stateIdMail: idIncomingMail })
    this.getDetailList(idIncomingMail)
    this.getDataUser()
  }

  getDetailList = (idIncomingMail) => {
    getDetailIncomingMailService(idIncomingMail)
      .then((data) => {
        this.setState({ detailList: data.data.data })
      })
      .catch(() => { throw 'Gagal Mengubah Data'; });
  }

  getDataUser = () => {
    searchUserSKService()
      .then((data) => {
        this.setState({ dataUser: data.data.data })
      })
      .catch(() => { throw 'Gagal Mengubah Data'; });
  }

  removeBodyCss = () => {
    document.body.classList.add("no_padding");
  }

  showModalDispose = () => {
    this.setState(prevState => ({
      modalCenter: !prevState.modalCenter
    }));
    this.removeBodyCss();
  }

  showModalConfirm = () => {
    this.setState(prevState => ({
      modalConfirm: !prevState.modalConfirm
    }));
    this.removeBodyCss();
  }

  handleSelectSignature = selectedSignature => {
    this.setState({ selectedSignature })
  }

  onFileChange = event => {
    this.setState({ selectedFile: event.target.files[0] });
  };


  doDisposition = (e) => {
    const { stateIdMail } = this.state
    const params = {
      surat_masuk_id: stateIdMail,
      to_user_id: e.target.sendTo.value,
      arahan: e.target.instruction.value
    }
    createDisposeIncomingMailService(params)
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

  closeIncomingMail = () => {

    closeIncomingMailService()
      .then((data) => {
        this.alertSuccess()
        this.props.history.push('/incoming-mail');
      })
      .catch(() => {
        return (
          this.alertError()
        )
      });
  }

  alertSuccess = () => {
    toast.success('Sukses menyelesaikan surat!')
  };

  alertError = () => {
    toast.error('Gagal menyelesaikan surat')
  }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  }

  getTableContent = (data) => {
    const { pageNumber, numPages } = this.state;
    return (
      <Row style={{ fontWeight: 'bold', paddingLeft: 7, paddingRight: 7 }}>
        <Col xl={4}>
          <Card>
            <CardBody style={{ padding: 0 }}>
              <table className="table table-hover table-centered table-bordered mb-0">
                <tr style={{ backgroundColor: '#5cb85c', color: 'white' }}>
                  <th>Dokumen: </th>
                </tr>
                <tr>
                  <th>
                    {data.file_path ?
                      <a href={config.url_img + data.file_path} target="_blank" download>
                        <img src={logoPdf} alt="" height="60" />
                        <p style={{ fontWeight: '800' }}>{data.file_name}</p>
                      </a>
                      : <p style={{ fontWeight: '800' }}>Belum ada dokumen yang ditandatangani</p>}
                  </th>
                </tr>
              </table>
            </CardBody>
          </Card>
        </Col>
        <Col xl={8}>
          <Row>
            <Col md={12}>
              <Card>
                <CardBody style={{ padding: 0 }}>
                  <table className="table table-bordered mb-0">
                    <tr style={{ backgroundColor: '#5cb85c', color: 'white' }}>
                      <th style={{ width: 200 }}>Asal Surat:</th>
                      <td id="combo-1610-inputCell">{data.asal_surat}</td>
                    </tr>
                    <tr>
                      <th>Nomor Surat:</th>
                      <td>{data.nomor_surat}</td>
                    </tr>
                    <tr>
                      <th>Tanggal Surat:</th>
                      <td>{data.tgl_surat}</td>
                    </tr>
                    <tr>
                      <th>Hal:</th>
                      <td>{data.perihal}</td>
                    </tr>
                    <tr>
                      <th>Sifat Surat:</th>
                      <td>{data.sifat_surat}</td>
                    </tr>
                    <tr>
                      <th>Lampiran:</th>
                      <td>{data.lampiran}</td>
                    </tr>

                  </table>
                </CardBody>
              </Card>
            </Col>

          </Row>
          <Row>
            <Col md={12}>
              <Card>
                <CardBody style={{ padding: 0 }}>
                  <table className="table table-bordered mb-0">
                    <tr style={{ backgroundColor: '#5cb85c', color: 'white' }}>
                      <th style={{ width: 200 }}>Ditujukan Kepada:</th>
                      <td id="combo-1610-inputCell">{data.position_name}</td>
                    </tr>
                    <tr>
                      <th>Klasifikasi:</th>
                      <td>{data.klasifikasi_name}</td>
                    </tr>
                    <tr>
                      <th>Dibuat Oleh:</th>
                      <td>{data.created_by}</td>
                    </tr>
                    <tr>
                      <th>Tanggal Diterima:</th>
                      <td>{data.tgl_diterima}</td>
                    </tr>
                  </table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    )
  }



  render() {

    const {
      detailList,
      selectedSignature,
      selectedFile,
      dataUser,
      modalCenter,
      modalConfirm } = this.state;

    const optionsSignature = dataUser.length !== 0 ?
      dataUser.map(function (data) {
        return { value: data.id, label: data.text };
      })
      : null


    return (
      <React.Fragment>
        <div className="container-fluid">
          <Row className="align-items-center">
            <Col sm={6}>
              <div className="page-title-box">
                <h4 className="font-size-18">Detail Surat Masuk</h4>
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <Link to="/#">Surat</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="/incoming-mail">Surat Masuk</Link>
                  </li>
                  <li className="breadcrumb-item active">Detail Surat Masuk</li>
                </ol>
              </div>
            </Col>
          </Row>

          <Row>
            <Col xl={12}>
              <Card>
                <CardBody>
                  <div className="card text-white bg-info">
                    <div className="card-body">
                      <blockquote className="card-blockquote mb-0">
                        <h2>
                          Rincian Surat Masuk
                        </h2>
                      </blockquote>
                    </div>
                  </div>
                  <Row>
                    <div className="table-responsive">
                      {this.getTableContent(detailList)}
                    </div>
                  </Row>
                  <div className="text-right mt-8">
                    <Button
                      color="success"
                      className="mt-1"
                      onClick={this.showModalDispose}
                      data-toggle="modal"
                      data-target=".bs-example-modal-center">
                      <i className="typcn typcn-input-checked" />Disposisi
                    </Button>

                    <Modal
                      isOpen={modalCenter}
                      toggle={this.showModalDispose} >
                      <div className="modal-header  text-white bg-info">
                        <h5 className="modal-title mt-0">Proses Surat Masuk</h5>
                        <button
                          type="button"
                          onClick={() =>
                            this.setState({ modalCenter: false })
                          }
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>

                      <div className="modal-body">
                        <form action="#" onSubmit={this.doDisposition}>
                          <Row className="form-group">
                            <label
                              htmlFor="example-search-input"
                              className="col-sm-2 col-form-label">
                              Diteruskan kepada
                         </label>
                            <Col sm={10}>
                              <Select
                                value={selectedSignature}
                                onChange={this.handleSelectSignature}
                                options={optionsSignature}
                                name="sendTo"
                                ref={node => (this.inputNode = node)}
                              />
                            </Col>
                          </Row>

                          <Row className="form-group">
                            <label
                              htmlFor="example-search-input"
                              className="col-sm-2 col-form-label">
                              Arahan
                          </label>
                            <Col sm={10}>
                              <input
                                name="instruction"
                                className="form-control"
                                type="text"
                                defaultValue=""
                                id="example-text-input"
                                ref={node => (this.inputNode = node)}
                              />
                            </Col>
                          </Row>



                          <div className="text-right mt-8">
                            <Button
                              color="success"
                              className="mt-1"
                              data-toggle="modal"
                              data-target=".bs-example-modal-center">
                              <i className="typcn typcn-input-checked" />Submit
                         </Button>
                          </div>
                        </form>
                      </div>
                    </Modal>

                    &nbsp;&nbsp;

                    <Button
                      color="danger"
                      className="mt-1"
                      onClick={this.showModalConfirm}
                      data-target=".bs-example-modal-center">
                      <i className="typcn typcn-input-checked" />Close
                    </Button>

                    <Modal
                      isOpen={modalConfirm}
                      toggle={this.showModalConfirm} >
                      <div className="modal-header  text-white bg-info">
                        <h5 className="modal-title mt-0">Konfirmasi</h5>
                        <button
                          type="button"
                          onClick={() =>
                            this.setState({ modalConfirm: false })
                          }
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>


                      <div className="modal-body">
                        <h5>Apakah Anda yakin ingin menyelesaikan surat ini?</h5>
                      </div>
                      <div className="modal-footer">
                        <Button
                          color="success"
                          className="mt-1"
                          onClick={this.closeIncomingMail}
                          data-target=".bs-example-modal-center">
                          Ya
                            </Button>
                        <Button
                          className="btn btn-secondary"
                          onClick={() => this.setState({ modalConfirm: false })}
                          data-target=".bs-example-modal-center">
                          Batal
                            </Button>
                      </div>
                    </Modal>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </React.Fragment >
    );
  }
}

export default withRouter(connect()(IncomingMailDetail));
