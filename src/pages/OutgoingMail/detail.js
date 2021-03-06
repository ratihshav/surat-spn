import React, { Component } from "react";
import { Row, Col, Card, CardBody, Button, Modal } from "reactstrap";
import { Link, withRouter } from "react-router-dom";
import Select from "react-select";
import { connect } from "react-redux";
import moment from 'moment'
import 'moment/locale/id';

import {
  getDetailOutgoingMailService,
  createDisposeOutgoingMailService,
  approveOutgoingMailService,
  generateNumMailService,
  verifyOutgoingMailService,
  discardOutgoingMailService,
  deleteOutgoingMailService
} from "../../helpers/master/outgoingMail"
import { searchUserSKService } from "../../helpers/master/user"
import logoPdf from "../../assets/images/logo-pdf.png";
import toast from '../UI/toast';
import config from '../../helpers/config'

class OutgoingMailDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailList: [],
      visible: false,
      selectedSignature: null,
      dataUser: [],
      status: '',
      selectedFile: null,
      stateIdMail: '',
      suratId: null,
      modalConfirm: false,
      isShowModalDispose: false,
      selectedStatusMail: null,
      isShowModalConfirm: false,
      isShowModalHistory: false,
      isShowModalGenerate: false,
      isShowModalVerify: false,
      isShowModalVoid: false,
      isShowModalDelete: false
    };
  }

  componentDidMount() {
    const idRef = this.props.location.state ? this.props.location.state.idRef : null
    const idMail = window.localStorage.getItem('idOutMail');
    const idOutgoingMail = idRef ? idRef : idMail

    this.setState({ stateIdMail: idOutgoingMail })
    this.getDetailList(idOutgoingMail)
    this.getDataUser()
  }

  getDetailList = (idOutgoingMail) => {
    getDetailOutgoingMailService(idOutgoingMail)
      .then((data) => {
        this.setState({ detailList: data.data.data })
      })
      .catch((e) => { throw e; });
  }

  getDataUser = () => {
    searchUserSKService()
      .then((data) => {
        this.setState({ dataUser: data.data.data })
      })
      .catch((e) => { throw e; });
  }

  removeBodyCss = () => {
    document.body.classList.add("no_padding");
  }

  showModalDispose = () => {
    this.setState(prevState => ({
      isShowModalDispose: !prevState.isShowModalDispose
    }));
    this.removeBodyCss();
  }

  showModalGenerate = () => {
    this.setState(prevState => ({
      isShowModalGenerate: !prevState.isShowModalGenerate
    }));
    this.removeBodyCss();
  }

  showModalVerify = () => {
    this.setState(prevState => ({
      isShowModalVerify: !prevState.isShowModalVerify
    }));
    this.removeBodyCss();
  }

  showModalVoid = () => {
    this.setState(prevState => ({
      isShowModalVoid: !prevState.isShowModalVoid
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
    const { stateIdMail, selectedSignature } = this.state
    const params = {
      surat_keluar_id: stateIdMail,
      tujuan_user_id: selectedSignature !== null ? e.target.sendTo.value : selectedSignature,
      file: this.state.selectedFile,
      keterangan: e.target.description.value,
      approved: e.target.status.value
    }

    createDisposeOutgoingMailService(params)
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

  doApproveMail = (e) => {
    const params = {
      id: this.state.stateIdMail,
      keterangan: e.target.description.value,
      approved: e.target.status.value
    }

    approveOutgoingMailService(params)
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

  discardMail = (e) => {
    const params = {
      id: this.state.stateIdMail,
      remark: e.target.remark.value,
    }

    discardOutgoingMailService(params)
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

  generateNoMail = (e) => {
    moment.locale('id')
    const tgl = e.target.dateMail.value
    const params = {
      id: this.state.stateIdMail,
      tgl_teks: moment(tgl).format("DD MMMM YYYY"),
      tgl_agenda: tgl
    }

    generateNumMailService(params)
      .then((data) => {
        this.setState({ isShowModalGenerate: false })
        this.alertSuccess()
        window.location.reload()
      })
      .catch((e) => {
        return (
          this.alertError(e)
        )
      });
    e.preventDefault();

  }

  verifyMail = (e) => {
    const params = {
      id: this.state.stateIdMail,
      approved: e.target.status.value,
      to_user_id: e.target.to_user_id.value,
      keterangan: e.target.keterangan.value
    }

    verifyOutgoingMailService(params)
      .then((data) => {
        this.setState({ isShowModalVerify: false })
        this.alertSuccess()
        window.location.reload()
      })
      .catch((e) => {
        return (
          this.alertError(e)
        )
      });
    e.preventDefault();
  }

  showModalConfirm = () => {
    this.setState(prevState => ({
      isShowModalConfirm: !prevState.isShowModalConfirm
    }));
    this.removeBodyCss();
  }

  alertSuccess = () => {
    toast.success('Sukses menyelesaikan surat!')
  };

  alertSuccessDelete = (msg) =>{
    toast.success(msg)
  }

  alertError = (e) => {
    toast.error(e)
  }

  handleStatusMail = e => {
    this.setState({ selectedStatusMail: e.target.value })
  }

  content = (data) => {
    const disposisi = data.disposisi
    return (
      <Row style={{ fontWeight: 'bold', paddingLeft: 7, paddingRight: 7 }}>
        <Col xl={6}>
          <Card>
            <CardBody style={{ padding: 0 }}>
              <table className="table table-hover table-centered table-bordered mb-0">
                <tbody>
                  <tr style={{ backgroundColor: '#5cb85c', color: 'white' }}>
                    <th>Dokumen: </th>
                  </tr>
                  <tr>
                    <th>
                      {data.signed_file_path ?
                        <a href={config.url_img + data.signed_file_path} target="_blank" download>
                          <img src={logoPdf} alt="" height="60" />
                          <p style={{ fontWeight: '800' }}>{data.signed_file_name}</p>
                        </a>
                        : <p style={{ fontWeight: '800' }}>Belum ada dokumen yang ditandatangani</p>}
                    </th>
                  </tr>

                  <tr style={{ backgroundColor: '#5cb85c', color: 'white' }}>
                    <th>Log Dokumen: </th>
                  </tr>
                  {data.agenda_file_path !== null && data.can_agenda ?
                    <tr>
                      <th>
                        <tr>
                          <Col style={{ backgroundColor: '#E9EBEE', borderRadius: 5, textAlign: 'center', justifyContent: 'center', margin: 5 }}>
                            <Row> Hasil Nomor Surat </Row>
                            <Row> <a href={config.url_img + data.agenda_file_path} target="_blank" download>{data.agenda_file_name}</a></Row>
                          </Col>
                        </tr>
                      </th>
                    </tr>
                    : null}
                  <tr>
                  <th>
                    {disposisi ? data.disposisi.map(function (nextItem, j) {
                      return (
                        <tr key={nextItem.id} >
                          {nextItem.file_id !== null && nextItem.file_path !== null ?
                            <Col style={{ backgroundColor: '#E9EBEE', borderRadius: 5, textAlign: 'center', justifyContent: 'center', margin: 5 }}>
                              <Row style={{ fontWeight: 'bold', fontSize: 16 }}>{nextItem.created_by} - {nextItem.position_name}</Row>
                              <Row> <i>{nextItem.keterangan} - {moment(nextItem.created_at).format("DD MMM YYYY  h:mm")}</i></Row>
                              <Row> <a href={config.url_img + nextItem.file_path} target="_blank" download>{nextItem.file_name}</a></Row>
                            </Col>
                            : null}
                        </tr>
                      );
                    }) : null}
                  </th>
                </tr>
                </tbody>
              </table>
            </CardBody>
          </Card>
        </Col>
        <Col xl={6}>
          <Row>
            <Col md={12}>
              <Card>
                <CardBody style={{ padding: 0, paddingRight: 7 }}>
                  <table className="table table-bordered mb-0">
                    <tbody>
                      <tr style={{ backgroundColor: '#5cb85c', color: 'white' }}>
                        <th style={{ width: 250 }}>Dikonsep Oleh:</th>
                        <td id="combo-1610-inputCell">{data.created_by}</td>
                      </tr>
                      <tr>
                        <th>Jenis Surat:</th>
                        <td>{data.jenis_surat}</td>
                      </tr>
                      <tr>
                        <th>Klasifikasi Surat:</th>
                        <td>{data.klasifikasi_name}</td>
                      </tr>
                      <tr>
                        <th>Nomor Agenda:</th>
                        <td>{data.nomor_agenda}</td>
                      </tr>
                      <tr>
                        <th>Nomor Surat:</th>
                        <td>{data.nomor_surat}</td>
                      </tr>
                      <tr>
                        <th>Tanggal Surat:</th>
                        <td>{data.tgl_surat}</td>
                      </tr>
                    </tbody>
                  </table>
                </CardBody>
              </Card>
            </Col>

          </Row>
          <Row>
            <Col md={12}>
              <Card>
                <CardBody style={{ padding: 0, paddingRight: 7 }}>
                  <table className="table table-bordered mb-0">
                    <tbody>
                      <tr style={{ backgroundColor: '#5cb85c', color: 'white' }}>
                        <th style={{ width: 250 }}>Penandatangan:</th>
                        <td id="combo-1610-inputCell">{data.sign_name}</td>
                      </tr>
                      <tr>
                        <th>Perihal:</th>
                        <td>{data.hal_surat}</td>
                      </tr>
                      <tr>
                        <th>Sifat Surat:</th>
                        <td>{data.sifat_surat}</td>
                      </tr>
                      <tr>
                        <th>Lampiran:</th>
                        <td>{data.lampiran_surat}</td>
                      </tr>
                      <tr>
                        <th>Ditujukan Kepada:</th>
                        <td>{data.tujuan_surat}</td>
                      </tr>
                    </tbody>
                  </table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    )
  }

  showModalHistory = () => {
    this.setState(prevState => ({
      isShowModalHistory: !prevState.isShowModalHistory
    }));
    this.removeBodyCss();
  }

  showModalDelete = () => {
    this.setState(prevState => ({
      isShowModalDelete: !prevState.isShowModalDelete
    }));
    document.body.classList.add("no_padding");
  }

  historyModalContent = (data) => {
    const disposisi = data.disposisi
    return (
      <div>
        <ol className="activity-feed">
          {disposisi ? data.disposisi.map(function (nextItem, index) {
            return (
              <li className="feed-item" key={index}>
                <div className="feed-item-list">
                  <span className="date">{nextItem.created_at} ( {nextItem.status_read} {nextItem.last_read !== null ? ` - ` + moment(nextItem.last_read).format("DD MMM YYYY  h:mm") : null} )</span>
                  <span className="activity-text">
                    {nextItem.label} -  <b>{nextItem.position_name} </b>
                  </span> <br></br>
                  <span className="activity-text">
                    <i>{nextItem.keterangan} </i>
                  </span>
                </div>
              </li>
            )
          }) : null}
        </ol>
      </div>
    )
  }

  deleteSurat = () => {
    const { stateIdMail } = this.state
    deleteOutgoingMailService(stateIdMail)
      .then((data) => {
        this.setState({
          isShowModalDelete: false
        }, () =>
        this.props.history.push({
          pathname: '/outgoing-mail'
        }),
        this.alertSuccessDelete("Surat Keluar berhasil dihapus."),
        )
      })
      .catch((e) => {
        this.alertError(e)
      });
  }

  render() {

    const {
      detailList,
      selectedSignature,
      selectedFile,
      isShowModalDispose,
      isShowModalConfirm,
      isShowModalHistory,
      isShowModalGenerate,
      isShowModalVerify,
      selectedStatusMail,
      isShowModalVoid,
      isShowModalDelete,
      dataUser,
     } = this.state;

    const optionsSignature = dataUser.length !== 0 ?
      dataUser.map(function (data) {
        return { value: data.id, label: data.text };
      })
      : null

      //console.log('detailList', detailList)

    return (
      <React.Fragment>
        <div className="container-fluid">
          <Row className="align-items-center">
            <Col sm={6}>
              <div className="page-title-box">
                <h4 className="font-size-18">Detail Surat Keluar</h4>
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <Link to="/#">Surat</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="/outgoing-mail">Surat Keluar</Link>
                  </li>
                  <li className="breadcrumb-item active">Detail Surat Keluar</li>
                </ol>
              </div>
            </Col>
          </Row>

          <Row>
            <Col>
              <Card>
                <CardBody>
                  <div className="card text-white bg-info">
                    <div className="card-body">
                      <blockquote className="card-blockquote mb-0">
                        <h2>
                          Rincian Surat Keluar
                        </h2>
                      </blockquote>
                    </div>
                  </div>
                  <Row>
                    <div className="table-responsive">
                      {this.content(detailList)}
                    </div>
                  </Row>

                  <Row>
                    <Col style={{ justifyContent: 'flex-start' }}>
                      <Button
                        color="dark"
                        className="mt-1"
                        onClick={this.showModalHistory}>
                        <i className="typcn typcn-input-checked" />Log Aktifitas
                      </Button>

                      <Modal
                        isOpen={isShowModalHistory}
                        toggle={this.showModalHistory} >
                        <div className="modal-header  text-white bg-info">
                          <h5 className="modal-title mt-0">Log Aktifitas</h5>
                          <button
                            type="button"
                            onClick={() =>
                              this.setState({ isShowModalHistory: false })
                            }
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div className="modal-body">
                          {this.historyModalContent(detailList)}
                        </div>
                      </Modal>

                      &nbsp; &nbsp;
                      {detailList.can_delete ? 
                      <Button
                        color="danger"
                        className="mt-1"
                        onClick={this.showModalDelete}>
                        <i className="typcn typcn-input-checked" />Hapus
                      </Button>
                      : null}

                      <Modal isOpen={isShowModalDelete} >
                       <div className="modal-header text-white bg-danger">
                          <h5 className="modal-title mt-0">Konfirmasi</h5>
                          <button
                            type="button"
                            onClick={() =>
                              this.setState({ isShowModalDelete: false })
                            }
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div className="modal-body">
                          <h5>Apakah Anda yakin ingin menghapus Surat Keluar ini?</h5>
                        </div>
                        <div className="modal-footer">
                          <Button
                            color="danger"
                            className="mt-1"
                            onClick={this.deleteSurat}
                            data-target=".bs-example-modal-center">
                            Hapus
                          </Button>
                          <Button
                            className="btn btn-info"
                            onClick={() => this.setState({ isShowModalDelete: false })}
                            data-target=".bs-example-modal-center">
                            Batal
                          </Button>
                        </div>
                      </Modal>
                    </Col>


                    <Col style={{ justifyContent: 'flex-end' }}>

                      {detailList.can_void ?
                        <Button
                          color="danger"
                          className="mt-1"
                          onClick={this.showModalVoid}
                          data-toggle="modal"
                          data-target=".bs-example-modal-center">
                          <i className="typcn typcn-input-checked" />Batalkan Surat
                      </Button>
                        : null}
                      <Modal
                        isOpen={isShowModalVoid}
                        toggle={this.showModalVoid} >
                        <div className="modal-header text-white bg-danger">
                          <h5 className="modal-title mt-0">Batalkan Surat</h5>
                          <button
                            type="button"
                            onClick={() =>
                              this.setState({ isShowModalVoid: false })
                            }
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>

                        <div className="modal-body">
                          <form action="#" onSubmit={this.discardMail}>

                            <Row className="form-group">
                              <label
                                htmlFor="keterangan"
                                className="col-sm-2 col-form-label">
                                Keterangan
                          </label>
                              <Col sm={10}>
                                <input
                                  name="remark"
                                  className="form-control"
                                  type="text"
                                  defaultValue=""
                                  id="keterangan"
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

                      &nbsp; &nbsp;
                      {detailList.can_verify ?
                        <Button
                          color="primary"
                          className="mt-1"
                          onClick={this.showModalVerify}
                          data-toggle="modal"
                          data-target=".bs-example-modal-center">
                          <i className="typcn typcn-input-checked" />Verifikasi
                      </Button>
                        : null}
                      <Modal
                        isOpen={isShowModalVerify}
                        toggle={this.showModalVerify} >
                        <div className="modal-header  text-white bg-info">
                          <h5 className="modal-title mt-0">Verifikasi Surat Keluar</h5>
                          <button
                            type="button"
                            onClick={() =>
                              this.setState({ isShowModalVerify: false })
                            }
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>

                        <div className="modal-body">
                          <form action="#" onSubmit={this.verifyMail}>

                            <Row className="form-group">
                              <label
                                htmlFor="status"
                                className="col-sm-2 col-form-label">
                                Status
                              </label>
                              <Col sm={10}>
                                <input
                                  type="radio"
                                  id="accept"
                                  name="status"
                                  value="1"
                                  onChange={this.handleStatusMail}
                                  ref={node => (this.inputNode = node)} />&nbsp;
                                <label htmlFor="accept">Disetujui</label>

                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                                <input
                                  type="radio"
                                  id="reject"
                                  name="status"
                                  value="0"
                                  onChange={this.handleStatusMail}
                                  ref={node => (this.inputNode = node)} />&nbsp;
                                <label htmlFor="reject"> Ditolak</label>
                              </Col>
                            </Row>

                            {selectedStatusMail !== '0' ?
                              <Row className="form-group">
                                <label
                                  className="col-sm-2 col-form-label">
                                  Diteruskan kepada
                                </label>
                                <Col sm={10}>
                                  <Select
                                    value={selectedSignature}
                                    onChange={this.handleSelectSignature}
                                    options={optionsSignature}
                                    name="to_user_id"
                                    ref={node => (this.inputNode = node)}
                                  />
                                </Col>
                              </Row>
                              : null}

                            <Row className="form-group">
                              <label
                                htmlFor="keterangan"
                                className="col-sm-2 col-form-label">
                                Keterangan
                              </label>
                              <Col sm={10}>
                                <input
                                  name="keterangan"
                                  className="form-control"
                                  type="text"
                                  defaultValue=""
                                  id="keterangan"
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

                      {detailList.can_approve ?
                        <Button
                          color="primary"
                          className="mt-1"
                          onClick={this.showModalDispose}
                          data-toggle="modal"
                          data-target=".bs-example-modal-center">
                          <i className="typcn typcn-input-checked" />Teruskan
                      </Button>
                        : null}
                      <Modal
                        isOpen={isShowModalDispose}
                        toggle={this.showModalDispose} >
                        <div className="modal-header  text-white bg-info">
                          <h5 className="modal-title mt-0">Proses Surat Keluar</h5>
                          <button
                            type="button"
                            onClick={() =>
                              this.setState({ isShowModalDispose: false })
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
                                htmlFor="status_setuju"
                                className="col-sm-2 col-form-label">
                                Status
                              </label>
                              <Col sm={10}>
                                <input
                                  type="radio"
                                  id="accept"
                                  name="status"
                                  value="1"
                                  onChange={this.handleStatusMail}
                                  ref={node => (this.inputNode = node)} />&nbsp;
                                <label htmlFor="accept">Disetujui</label>

                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                                <input
                                  type="radio"
                                  id="reject"
                                  name="status"
                                  value="0"
                                  onChange={this.handleStatusMail}
                                  ref={node => (this.inputNode = node)} />&nbsp;
                                <label htmlFor="reject"> Dikembalikan</label>
                              </Col>
                            </Row>


                            {selectedStatusMail !== '0' ?
                              <Row className="form-group">
                                <label
                                  htmlFor="forwardto"
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
                              : null}

                            <Row className="form-group">
                              <label
                                htmlFor="desc"
                                className="col-sm-2 col-form-label">
                                Keterangan
                              </label>
                              <Col sm={10}>
                                <input
                                  name="description"
                                  className="form-control"
                                  type="text"
                                  defaultValue=""
                                  id="desc"
                                  ref={node => (this.inputNode = node)}
                                />
                              </Col>
                            </Row>

                            {selectedStatusMail !== '0' ?
                              <Row className="form-group">
                                <label
                                  htmlFor="fileInput"
                                  className="col-sm-2 col-form-label">
                                  File
                              </label>
                                <Col sm={10}>
                                  <input
                                    name="existingFile"
                                    className="form-control"
                                    type="text"
                                    value={detailList.disposisi ? detailList.disposisi[detailList.disposisi.length - 1].file_name : null}
                                    id="fileInput"
                                    ref={node => (this.inputNode = node)}
                                    disabled
                                  />
                                </Col>
                              </Row>
                              : null}

                            {selectedStatusMail !== '0' ?
                              <Row className="form-group">
                                <label
                                  htmlFor="fileApprove"
                                  className="col-sm-2 col-form-label">
                                  Ganti File (Jika ada perubahan)
                                </label>
                                <Col sm={10}>
                                  <form action="#">
                                    <div className="custom-file">
                                      <input
                                        type="file"
                                        className="form-control"
                                        id="fileApprove"
                                        required
                                        onChange={this.onFileChange}
                                        accept=".doc, .docx, .pdf"
                                        name="file"
                                        ref={node => (this.inputNode = node)}
                                      />
                                    </div>
                                  </form>
                                </Col>
                              </Row>
                              : null}
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

                    {detailList.agenda_file_path === null && detailList.can_agenda ?
                        <Button
                          color="orange"
                          className="mt-1"
                          onClick={this.showModalGenerate}
                          data-target=".bs-example-modal-center">
                          <i className="typcn typcn-input-checked" />Agenda
                      </Button>
                        : null}

                      <Modal
                        isOpen={isShowModalGenerate}
                        toggle={this.showModalGenerate} >
                        <div className="modal-header  text-white bg-info">
                          <h5 className="modal-title mt-0">Agenda Surat Keluar</h5>
                          <button
                            type="button"
                            onClick={() =>
                              this.setState({ isShowModalGenerate: false })
                            }
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>

                        <div className="modal-body">
                          <form action="#" onSubmit={this.generateNoMail}>

                            <Row className="form-group">
                              <label
                                htmlFor="dateMailPopup"
                                className="col-sm-2 col-form-label" >
                                Tanggal Surat
                              </label>
                              <Col sm={10}>
                                <input
                                  className="form-control"
                                  type="date"
                                  id="dateMailPopup"
                                  name="dateMail"
                                  min={new Date().toISOString().substring(0, 10)}
                                  defaultValue={detailList.tgl_surat}
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

                    {detailList.can_sign ?
                        <Button
                          color="success"
                          className="mt-1"
                          onClick={this.showModalConfirm}>
                          <i className="typcn typcn-input-checked" />Tanda Tangan
                    </Button>
                        : null}

                      <Modal
                        isOpen={isShowModalConfirm}
                        toggle={this.showModalConfirm} >
                        <div className="modal-header  text-white bg-info">
                          <h5 className="modal-title mt-0">Konfirmasi</h5>
                          <button
                            type="button"
                            onClick={() =>
                              this.setState({ isShowModalConfirm: false })
                            }
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>

                        <form action="#" onSubmit={this.doApproveMail}>

                          <div className="modal-body">
                            <h5>Apakah Anda yakin ingin menyetujui surat ini?</h5> <br />

                            <Row className="form-group">
                              <label
                                htmlFor="statusApprove"
                                className="col-sm-2 col-form-label">
                                Status
                              </label>
                              <Col sm={10}>
                                <input
                                  type="radio"
                                  id="accept"
                                  name="status"
                                  value="1"
                                  onChange={this.handleStatusMail}
                                  ref={node => (this.inputNode = node)} />&nbsp;
                                <label htmlFor="accept">Disetujui</label>

                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                                <input
                                  type="radio"
                                  id="reject"
                                  name="status"
                                  value="0"
                                  onChange={this.handleStatusMail}
                                  ref={node => (this.inputNode = node)} />&nbsp;
                                <label htmlFor="reject"> Ditolak</label>
                              </Col>
                            </Row>
                            <Row className="form-group">
                              <label
                                htmlFor="descApprove"
                                className="col-sm-2 col-form-label">
                                Keterangan
                              </label>
                              <Col sm={10}>
                                <input
                                  name="description"
                                  className="form-control"
                                  type="text"
                                  id="descApprove"
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
                          </div>
                        </form>
                      </Modal>
                    &nbsp;&nbsp;
                    </Col>
                  </Row>

                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </React.Fragment >
    );
  }
}

export default withRouter(connect()(OutgoingMailDetail));
