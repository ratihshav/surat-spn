import React, { Component } from "react";
import { Row, Col, Card, CardBody, Button } from "reactstrap";
import Select from "react-select";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getMasterGroupServices } from "../../helpers/master/group"
import { saveMasterPositionService, searchParentPositionService } from "../../helpers/master/position"
import toast from '../UI/toast';
import SwitchComponent from "../UI/Switch"

class PositionAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataGroup: [],
      dataParent: [],
      selectedGroup: null,
      selectedParent: '',
      isParent: false
    }
  }

  componentDidMount() {
    this.getDataGroup()
    this.getPositionParent()
  }

  savePosition = (e) => {
    const { selectedGroup, selectedParent } = this.state
    const params = {
      position_name: e.target.position_name.value,
      position_type: e.target.position_type.value,
      detail: e.target.detail.value,
      group_id: selectedGroup.value,
      is_parent: e.target.is_parent.value,
      parent_id: selectedParent.value ? selectedParent.value : null
    }
    saveMasterPositionService(params)
      .then((data) => {
        this.alertSuccess()
        this.props.history.push('/position');
      })
      .catch((e) => {
        return (
          this.alertError(e)
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

  getPositionParent = () => {
    searchParentPositionService()
      .then((data) => {
        this.setState({
          dataParent: data.data.data
        })
      })
      .catch(() => { throw 'Gagal Mengambil Data' })
  }

  alertSuccess = () => {
    toast.success('Sukses menyimpan data!')
  };

  alertError = (e) => {
    toast.error(e)
  }

  handleSelectGroup = selectedGroup => {
    this.setState({ selectedGroup });
  };

  goBack = () => {
    this.props.history.push('/position')
  }

  handleCheckboxParent = (e) => {
    this.setState({ isParent: e.target.checked })
  }

  handleSelectParent = selectedParent => {
    this.setState({ selectedParent });
  };

  render() {
    const {
      dataGroup,
      selectedGroup,
      isParent,
      dataParent,
      selectedParent
    } = this.state

    const optionsGroup = dataGroup.length !== 0 ?
      dataGroup.map((data) => {
        return { value: data.id, label: data.group_name };
      })
      : null

    const optionsParent = dataParent.length !== 0 ?
      dataParent.map((data) => {
        return { value: data.id, label: data.text };
      })
      : ''

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
                        Nama Unit
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

                    <Row className="form-group">
                      <label
                        htmlFor="detail"
                        className="col-sm-2 col-form-label"
                      >
                        Detail
                    </label>
                      <Col sm={10}>
                        <input
                          className="form-control"
                          type="text"
                          id="detail"
                          name="detail"
                          ref={node => (this.inputNode = node)}
                        />
                      </Col>
                    </Row>

                    <Row className="form-group" style={{ alignItems: 'center' }}>
                      <label
                        htmlFor="example-search-input"
                        className="col-sm-2 col-form-label">
                        Is Parent
                      </label>
                      <Col sm={10}>
                        <SwitchComponent
                          name="is_parent"
                          onColor="#EF476F"
                          onChange={this.handleCheckboxParent}
                          value={isParent === false ? 0 : 1}
                          checked={isParent}
                          ref={node => (this.inputNode = node)}
                        />
                      </Col>
                    </Row>

                    <Row className="form-group">
                      <label
                        htmlFor="example-search-input"
                        className="col-sm-2 col-form-label">
                        Parent Id
                                  </label>
                      <Col sm={10}>
                        <Select
                          value={isParent ? null : selectedParent}
                          onChange={this.handleSelectParent}
                          options={optionsParent}
                          name="parent_id"
                          ref={node => (this.inputNode = node)}
                          isDisabled={isParent}
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


export default connect()(PositionAdd);
