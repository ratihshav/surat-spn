

import React from "react";
import { Row, Col, Button } from "reactstrap";
import styled from 'styled-components';

export const TextField = styled.input`
  height: 32px;
  width: 200px;
  border-radius: 3px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border: 1px solid #e5e5e5;
  padding: 0 32px 0 16px;
  &:hover {
    cursor: pointer;
  }
`;

export const ClearButton = styled(Button)`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  height: 32px;
  width: 32px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #4285F4
`;

export const Action = ({ actHandler, data }) => (
  console.log('data', data),
  <Row>
    {data.disposisi_id
      ? <Button type="button" onClick={actHandler} id={data.id} value={JSON.stringify(data)} name={"detail"} className="btn btn-orange btn-sm" color="success" title="Ubah">Detail</Button>
      : null}
      &nbsp;
    {data.can_edit
      ? <Button type="button" onClick={actHandler} id={data.id} value={JSON.stringify(data)} name={"edit"} className="btn btn-info btn-sm" color="success" title="Ubah">Ubah</Button>
      : null}
      &nbsp;
    {data.can_delete
      ? <Button type="button" onClick={actHandler} id={data.id} value={JSON.stringify(data)} name={"delete"} className="btn btn-danger btn-sm" color="success" title="Ubah">Hapus</Button>
      : null}
      &nbsp;
    {data.can_permissions
      ? <Button type="button" onClick={actHandler} id={data.id} value={JSON.stringify(data)} name={"permission"} className="btn btn-warning btn-sm" color="success" title="Ubah">Hak Akses</Button>
      : null}

  </Row>
);

export const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <>
    <TextField id="search" type="text" placeholder="Filter" aria-label="Search Input" value={filterText} onChange={onFilter} />
    <ClearButton type="button" onClick={onClear}>X</ClearButton>
  </>
);

export const AddButtonComponent = ({ onClick }) => {
  return (
    <Col md={"auto"}>
      <Button color="success" key="add" onClick={onClick}>Tambah Data</Button>
    </Col>
  )
}

