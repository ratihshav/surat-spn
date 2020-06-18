import React, { Component } from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  Form,
  Button
} from "reactstrap";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import Dropzone from "react-dropzone";
import toast from '../UI/toast';
import { changePhotoUserService } from '../../helpers/master/user';

class UserChangePhoto extends Component {
  constructor(props) {
    super(props);
    this.handleAcceptedFiles = this.handleAcceptedFiles.bind(this);
    this.state = { selectedFiles: [] };
  }

  handleAcceptedFiles = files => {
    files.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: this.formatBytes(file.size)
      })
    );

    this.setState({ selectedFiles: files });
  };

  /**
   * Formats the size
   */
  formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  uploadImage = (e) => {
    const idUser = window.localStorage.getItem('idUser');

    const params = {
      image: this.state.selectedFiles,
      id: idUser
    }

    changePhotoUserService(params)
      .then((data) => {
        this.alertSuccess()
        this.props.history.push('/user-edit');
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
                <h4 className="font-size-18">Ganti Foto</h4>
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <Link to="/user">User</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="/user-edit">Edit User</Link>
                  </li>
                  <li className="breadcrumb-item active">Ganti Foto</li>
                </ol>
              </div>
            </Col>
          </Row>


          <Row>
            <div className="col-12">
              <Card>
                <CardBody>
                  <div className="mb-5">
                    <Form>
                      <Dropzone
                        multiple={true}
                        onDrop={acceptedFiles =>
                          this.handleAcceptedFiles(acceptedFiles)
                        }
                      >
                        {({ getRootProps, getInputProps }) => (
                          <div className="dropzone">
                            <div
                              className="dz-message needsclick"
                              {...getRootProps()}
                            >
                              <input {...getInputProps()} />
                              <h3>Drop files here or click to upload.</h3>
                            </div>
                          </div>
                        )}
                      </Dropzone>
                      <div
                        className="dropzone-previews mt-3"
                        id="file-previews"
                      >
                        {this.state.selectedFiles.map((f, i) => {
                          return (
                            <Card
                              className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                              key={i + "-file"}
                            >
                              <div className="p-2">
                                <Row className="align-items-center">
                                  <Col className="col-auto">
                                    <img
                                      data-dz-thumbnail=""
                                      height="80"
                                      className="avatar-sm rounded bg-light"
                                      alt={f.name}
                                      src={f.preview}
                                    />
                                  </Col>
                                  <Col>
                                    <Link
                                      to="#"
                                      className="text-muted font-weight-bold"
                                    >
                                      {f.name}
                                    </Link>
                                    <p className="mb-0">
                                      <strong>{f.formattedSize}</strong>
                                    </p>
                                  </Col>
                                </Row>
                              </div>
                            </Card>
                          );
                        })}
                      </div>
                    </Form>
                  </div>

                  <div className="text-center mt-3">
                    <Button
                      color="primary"
                      className="waves-effect waves-light"
                      onClick={this.uploadImage}
                    >
                      Upload
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </div>
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(connect()(UserChangePhoto));