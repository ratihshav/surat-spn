import { connect } from "react-redux";

import CustomStore from 'devextreme/data/custom_store';
import DataStore from 'devextreme/data/data_source';
// import broker from '../_utilization/broker';

// import { getMasterUser, getMasterUserSuccess } from "./actions";


const cLoad = () => {
  'a'
  // return new DataStore({
  // key: keyId,
  // load: () => this.props.data.data,
  //     insert: (values) => broker.fetch.post(`${endPoint}/save`, JSON.stringify(values))
  //       .then(res => {
  //         console.log(res);
  //       })
  //       .catch(() => { throw 'Gagal Simpan Data'; }),
  //     update: (newVal, oldVal) => {
  //       let values = Object.keys(oldVal).map((key, index) => {
  //         if (typeof newVal[key] !== 'undefined') {
  //           newVal[key] = oldVal[key];
  //         }
  //       });

  //       return broker.fetch.post(`${endPoint}/save`, JSON.stringify(values))
  //         .then(res => {
  //           console.log(res);
  //         })
  //         .catch(() => { throw 'Gagal Ubah Data'; });
  //     },
  //     remove: (key) => broker.fetch.post(`${endPoint}/delete/${key}`)
  //       .then(res => {
  //         console.log(res)
  //       })
  //       .catch(() => { throw 'Gagal Hapus Data'; })
  // })
}

const cStorePaging = (endpoint, pKey) => {
    return new CustomStore({
      key: pKey,
      load: function (loadOptions) {
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
      },
    })
}

const loadData = (endPoint, id) => {
  //   broker.fetch.get(`${endPoint}`)
  //     .then((data) => {
  //       return data
  //     })
  //     .catch(() => { throw 'Tidak Dapat Menampilkan Data'; })
}

function dxGridFilter(filter) {
  //   let filterArray = new Array();
  //   if (typeof (filter[0]) === 'string') {
  //     filterArray.push(filter[0] + "|" + filter[2]);
  //   } else {
  //     let a;
  //     filter.forEach((fCol, index) => {
  //       if (typeof (fCol[0]) === 'string' && (!fCol[1].includes(">=") || !fCol[1].includes("<"))) {
  //         a = fCol === 'and' ? null : filterArray.push(fCol[0] + "|" + fCol[2]);
  //       } else if (fCol[1].includes(">=")) {
  //         a = filterArray.push(fCol[0] + "|" + fCol[2]);
  //       } else {
  //         a = fCol === 'and' || fCol[1].includes("<") ? null : filterArray.push(fCol[0][0] + "|" + fCol[0][2]);
  //       }
  //     });
  //   }
  //   return filterArray;
}

function isNotEmpty(value) {
  return value !== undefined && value !== null && value !== '';
}

const mapStatetoProps = state => {
  const { error, loading, data } = state.MasterUser;
  return { error, loading, data };
};

export default {
  cLoad,
  cStorePaging,
  loadData
}

// export default (connect(mapStatetoProps, {
//   cLoad,
//   cStorePaging,
//   loadData
// }))