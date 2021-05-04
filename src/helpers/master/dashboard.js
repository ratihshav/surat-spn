import config from '../config'
import instance, { cancel } from "../axios";

export const getDashboardDataService = (request) => {
  const GET_DASHBOARD_DATA_API = config.api_endpoint + `/dashboardTugas`;
  return instance.get(GET_DASHBOARD_DATA_API)
    .then((data) => {
      return {
        data: data.data.data
      };
    })
    .catch((e) => { throw e.response.data.messages[0] });
}