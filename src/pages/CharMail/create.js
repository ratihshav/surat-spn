import React, { Component } from "react";
import { Row, Col, Card, CardBody, Button } from "reactstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { saveMasterCharMailService } from "../../helpers/master/charMail"
import toast from '../UI/toast';

class CharMailCreate extends Component {
  constructor(props) {
    super(props);
  }

  saveClass = (e) => {
    const params = {
      sifat_surat: e.target.sifatSurat.value,
    }
    saveMasterCharMailService(params)
      .then((data) => {
        this.alertSuccess(data.data.messages[0])
        this.props.history.push('/type-mail');
      })
      .catch(() => {
        return (
          this.alertError(e)
        )
      });
    e.preventDefault()
  }

  alertSuccess = (e) => {
    toast.success(e)
  };

  alertError = (e) => {
    toast.error(e)
  }

  goBack = () => {
    this.props.history.push('/char-mail')
  }


  render() {

    return (
      <React.Fragment>
        <div className="container-fluid">
          <Row className="align-items-center">
            <Col sm={6}>
              <div className="page-title-box">
                <h4 className="font-size-18">Tambah Tipe Surat</h4>
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <Link to="#">Home</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="/char-mail">Master Tipe Surat</Link>
                  </li>
                  <li className="breadcrumb-item active">Tambah Tipe Surat</li>
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
                        htmlFor="sifat_surat"
                        className="col-sm-2 col-form-label">
                        Sifat Surat
                      </label>
                      <Col sm={10}>
                        <input
                          className="form-control"
                          type="text"
                          id="sifat_surat"
                          name="sifatSurat"
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

export default connect()(CharMailCreate);
