import {
    fetchCarriers,
    fetchCarrierById,
    removeCarrierById,
    addCarrier,
    editCarrierById
  } from "dashboard/subpages/handlers/carriersHandlers";
  import { push } from "react-router-redux";
  
  export const CARRIERS_FETCHING = "CARRIERS_FETCHING";
  export const CARRIERS_OK = "CARRIERS_OK";
  export const CARRIERS_FAIL = "CARRIERS_FAIL";
  export const CARRIER_REMOVE_FETCHING = "CARRIER_REMOVE_FETCHING";
  export const CARRIER_REMOVE_OK = "CARRIER_REMOVE_OK";
  export const CARRIER_REMOVE_FAIL = "CARRIER_REMOVE_FAIL";
  export const CARRIER_ADD_FETCHING = "CARRIER_ADD_FETCHING";
  export const CARRIER_ADD_OK = "CARRIER_ADD_OK";
  export const CARRIER_ADD_FAIL = "CARRIER_ADD_FAIL";
  export const CARRIER_SEARCHING = "CARRIER_SEARCHING";
  export const CARRIER_SORTING = "CARRIER_SORTING";
  export const CARRIER_GET_FETCHING = "CARRIER_GET_FETCHING";
  export const CARRIER_GET_FAIL = "CARRIER_GET_FAIL";
  export const CARRIER_GET_OK = "CARRIER_GET_OK";
  export const CARRIER_EDIT_FETCHING = "CARRIER_EDIT_FETCHING";
  export const CARRIER_EDIT_FAIL = "CARRIER_EDIT_FAIL";
  export const CARRIER_EDIT_OK = "CARRIER_EDIT_OK";
  
  export const makeCarriersFetching = () => ({
    type: CARRIERS_FETCHING
  });
  
  export const makeCarriersOk = data => ({
    type: CARRIERS_OK,
    payload: data
  });
  
  export const makeCarriersFail = () => ({
    type: CARRIERS_FAIL
  });
  
  export const makeCarrierEditFetching = () => ({
    type: CARRIER_EDIT_FETCHING
  });
  
  export const makeCarrierEditOk = () => ({
    type: CARRIER_EDIT_OK
  });
  
  export const makeCarrierEditFail = () => ({
    type: CARRIER_EDIT_FAIL
  });
  
  export const makeCarriersRemoveFetching = () => ({
    type: CARRIER_REMOVE_FETCHING
  });
  
  export const makeCarriersRemoveOk = () => ({
    type: CARRIER_REMOVE_OK
  });
  
  export const makeCarriersRemoveFail = () => ({
    type: CARRIER_REMOVE_FAIL
  });
  
  export const makeCarriersAddFetching = () => ({
    type: CARRIER_ADD_FETCHING
  });
  
  export const makeCarriersAddOk = () => ({
    type: CARRIER_ADD_OK
  });
  
  export const makeCarriersAddFail = () => ({
    type: CARRIER_ADD_FAIL
  });
  
  export const makeCarrierGetFetching = () => ({
    type: CARRIER_GET_FETCHING
  });
  
  export const makeCarrierGetOk = data => ({
    type: CARRIER_GET_OK,
    payload: data.parameterWithTypeList
  });
  
  export const makeCarrierGetFail = () => ({
    type: CARRIER_GET_FAIL
  });
  
  export const makeSearching = data => ({
    type: CARRIER_SEARCHING,
    payload: data
  });
  
  export const makeSorting = data => ({
    type: CARRIER_SORTING,
    payload: data
  });
  
  const getCarriersFunction = dispatch => {
    dispatch(makeCarriersFetching());
  
    return fetchCarriers()
      .then(res => {
        dispatch(makeCarriersOk(res.data));
      })
      .catch(() => {
        dispatch(makeCarriersFail());
      });
  };
  
  const carrierAddFunction = (carrierData, dispatch) => {
    dispatch(makeCarriersAddFetching());
  
    return addCarrier(carrierData)
      .then(() => {
        setTimeout(() => {
          dispatch(makeCarriersAddOk());
          getCarriersFunction(dispatch);
        }, 2000);
      })
      .catch(() => {
        dispatch(makeCarriersAddFail());
      });
  };
  
  const carrierEditFunction = (carrierId, carrierData, dispatch) => {
    dispatch(makeCarrierEditFetching());
  
    return editCarrierById(carrierId, carrierData)
      .then(() => {
        dispatch(makeCarrierEditOk());
        dispatch(push("/admin/carriers"));
      })
      .catch(() => {
        dispatch(makeCarrierEditFail());
      });
  };
  
  const carrierRemoveFunction = (carrierId, dispatch) => {
    dispatch(makeCarriersRemoveFetching());
  
    return removeCarrierById(carrierId)
      .then(() => {
        setTimeout(() => {
          dispatch(makeCarriersRemoveOk());
          getCarriersFunction(dispatch);
        }, 2000);
      })
      .catch(() => {
        dispatch(makeCarriersRemoveFail());
      });
  };
  
  const carrierSearchFunction = (searchData, dispatch) => {
    dispatch(makeSearching(searchData));
  };
  
  const carriersSortFunction = (headerName, dispatch) => {
    dispatch(makeSorting(headerName));
  };
  
  const getCarrierByIfFunction = (carrierId, dispatch) => {
    dispatch(makeCarrierGetFetching());
  
    return fetchCarrierById(carrierId)
      .then(res => {
        dispatch(makeCarrierGetOk(res.data));
      })
      .catch(() => {
        dispatch(makeCarrierGetFail());
      });
  };
  
  export const carriersGet = () => dispatch => getCarriersFunction(dispatch);
  export const carrierById = carrierId => dispatch =>
    getCarrierByIfFunction(carrierId, dispatch);
  export const carrierAdd = carrierData => dispatch =>
    carrierAddFunction(carrierData, dispatch);
  export const carrierEdit = (carrierId, carrierData) => dispatch =>
    carrierEditFunction(carrierId, carrierData, dispatch);
  export const carrierRemove = carrierId => dispatch =>
    carrierRemoveFunction(carrierId, dispatch);
  export const carrierSearch = searchData => dispatch =>
    carrierSearchFunction(searchData, dispatch);
  export const carriersSort = headerName => dispatch =>
    carriersSortFunction(headerName, dispatch);
  