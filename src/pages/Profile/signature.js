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
import { saveSignatureUserService } from '../../helpers/master/user';
import SignaturePad from 'react-signature-canvas'
import dataURLtoBlob from 'blueimp-canvas-to-blob'
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


  saveSignature = () => {
    const id = window.localStorage.getItem('id')
    const canvas = this.sigPad.getCanvas()
    const blob = dataURLtoBlob(canvas.toDataURL('image/png'))

    const params = {
      file: blob,
      id: id
    }
    saveSignatureUserService(params)
      .then((data) => {
        this.alertSuccess()
        this.props.history.push('/profile');
      })
      .catch((e) => {
        return (
          this.alertError(e)
        )
      });
  }

  alertSuccess = () => {
    toast.success('Sukses menyimpan data!')
  };

  alertError = (e) => {
    toast.error(e)
  }

  render() {
    const { trimmedDataURL } = this.state
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
                          src={trimmedDataURL}
                          alt={'signature'} />

                        <div className="text-center mt-3">
                          <Button
                            color="success"
                            className="waves-effect waves-light"
                            onClick={this.saveSignature}>
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