import React, { Component } from "react";
import { Row, Col, Card, CardBody, Button, Modal } from "reactstrap";
import { Link, withRouter } from "react-router-dom";
import Select from "react-select";
import { connect } from "react-redux";
import moment from 'moment'
import { searchUserService } from "../../helpers/master/outgoingMail"
import {
  getDetailIncomingMailService,
  createDisposeIncomingMailService,
  closeIncomingMailService
} from "../../helpers/master/incomingMail"
import woman from "../../assets/images/woman.png";
import toast from '../UI/toast';

class IncomingMailDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailList: [],
      visible: false,
      modal_center: false,
      selectedSignature: null,
      dataUser: [],
      status: '',
      selectedFile: null,
      stateIdMail: ''
    };
  }

  componentDidMount() {
    const idMail = window.localStorage.getItem('idInMail');
    this.setState({ stateIdMail: idMail })
    this.getDetailList(idMail)
    this.getDataUser()
  }

  getDetailList = (idMail) => {
    getDetailIncomingMailService(idMail)
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

  tog_center = () => {
    this.setState(prevState => ({
      modal_center: !prevState.modal_center
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
                <tr>
                  <a href={`http://localhost/spnbackend/` + data.file_path} target="_blank" download>{data.file_name}</a><br />
                </tr>
              </th>
            </tr>
          </th>
          <th>
            <tr>
              <th>Asal Surat:</th>
              <td id="combo-1610-inputCell">{data.asal_surat}</td>
            </tr>
            <tr>
              <th>Perihal:</th>
              <td>{data.perihal}</td>
            </tr>
            <tr>
              <th>Nomor Surat:</th>
              <td>{data.nomor_surat}</td>
            </tr>
            <tr>
              <th>Prioritas Surat:</th>
              <td>{data.prioritas}</td>
            </tr>
            <tr>
              <th>Klasifikasi Surat:</th>
              <td>{data.klasifikasi}</td>
            </tr>
            <tr>
              <th>Lampiran:</th>
              <td>{data.lampiran}</td>
            </tr>
            <tr>
              <th>Sifat Surat:</th>
              <td>{data.sifat_surat}</td>
            </tr>
            <tr>
              <th>Tanggal Surat:</th>
              <td>{data.tgl_surat}</td>
            </tr>
            <tr>
              <th>Tanggal Diterima:</th>
              <td>{data.tgl_diterima}</td>
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
                      onClick={this.tog_center}
                      data-toggle="modal"
                      data-target=".bs-example-modal-center">
                      <i className="typcn typcn-input-checked" />Teruskan
                    </Button>

                    <Modal
                      isOpen={this.state.modal_center}
                      toggle={this.tog_center} >
                      <div className="modal-header  text-white bg-info">
                        <h5 className="modal-title mt-0">Proses Surat Masuk</h5>
                        <button
                          type="button"
                          onClick={() =>
                            this.setState({ modal_center: false })
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
                      onClick={this.closeIncomingMail}
                      data-target=".bs-example-modal-center">
                      <i className="typcn typcn-input-checked" />Close
                    </Button>
                  </div>
                  <div className="text-right mt-8">

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
