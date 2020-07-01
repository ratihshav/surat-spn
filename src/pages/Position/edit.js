import React, { Component } from "react";
import { Row, Col, Card, CardBody, Button } from "reactstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Select from "react-select";

import {
  updateMasterPositionService,
  getDetailPositionService,
  searchParentPositionService
} from "../../helpers/master/position"
import { searchGroupService } from '../../helpers/master/group';
import SwitchComponent from "../UI/Switch"
import toast from '../UI/toast';

const idDivisi = window.localStorage.getItem('idDivisi');
class PositionEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataPosition: [],
      dataGroup: [],
      dataParent: [],
      selectedGroup: '',
      selectedParent: '',
      isParent: false,
    }
  }

  componentDidMount() {
    const idPosition = window.localStorage.getItem('idPosition')

    this.getDetailPosition(idPosition)
    this.getDataGroup()
    this.getPositionParent()
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

  getDataGroup = () => {
    searchGroupService()
      .then((data) => {
        this.setState({
          dataGroup: data.data.data
        })
      })
      .catch(() => { throw 'Gagal Mengambil Data' })
  }

  getPositionParent = () => {
    searchParentPositionService()
      .then((data) => {
        this.setState({
          dataParent: data.data.data
        })
      })
      .catch(() => { throw 'Gagal Mengambil Data' })
  }


  handleCheckboxParent = (e) => {
    console.log('e', e.target.checked)
    this.setState({ isParent: e.target.checked })
  }

  handleSelectParent = selectedParent => {
    this.setState({ selectedParent });
  };

  updatePosition = (e) => {

    const { selectedGroup, selectedParent, dataPosition } = this.state
    const params = {
      position_name: e.target.position_name.value,
      position_type: e.target.position_type.value,
      detail: e.target.detail.value,
      group_id: selectedGroup.value ? selectedGroup.value : dataPosition.group_id,
      is_parent: e.target.is_parent.value,
      parent_id: dataPosition.parent_id === null ? ''
        : selectedParent.value ? selectedParent.value
          : dataPosition.parent_id
    }
    console.log('params', params)

    updateMasterPositionService(params)
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

  handleSelectGroup = selectedGroup => {
    this.setState({ selectedGroup });
  };

  goBack = () => {
    this.props.history.push('/position')
  }

  render() {
    const {
      dataGroup,
      dataPosition,
      selectedGroup,
      selectedParent,
      dataParent,
      isParent,
    } = this.state

    const optionsGroup = dataGroup.length !== 0 ?
      dataGroup.map((data) => {
        return { value: data.id, label: data.text };
      })
      : null

    const optionsParent = dataParent.length !== 0 ?
      dataParent.map((data) => {
        return { value: data.id, label: data.text };
      })
      : null

    const defaValGroup = {
      value: dataPosition.group_id,
      label: dataPosition.group_name
    }
    const defaValParent = {
      value: dataPosition.parent_id ? dataPosition.parent_id : '',
      label: dataPosition.parent_name ? dataPosition.parent_name : ''
    }

    return (
      <React.Fragment>
        <div className="container-fluid">
          <Row className="align-items-center">
            <Col sm={6}>
              <div className="page-title-box">
                <h4 className="font-size-18">Edit Data Jabatan</h4>
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <Link to="/group">Jabatan</Link>
                  </li>
                  <li className="breadcrumb-item active">Edit Data Jabatan</li>
                </ol>
              </div>
            </Col>
          </Row>

          <form action="#" onSubmit={this.updatePosition}>
            <Row>
              <div className="col-12">
                <Card>
                  <CardBody>
                    <Row className="form-group">
                      <label
                        htmlFor="position_name"
                        className="col-sm-2 col-form-label"
                      >
                        Nama Jabatan
                    </label>
                      <Col sm={10}>
                        <input
                          name="position_name"
                          className="form-control"
                          type="text"
                          id="position_name"
                          defaultValue={dataPosition.position_name}
                          ref={node => (this.inputNode = node)}
                        />
                      </Col>
                    </Row>

                    <Row className="form-group">
                      <label
                        htmlFor="position_type"
                        className="col-sm-2 col-form-label" >
                        Tipe
                      </label>
                      <Col sm={10}>
                        <input
                          className="form-control"
                          type="text"
                          id="position_type"
                          name="position_type"
                          defaultValue={dataPosition.position_type}
                          ref={node => (this.inputNode = node)}
                        />
                      </Col>
                    </Row>

                    <Row className="form-group">
                      <label
                        htmlFor="example-search-input"
                        className="col-sm-2 col-form-label">
                        Divisi
                                  </label>
                      <Col sm={10}>
                        <Select
                          value={selectedGroup === null ? dataPosition.group_id : selectedGroup}
                          placeholder={[dataPosition.group_name]}
                          onChange={this.handleSelectGroup}
                          options={optionsGroup}
                          name="group_name"
                          ref={node => (this.inputNode = node)}
                          defaultValue={defaValGroup}
                        />
                      </Col>
                    </Row>

                    <Row className="form-group">
                      <label
                        htmlFor="detail"
                        className="col-sm-2 col-form-label"
                      >
                        Detail
                    </label>
                      <Col sm={10}>
                        <input
                          className="form-control"
                          type="text"
                          id="detail"
                          name="detail"
                          defaultValue={dataPosition.detail}
                          ref={node => (this.inputNode = node)}
                        />
                      </Col>
                    </Row>

                    <Row className="form-group" style={{ alignItems: 'center' }}>
                      <label
                        htmlFor="example-search-input"
                        className="col-sm-2 col-form-label">
                        Is Parent
                      </label>
                      <Col sm={10}>
                        <SwitchComponent
                          name="is_parent"
                          onColor="#EF476F"
                          onChange={this.handleCheckboxParent}
                          value={isParent === false ? 0 : 1}
                          checked={dataPosition.is_parent ? dataPosition.is_parent : isParent}
                          // defaultChecked={}
                          ref={node => (this.inputNode = node)}
                        />
                      </Col>
                    </Row>

                    <Row className="form-group">
                      <label
                        htmlFor="example-search-input"
                        className="col-sm-2 col-form-label">
                        Parent Id
                                  </label>
                      <Col sm={10}>
                        <Select
                          value={isParent ? null : selectedParent}
                          onChange={this.handleSelectParent}
                          options={optionsParent}
                          name="parent_id"
                          ref={node => (this.inputNode = node)}
                          isDisabled={dataPosition.is_parent ? dataPosition.is_parent : isParent}
                          defaultValue={defaValParent}
                          placeholder={[dataPosition.parent_name]}
                        />
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

export default connect()(PositionEdit);
