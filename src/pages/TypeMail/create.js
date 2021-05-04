import React, { Component } from "react";
import { Row, Col, Card, CardBody, Button } from "reactstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { saveMasterTypeMailService } from "../../helpers/master/typeMail"
import toast from '../UI/toast';

class TypeMailCreate extends Component {
  constructor(props) {
    super(props);
  }


  saveClass = (e) => {
    const params = {
      tipe_surat: e.target.tipeSurat.value,
    }
    saveMasterTypeMailService(params)
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
    this.props.history.push('/type-mail')
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
                    <Link to="/type-mail">Master Tipe Surat</Link>
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
                        htmlFor="tipe_surat"
                        className="col-sm-2 col-form-label">
                        Tipe Surat
                      </label>
                      <Col sm={10}>
                        <input
                          className="form-control"
                          type="text"
                          id="tipe_surat"
                          name="tipeSurat"
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

export default connect()(TypeMailCreate);
