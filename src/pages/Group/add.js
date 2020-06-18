import React, { Component } from "react";
import { Row, Col, Card, CardBody, Button } from "reactstrap";
import Select from "react-select";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { saveMasterGroupService } from "../../helpers/master/group"
import toast from '../UI/toast';

class GroupAdd extends Component {
  constructor(props) {
    super(props);
  }


  saveGroup = (e) => {
    const params = {
      group_code: e.target.group_code.value,
      group_name: e.target.group_name.value
    }
    saveMasterGroupService(params)
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

  render() {

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
                        Kode Divisi
                    </label>
                      <Col sm={10}>
                        <input
                          name="group_code"
                          className="form-control"
                          type="text"
                          id="group_code"
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
                          ref={node => (this.inputNode = node)}
                        />
                      </Col>
                    </Row>
                    <div className="text-right mt-4">
                      <Button
                        color="success"
                        className="mt-1"
                      // onClick={this.saveOutgoingMail}
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

const styles = {
  col: {
    height: '100vh'
  }
}

export default connect()(GroupAdd);
