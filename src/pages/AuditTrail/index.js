import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { getAuditTrailService } from '../../helpers/master/auditTrail'
import { loginUser, loginUserSuccess, loginUserFail } from "../../store/actions";
import toast from '../UI/toast';
import DataTable from 'react-data-table-component';
import Loader from "../../components/Loader";
import moment from 'moment'
// import 'moment/locale/id';

const CustomStatus = ({ row }) => (
  <div>
    {row.success ?
      <i title="Sukses" className="ion ion-md-checkmark-circle font-size-20 align-middle mr-1" style={{ color: "#5cb85c" }} />
      :
      <i title="Gagal" className="ion ion-md-close-circle  font-size-20 align-middle mr-1" style={{ color: "#ec4561" }} />
    }
  </div>
)

const CustomInfo = ({ row }) => (
  <div>
    {
      row.messages !== null ?
        <p>{row.messages}</p>
        :
        <p>-</p>
    }
  </div>
)

const CustomTanggal = ({ row }) => (
  <div>
    <p>{moment(row.created_at).format("DD MMMM YYYY hh:mm:ss")}</p>
  </div>
)

const columns = ([
  {
    name: 'Aksi',
    selector: 'action',
    sortable: true,
    grow: 2
  },
  {
    name: 'Modul',
    selector: 'modul',
    sortable: true,
  },
  {
    name: 'Url',
    selector: 'path',
    sortable: true,
  },
  {
    name: 'Status',
    selector: 'success',
    sortable: true,
    cell: row => <CustomStatus row={row} />
  },
  {
    name: 'Info',
    selector: 'messages',
    sortable: true,
    cell: row => <CustomInfo row={row} />
  },
  {
    name: 'Dibuat Oleh',
    selector: 'created_by',
    sortable: true,
  },
  {
    name: 'Tanggal',
    selector: 'created_at',
    sortable: true,
    grow: 2,
    cell: row => <CustomTanggal row={row} />
  }
])

class AuditTrail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataAudit: [],
      row: null,
      resetPaginationToggle: false,
      loading: false,
      page: 0,
      totalRows: 0,
      perPage: 10
    };
  }

  componentDidMount() {
    this.getAuditData()
  }

  getAuditData = () => {
    const { perPage, page } = this.state;
    let order = null;
    const params = {
      order,
      page,
      perPage
    }

    this.setState({ loading: true });

    getAuditTrailService(params)
      .then((data) => {
        this.setState({
          dataAudit: data.data.data,
          totalRows: data.data.total,
          loading: false,
        })
      })
      .catch((e) => {
        return (
          this.alertError(e)
        )
      });
  }

  handlePageChange = async (param, sortDirection) => {
    const { perPage } = this.state;
    let paramLength = Object.keys(param).length;
    let page = paramLength === 0 ? param : null;
    let order = paramLength > 1 ? param.selector + ' ' + sortDirection : null;
    const params = {
      order,
      page,
      perPage
    }
    this.setState({ loading: true });

    await getAuditTrailService(params)
      .then((data) => {
        this.setState({
          dataAudit: data.data.data,
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

    await getAuditTrailService(params)
      .then((data) => {
        this.setState({
          loading: false,
          dataAudit: data.data.data,
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

  render() {
    const {
      dataAudit,
      resetPaginationToggle,
      loading,
      totalRows
    } = this.state

    return (
      <React.Fragment>
        <div className="container-fluid">
          <Row className="align-items-center">
            <Col sm={6}>
              <div className="page-title-box">
                <h4 className="font-size-18">Audit Trail</h4>
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <Link to="#">Home</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="#">Audit Trail</Link>
                  </li>
                  <li className="breadcrumb-item active">Audit Trail</li>
                </ol>
              </div>
              <br />
            </Col>
          </Row>

          {dataAudit.length !== 0 ?
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <DataTable title="Audit Trail"
                      columns={columns}
                      data={dataAudit}
                      pagination
                      highlightOnHover
                      striped
                      pagination
                      paginationServer
                      progressPending={loading}
                      paginationTotalRows={totalRows}
                      onChangeRowsPerPage={this.handlePerRowsChange}
                      onChangePage={this.handlePageChange}
                      paginationResetDefaultPage={resetPaginationToggle} />
                  </div>
                </div>
              </div>
            </div>
            : <Loader />}
        </div>
      </React.Fragment>
    );
  }
}

const mapStatetoProps = state => {
  const { error, loading, data } = state.Login;
  return { error, loading, data };
};

export default withRouter(connect(mapStatetoProps, { loginUser, loginUserSuccess, loginUserFail })(AuditTrail));
