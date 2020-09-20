import React, { Component } from "react";
import { Row, Col, Button, Modal } from "reactstrap";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import "chartist/dist/scss/chartist.scss";
import {
  getIncomingMailService,
  deleteIncomingMailService,
  readIncomingMailService
} from '../../helpers/master/incomingMail'
import toast from '../UI/toast';
import { loginUser, loginUserSuccess, loginUserFail } from "../../store/actions";
import DataTable from 'react-data-table-component';
import memoize from 'memoize-one';
import { Action, FilterComponent, AddButtonComponent } from '../../components/tabelComponents';

const columns = memoize(actHandler => [
  {
    name: 'Asal Surat',
    selector: 'asal_surat',
    sortable: true,
  }, {
    name: 'Nomor Surat',
    selector: 'nomor_surat',
    sortable: true,
  }, {
    name: 'Perihal',
    selector: 'perihal',
    sortable: true,
  }, {
    name: 'Tgl. Surat',
    selector: 'tgl_surat',
    sortable: true,
  }, {
    name: 'Tgl. Diterima',
    selector: 'tgl_diterima',
    sortable: true,
  }, {
    name: 'Aksi',
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
    minWidth: '150px',
    cell: data => <Action data={data} actHandler={actHandler} />
  }
])
class IncomingMail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      suratId: null,
      dataSurat: [],
      modalConfirm: false,
      row: null,
      filterText: "",
      resetPaginationToggle: false,
      loading: false,
      page: 0,
      totalRows: 0,
      perPage: 10
    };
  }

  componentDidMount() {
    this.getListIncomingMail()
  }

  getListIncomingMail = () => {
    const { perPage, page } = this.state;
    const params = {
      page,
      perPage
    }

    this.setState({ loading: true });

    getIncomingMailService(params)
      .then((data) => {
        this.setState({
          dataSurat: data.data,
          totalRows: data.totalCount,
          loading: false,
        })
      })
      .catch((e) => {
        return (
          this.alertError(e)
        )
      });
  }

  handlePageChange = async () => {
    const { perPage, page } = this.state;
    const params = {
      page: page + perPage,
      perPage
    }
    this.setState({ loading: true });

    await getIncomingMailService(params)
      .then((data) => {
        this.setState({
          dataSurat: data.data,
          loading: false,
        })
      })
      .catch((e) => {
        return (
          this.alertError(e)
        )
      });
  }

  handlePerRowsChange = async (perPage, page) => {
    const params = {
      page,
      perPage
    }

    this.setState({ loading: true });

    await getIncomingMailService(params)
      .then((data) => {
        this.setState({
          loading: false,
          dataSurat: data.data,
          perPage,
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
      pathname: '/incoming-mail-create'
    });
  }

  navigateToEdit = (id) => {
    localStorage.setItem('idInMail', JSON.stringify(Number(id)))
    this.props.history.push({
      pathname: '/incoming-mail-edit',
    });
  }

  navigateToDelete = (id) => {
    this.setState({ suratId: id })
    this.setState({ modalConfirm: true })
  }

  navigateToDetail = (id) => {
    localStorage.setItem('idInMail', JSON.stringify(Number(id)))

    this.hasReadMail(id)
    this.props.history.push({
      pathname: '/incoming-mail-edit',
    });
  }

  showModalConfirm = () => {
    this.setState(prevState => ({
      modalConfirm: !prevState.modalConfirm
    }));
    document.body.classList.add("no_padding");
  }

  deleteSurat = () => {
    const { suratId } = this.state
    deleteIncomingMailService(suratId)
      .then((data) => {
        const { dataSurat } = this.state;
        const { row } = this.state;
        const index = dataSurat.findIndex(r => r === row);

        this.setState(state => ({
          // dataGroup: [...state.dataGroup.slice(0, index), ...state.dataGroup.slice(index + 1)]
          dataSurat: [...state.dataSurat.slice(0, index)]
        }));

        this.alertSuccess(data)
        this.props.history.push('/incoming-mail');
        this.setState({ modalConfirm: false })
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
      : state.target.name === 'delete' ? this.navigateToDelete(state.target.id)
        : state.target.name === 'detail' ? this.navigateToDetail(state.target.id) : null
  }

  getSubHeaderComponent = () => {
    const { dataSurat, filterText } = this.state
    const { perms } = this.props.data
    const granted = ['suratMasuk_save', 'is_admin']
    const isAbleCreate = granted.some(x => perms.includes(x));
    return (
      <Row>
        <FilterComponent onFilter={(e) => {
          let newFilterText = e.target.value;
          this.filteredItems = dataSurat.filter(
            (item) =>
              item.nomor_surat &&
              item.nomor_surat.toLowerCase().includes(newFilterText.toLowerCase())
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

  hasReadMail = (params) => {
    readIncomingMailService(params)
      .then((data) => {
        return {
          data: data
        };
      })
      .catch(() => { throw 'Gagal Mengubah Data'; });
  }

  render() {
    const {
      dataSurat,
      resetPaginationToggle,
      filterText,
      modalConfirm,
      loading,
      totalRows } = this.state
    const filteredItems = dataSurat.filter(item => item.nomor_surat && item.nomor_surat.toLowerCase().includes(filterText.toLowerCase()));

    return (
      <React.Fragment>
        <div className="container-fluid">
          <Row className="align-items-center">
            <Col sm={6}>
              <div className="page-title-box">
                <h4 className="font-size-18">Daftar Surat Masuk</h4>
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <Link to="#">Surat</Link>
                  </li>
                  <li className="breadcrumb-item active">Surat Masuk</li>
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
                    pagination
                    highlightOnHover
                    striped
                    subHeader
                    progressPending={loading}
                    pagination
                    paginationServer
                    paginationTotalRows={totalRows}
                    onChangeRowsPerPage={this.handlePerRowsChange}
                    onChangePage={this.handlePageChange}
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
            <h5>Apakah Anda yakin ingin menghapus Surat Masuk ini?</h5>
          </div>
          <div className="modal-footer">
            <Button
              color="danger"
              className="mt-1"
              onClick={this.deleteSurat}
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

export default withRouter(connect(mapStatetoProps, { loginUser, loginUserSuccess, loginUserFail })(IncomingMail));