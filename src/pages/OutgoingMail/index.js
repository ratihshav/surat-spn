import React, { Component } from "react";
import { Row, Col, Button, Modal } from "reactstrap";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import "chartist/dist/scss/chartist.scss";
import {
  getOutgoingMailService,
  deleteOutgoingMailService,
  readOutgoingMailService
} from '../../helpers/master/outgoingMail'
import toast from '../UI/toast';
import { loginUser, loginUserSuccess, loginUserFail } from "../../store/actions";
import DataTable from 'react-data-table-component';
import memoize from 'memoize-one';
import { Action, FilterComponent, AddButtonComponent } from '../../components/tabelComponents';

const CustomHal = ({ row }) => (
  <div>
    <div style={{ fontWeight: 'bold', whiteSpace: 'wrap', textOverflow: 'ellipses' }}>
      {row.hal_surat}
    </div>
    <div>
      {row.status_surat}
      <br></br>
      {row.status_position_name}
    </div>
  </div>
)

const columns = memoize(actHandler => [
  {
    name: 'Nomor Surat',
    selector: 'nomor_surat',
    sortable: true,
  }, {
    name: 'Nomor Agenda',
    selector: 'nomor_agenda',
    sortable: true,
  }, {
    name: 'Tgl. Surat',
    selector: 'tgl_surat',
    sortable: true,
  }, {
    name: 'Jenis Surat',
    selector: 'jenis_surat',
    sortable: true,
  }, {
    name: 'Perihal',
    selector: 'hal_surat',
    cell: row => <CustomHal row={row} />
  }, {
    name: 'Aksi',
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
    minWidth: '150px',
    cell: data => <Action data={data} actHandler={actHandler} />
  }
])

class OutgoingMail extends Component {
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
    this.getListOutgoingMail()
  }

  getListOutgoingMail = () => {
    const { perPage, page } = this.state;
    const params = {
      page,
      perPage
    }

    this.setState({ loading: true });

    getOutgoingMailService(params)
      .then((data) => {
        this.setState({
          dataSurat: data.data,
          totalRows: data.total,
          loading: false,
        })
      })
      .catch((e) => {
        return (
          this.alertError(e)
        )
      });
  }

  handlePageChange = async page => {
    const { perPage } = this.state;
    const params = {
      page,
      perPage
    }
    this.setState({ loading: true });

    await getOutgoingMailService(params)
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

    await getOutgoingMailService(params)
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
      pathname: '/outgoing-mail-create'
    });
  }

  navigateToEdit = (id) => {
    localStorage.setItem('idOutMail', JSON.stringify(Number(id)))
    this.props.history.push({
      pathname: '/outgoing-mail-edit',
    });
  }

  navigateToDelete = (id) => {
    this.setState({ suratId: id })
    this.setState({ modalConfirm: true })
  }

  showModalConfirm = () => {
    this.setState(prevState => ({
      modalConfirm: !prevState.modalConfirm
    }));
    document.body.classList.add("no_padding");
  }

  deleteSurat = () => {
    const { suratId } = this.state
    deleteOutgoingMailService(suratId)
      .then((data) => {
        const { dataSurat } = this.state;
        const { row } = this.state;
        const index = dataSurat.findIndex(r => r === row);

        this.setState(state => ({
          // dataGroup: [...state.dataGroup.slice(0, index), ...state.dataGroup.slice(index + 1)]
          dataSurat: [...state.dataSurat.slice(0, index)]
        }));

        this.alertSuccess(data)
        this.props.history.push('/outgoing-mail');
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
    const granted = ['suratKeluar_save', 'is_admin']
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

  navigateToDetail = (id) => {
    localStorage.setItem('idOutMail', JSON.stringify(Number(id)))

    this.hasReadMail(id)
    this.props.history.push({
      pathname: '/outgoing-mail-detail',
    });
  }

  hasReadMail = (params) => {
    readOutgoingMailService(params)
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
                <h4 className="font-size-18">Daftar Surat Keluar</h4>
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <Link to="#">Surat Keluar</Link>
                  </li>
                  <li className="breadcrumb-item active">Surat Keluar</li>
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
                    progressPending={loading}
                    pagination
                    paginationServer
                    paginationTotalRows={totalRows}
                    onChangeRowsPerPage={this.handlePerRowsChange}
                    onChangePage={this.handlePageChange}
                    subHeader
                    subHeaderComponent={this.getSubHeaderComponent()}
                    paginationResetDefaultPage={resetPaginationToggle}
                  />
                </div>
              </div>
            </div>
          </div>
        </div><Modal isOpen={modalConfirm}>
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
            <h5>Apakah Anda yakin ingin menghapus Surat Keluar ini?</h5>
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

export default withRouter(connect(mapStatetoProps, { loginUser, loginUserSuccess, loginUserFail })(OutgoingMail));