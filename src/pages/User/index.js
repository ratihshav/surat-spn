import React, { Component } from "react";
import {
  Row,
  Col,
  Button,
  Modal
} from "reactstrap";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { getMasterUserServices, deleteMasterUserService } from '../../helpers/master/user'
import 'react-toastify/dist/ReactToastify.css';
import DataTable from 'react-data-table-component';
import memoize from 'memoize-one';
import { Action, FilterComponent, AddButtonComponent } from '../../components/tabelComponents';

//Reducer
import { loginUser, loginUserSuccess, loginUserFail } from "../../store/actions";
import toast from '../UI/toast';

const columns = memoize(actHandler => [
  {
    name: 'Nama Lengkap',
    selector: 'full_name',
    sortable: true,
  }, {
    name: 'Username',
    selector: 'username',
    sortable: true,
  }, {
    name: 'Email',
    selector: 'email',
    sortable: true,
  }, {
    name: 'Jabatan',
    selector: 'position_name',
    sortable: true,
  }, {
    name: 'Aksi',
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
    cell: data => <Action data={data} actHandler={actHandler} />
  }
])

const search = [{
  name: 'Jabatan',
  value: 'position_name'
}, {
  name: 'Email',
  value: 'email'
}];

const CustomExpandTable = ({data}) => (
  <table className="table table-condensed">
    <tbody>
      <tr>
        <td style={{width: "150px"}}>NIP</td>
        <td>: {data.nip}</td>
      </tr>
      <tr>
        <td>Jenis Kelamin</td>
        <td>: {data.jenis_kelamin ? data.jenis_kelamin : " belum diisi"}</td>
      </tr>
      <tr>
        <td>Telepon</td>
        <td>: {data.phone ? data.phone : " -"}</td>
      </tr>
    </tbody>
  </table>
);

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      userId: null,
      dataUser: [],
      modalConfirm: false,
      row: null,
      filterText: "",
      resetPaginationToggle: false
    };
  }

  componentDidMount() {
    getMasterUserServices()
      .then((data) => {
        this.setState({
          dataUser: data.data.data
        })
      })
      .catch((e) => {
        return (
          this.alertError(e)
        )
      });
  }

  alertError = (e) => {
    toast.error(e)
  }

  navigateToAdd = () => {
    this.props.history.push({
      pathname: '/user-add'
    });
  }

  navigateToEdit = (id) => {
    localStorage.setItem('idUser', JSON.stringify(Number(id)))
    this.props.history.push({
      pathname: '/user-edit'
    });
  }

  navigateToDelete = (id) => {
    this.setState({ userId: id })
    this.setState({ modalConfirm: true })
  }

  showModalConfirm = () => {
    this.setState(prevState => ({
      modalConfirm: !prevState.modalConfirm
    }));
    document.body.classList.add("no_padding");
  }

  deleteUser = () => {
    const { userId } = this.state
    deleteMasterUserService(userId)
      .then((data) => {

        this.setState({
          modalConfirm: false
        }, () =>
          this.alertSuccess(data),
          window.location.reload()
        )
      })
      .catch((e) => {
        this.alertError(e)
      });
  }

  handleClear = () => {
    const { resetPaginationToggle, filterText } = this.state;

    if (filterText) {
      this.setState({
        resetPaginationToggle: !resetPaginationToggle,
        filterText: ""
      });
    }
  };

  handleButtonClick = (state) => {
    this.setState({ row: state.target.value })
    const act = state.target.name === 'edit' ? this.navigateToEdit(state.target.id)
      : state.target.name === 'delete' ? this.navigateToDelete(state.target.id) : null
  }

  getSubHeaderComponent = () => {
    const { dataUser, filterText } = this.state
    const { perms } = this.props.data
    const granted = ['user_save', 'is_admin']
    const isAbleCreate = granted.some(x => perms.includes(x));
    return (
      <Row>
        <FilterComponent onFilter={(e) => {
          console.log(123, e.target.name)
          let newFilterText = e.target.value;
          let filterSearch = e.target.name
          this.filteredItems = dataUser.filter(
            (item) =>
              item.full_name &&
              item.full_name.toLowerCase().includes(newFilterText.toLowerCase())
          );
          this.setState({ filterText: newFilterText });
        }}
          onClear={this.handleClear}
          filterText={filterText}
          search={search}
          isFromMail={false}
        /> &nbsp; &nbsp;

        { isAbleCreate ?
          <AddButtonComponent
            onClick={this.navigateToAdd}
          />
          : null}
      </Row>
    );
  };

  render() {
    const { dataUser, resetPaginationToggle, filterText, modalConfirm } = this.state
    const filteredItems = dataUser.filter(item => item.full_name && item.full_name.toLowerCase().includes(filterText.toLowerCase()));

    return (
      <React.Fragment>
        <div className="container-fluid">
          <Row className="align-items-center">
            <Col sm={6}>
              <div className="page-title-box">
                <h4 className="font-size-18">Daftar User</h4>
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <Link to="/user">User</Link>
                  </li>
                  <li className="breadcrumb-item active">Daftar User</li>
                </ol>
              </div>
              <br />
            </Col>
          </Row>
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <DataTable
                    columns={columns(this.handleButtonClick)}
                    data={filteredItems}
                    expandableRows
                    expandOnRowClicked
                    expandableRowsComponent={<CustomExpandTable/>}
                    pagination
                    highlightOnHover
                    striped
                    // dense
                    subHeader
                    subHeaderComponent={this.getSubHeaderComponent()}
                    paginationResetDefaultPage={resetPaginationToggle} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal isOpen={modalConfirm}>
          <div className="modal-header text-white bg-danger">
            <h5 className="modal-title mt-0">Konfirmasi</h5>
            <button
              type="button"
              onClick={() =>
                this.setState({ modalConfirm: false })
              }
              className="close"
              data-dismiss="modal"
              aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <h5>Apakah Anda yakin ingin menghapus User ini?</h5>
          </div>
          <div className="modal-footer">
            <Button
              color="danger"
              className="mt-1"
              onClick={this.deleteUser}
              data-target=".bs-example-modal-center">
              Hapus
            </Button>
            <Button
              className="btn btn-info"
              onClick={() => this.setState({ modalConfirm: false })}
              data-target=".bs-example-modal-center">
              Batal
            </Button>
          </div>
        </Modal>
      </React.Fragment>
    );
  }
}

const mapStatetoProps = state => {
  const { error, loading, data } = state.Login;
  return { error, loading, data };
};

export default withRouter(connect(mapStatetoProps, { loginUser, loginUserSuccess, loginUserFail })(User));