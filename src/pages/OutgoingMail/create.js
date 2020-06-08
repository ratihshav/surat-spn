import React, { Component } from "react";
import { Row, Col, Card, CardBody, Button } from "reactstrap";
import Select from "react-select";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

import {
  searchUser,
  searchUserSuccess,
} from "../../store/business/outgoing-mail/actions";

const type = [
  {
    label: "Pilih Tipe Surat",
    options: [
      { label: "Surat Keterangan", value: "Surat Keterangan" },
      { label: "Surat Biasa", value: "Surat Biasa" },
      { label: "Surat Perintah", value: "Surat Perintah" }
    ]
  },
];

const classification = [
  {
    label: "Pilih Klasifikasi Surat",
    options: [
      { label: "IT", value: "IT" },
      { label: "Keuangan", value: "Keuangan" },
      { label: "Operasional", value: "Operasional" }
    ]
  },
]

const urgency = [
  {
    label: "Pilih Sifat Surat",
    options: [
      { label: "Biasa", value: "Biasa" },
      { label: "Segera", value: "Segera" },
      { label: "Penting", value: "Penting" }
    ]
  }
]

class OutgoingMailCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedGroup: null,
      selectedClass: null,
      selectedUrgency: null,
      selectedFile: null
    };
  }

  componentDidMount() {
    this.props.searchUser()
    console.log('a', this.state)
  }

  handleSelectGroup = selectedGroup => {
    this.setState({ selectedGroup });
  };

  handleSelectClass = selectedClass => {
    this.setState({ selectedClass })
  }

  handleSelectUrgency = selectedUrgency => {
    this.setState({ selectedUrgency })
  }

  onFileChange = event => {
    // Update the state 
    this.setState({ selectedFile: event.target.files[0] });
  };

  onSearchUser = event => {
    this.props.searchUser()
  }

  render() {
    const { selectedGroup, selectedClass, selectedUrgency, selectedFile } = this.state;
    console.log('selectedFile', selectedFile, this.props)
    return (
      <React.Fragment>
        <div className="container-fluid">
          <Row className="align-items-center">
            <Col sm={6}>
              <div className="page-title-box">
                <h4 className="font-size-18">Buat Surat Keluar</h4>
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <Link to="#">User</Link>
                  </li>
                  <li className="breadcrumb-item">Surat Keluar</li>
                  <li className="breadcrumb-item active">Buat Surat Keluar</li>
                </ol>
              </div>
            </Col>
          </Row>

          <Row>
            <div className="col-12">
              <Card>
                <CardBody>


                  <Row className="form-group">
                    <label className="col-sm-2 col-form-label">
                      Tipe Surat
                    </label>
                    <Col sm={10}>
                      <Select
                        value={selectedGroup}
                        onChange={this.handleSelectGroup}
                        options={type}
                      />
                    </Col>
                  </Row>

                  <Row className="form-group">
                    <label
                      htmlFor="example-search-input"
                      className="col-sm-2 col-form-label"
                    >
                      Klasifikasi Surat
                    </label>
                    <Col sm={10}>
                      <Select
                        value={selectedClass}
                        onChange={this.handleSelectClass}
                        options={classification}
                      />
                    </Col>
                  </Row>

                  <Row className="form-group">
                    <label
                      htmlFor="example-search-input"
                      className="col-sm-2 col-form-label"
                    >
                      Sifat Surat
                    </label>
                    <Col sm={10}>
                      <Select
                        value={selectedUrgency}
                        onChange={this.handleSelectUrgency}
                        options={urgency}
                      />
                    </Col>
                  </Row>

                  <Row className="form-group">
                    <label
                      htmlFor="example-text-input"
                      className="col-sm-2 col-form-label"
                    >
                      Tujuan Surat
                    </label>
                    <Col sm={10}>
                      <input
                        className="form-control"
                        type="text"
                        defaultValue="Ikhwan Komputer"
                        id="example-text-input"
                      />
                    </Col>
                  </Row>

                  <Row className="form-group">
                    <label
                      htmlFor="example-text-input"
                      className="col-sm-2 col-form-label"
                    >
                      Hal Surat
                    </label>
                    <Col sm={10}>
                      <input
                        className="form-control"
                        type="text"
                        defaultValue="Izin Penggunaan Website"
                        id="example-text-input"
                      />
                    </Col>
                  </Row>

                  <Row className="form-group">
                    <label
                      htmlFor="example-text-input"
                      className="col-sm-2 col-form-label"
                    >
                      Lampiran Surat
                    </label>
                    <Col sm={10}>
                      <input
                        className="form-control"
                        type="text"
                        defaultValue=""
                        id="example-text-input"
                      />
                    </Col>
                  </Row>

                  <Row className="form-group">
                    <label
                      htmlFor="example-search-input"
                      className="col-sm-2 col-form-label"
                    >
                      Penandatanganan Surat
                    </label>
                    <Col sm={10}>
                      <Select
                        value={selectedClass}
                        onChange={this.onSearchUser}
                        options={classification}
                      />
                    </Col>
                  </Row>

                  <Row className="form-group">
                    <label
                      htmlFor="example-search-input"
                      className="col-sm-2 col-form-label"
                    >
                      Diajukan Kepada
                    </label>
                    <Col sm={10}>
                      <Select
                        value={selectedClass}
                        onChange={this.handleSelectClass}
                        options={classification}
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
                      <form action="#">
                        <div className="custom-file">
                          <input
                            type="file"
                            className="custom-file-input"
                            id="validatedCustomFile"
                            required
                            onChange={this.onFileChange}
                            accept=".doc, .docx"
                          />
                          <label
                            className="custom-file-label"
                            for="validatedCustomFile"
                          >
                            {selectedFile !== null && selectedFile !== undefined ? selectedFile.name : 'No file chosen'}
                          </label>
                          <div className="invalid-feedback">
                            Example invalid custom file feedback
                      </div>
                        </div>
                      </form>
                    </Col>
                  </Row>

                  <div className="text-center mt-4">
                    <Button
                      color="success"
                      className="mt-1"
                      onClick={this.uploadImage}
                    >
                      <i className="typcn typcn-input-checked" />Simpan
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

const mapStatetoProps = state => {
  const { error, loading, response } = state.OutgoingMail;
  return { error, loading, response };
};

export default withRouter(connect(mapStatetoProps, {
  searchUser,
  searchUserSuccess,
})(OutgoingMailCreate));
