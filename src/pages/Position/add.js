import React, { Component } from "react";
import { Row, Col, Card, CardBody, Button } from "reactstrap";
import Select from "react-select";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getMasterGroupServices } from "../../helpers/master/group"
import { saveMasterPositionService } from "../../helpers/master/position"
import toast from '../UI/toast';

class PositionAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataGroup: [],
      selectedGroup: null
    }
  }

  componentDidMount() {
    this.getDataGroup()
  }

  savePosition = (e) => {
    const { selectedGroup } = this.state
    const params = {
      position_name: e.target.position_name.value,
      position_type: e.target.position_type.value,
      group_name: selectedGroup.label,
      group_id: selectedGroup.value
    }
    saveMasterPositionService(params)
      .then((data) => {
        this.alertSuccess()
        this.props.history.push('/position');
      })
      .catch(() => {
        return (
          this.alertError()
        )
      });
    e.preventDefault()
  }

  getDataGroup = () => {
    getMasterGroupServices()
      .then((data) => {
        this.setState({
          dataGroup: data.data
        })
      })
      .catch(() => { throw 'Gagal Mengambil Data' })
  }

  alertSuccess = () => {
    toast.success('Sukses menyimpan data!')
  };

  alertError = () => {
    toast.error('Gagal menyimpan data')
  }

  handleSelectGroup = selectedGroup => {
    this.setState({ selectedGroup });
  };

  render() {
    const { dataGroup, selectedGroup } = this.state

    const optionsGroup = dataGroup.length !== 0 ?
      dataGroup.map(function (data) {
        return { value: data.id, label: data.group_name };
      })
      : null

    return (
      <React.Fragment>
        <div className="container-fluid">
          <Row className="align-items-center">
            <Col sm={6}>
              <div className="page-title-box">
                <h4 className="font-size-18">Tambah Data Jabatan</h4>
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <Link to="/position">Master Data Jabatan</Link>
                  </li>
                  <li className="breadcrumb-item active">Tambah Data Jabatan</li>
                </ol>
              </div>
            </Col>
          </Row>

          <form action="#" onSubmit={this.savePosition}>
            <Row>
              <div className="col-12">
                <Card>
                  <CardBody>
                    <Row className="form-group">
                      <label
                        htmlFor="group_code"
                        className="col-sm-2 col-form-label"
                      >
                        Nama Jabatan
                    </label>
                      <Col sm={10}>
                        <input
                          name="position_name"
                          className="form-control"
                          type="text"
                          id="position_name"
                          ref={node => (this.inputNode = node)}
                        />
                      </Col>
                    </Row>

                    <Row className="form-group">
                      <label
                        htmlFor="group_name"
                        className="col-sm-2 col-form-label"
                      >
                        Tipe
                    </label>
                      <Col sm={10}>
                        <input
                          className="form-control"
                          type="text"
                          id="position_type"
                          name="position_type"
                          ref={node => (this.inputNode = node)}
                        />
                      </Col>
                    </Row>

                    <Row className="form-group">
                      <label
                        htmlFor="example-search-input"
                        className="col-sm-2 col-form-label">
                        Nama Divisi
                                  </label>
                      <Col sm={10}>
                        <Select
                          value={selectedGroup}
                          onChange={this.handleSelectGroup}
                          options={optionsGroup}
                          name="group_name"
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


export default connect()(PositionAdd);