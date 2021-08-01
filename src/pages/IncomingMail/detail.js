import React, { Component } from "react";
import { Row, Col, Card, CardBody, Button, Modal } from "reactstrap";
import { Link, withRouter } from "react-router-dom";
import Select from "react-select";
import { connect } from "react-redux";
import { searchUserSMService } from "../../helpers/master/user"
import {
  getDetailIncomingMailService,
  createDisposeIncomingMailService,
  closeIncomingMailService
} from "../../helpers/master/incomingMail"
import toast from '../UI/toast';
import logoPdf from "../../assets/images/logo-pdf.png";
import config from '../../helpers/config'
import moment from 'moment'
import 'moment/locale/id';
import { loginUser, loginUserSuccess, loginUserFail } from "../../store/actions";
import Loader from "../../components/Loader";

class IncomingMailDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailList: [],
      visible: false,
      modalCenter: false,
      selectedSignature: [],
      dataUser: [],
      status: '',
      selectedFile: null,
      stateIdMail: '',
      modalConfirm: false,
      numPages: null,
      pageNumber: 1,
      isShowModalHistory: false,
      loading: false
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
      .catch((e) => { throw e });
  }

  getDataUser = () => {
    searchUserSMService()
      .then((data) => {
        this.setState({ dataUser: data.data.data })
      })
      .catch((e) => { throw e });
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
    this.setState({loading: true})
    const { stateIdMail, selectedSignature } = this.state
    const mapped = selectedSignature.map(function (data) {
      return data.value
    })
    const params = {
      surat_masuk_id: stateIdMail,
      to_user_id: mapped,
      arahan: e.target.instruction.value
    }
    
    createDisposeIncomingMailService(params)
      .then((data) => {
        this.setState({loading: false})
        this.alertSuccess()
        this.props.history.push('/incoming-mail');
      })
      .catch((e) => {
        return (
          this.setState({loading: false}),
          this.alertError(e)
        )
      });
    e.preventDefault();
  }

  closeIncomingMail = () => {
    this.setState({loading: true})
    const { stateIdMail } = this.state

    closeIncomingMailService(stateIdMail)
      .then((data) => {
        this.setState({loading: false})
        this.alertSuccess()
        this.props.history.push('/incoming-mail');
      })
      .catch((e) => {
        return (
          this.setState({loading: false}),
          this.alertError(e)
        )
      });
  }

  alertSuccess = () => {
    toast.success('Sukses menyelesaikan surat!')
  };

  alertError = (e) => {
    toast.error(e)
  }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  }

  showModalHistory = () => {
    this.setState(prevState => ({
      isShowModalHistory: !prevState.isShowModalHistory
    }));
    this.removeBodyCss();
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
                  <span className="activity-text"><b>{nextItem.label_history}</b></span> <br></br>
                  <span className="activity-text red"><b>Arahan:</b> {nextItem.arahan}</span> <br></br>
                  <span className="activity-text"><i>{nextItem.status_read} {nextItem.last_read !== null ? ` - ` + moment(nextItem.last_read).format("DD MMMM YYYY  h:mm") : null}</i></span>
                </div>
              </li>
            )
          }) : null}
        </ol>
      </div>
    )
  }

  getTableContent = (detailList, isAdmin) => {
    return (
      <Row style={{ fontWeight: 'bold', paddingLeft: 7, paddingRight: 7 }}>
        <Col xl={4}>
          <Card>
            <CardBody style={{ padding: 0 }}>
              <table className="table table-hover table-centered table-bordered mb-0">
                <tbody>
                  <tr style={{ backgroundColor: '#5cb85c', color: 'white' }}>
                    <th>Dokumen: </th>
                  </tr>
                  <tr>
                    <th>
                      {detailList.file_path ?
                        <a href={config.url_img + detailList.file_path} target="_blank" download>
                          <img src={logoPdf} alt="" height="60" />
                          <p style={{ fontWeight: '800' }}>{detailList.file_name}</p>
                        </a>
                        : <p style={{ fontWeight: '800' }}>Belum ada dokumen yang ditandatangani</p>}
                    </th>
                  </tr>
                </tbody>
              </table>
            </CardBody>
          </Card>
          <div>
            {detailList.disposition_file_path !== null && detailList.disposition_kasi || (isAdmin && detailList.disposition_file_path !== null ) ? <Card>
              <CardBody style={{ padding: 0 }}>
                <table className="table table-hover table-centered table-bordered mb-0">
                  <tbody>
                    <tr style={{ backgroundColor: '#5cb85c', color: 'white' }}>
                      <th>Lembar Disposisi: </th>
                    </tr>
                    <tr>
                      <th>
                        {detailList.file_path ?
                          <a href={config.url_img + detailList.disposition_file_path} target="_blank" download>
                            <img src={logoPdf} alt="" height="60" />
                            <p style={{ fontWeight: '800' }}>{detailList.disposition_file_name}</p>
                          </a>
                          : <p style={{ fontWeight: '800' }}>Belum ada dokumen disposisi</p>}
                      </th>
                    </tr>
                  </tbody>
                </table>
              </CardBody>
            </Card> : null}
          </div>
        </Col>
        <Col xl={8}>
          <Row>
            <Col md={12}>
              <Card>
                <CardBody style={{ padding: 0 }}>
                  <table className="table table-bordered mb-0">
                    <tbody>
                      <tr style={{ backgroundColor: '#5cb85c', color: 'white' }}>
                        <th style={{ width: 200 }}>Asal Surat:</th>
                        <td id="combo-1610-inputCell">{detailList.asal_surat}</td>
                      </tr>
                      <tr>
                        <th>Nomor Surat:</th>
                        <td>{detailList.nomor_surat}</td>
                      </tr>
                      <tr>
                        <th>Tanggal Surat:</th>
                        <td>{moment(detailList.tgl_surat).format("DD MMMM YYYY")}</td>
                      </tr>
                      <tr>
                        <th>Klasifikasi:</th>
                        <td>{detailList.klasifikasi_name}</td>
                      </tr>
                      <tr>
                        <th>Hal:</th>
                        <td>{detailList.perihal}</td>
                      </tr>
                      <tr>
                        <th>Tipe Surat:</th>
                        <td>{detailList.jenis_surat}</td>
                      </tr>
                      <tr>
                        <th>Sifat Surat:</th>
                        <td>{detailList.sifat_surat}</td>
                      </tr>
                      <tr>
                        <th>Lampiran:</th>
                        <td>{detailList.lampiran}</td>
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
                <CardBody style={{ padding: 0 }}>
                  <table className="table table-bordered mb-0">
                    <tbody>
                      <tr style={{ backgroundColor: '#5cb85c', color: 'white' }}>
                        <th style={{ width: 200 }}>Ditujukan Kepada:</th>
                        <td id="combo-1610-inputCell">{detailList.to_user_name}</td>
                      </tr>
                      <tr>
                        <th>Jabatan:</th>
                        <td>{detailList.to_position_name}</td>
                      </tr>
                      <tr>
                        <th>Diarsip Oleh:</th>
                        <td>{detailList.created_by}</td>
                      </tr>
                      <tr>
                        <th>Tanggal Diterima:</th>
                        <td>{moment(detailList.tgl_diterima).format("DD MMMM YYYY")}</td>
                      </tr>
                    </tbody>
                  </table>
                </CardBody>
              </Card>
            </Col>
          </Row>

          {detailList.disposition_created_at !== null ?
            <Row>
              <Col md={12}>
                <Card>
                  <CardBody style={{ padding: 0 }}>
                    <table className="table table-bordered mb-0">
                      <tbody>
                        <tr style={{ backgroundColor: '#5cb85c', color: 'white' }}>
                          <th style={{ width: 200 }}>Didisposisikan Oleh:</th>
                          <td id="combo-1610-inputCell">{detailList.disposition_name}</td>
                        </tr>
                        <tr>
                          <th>Jabatan:</th>
                          <td>{detailList.disposition_position_name}</td>
                        </tr>
                        <tr>
                          <th>Arahan:</th>
                          <td>{detailList.disposition_arahan}</td>
                        </tr>
                        <tr>
                          <th>Tanggal Didisposisikan:</th>
                          <td>{moment(detailList.disposition_created_at).format("DD MMMM YYYY")}</td>
                        </tr>
                      </tbody>
                    </table>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            : null}
        </Col>
      </Row>
    )
  }

  render() {
    const { perms } = this.props.data
    const granted = ['is_admin']
    const isAdmin = granted.some(x => perms.includes(x));

    const {
      detailList,
      selectedSignature,
      dataUser,
      modalCenter,
      modalConfirm,
      isShowModalHistory,
      loading
    } = this.state;

    const optionsSignature = dataUser.length !== 0 ?
      dataUser.map(function (data) {
        return { value: data.id, label: data.text };
      })
      : null


    return (
      <React.Fragment>
        <div className="container-fluid">
        {loading && <Loader/>}
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
                      {this.getTableContent(detailList, isAdmin)}
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
                        toggle={this.showModalHistory}
                        size={30}
                        scrollable >
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
                    </Col>

                    {detailList.can_disposition ?
                      <Button
                        color="success"
                        className="mt-1"
                        onClick={this.showModalDispose}
                        data-toggle="modal"
                        data-target=".bs-example-modal-center">
                        <i className="typcn typcn-input-checked" />Disposisi
                    </Button>
                      : null}

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
                              className="col-sm-2 col-form-label">
                              Diteruskan kepada
                         </label>
                            <Col sm={10}>
                              <Select
                                isMulti
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
                              htmlFor="instruction"
                              className="col-sm-2 col-form-label">
                              Arahan
                          </label>
                            <Col sm={10}>
                              <input
                                name="instruction"
                                className="form-control"
                                type="text"
                                defaultValue=""
                                id="instruction"
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

                    {detailList.can_closed ?
                      <Button
                        color="danger"
                        className="mt-1"
                        onClick={this.showModalConfirm}
                        data-target=".bs-example-modal-center">
                        <i className="typcn typcn-input-checked" />Close
                    </Button>
                      : null}

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

const mapStatetoProps = state => {
  const { error, loading, data } = state.Login;
  return { error, loading, data };
};

export default withRouter(connect(mapStatetoProps, { loginUser, loginUserSuccess, loginUserFail })(IncomingMailDetail));