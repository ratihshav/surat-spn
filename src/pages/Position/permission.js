import React, { Component } from "react";
import { Row, Col, Card, CardBody, Button } from "reactstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Switch from "react-switch";

import {
  getDetailPositionService,
  getAllPermissionService,
  getGrantedPermissionService,
  saveGrantedPermissionService
} from "../../helpers/master/position"
import { getMasterGroupServices } from '../../helpers/master/group';
import SwitchComponent from "../UI/Switch"
import '../UI/switch.css';
import toast from '../UI/toast';

class PositionPermission extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataPosition: [],
      dataGroup: [],
      selectedGroup: null,
      switch1: false,
      allPermission: [],
      grantedPermission: [],
      switchJabatan: false,
      listJabatan: false,
      saveJabatan: false,
      viewJabatan: false,
      deleteJabatan: false,
      permJabatan: false,
      savePermJabatan: false,
      selectedPermission: [],
      checkedPos: [],
    }
  }

  componentDidMount() {
    const idPosition = window.localStorage.getItem('idPosition')

    this.getDetailPosition(idPosition)
    this.getGrantedPermission(idPosition)
    this.getAllPermission()
  }



  getDetailPosition = (idPosition) => {
    getDetailPositionService(idPosition)
      .then((data) => {
        this.setState({
          dataPosition: data.data.data
        })
      })
      .catch(() => { throw 'Gagal Mengambil Data' })
  }

  getGrantedPermission = (idPosition) => {
    getGrantedPermissionService(idPosition)
      .then((data) => {
        this.setState({
          grantedPermission: data.data.data,
          selectedPermission: data.data.data[0]
        })
      })
      .catch(() => { throw 'Gagal Mengambil Data' })
  }

  getAllPermission = () => {
    getAllPermissionService()
      .then((data) => {
        this.setState({
          allPermission: data.data.data
        })
      })
      .catch(() => { throw 'Gagal Mengambil Data' })
  }


  handleToogle = (e) => {
    const { checked, value } = e.target;
    let selectedPermission = null
    if (checked) {
      selectedPermission = [...this.state.selectedPermission, value];
    } else {
      selectedPermission = this.state.selectedPermission.filter(el => el !== value);
    }
    this.setState({ selectedPermission }, () => console.log(this.state.selectedPermission));
  }

  saveUpdatedGranted = (e) => {
    const { selectedPermission } = this.state
    saveGrantedPermissionService(selectedPermission)
      .then((data) => {
        this.alertSuccess()
        this.props.history.push('/position');
      })
      .catch(() => {
        return (
          this.alertError()
        )
      });
    e.preventDefault()
  }

  alertSuccess = () => {
    toast.success('Sukses menyimpan data!')
  };

  alertError = () => {
    toast.error('Gagal menyimpan data')
  }

  goBack = () => {
    this.props.history.push('/position')
  }

  render() {
    const {
      dataPosition,
      allPermission,
      grantedPermission,
    } = this.state

    console.log(allPermission)
    return (
      <React.Fragment>
        <div className="container-fluid">
          <Row className="align-items-center">
            <Col sm={6}>
              <div className="page-title-box">
                <h4 className="font-size-18">Edit Hak Akses</h4>
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <Link to="/group">Jabatan</Link>
                  </li>
                  <li className="breadcrumb-item active">Edit Hak Akses</li>
                </ol>
              </div>
            </Col>
          </Row>

          <form action="#" onSubmit={this.saveUpdatedGranted}>
            <Row>
              <div className="col-12">
                <Card>
                  <CardBody>
                    <Row className="form-group">
                      <label
                        htmlFor="group_code"
                        className="col-sm-2 col-form-label"
                      >
                        Nama Jabatan
                    </label>
                      <Col sm={10}>
                        <input
                          name="group_code"
                          className="form-control"
                          type="text"
                          id="group_code"
                          defaultValue={dataPosition.position_name}
                          ref={node => (this.inputNode = node)}
                          disabled
                        />
                      </Col>
                    </Row>

                    <Row className="form-group">
                      <label
                        htmlFor="group_name"
                        className="col-sm-2 col-form-label" >
                        Hak Akses
                      </label>
                      <Col sm={10}>
                        <table className="table table-bordered mb-0" style={{ width: '100%' }}>
                          {allPermission.map((item, index) => {
                            return (
                              <tbody key={index}>
                                <tr>
                                  <td colSpan={2} style={{ backgroundColor: '#F8F8FA' }}><h5>{item.module}</h5></td>
                                </tr>
                                {item.actions.map((action, aIndex) => {
                                  const string = grantedPermission.length !== 0 ? grantedPermission[0].toString() : null
                                  const value = string !== null ? string.includes(action.value) : false

                                  return (
                                    <tr key={aIndex}>
                                      <td style={{ padding: 1, verticalAlign: 'middle' }}>&nbsp;&nbsp;{action.text}</td>
                                      <td style={{ padding: 1 }}>&nbsp;
                                      <SwitchComponent
                                          onColor="#EF476F"
                                          onChange={this.handleToogle}
                                          value={action.value}
                                          defaultChecked={value}
                                        />
                                      </td>
                                    </tr>
                                  )
                                })}
                              </tbody>
                            )
                          })}
                        </table>
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



export default connect()(PositionPermission);
