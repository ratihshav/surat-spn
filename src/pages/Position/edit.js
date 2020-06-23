import React, { Component } from "react";
import { Row, Col, Card, CardBody, Button } from "reactstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Select from "react-select";

import {
  updateMasterPositionService,
  getDetailPositionService
} from "../../helpers/master/position"
import { getMasterGroupServices } from '../../helpers/master/group';

import toast from '../UI/toast';

const idDivisi = window.localStorage.getItem('idDivisi');
class PositionEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataPosition: [],
      dataGroup: [],
      selectedGroup: null,

    }
  }

  componentDidMount() {
    const idPosition = window.localStorage.getItem('idPosition')

    this.getDetailPosition(idPosition)
    this.getDataGroup()
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
    getMasterGroupServices()
      .then((data) => {
        this.setState({
          dataGroup: data.data
        })
      })
      .catch(() => { throw 'Gagal Mengambil Data' })
  }

  updatePosition = (e) => {
    const { selectedGroup } = this.state

    const params = {
      group_code: e.target.group_code.value,
      group_name: e.target.group_name.value,
      group_name: selectedGroup.label,
      group_id: selectedGroup.value
    }
    updateMasterPositionService(params)
      .then((data) => {
        this.alertSuccess()
        this.props.history.push('/group');
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

  render() {
    const { dataGroup, dataPosition, selectedGroup } = this.state

    const optionsGroup = dataGroup.length !== 0 ?
      dataGroup.map((data) => {
        return { value: data.group_id, label: data.group_name };
      })
      : null

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

          <form action="#" onSubmit={this.saveGroup}>
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
                        />
                      </Col>
                    </Row>

                    <Row className="form-group">
                      <label
                        htmlFor="group_name"
                        className="col-sm-2 col-form-label" >
                        Tipe
                      </label>
                      <Col sm={10}>
                        <input
                          className="form-control"
                          type="text"
                          id="group_name"
                          name="group_name"
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
                          value={selectedGroup}
                          defaultValue={dataGroup.group_name}
                          onChange={this.handleSelectGroup}
                          options={optionsGroup}
                          name="type"
                          ref={node => (this.inputNode = node)}
                        />
                      </Col>
                    </Row>

                    <div className="text-right mt-4">
                      <Button
                        color="success"
                        className="mt-1"
                      >
                        <i className="typcn typcn-input-checked" />Simpan
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
