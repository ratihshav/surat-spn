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
      selectedFile: [],
    };
  }

  onFileChange = event => {
    const { selectedFile } = this.state
    this.setState({ selectedFile: [...selectedFile, event.target.files[0]] });
  };

  saveTemplateMail = (e) => {
    const params = {
      template_type: e.target.type.value,
      template_name: e.target.name.value,
      file: this.state.selectedFile
    }

    createTemplateMailService(params)
      .then((data) => {
        this.alertSuccess()
        this.props.history.push('/template-mail');
      })
      .catch((e) => {
        return (
          this.alertError(e)
        )
      });
    e.preventDefault();
  }

  alertSuccess = () => {
    toast.success('Sukses menyimpan data!')
  };

  alertError = (e) => {
    toast.error(e)
  }

  goBack = () => {
    this.props.history.push('/template-mail')
  }

  deleteFromTable = (data) => {
    const { selectedFile } = this.state
    selectedFile.splice(data, 1)

    this.setState({ selectedFile })
  }

  filesTable = (data) => {
    return (
      <Col xl={12} >
        <Card>
          <CardBody style={{ padding: 0 }}>
            <table className="table table-hover table-centered table-bordered mb-0">
              <thead>
                <tr style={{ backgroundColor: '#5cb85c', color: 'white' }}>
                  <th>No </th>
                  <th>Nama File </th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {data ? data.map((nextItem, index) => {
                  return (
                    <tr key={index}>
                      <th>
                        {index + 1}
                      </th>
                      <th style={{ fontWeight: 'bold' }}>
                        {nextItem.name}
                      </th>
                      <th>
                        <Button
                          color="danger"
                          onClick={() => {
                            this.deleteFromTable(index)
                          }}
                        >
                          Hapus
                         </Button>
                      </th>
                    </tr>
                  );
                }) : null}
              </tbody>
            </table>
          </CardBody>
        </Card>
      </Col>
    )
  }

  render() {
    const { selectedFile } = this.state;

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
                        htmlFor="templateType"
                        className="col-sm-2 col-form-label"
                      >
                        Tipe Template Surat
                    </label>
                      <Col sm={10}>
                        <input
                          name="type"
                          className="form-control"
                          type="text"
                          id="templateType"
                          ref={node => (this.inputNode = node)}
                          required
                        />
                      </Col>
                    </Row>

                    <Row className="form-group">
                      <label
                        htmlFor="templateName"
                        className="col-sm-2 col-form-label"
                      >
                        Nama Template Surat
                    </label>
                      <Col sm={10}>
                        <input
                          className="form-control"
                          type="text"
                          id="templateName"
                          name="name"
                          ref={node => (this.inputNode = node)}
                          required
                        />
                      </Col>
                    </Row>

                    <Row className="form-group">
                      <label
                        htmlFor="example-search-input"
                        className="col-sm-2 col-form-label">
                        Dokumen
                          </label>
                      <Col sm={10}>
                        <form action="#">
                          <div className="custom-file">
                            <input
                              type="file"
                              className="form-control"
                              id="validatedCustomFile"
                              required
                              onChange={this.onFileChange}
                              accept=".doc, .docx"
                              name="file"
                              ref={node => (this.inputNode = node)}
                            />
                            <label
                              className="custom-file-label"
                              htmlFor="validatedCustomFile"
                              style={{ zIndex: 0 }}>
                              {selectedFile.length !== 0 ? selectedFile.name : 'No file chosen'}
                            </label>
                          </div>
                        </form>
                      </Col>
                    </Row>

                    <br />
                    {selectedFile.length !== 0 ?
                      <Row>
                        <div className="table-responsive">
                          {this.filesTable(selectedFile)}
                        </div>
                      </Row>
                      : null}

                    <div className="text-right mt-4">
                      <Button
                        color="success"
                        className="mt-1">
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
