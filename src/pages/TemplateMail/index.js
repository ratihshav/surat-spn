import React, { Component } from "react";
import { Row, Col, Modal, Button} from "reactstrap";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import "chartist/dist/scss/chartist.scss";
import { getTemplateMailService, deleteTemplateMailService } from '../../helpers/master/templateMail';
import config from '../../helpers/config'
import toast from '../UI/toast';
import { loginUser, loginUserSuccess, loginUserFail } from "../../store/actions";
import DataTable from 'react-data-table-component';
import memoize from 'memoize-one';
import {Action, FilterComponent, AddButtonComponent} from '../../components/tabelComponents';

const columns = memoize(actHandler =>[
  {
    name: 'Tipe Template',
    selector: 'template_type',
    sortable: true,
  }, {
    name: 'Nama Template',
    selector: 'template_name',
    sortable: true,
  }, {
    name: 'Dokumen',
    selector: null,
    sortable: true,
  }, {
    name: 'Aksi',
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
    cell: data => <Action data={data} actHandler={actHandler} />
  }
])
class TemplateMail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      dataTemplate: [],
      templateId: null,
      modalConfirm: false,
      row: null,
      filterText: "",
      resetPaginationToggle: false
    };
  }

  componentDidMount() {
    getTemplateMailService()
      .then((data) => {
        this.setState({
          dataTemplate: data.data
        })
      })
      .catch((e) => {
        return (
          this.alertError(e)
        )
      });
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

  navigateToAdd = () => {
    this.props.history.push({
      pathname: '/template-mail-create'
    });
  }
  
  navigateToEdit = (id) => {
    localStorage.setItem('idTemp', JSON.stringify(Number(id)))
    this.props.history.push({
      pathname: '/template-mail-edit'
    });
  }

  navigateToDelete = (id) => {
    this.setState({ templateId: id })
    this.setState({ modalConfirm: true })
  }

  showModalConfirm = () => {
    this.setState(prevState => ({
      modalConfirm: !prevState.modalConfirm
    }));
    document.body.classList.add("no_padding");
  }

  deleteTemplate = () => {
    const { templateId } = this.state
    deleteTemplateMailService(templateId)
      .then((data) => {
        const { dataTemplate } = this.state;
        const { row } = this.state;
        const index = dataTemplate.findIndex(r => r === row);

        this.setState(state => ({
          dataTemplate: [...state.dataTemplate.slice(0, index)]
        }));

        this.alertSuccess(data)
        this.props.history.push('/template-mail');
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
    const { dataTemplate, filterText } = this.state
    const { perms } = this.props.data
    const granted = ['templateSurat_save', 'is_admin']
    const isAbleCreate = granted.some(x => perms.includes(x));
    return (
      <Row>
        <FilterComponent onFilter={(e) => {
          let newFilterText = e.target.value;
          this.filteredItems = dataTemplate.filter(
            (item) =>
              item.template_name &&
              item.template_name.toLowerCase().includes(newFilterText.toLowerCase())
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
    const { dataTemplate, resetPaginationToggle, filterText, modalConfirm } = this.state
    const filteredItems = dataTemplate.filter(item => item.template_name && item.template_name.toLowerCase().includes(filterText.toLowerCase()));

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
                  <DataTable title="Tabel Template Surat"
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
              onClick={this.deleteTemplate}
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

export default withRouter(connect(mapStatetoProps, { loginUser, loginUserSuccess, loginUserFail })(TemplateMail));
