import React, { Component } from "react";
import { Row, Col, Modal, Button } from "reactstrap";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { getMasterClassService, deleteMasterClassService } from '../../helpers/master/classification'
import { loginUser, loginUserSuccess, loginUserFail } from "../../store/actions";
import toast from '../UI/toast';
import DataTable from 'react-data-table-component';
import memoize from 'memoize-one';
import { Action, FilterComponent, AddButtonComponent } from '../../components/tabelComponents';

const columns = memoize(actHandler => [
  {
    name: 'Kode Klasifikasi',
    selector: 'kode_klasifikasi',
    sortable: true,
  }, {
    name: 'Nama Klasifikasi',
    selector: 'nama_klasifikasi',
    sortable: true,
  }, {
    name: 'Detail',
    selector: 'detail',
    sortable: true,
  }, {
    name: 'Aksi',
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
    cell: data => <Action data={data} actHandler={actHandler} />
  }
])

class Classification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      dataClass: [],
      classId: null,
      modalConfirm: false,
      row: null,
      filterText: "",
      resetPaginationToggle: false
    };
  }

  componentDidMount() {
    getMasterClassService()
      .then((data) => {
        this.setState({
          dataClass: data.data
        })
      })
      .catch((e) => {
        return (
          this.alertError(e)
        )
      });
  }

  navigateToAdd = () => {
    this.props.history.push({
      pathname: '/classification-add'
    });
  }

  navigateToEdit = (id) => {
    localStorage.setItem('idClass', JSON.stringify(Number(id)))
    this.props.history.push({
      pathname: '/classification-edit'
    });
  }

  navigateToDelete = (id) => {
    this.setState({ classId: id })
    this.setState({ modalConfirm: true })
  }

  showModalConfirm = () => {
    this.setState(prevState => ({
      modalConfirm: !prevState.modalConfirm
    }));
    document.body.classList.add("no_padding");
  }

  deleteClass = () => {
    const { classId } = this.state
    deleteMasterClassService(classId)
      .then((data) => {
        const { dataClass } = this.state;
        const { row } = this.state;
        const index = dataClass.findIndex(r => r === row);

        this.setState(state => ({
          dataClass: [...state.dataClass.slice(0, index)]
        }));

        this.alertSuccess(data)
        this.props.history.push('/classification');
        this.setState({ modalConfirm: false })
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
    const { dataClass, filterText } = this.state
    const { perms } = this.props.data
    const granted = ['klasifikasiSurat_save', 'is_admin']
    const isAbleCreate = granted.some(x => perms.includes(x));
    return (
      <Row>
        <FilterComponent onFilter={(e) => {
          let newFilterText = e.target.value;
          this.filteredItems = dataClass.filter(
            (item) =>
              item.nama_klasifikasi &&
              item.nama_klasifikasi.toLowerCase().includes(newFilterText.toLowerCase())
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

  alertSuccess = () => {
    toast.success('Sukses Menghapus data!')
  };

  alertError = (e) => {
    toast.error(e)
  }

  render() {
    const { dataClass, resetPaginationToggle, filterText, modalConfirm } = this.state
    const filteredItems = dataClass.filter(item => item.nama_klasifikasi && item.nama_klasifikasi.toLowerCase().includes(filterText.toLowerCase()));

    return (
      <React.Fragment>
        <div className="container-fluid">
          <Row className="align-items-center">
            <Col sm={6}>
              <div className="page-title-box">
                <h4 className="font-size-18">Daftar Klasifikasi Surat</h4>
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <Link to="#">Home</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="#">Klasifikasi Surat</Link>
                  </li>
                  <li className="breadcrumb-item active">Daftar Klasifikasi Surat</li>
                </ol>
              </div>
              <br />
            </Col>
          </Row>

          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <DataTable title="Tabel Klasifikasi"
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
            <h5>Apakah Anda yakin ingin menghapus Klasifikasi ini?</h5>
          </div>
          <div className="modal-footer">
            <Button
              color="danger"
              className="mt-1"
              onClick={this.deleteClass}
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

export default withRouter(connect(mapStatetoProps, { loginUser, loginUserSuccess, loginUserFail })(Classification));
