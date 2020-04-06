import React, { Component } from "react";
import SettingMenu from "../Shared/SettingMenu";
import {
  Row,
  Col,
  Button,
  Modal,
  Tooltip
} from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import { MDBDataTable, MDBBtn, MDBTableHead, MDBTableBody } from "mdbreact";
import "chartist/dist/scss/chartist.scss";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      // tooltipView: false,
      // tooltipEdit: false,
      // tooltipDelete: false
    };
    this.goToUserAdd = this.goToUserAdd.bind(this);
    this.showDetailUserModal = this.showDetailUserModal.bind(this);

  }

  goToUserAdd() {
    this.props.history.push('/user-add')
  }

  showDetailUserModal() {
    console.log('show')
    this.setState(prevState => ({
      isModalVisible: !prevState.isModalVisible
    }));
  }


  render() {
    const data = {
      columns: [
        {
          label: "Nama Pegawai",
          field: "name",
          sort: "asc",
          width: 150
        },
        {
          label: "Unit Kerja",
          field: "office",
          sort: "asc",
          width: 270
        },
        {
          label: "Jabatan",
          field: "position",
          sort: "asc",
          width: 200
        },
        {
          label: "Hak Akses",
          field: "age",
          sort: "asc",
          width: 100
        },
        {
          label: "Last Login",
          field: "date",
          sort: "asc",
          width: 150
        },
        {
          label: "Action",
          field: "action",
          sort: "asc",
          width: 150
        },
      ],
      rows: [
        {
          name: "Tiger Nixon",
          position: "System Architect",
          office: "Edinburgh",
          age: "61",
          date: "2011/04/25",
          action: <Row className="align-items-center">
            <Link onClick={this.showDetailUserModal} className="has-arrow waves-effect" id="tooltipView">
              <i className="fas fa-eye fa-lg"></i>
              <Tooltip placement="top" isOpen={this.state.tooltipView} target="tooltipView" toggle={() => this.setState({ tooltipView: !this.state.tooltipView })}>Lihat Detail User</Tooltip>
            </Link>
            &nbsp;
            <Link className="has-arrow waves-effect" id="tooltipEdit">
              <i className="fas fa-pen fa-lg"></i>
              <Tooltip placement="top" isOpen={this.state.tooltipEdit} target="tooltipEdit" toggle={() => this.setState({ tooltipEdit: !this.state.tooltipEdit })}>Edit User</Tooltip>
            </Link>
            &nbsp;
            <Link to="/#" className="has-arrow waves-effect" id="tooltipDelete">
              <i className="fas fa-trash fa-lg"></i>
              <Tooltip placement="top" isOpen={this.state.tooltipDelete} target="tooltipDelete" toggle={() => this.setState({ tooltipDelete: !this.state.tooltipDelete })}>Hapus User</Tooltip>
            </Link>
          </Row>
        },
        {
          name: "Garrett Winters",
          position: "Accountant",
          office: "Tokyo",
          age: "63",
          date: "2011/07/25",
        },
        {
          name: "Ashton Cox",
          position: "Junior Technical Author",
          office: "San Francisco",
          age: "66",
          date: "2009/01/12",
        },
        {
          name: "Cedric Kelly",
          position: "Senior Javascript Developer",
          office: "Edinburgh",
          age: "22",
          date: "2012/03/29",
        },
        {
          name: "Airi Satou",
          position: "Accountant",
          office: "Tokyo",
          age: "33",
          date: "2008/11/28",
        },
        {
          name: "Brielle Williamson",
          position: "Integration Specialist",
          office: "New York",
          age: "61",
          date: "2012/12/02",
        },
        {
          name: "Herrod Chandler",
          position: "Sales Assistant",
          office: "San Francisco",
          age: "59",
          date: "2012/08/06",
        },
        {
          name: "Rhona Davidson",
          position: "Integration Specialist",
          office: "Tokyo",
          age: "55",
          date: "2010/10/14",
        },
        {
          name: "Colleen Hurst",
          position: "Javascript Developer",
          office: "San Francisco",
          age: "39",
          date: "2009/09/15",
        },
        {
          name: "Sonya Frost",
          position: "Software Engineer",
          office: "Edinburgh",
          age: "23",
          date: "2008/12/13",
        },
        {
          name: "Jena Gaines",
          position: "Office Manager",
          office: "London",
          age: "30",
          date: "2008/12/19",
        },
        {
          name: "Quinn Flynn",
          position: "Support Lead",
          office: "Edinburgh",
          age: "22",
          date: "2013/03/03",
        },
        {
          name: "Charde Marshall",
          position: "Regional Director",
          office: "San Francisco",
          age: "36",
          date: "2008/10/16",
        },
        {
          name: "Haley Kennedy",
          position: "Senior Marketing Designer",
          office: "London",
          age: "43",
          date: "2012/12/18",
        },
        {
          name: "Tatyana Fitzpatrick",
          position: "Regional Director",
          office: "London",
          age: "19",
          date: "2010/03/17",
        },
        {
          name: "Michael Silva",
          position: "Marketing Designer",
          office: "London",
          age: "66",
          date: "2012/11/27",
        },
        {
          name: "Paul Byrd",
          position: "Chief Financial Officer (CFO)",
          office: "New York",
          age: "64",
          date: "2010/06/09",
        },
        {
          name: "Gloria Little",
          position: "Systems Administrator",
          office: "New York",
          age: "59",
          date: "2009/04/10",
        },
      ]
    };


    return (
      <React.Fragment>
        <div className="container-fluid">
          <Row className="align-items-center">
            <Col sm={6}>
              <div className="page-title-box">
                <h4 className="font-size-18">Daftar User</h4>
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <Link to="#">Veltrix</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="#">User</Link>
                  </li>
                  <li className="breadcrumb-item active">Daftar User</li>
                </ol>
              </div>
              <Col sm={3}>
                <Button
                  color="primary"
                  className="btn btn-primary btn-block"
                  onClick={this.goToUserAdd}
                >
                  Tambah User
                    </Button>
              </Col>
              <br />
            </Col>

          </Row>


          <div className="row">
            <div className="col-12">
              <div className="card">

                <div className="card-body">


                  <MDBDataTable
                    responsive
                    striped
                    bordered
                    btn
                    data={data} />
                </div>
              </div>
            </div>
          </div>

          <Modal
            isOpen={this.state.isModalVisible}
            toggle={this.showDetailUserModal}
          >
            <div className="modal-header">
              <h5 className="modal-title mt-0" id="myModalLabel">
                Modal Heading
                          </h5>
              <button
                type="button"
                onClick={() =>
                  this.setState({ isModalVisible: false })
                }
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <h5>Overflowing text to show scroll behavior</h5>
              <p>
                Cras mattis consectetur purus sit amet fermentum.
                Cras justo odio, dapibus ac facilisis in, egestas
                eget quam. Morbi leo risus, porta ac consectetur ac,
                vestibulum at eros.
                          </p>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl
                consectetur et. Vivamus sagittis lacus vel augue
                laoreet rutrum faucibus dolor auctor.
                          </p>
              <p>
                Aenean lacinia bibendum nulla sed consectetur.
                Praesent commodo cursus magna, vel scelerisque nisl
                consectetur et. Donec sed odio dui. Donec
                ullamcorper nulla non metus auctor fringilla.
                          </p>
              <p>
                Cras mattis consectetur purus sit amet fermentum.
                Cras justo odio, dapibus ac facilisis in, egestas
                eget quam. Morbi leo risus, porta ac consectetur ac,
                vestibulum at eros.
                          </p>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl
                consectetur et. Vivamus sagittis lacus vel augue
                laoreet rutrum faucibus dolor auctor.
                          </p>
              <p>
                Aenean lacinia bibendum nulla sed consectetur.
                Praesent commodo cursus magna, vel scelerisque nisl
                consectetur et. Donec sed odio dui. Donec
                ullamcorper nulla non metus auctor fringilla.
                          </p>
              <p>
                Cras mattis consectetur purus sit amet fermentum.
                Cras justo odio, dapibus ac facilisis in, egestas
                eget quam. Morbi leo risus, porta ac consectetur ac,
                vestibulum at eros.
                          </p>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl
                consectetur et. Vivamus sagittis lacus vel augue
                laoreet rutrum faucibus dolor auctor.
                          </p>
              <p>
                Aenean lacinia bibendum nulla sed consectetur.
                Praesent commodo cursus magna, vel scelerisque nisl
                consectetur et. Donec sed odio dui. Donec
                ullamcorper nulla non metus auctor fringilla.
                          </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                onClick={this.tog_standard}
                className="btn btn-secondary waves-effect"
                data-dismiss="modal"
              >
                Close
                          </button>
              <button
                type="button"
                className="btn btn-primary waves-effect waves-light"
              >
                Save changes
                          </button>
            </div>
          </Modal>

        </div>
      </React.Fragment>
    );
  }
}

export default User;
