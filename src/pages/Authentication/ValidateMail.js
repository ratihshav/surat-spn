import React, { Component } from "react";
import { Row, Col, Card, CardBody, Alert, Button } from "reactstrap";
import { withRouter, Link } from "react-router-dom";
import { AvForm, AvField } from "availity-reactstrap-validation";
import logoKabKerinci from "../../assets/images/logo-kab-kerinci.png"
import { getValidatedMailService } from "../../helpers/master/validateMail"
import config from '../../helpers/config'

class ValidateMail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataResult: [],
      errMsg: null
    };
  }

  // handleValidSubmit
  handleValidSubmit = (e, values) => {
    const { code } = values
    getValidatedMailService(code)
      .then((data) => {
        this.setState({
          dataResult: data.data.data
        })
      })
      .catch((error) => {
        this.setState({
          errMsg: error
        })
      });
    e.preventDefault();
  }

  result = (data) => {
    return (
      <Card style={{ fontWeight: 'bold' }}>
        <CardBody style={{ padding: 0 }}>
          <table className="table table-bordered mb-0">
            <tr style={{ backgroundColor: '#E9EBEE' }}>
              <th style={{ width: 200 }}>Tujuan Surat:</th>
              <td id="combo-1610-inputCell">{data.tujuan_surat}</td>
            </tr>
            <tr>
              <th>Nomor Surat:</th>
              <td>{data.nomor_surat}</td>
            </tr>
            <tr>
              <th>Tanggal Surat:</th>
              <td>{data.tgl_surat}</td>
            </tr>
            <tr>
              <th>Ditandatangani Oleh:</th>
              <td>{data.ttd_name}</td>
            </tr>
            <tr>
              <th>Dibuat Oleh:</th>
              <td>{data.created_name}</td>
            </tr>
            <tr>
              <th>File:</th>
              <td>   <a href={config.url_img + data.file_path} target="_blank" download>
                <p style={{ fontWeight: '800' }}>{data.original_name}</p>
              </a>
              </td>
            </tr>

          </table>
        </CardBody>
      </Card>
    )
  }

  render() {
    const { dataResult, errMsg } = this.state
    console.log('daya', dataResult)
    return (
      <React.Fragment>
        <Row className="justify-content-center">
          <Col md={8} lg={6} xl={5}>
            <div className="position-relative">

              <div className="text-primary text-center p-4">
                <Link to="/" className="logo logo-admin">
                  <img src={logoKabKerinci} height="150" alt="" />
                  <h1 className="text-blue">
                    e-Office Dinas Pendidikan
                            <br />
                          Kabupaten Kerinci
                        </h1>
                </Link>
              </div>

              <Card className="overflow-hidden">
                <div className="bg-primary">
                  <div className="text-primary text-center p-4">
                    <h5 className="text-white font-size-24">
                      Validasi Surat
                        </h5>
                    <p className="text-white">
                      Masukkan kode surat yang tertera pada surat Anda.
                        </p>
                  </div>
                </div>

                <CardBody className="p-4">
                  <div className="p-3">


                    <AvForm
                      className="form-horizontal mt-4"
                      onValidSubmit={this.handleValidSubmit}>
                      <div className="form-group">
                        <AvField
                          name="code"
                          className="form-control"
                          placeholder="Masukkan kode surat"
                          type="text"
                          required
                        />
                      </div>
                      <div className="button-items">
                        <Button
                          color="success"
                          className="btn btn-primary btn-block waves-effect waves-light">
                          Cari
                         </Button>
                      </div>

                      <br />
                      {errMsg ? (
                        <Alert color="danger" style={{ marginTop: "13px" }}>
                          {errMsg}
                        </Alert>
                      ) : null}
                    </AvForm>

                    <br />
                    {dataResult.length !== 0 ?
                      <div>
                        {this.result(dataResult)}
                      </div>
                      : null
                    }
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  Kembali ke{" "}
                  <Link
                    to="pages-login"
                    className="font-weight-medium text-primary"
                  >
                    Login
                      </Link>{" "}
                </p>
                <p className="mb-0">
                  © {new Date().getFullYear()} Ikhwan Komputer. All Rights Reserved
                  </p>
              </div>
            </div>
          </Col>
        </Row>
      </React.Fragment >
    );
  }
}


export default withRouter((ValidateMail));
