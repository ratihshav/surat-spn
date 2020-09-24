import React, { Component } from "react";
import { Row, Col, Modal, Button } from "reactstrap";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { getMasterTypeMailService, deleteMasterTypeMailService } from '../../helpers/master/typeMail'
import { loginUser, loginUserSuccess, loginUserFail } from "../../store/actions";
import toast from '../UI/toast';
import DataTable from 'react-data-table-component';
import memoize from 'memoize-one';
import { Action, FilterComponent, AddButtonComponent } from '../../components/tabelComponents';
import Loader from "../../components/Loader";

const columns = memoize(actHandler => [
  {
    name: 'Tipe Surat',
    selector: 'tipe_surat',
    sortable: true,
  }, {
    name: 'Aksi',
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
    cell: data => <Action data={data} actHandler={actHandler} />
  }
])

class TypeMail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      dataType: [],
      classId: null,
      modalConfirm: false,
      row: null,
      filterText: "",
      resetPaginationToggle: false
    };
  }

  componentDidMount() {
    getMasterTypeMailService()
      .then((data) => {
        this.setState({
          dataType: data.data
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
      pathname: '/type-mail-create'
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

  deleteType = () => {
    const { classId } = this.state
    deleteMasterTypeMailService(classId)
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
    const act = state.target.name === 'delete' ? this.navigateToDelete(state.target.id) : null
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
    const { dataType, filterText } = this.state
    const { perms } = this.props.data
    const granted = ['tipeSurat_save', 'is_admin']
    const isAbleCreate = granted.some(x => perms.includes(x));
    return (
      <Row>
        <FilterComponent onFilter={(e) => {
          let newFilterText = e.target.value;
          this.filteredItems = dataType.filter(
            (item) =>
              item.tipe_surat &&
              item.tipe_surat.toLowerCase().includes(newFilterText.toLowerCase())
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
    const { dataType, resetPaginationToggle, filterText, modalConfirm } = this.state
    const filteredItems = dataType.filter(item => item.tipe_surat && item.tipe_surat.toLowerCase().includes(filterText.toLowerCase()));

    return (
      <React.Fragment>
        <div className="container-fluid">
          <Row className="align-items-center">
            <Col sm={6}>
              <div className="page-title-box">
                <h4 className="font-size-18">Daftar Tipe Surat</h4>
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <Link to="#">Home</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="#">Tipe Surat</Link>
                  </li>
                  <li className="breadcrumb-item active">Daftar Tipe Surat</li>
                </ol>
              </div>
              <br />
            </Col>
          </Row>

          {dataType.length !== 0 ?
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <DataTable title="Tabel Tipe Surat"
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
            : <Loader />}
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
            <h5>Apakah Anda yakin ingin menghapus Tipe Surat ini?</h5>
          </div>
          <div className="modal-footer">
            <Button
              color="danger"
              className="mt-1"
              onClick={this.deleteType}
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

export default withRouter(connect(mapStatetoProps, { loginUser, loginUserSuccess, loginUserFail })(TypeMail));
