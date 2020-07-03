import React, { Component } from "react";
import {
  Row,
  Col,
  Button
} from "reactstrap";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import toast from '../UI/toast';
import styles from './styles.module.css'
import SignaturePad from 'react-signature-canvas'

class ProfileSignature extends Component {
  state = {
    trimmedDataURL: null
  }
  sigPad = {}

  clear = () => {
    this.sigPad.clear()
  }

  trim = () => {

    this.setState({
      trimmedDataURL: this.sigPad.getTrimmedCanvas()
        .toDataURL('image/png')
    })
  }

  alertSuccess = () => {
    toast.success('Sukses menyimpan data!')
  };

  alertError = () => {
    toast.error('Gagal menyimpan data')
  }

  render() {
    const { trimmedDataURL } = this.state

    console.log('trimeee', trimmedDataURL)
    return (
      <React.Fragment>
        <div className="container-fluid">
          <Row className="align-items-center">
            <Col sm={6}>
              <div className="page-title-box">
                <h4 className="font-size-18">Ganti Tanda Tangan</h4>
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <Link to="/profile">Profile</Link>
                  </li>
                  <li className="breadcrumb-item active">Ganti Tanda Tangan</li>
                </ol>
              </div>
            </Col>
          </Row>


          <Row>
            <div className="col-12">
              <Row>
                <Col md={8}>
                  <div className={styles.container}>
                    <div className={styles.sigContainer}>
                      <SignaturePad canvasProps={{ className: styles.sigPad }}
                        ref={(ref) => { this.sigPad = ref }} />
                    </div>
                    <div className="text-center mt-3">
                      <Button
                        color="primary"
                        className="waves-effect waves-light"
                        onClick={this.trim}>
                        Tampilkan
                      </Button>
                        &nbsp; &nbsp; &nbsp;
                      <Button
                        color="danger"
                        className="waves-effect waves-light"
                        onClick={this.clear}>
                        Hapus
                      </Button>
                    </div>
                  </div>
                </Col>

                <Col md={4}>
                  {trimmedDataURL
                    ? (
                      <div>
                        <img
                          className={styles.sigImage}
                          src={trimmedDataURL} />

                        <div className="text-center mt-3">
                          <Button
                            color="success"
                            className="waves-effect waves-light"
                            onClick={this.uploadImage}>
                            Simpan
                          </Button>
                        </div>
                      </div>
                    )
                    : null}
                </Col>
              </Row>
            </div>
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(connect()(ProfileSignature));