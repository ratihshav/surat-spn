import React, { Component } from "react";
import {
  Row,
  Col,
} from "reactstrap";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import "chartist/dist/scss/chartist.scss";
import DataGrid, {
  Scrolling,
  Column,
  Paging,
  FilterRow,
  Pager,
  Editing
} from 'devextreme-react/data-grid';
import DataStore from 'devextreme/data/data_source';
import { isNotEmpty, dxGridFilter } from '../../helpers/gridFilter'
import {
  getIncomingMailService,
  deleteIncomingMailService,
  readIncomingMailService
} from '../../helpers/master/incomingMail'
import toast from '../UI/toast';
import { loginUser, loginUserSuccess, loginUserFail } from "../../store/actions";

class IncomingMail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      dataUser: [],
      // totalCount: 0
    };
  }

  // componentDidMount() {
  //   this.getDataMail()
  // }

  // getDataMail = () => {
  //   this.props.getOutgoingMail()
  // }

  renderCol = (data) => {

  }

  allowDeleting = (e) => {
    return e.row.data.can_delete
    //return !this.isChief(e.row.data.Position);
  }

  allowEditing = (e) => {
    return e.row.data.can_edit
  }

  cLoad = () => {
    return new DataStore({
      load: (loadOptions) => {
        let params = '?';
        [
          'skip',
          'sort',
          'take',
          'order',
          'filter'
        ].forEach(function (i) {

          if (i in loadOptions && isNotEmpty(loadOptions[i]) && i == 'filter') {
            let filterCol = dxGridFilter(loadOptions.filter);
            params += `${i}=${JSON.stringify(filterCol)}&`;
          }
          else if (i in loadOptions && isNotEmpty(loadOptions[i])) { params += `${i}=${JSON.stringify(loadOptions[i])}&`; }
        });
        params = params.slice(0, -1);
        return getIncomingMailService(params)
      },
      onLoadError: (error) => {
        console.log(error.message);
      },
      remove: (values) => { this.onDeleteIncomingMail(values) }
    })
  }

  navigateToAdd = () => {
    this.props.history.push({
      pathname: '/incoming-mail-create'
    });
  }

  navigateToEdit = (val) => {
    const data = val.row.data
    localStorage.setItem('idInMail', JSON.stringify(data.id))
    this.props.history.push({
      pathname: '/incoming-mail-edit',
      params: data,
    });
  }

  navigateToDetail = (val) => {
    const data = val.row.data
    const idDisposisi = data.disposisi_id
    localStorage.setItem('idInMail', JSON.stringify(data.id))

    this.hasReadMail(idDisposisi)
    this.props.history.push({
      pathname: '/incoming-mail-detail',
      params: data,
    });
  }


  hasReadMail = (params) => {
    readIncomingMailService(params)
      .then((data) => {
        return {
          data: data
        };
      })
      .catch(() => { throw 'Gagal Mengubah Data'; });
  }

  onToolbarPreparing = (e) => {
    e.toolbarOptions.items.unshift({
      location: 'after',
      widget: 'dxButton',
      options: {
        icon: 'add',
        text: 'Tambah Baru',
        onClick: this.navigateToAdd
      }
    });
  }

  onDeleteIncomingMail = (values) => {
    deleteIncomingMailService(values)
      .then((data) => {
        this.alertSuccess()
        this.props.history.push('/incoming-mail');
      })
      .catch(() => {
        this.alertError()
      });
  }

  getSubjectMail = (rowData) => {
    return (
      rowData.status + "-" + rowData.position_name + "-" + rowData.group_name
    )
  }

  alertSuccess = () => {
    toast.success('Sukses Menghapus data!')
  };

  alertError = () => {
    toast.error('Gagal Menghapus data')
  }

  render() {
    const { perms } = this.props.data
    const granted = ['suratMasuk_save', 'is_admin']
    const isAbleCreate = granted.some(x => perms.includes(x));

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
                  <DataGrid
                    dataSource={this.cLoad()}
                    remoteOperations={true}
                    rowAlternationEnabled={true}
                    showColumnLines={false}
                    columnAutoWidth={true}
                    onToolbarPreparing={isAbleCreate ? this.onToolbarPreparing : null}
                  >
                    <Editing
                      mode="row"
                      allowDeleting={this.allowDeleting} />
                    <FilterRow visible={true} />
                    <Scrolling mode="standard" useNative={true} />
                    <Paging defaultPageSize={10} />
                    <Pager
                      showPageSizeSelector={true}
                      allowedPageSizes={[5, 10, 20]}
                      showInfo={true} />

                    <Column dataField="disposisi_id" visible={false} />
                    <Column dataField="asal_surat" />
                    <Column dataField="nomor_surat" />
                    <Column dataField="perihal" />
                    <Column dataField="tgl_surat" dataType="date" format='dd/MM/yyyy' />
                    <Column dataField="tgl_diterima" dataType="date" format='dd/MM/yyyy' />
                    <Column dataField="id" visible={false} />
                    <Column type="buttons"
                      buttons={[{
                        hint: 'Edit',
                        text: 'Edit',
                        visible: this.allowEditing,
                        onClick: this.navigateToEdit
                      }, {
                        hint: 'Detail',
                        text: 'Detail',
                        onClick: this.navigateToDetail
                      }, 'delete']}
                    />

                  </DataGrid>
                </div>
              </div>
            </div>
          </div>

        </div>
      </React.Fragment>
    );
  }
}

const mapStatetoProps = state => {
  const { error, loading, data } = state.Login;
  return { error, loading, data };
};

export default withRouter(connect(mapStatetoProps, { loginUser, loginUserSuccess, loginUserFail })(IncomingMail));