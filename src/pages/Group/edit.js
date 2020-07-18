import React, { Component } from "react";
import { Row, Col, Card, CardBody, Button } from "reactstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import {
  updateMasterGroupService,
  getDetailGroupService
} from "../../helpers/master/group"
import toast from '../UI/toast';

class GroupEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataDivisi: []
    }
  }

  componentDidMount() {
    const idDivisi = window.localStorage.getItem('idDivisi')

    this.getDetailDivisi(idDivisi)
  }

  getDetailDivisi = (idDivisi) => {
    getDetailGroupService(idDivisi)
      .then((data) => {
        this.setState({
          dataDivisi: data.data.data
        })
      })
      .catch(() => { throw 'Gagal Mengambil Data' })
  }

  updateGroup = (e) => {
    const params = {
      group_code: e.target.group_code.value,
      group_name: e.target.group_name.value
    }
    updateMasterGroupService(params)
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

  goBack = () => {
    this.props.history.push('/group')
  }

  render() {
    const { dataDivisi } = this.state

    return (
      <React.Fragment>
        <div className="container-fluid">
          <Row className="align-items-center">
            <Col sm={6}>
              <div className="page-title-box">
                <h4 className="font-size-18">Tambah Divisi</h4>
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <Link to="#">Home</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="/group">Master Divisi</Link>
                  </li>
                  <li className="breadcrumb-item active">Tambah Divisi</li>
                </ol>
              </div>
            </Col>
          </Row>

          <form action="#" onSubmit={this.updateGroup}>
            <Row>
              <div className="col-12">
                <Card>
                  <CardBody>
                    <Row className="form-group">
                      <label
                        htmlFor="group_code"
                        className="col-sm-2 col-form-label"
                      >
                        Kode Divisi
                    </label>
                      <Col sm={10}>
                        <input
                          name="group_code"
                          className="form-control"
                          type="text"
                          id="group_code"
                          defaultValue={dataDivisi.group_code}
                          ref={node => (this.inputNode = node)}
                        />
                      </Col>
                    </Row>

                    <Row className="form-group">
                      <label
                        htmlFor="group_name"
                        className="col-sm-2 col-form-label"
                      >
                        Nama Divisi
                    </label>
                      <Col sm={10}>
                        <input
                          className="form-control"
                          type="text"
                          id="group_name"
                          name="group_name"
                          defaultValue={dataDivisi.group_name}
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

export default connect()(GroupEdit);
