import React, { Component } from "react";
import { Row, Col, Card, CardBody, Button, Modal } from "reactstrap";
import { Link, withRouter } from "react-router-dom";
import Select from "react-select";
import { connect } from "react-redux";
import moment from 'moment'

import {
  getDetailOutgoingMailService,
  createDisposeOutgoingMailService,
  createAgendaOutgoingMailService,
  approveOutgoingMailService
} from "../../helpers/master/outgoingMail"
import { searchUserService } from "../../helpers/master/user"
import woman from "../../assets/images/woman.png";
import toast from '../UI/toast';

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
      isShowModalDispose: false,
      isShowModalAgenda: false,
      selectedStatusMail: null,
      isShowModalConfirm: false
    };
  }

  componentDidMount() {
    const idMail = window.localStorage.getItem('idOutMail');
    this.setState({ stateIdMail: idMail })
    this.getDetailList(idMail)
    this.getDataUser()
  }

  getDetailList = (idMail) => {
    getDetailOutgoingMailService(idMail)
      .then((data) => {
        this.setState({ detailList: data.data.data })
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

  removeBodyCss = () => {
    document.body.classList.add("no_padding");
  }

  showModalDispose = () => {
    this.setState(prevState => ({
      isShowModalDispose: !prevState.isShowModalDispose
    }));
    this.removeBodyCss();
  }

  showModalAgenda = () => {
    this.setState(prevState => ({
      isShowModalAgenda: !prevState.isShowModalAgenda
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
      surat_keluar_id: stateIdMail,
      tujuan_user: e.target.sendTo.value,
      file: this.state.selectedFile,
      keterangan: e.target.description.value,
      is_approved: e.target.status.value
    }
    createDisposeOutgoingMailService(params)
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

  createAgendaMail = (e) => {
    const params = {
      nomor_surat: e.target.noMail.value,
      nomor_agenda: e.target.noAgenda.value,
      tgl_surat: e.target.dateMail.value,
      file: this.state.selectedFile,
    }
    createAgendaOutgoingMailService(params)
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

  doApproveMail = (e) => {

    approveOutgoingMailService()
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

  showModalConfirm = () => {
    this.setState(prevState => ({
      isShowModalConfirm: !prevState.isShowModalConfirm
    }));
    this.removeBodyCss();
  }

  alertSuccess = () => {
    toast.success('Sukses menyelesaikan surat!')
  };

  alertError = () => {
    toast.error('Gagal menyelesaikan surat')
  }

  handleStatusMail = selectedStatusMail => {
    this.setState({ selectedStatusMail })
  }

  getTableContent = (data) => {
    const disposisi = data.disposisi

    return (
      <table className="table table-borderless">
        <tr>
          <th style={{ width: '200px' }}>
            <tr>
              <th>Dokumen:</th>
            </tr>
            <tr>
              <th>
                {disposisi ? data.disposisi.map(function (nextItem, j) {
                  return (
                    <tr key={nextItem.id}>
                      <a href={`http://localhost/spnbackend/` + nextItem.file_path} target="_blank" download>{nextItem.file_name}</a><br />
                    </tr>
                  );
                }) : null}
              </th>
            </tr>
          </th>
          <th>
            <tr>
              <th>Dikonsep Oleh:</th>
              <td id="combo-1610-inputCell">{data.created_by}</td>
            </tr>
            <tr>
              <th>Perihal:</th>
              <td>{data.hal_surat}</td>
            </tr>
            <tr>
              <th>Kepada:</th>
              <td>{data.to_username}</td>
            </tr>
            <tr>
              <th>Jenis Surat:</th>
              <td>{data.jenis_surat}</td>
            </tr>
            <tr>
              <th>Klasifikasi Surat:</th>
              <td>{data.klasifikasi_surat}</td>
            </tr>
            <tr>
              <th>Sifat Surat:</th>
              <td>{data.sifat_surat}</td>
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
            <tr>
              <th>Lampiran:</th>
              <td>{data.lampiran}</td>
            </tr>
            <tr>
              <th>Tujuan Surat:</th>
              <td>{data.tujuan_surat}</td>
            </tr>
          </th>
          <th>
            <tr>
              {disposisi ? data.disposisi.map(function (nextItem, j) {
                return (
                  <tr key={nextItem.id}>
                    <tr>
                      <th rowspan="3">  <img src={woman} alt="" height="35" /></th>
                      <td>{nextItem.label_disposisi}:</td>
                    </tr>
                    <tr>
                      <td> {nextItem.position_name}</td>
                    </tr>
                    <tr>
                      <td> Pada {moment(nextItem.created_at).format('LLLL')}</td>
                    </tr>
                  </tr>
                );
              }) : null}
            </tr>
          </th>
        </tr>
      </table>
    )
  }



  render() {

    const {
      detailList,
      selectedSignature,
      selectedFile,
      isShowModalDispose,
      isShowModalAgenda,
      isShowModalConfirm,
      dataUser } = this.state;

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
            <Col xl={12}>
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
                      {this.getTableContent(detailList)}
                    </div>
                  </Row>
                  <div className="text-right mt-8">
                    <Button
                      color="primary"
                      className="mt-1"
                      onClick={this.showModalDispose}
                      data-toggle="modal"
                      data-target=".bs-example-modal-center">
                      <i className="typcn typcn-input-checked" />Teruskan
                    </Button>

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
                              htmlFor="example-text-input"
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
                              Keterangan
                          </label>
                            <Col sm={10}>
                              <input
                                name="description"
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
                              htmlFor="example-search-input"
                              className="col-sm-2 col-form-label">
                              File
                           </label>
                            <Col sm={10}>
                              <input
                                name="existingFile"
                                className="form-control"
                                type="text"
                                value={detailList.disposisi ? detailList.disposisi[detailList.disposisi.length - 1].file_name : null}
                                id="example-text-input"
                                ref={node => (this.inputNode = node)}
                                disabled
                              />
                            </Col>
                          </Row>

                          <Row className="form-group">
                            <label
                              htmlFor="example-search-input"
                              className="col-sm-2 col-form-label">
                              Ganti File (Jika ada perubahan)
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
                                </div>
                              </form>
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
                      color="warning"
                      className="mt-1"
                      onClick={this.showModalAgenda}
                      data-target=".bs-example-modal-center">
                      <i className="typcn typcn-input-checked" />Agenda
                      </Button>

                    <Modal
                      isOpen={isShowModalAgenda}
                      toggle={this.showModalAgenda} >
                      <div className="modal-header  text-white bg-info">
                        <h5 className="modal-title mt-0">Agenda Surat Keluar</h5>
                        <button
                          type="button"
                          onClick={() =>
                            this.setState({ isShowModalAgenda: false })
                          }
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>

                      <div className="modal-body">
                        <form action="#" onSubmit={this.createAgendaMail}>

                          <Row className="form-group">
                            <label
                              htmlFor="example-search-input"
                              className="col-sm-2 col-form-label">
                              No. Surat
                          </label>
                            <Col sm={10}>
                              <input
                                name="noMail"
                                className="form-control"
                                type="text"
                                defaultValue={detailList.nomor_surat}
                                id="example-text-input"
                                ref={node => (this.inputNode = node)}
                              />
                            </Col>
                          </Row>

                          <Row className="form-group">
                            <label
                              htmlFor="example-search-input"
                              className="col-sm-2 col-form-label">
                              No. Agenda
                          </label>
                            <Col sm={10}>
                              <input
                                name="noAgenda"
                                className="form-control"
                                type="text"
                                defaultValue={detailList.nomor_agenda}
                                id="example-text-input"
                                ref={node => (this.inputNode = node)}
                              />
                            </Col>
                          </Row>

                          <Row className="form-group">
                            <label
                              htmlFor="example-text-input"
                              className="col-sm-2 col-form-label" >
                              Tanggal Surat
                            </label>
                            <Col sm={10}>
                              <input
                                className="form-control"
                                type="date"
                                id="example-text-input"
                                name="dateMail"
                                defaultValue={detailList.tgl_surat}
                                ref={node => (this.inputNode = node)}
                              />
                            </Col>
                          </Row>

                          <Row className="form-group">
                            <label
                              htmlFor="example-search-input"
                              className="col-sm-2 col-form-label">
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
                                    {selectedFile !== null && selectedFile !== undefined ? selectedFile.name : 'Belum ada file yang dipilih'}
                                  </label>
                                </div>
                              </form>
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
                      color="success"
                      className="mt-1"
                      onClick={this.showModalConfirm}>
                      <i className="typcn typcn-input-checked" />Setujui
                    </Button>

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


                      <div className="modal-body">
                        <h5>Apakah Anda yakin ingin menyetujui surat ini?</h5>
                      </div>
                      <div className="modal-footer">
                        <Button
                          color="success"
                          className="mt-1"
                          onClick={this.doApproveMail}
                          data-target=".bs-example-modal-center">
                          Ya
                            </Button>
                        <Button
                          className="btn btn-secondary"
                          onClick={() => this.setState({ isShowModalConfirm: false })}
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

export default withRouter(connect()(OutgoingMailDetail));
