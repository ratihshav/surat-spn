import React, { Component } from "react";
import { Row, Col, Card, CardBody, Button } from "reactstrap";
import Select from "react-select";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { saveMasterClassService } from "../../helpers/master/classification"
import toast from '../UI/toast';

class ClassificationAdd extends Component {
  constructor(props) {
    super(props);
  }


  saveClass = (e) => {
    const params = {
      kode_klasifikasi: e.target.kode_klasifikasi.value,
      nama_klasifikasi: e.target.nama_klasifikasi.value,
      detail: e.target.detail.value
    }
    saveMasterClassService(params)
      .then((data) => {
        this.alertSuccess()
        this.props.history.push('/classification');
      })
      .catch(() => {
        return (
          this.alertError(e)
        )
      });
    e.preventDefault()
  }

  alertSuccess = () => {
    toast.success('Sukses menyimpan data!')
  };

  alertError = (e) => {
    toast.error(e)
  }

  goBack = () => {
    this.props.history.push('/classification')
  }


  render() {

    return (
      <React.Fragment>
        <div className="container-fluid">
          <Row className="align-items-center">
            <Col sm={6}>
              <div className="page-title-box">
                <h4 className="font-size-18">Tambah Klasifikasi Surat</h4>
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <Link to="#">Home</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="/group">Master Klasifikasi Surat</Link>
                  </li>
                  <li className="breadcrumb-item active">Tambah Klasifikasi Surat</li>
                </ol>
              </div>
            </Col>
          </Row>

          <form action="#" onSubmit={this.saveClass}>
            <Row>
              <div className="col-12">
                <Card>
                  <CardBody>
                    <Row className="form-group">
                      <label
                        htmlFor="group_code"
                        className="col-sm-2 col-form-label"
                      >
                        Kode Klasifikasi Surat
                    </label>
                      <Col sm={10}>
                        <input
                          name="kode_klasifikasi"
                          className="form-control"
                          type="text"
                          id="kode_klasifikasi"
                          ref={node => (this.inputNode = node)}
                        />
                      </Col>
                    </Row>

                    <Row className="form-group">
                      <label
                        htmlFor="group_name"
                        className="col-sm-2 col-form-label">
                        Nama Klasifikasi Surat
                      </label>
                      <Col sm={10}>
                        <input
                          className="form-control"
                          type="text"
                          id="nama_klasifikasi"
                          name="nama_klasifikasi"
                          ref={node => (this.inputNode = node)}
                        />
                      </Col>
                    </Row>

                    <Row className="form-group">
                      <label
                        htmlFor="group_name"
                        className="col-sm-2 col-form-label">
                        Detail Klasifikasi Surat
                      </label>
                      <Col sm={10}>
                        <input
                          className="form-control"
                          type="text"
                          id="detail"
                          name="detail"
                          ref={node => (this.inputNode = node)}
                        />
                      </Col>
                    </Row>
                    <div className="text-right mt-4">
                      <Button
                        color="success"
                        className="mt-1" >
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

const styles = {
  col: {
    height: '100vh'
  }
}

export default connect()(ClassificationAdd);
