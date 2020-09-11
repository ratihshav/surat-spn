import React, { Component } from "react";
import {
  Row,
  Col,
} from "reactstrap";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import "chartist/dist/scss/chartist.scss";
import DataGrid, {
  Column,
  Editing,
  Paging,
  FilterRow,
  Pager,
} from 'devextreme-react/data-grid';
import DataStore from 'devextreme/data/data_source';
import { getTemplateMailService, deleteTemplateMailService } from '../../helpers/master/templateMail';
import config from '../../helpers/config'
import toast from '../UI/toast';
import { loginUser, loginUserSuccess, loginUserFail } from "../../store/actions";

class TemplateMail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      dataUser: [],
      totalCount: 0
    };
  }

  cLoad = () => {
    return new DataStore({
      load: (loadOptions) => {
        return getTemplateMailService()
      },
      remove: (values) => { this.onDeleteTemplate(values) }
    })
  }

  onDeleteTemplate = (values) => {
    deleteTemplateMailService(values)
      .then((data) => {
        this.alertSuccess()
        this.props.history.push('/template-mail');
      })
      .catch((e) => {
        this.alertError(e)
      });
  }

  alertSuccess = () => {
    toast.success('Sukses Menghapus data!')
  };

  alertError = (e) => {
    toast.error(e)
  }

  navigateToEdit = (val) => {
    const data = val.row.data
    localStorage.setItem('idTemp', JSON.stringify(data.id))
    this.props.history.push({
      pathname: '/template-mail-edit',
      params: data,
    });
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

  navigateToAdd = () => {
    this.props.history.push({
      pathname: '/template-mail-create'
    });
  }

  getDocumentMapped = (rowData) => {
    return (
      <div>
        {rowData.data.detail.map(function (item, index) {
          return (
            <a href={config.url_img + item.file_path} target="_blank" download>
              <Row style={{ marginLeft: '2%' }}> <i className="mdi mdi-file-document" /> <p style={{ fontWeight: '800' }}>{item.original_name}</p> </Row>
            </a>
          )
        })}
      </div>
    )
  }

  render() {
    const { perms } = this.props.data
    const granted = ['templateSurat_save', 'is_admin']
    const isAbleCreate = granted.some(x => perms.includes(x));

    return (
      <React.Fragment>
        <div className="container-fluid">
          <Row className="align-items-center">
            <Col sm={6}>
              <div className="page-title-box">
                <h4 className="font-size-18">Daftar Template Surat</h4>
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <Link to="/template-mail">Template Surat</Link>
                  </li>
                  <li className="breadcrumb-item active">Daftar Template Surat</li>
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
                    // remoteOperations={true}
                    rowAlternationEnabled={true}
                    showColumnLines={false}
                    columnAutoWidth={true}
                    onToolbarPreparing={isAbleCreate ? this.onToolbarPreparing : null}
                  >
                    <Editing
                      mode="row"
                      allowDeleting={true} />
                    <FilterRow visible={true} />
                    <Paging defaultPageSize={10} />
                    <Pager
                      showPageSizeSelector={true}
                      allowedPageSizes={[5, 10, 20]}
                      showInfo={true} />

                    <Column dataField="id" visible={false} />
                    <Column caption="Tipe Template Surat" dataField="template_type" />
                    <Column caption="Nama Template Surat" dataField="template_name" />
                    <Column caption="Dokumen" dataField="detail" cellRender={this.getDocumentMapped} />
                    <Column type="buttons"
                      buttons={[{
                        hint: 'Edit',
                        text: 'Edit',
                        onClick: this.navigateToEdit
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

export default withRouter(connect(mapStatetoProps, { loginUser, loginUserSuccess, loginUserFail })(TemplateMail));
