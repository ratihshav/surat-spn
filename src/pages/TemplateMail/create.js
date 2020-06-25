import React, { Component } from "react";
import { Row, Col, Card, CardBody, Button, Form } from "reactstrap";
import Select from "react-select";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import Dropzone from "react-dropzone";

import { createTemplateMailService } from "../../helpers/master/templateMail"
import toast from '../UI/toast';


class TemplateMailCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFiles: [],
    };
    this.handleAcceptedFiles = this.handleAcceptedFiles.bind(this);
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


  onFileChange = event => {
    this.setState({ selectedFile: event.target.files[0] });
  };

  saveTemplateMail = (e) => {
    const params = {
      template_type: e.target.type.value,
      template_name: e.target.name.value,
      file: this.state.selectedFiles
    }

    createTemplateMailService(params)
      .then((data) => {
        this.alertSuccess()
        this.props.history.push('/template-mail');
      })
      .catch(() => {
        return (
          this.alertError()
        )
      });
    e.preventDefault();
  }

  alertSuccess = () => {
    toast.success('Sukses menyimpan data!')
  };

  alertError = () => {
    toast.error('Gagal menyimpan data')
  }

  goBack = () => {
    this.props.history.push('/template-surat')
  }

  render() {
    const { selectedFiles } = this.state;

    return (
      <React.Fragment>
        <div className="container-fluid">
          <Row className="align-items-center">
            <Col sm={6}>
              <div className="page-title-box">
                <h4 className="font-size-18">Buat Template Surat</h4>
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <Link to="#">Master Data</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="/template-mail">Template Surat</Link>
                  </li>
                  <li className="breadcrumb-item active">Buat Template Surat</li>
                </ol>
              </div>
            </Col>
          </Row>

          <form action="#" onSubmit={this.saveTemplateMail}>
            <Row>
              <div className="col-12">
                <Card>
                  <CardBody>

                    <Row className="form-group">
                      <label
                        htmlFor="example-text-input"
                        className="col-sm-2 col-form-label"
                      >
                        Tipe Template Surat
                    </label>
                      <Col sm={10}>
                        <input
                          name="type"
                          className="form-control"
                          type="text"
                          id="example-text-input"
                          ref={node => (this.inputNode = node)}
                          required
                        />
                      </Col>
                    </Row>

                    <Row className="form-group">
                      <label
                        htmlFor="example-text-input"
                        className="col-sm-2 col-form-label"
                      >
                        Nama Template Surat
                    </label>
                      <Col sm={10}>
                        <input
                          className="form-control"
                          type="text"
                          id="example-text-input"
                          name="name"
                          ref={node => (this.inputNode = node)}
                          required
                        />
                      </Col>
                    </Row>


                    <Row className="form-group">
                      <label
                        htmlFor="example-search-input"
                        className="col-sm-2 col-form-label"
                      >
                        Dokumen
                    </label>
                      <Col sm={10}>

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
                              {selectedFiles.map((f, i) => {
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

                      </Col>
                    </Row>

                    <div className="text-center mt-4">
                      <Button
                        color="success"
                        className="mt-1"
                      // onClick={this.notify}
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

export default connect()(TemplateMailCreate);
