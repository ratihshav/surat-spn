import React, { Component } from "react";
import { Row, Col, Modal, Button } from "reactstrap";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import "chartist/dist/scss/chartist.scss";
import { getMasterPositionServices, deleteMasterPositionService } from '../../helpers/master/position'
import { loginUser, loginUserSuccess, loginUserFail } from "../../store/actions";
import toast from '../UI/toast';
import DataTable from 'react-data-table-component';
import memoize from 'memoize-one';
import { Action, FilterComponent, AddButtonComponent } from '../../components/tabelComponents';

const columns = memoize(actHandler => [
  {
    name: 'Nama Jabatan',
    selector: 'position_name',
    sortable: true,
  }, {
    name: 'Tipe',
    selector: 'position_type',
    sortable: true,
  }, {
    name: 'Unit Kerja',
    selector: 'group_name',
    sortable: true,
  }, {
    name: 'Aksi',
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
    minWidth: '200px',
    cell: data => <Action data={data} actHandler={actHandler} />
  }
])

class Position extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      dataPosition: [],
      positionId: null,
      modalConfirm: false,
      row: null,
      filterText: "",
      resetPaginationToggle: false
    };
  }

  componentDidMount() {
    getMasterPositionServices()
      .then((data) => {
        this.setState({
          dataPosition: data.data
        })
      })
      .catch((e) => {
        return (
          this.alertError(e)
        )
      });
  }

  alertSuccess = () => {
    toast.success('Sukses Menghapus data!')
  };

  alertError = (e) => {
    toast.error(e)
  }

  navigateToAdd = () => {
    this.props.history.push({
      pathname: '/position-add'
    });
  }

  navigateToEdit = (id) => {
    localStorage.setItem('idPosition', JSON.stringify(Number(id)))
    this.props.history.push({
      pathname: '/position-edit'
    });
  }

  navigateToDelete = (id) => {
    this.setState({ positionId: id })
    this.setState({ modalConfirm: true })
  }

  navigateToPermissions = (id) => {
    localStorage.setItem('idPosition', JSON.stringify(Number(id)))
    this.props.history.push({
      pathname: '/position-permission',
    });
  }

  showModalConfirm = () => {
    this.setState(prevState => ({
      modalConfirm: !prevState.modalConfirm
    }));
    document.body.classList.add("no_padding");
  }

  deletePosition = () => {
    const { positionId } = this.state
    deleteMasterPositionService(positionId)
      .then((data) => {
        const { dataPosition } = this.state;
        const { row } = this.state;
        const index = dataPosition.findIndex(r => r === row);

        this.setState(state => ({
          dataPosition: [...state.dataPosition.slice(0, index)]
        }));

        this.alertSuccess(data)
        this.props.history.push('/position');
        this.setState({ modalConfirm: false })
      })
      .catch((e) => {
        this.alertError(e)
      });
  }

  handleButtonClick = (state) => {
    this.setState({ row: state.target.value })
    const act = state.target.name === 'edit' ? this.navigateToEdit(state.target.id)
      : state.target.name === 'delete' ? this.navigateToDelete(state.target.id)
        : state.target.name === 'permission' ? this.navigateToPermissions(state.target.id) : null
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
    const { dataPosition, filterText } = this.state
    const { perms } = this.props.data
    const granted = ['jabatan_save', 'is_admin']
    const isAbleCreate = granted.some(x => perms.includes(x));
    return (
      <Row>
        <FilterComponent onFilter={(e) => {
          let newFilterText = e.target.value;
          this.filteredItems = dataPosition.filter(
            (item) =>
              item.position_name &&
              item.position_name.toLowerCase().includes(newFilterText.toLowerCase())
          );
          this.setState({ filterText: newFilterText });
        }}
          onClear={this.handleClear}
          filterText={filterText}
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
    const { dataPosition, resetPaginationToggle, filterText, modalConfirm } = this.state
    const filteredItems = dataPosition.filter(item => item.position_name && item.position_name.toLowerCase().includes(filterText.toLowerCase()));

    return (
      <React.Fragment>
        <div className="container-fluid">
          <Row className="align-items-center">
            <Col sm={6}>
              <div className="page-title-box">
                <h4 className="font-size-18">Daftar Jabatan</h4>
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <Link to="/position">Jabatan</Link>
                  </li>
                  <li className="breadcrumb-item active">Daftar Jabatan</li>
                </ol>
              </div>
              <br />
            </Col>
          </Row>

          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <DataTable title="Tabel Jabatan"
                    columns={columns(this.handleButtonClick)}
                    onSelectedRowsChange={this.handleButtonClick}
                    data={filteredItems}
                    pagination
                    highlightOnHover
                    striped
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
            <h5>Apakah Anda yakin ingin menghapus Jabatan ini?</h5>
          </div>
          <div className="modal-footer">
            <Button
              color="danger"
              className="mt-1"
              onClick={this.deletePosition}
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

export default withRouter(connect(mapStatetoProps, { loginUser, loginUserSuccess, loginUserFail })(Position));
