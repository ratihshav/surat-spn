import React, { Component } from "react";
import { Row, Col, Button, Modal } from "reactstrap";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { getMasterGroupServices, deleteMasterGroupService } from '../../helpers/master/group'
import toast from '../UI/toast';
import { loginUser, loginUserSuccess, loginUserFail } from "../../store/actions";
import DataTable from 'react-data-table-component';
import memoize from 'memoize-one';
import { Action, FilterComponent, AddButtonComponent } from '../../components/tabelComponents';

const columns = memoize(actHandler => [
  {
    name: 'Kode Unit Kerja',
    selector: 'group_code',
    sortable: true,
  }, {
    name: 'Nama Unit Kerja',
    selector: 'group_name',
    sortable: true,
  }, {
    name: 'Aksi',
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
    cell: data => <Action data={data} actHandler={actHandler} />
  }
])

class Group extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupId: null,
      dataGroup: [],
      modalConfirm: false,
      isModalVisible: false,
      row: null,
      filterText: "",
      resetPaginationToggle: false
    };
  }

  componentDidMount() {
    getMasterGroupServices()
      .then((data) => {
        this.setState({
          dataGroup: data.data
        })
      })
      .catch((e) => {
        return (
          this.alertError(e)
        )
      });
  }

  alertSuccess = (e) => {
    toast.success('Sukses Menghapus data!')
  };

  alertError = (e) => {
    toast.error(e)
  }

  navigateToAdd = () => {
    this.props.history.push({
      pathname: '/group-add'
    });
  }

  navigateToEdit = (id) => {
    localStorage.setItem('idDivisi', JSON.stringify(Number(id)))
    this.props.history.push({
      pathname: '/group-edit'
    });
  }

  navigateToDelete = (id) => {
    this.setState({ groupId: id })
    this.setState({ modalConfirm: true })
  }

  showModalConfirm = () => {
    this.setState(prevState => ({
      modalConfirm: !prevState.modalConfirm
    }));
    document.body.classList.add("no_padding");
  }

  deleteGroup = () => {
    const { groupId } = this.state
    deleteMasterGroupService(groupId)
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

  handleButtonClick = (state) => {
    this.setState({ row: state.target.value })
    const act = state.target.name === 'edit' ? this.navigateToEdit(state.target.id)
      : state.target.name === 'delete' ? this.navigateToDelete(state.target.id) : null
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

  getSubHeaderComponent = () => {
    const { dataGroup, filterText } = this.state
    const { perms } = this.props.data
    const granted = ['user_save', 'is_admin']
    const isAbleCreate = granted.some(x => perms.includes(x));
    return (
      <Row>
        <FilterComponent onFilter={(e) => {
          let newFilterText = e.target.value;
          this.filteredItems = dataGroup.filter(
            (item) =>
              item.group_name &&
              item.group_name.toLowerCase().includes(newFilterText.toLowerCase())
          );
          this.setState({ filterText: newFilterText });
        }}
          onClear={this.handleClear}
          filterText={filterText}
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
    const { dataGroup, resetPaginationToggle, filterText, modalConfirm } = this.state
    const filteredItems = dataGroup.filter(item => item.group_name && item.group_name.toLowerCase().includes(filterText.toLowerCase()));

    return (
      <React.Fragment>
        <div className="container-fluid">
          <Row className="align-items-center">
            <Col sm={6}>
              <div className="page-title-box">
                <h4 className="font-size-18">Daftar Unit</h4>
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <Link to="#">Home</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="#">Unit</Link>
                  </li>
                  <li className="breadcrumb-item active">Daftar Unit</li>
                </ol>
              </div>
              <br />
            </Col>
          </Row>

          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <DataTable title="Tabel Unit Kerja"
                    columns={columns(this.handleButtonClick)}
                    onSelectedRowsChange={this.handleButtonClick}
                    data={filteredItems}
                    pagination
                    highlightOnHover
                    striped
                    dense
                    subHeader
                    subHeaderComponent={this.getSubHeaderComponent()}
                    paginationResetDefaultPage={resetPaginationToggle}
                  />
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
            <h5>Apakah Anda yakin ingin menghapus Unit Kerja ini?</h5>
          </div>
          <div className="modal-footer">
            <Button
              color="danger"
              className="mt-1"
              onClick={this.deleteGroup}
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

export default withRouter(connect(mapStatetoProps, { loginUser, loginUserSuccess, loginUserFail })(Group));
