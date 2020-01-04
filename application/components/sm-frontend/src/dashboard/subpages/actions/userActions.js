import {
  fetchProfileData,
  editUserData
} from "dashboard/subpages/handlers/userHandlers";

export const FETCH_PROFILE_FETCHING = "FETCH_PROFILE_FETCHING";
export const FETCH_PROFILE_FAIL = "FETCH_PROFILE_FAIL";
export const FETCH_PROFILE_OK = "FETCH_PROFILE_OK";
export const EDIT_PROFILE_FETCHING = "EDIT_PROFILE_FETCHING";
export const EDIT_PROFILE_FAIL = "EDIT_PROFILE_FAIL";
export const EDIT_PROFILE_OK = "EDIT_PROFILE_OK";

export const makeFetchProfileFetching = () => ({
  type: FETCH_PROFILE_FETCHING
});

export const makeFetchProfileFail = () => ({
  type: FETCH_PROFILE_FAIL
});

export const makeFetchProfileOk = data => ({
  type: FETCH_PROFILE_OK,
  payload: data
});

export const makeEditProfileFetching = () => ({
  type: EDIT_PROFILE_FETCHING
});

export const makeEditProfileFail = () => ({
  type: EDIT_PROFILE_FAIL
});

export const makeEditProfileOk = () => ({
  type: EDIT_PROFILE_OK
});

const fetchProfileFunction = dispatch => {
  dispatch(makeFetchProfileFetching());

  return fetchProfileData()
    .then(res => {
      dispatch(makeFetchProfileOk(res.data));
    })
    .catch(() => {
      dispatch(makeFetchProfileFetching());
    });
};

const userDataEditFunction = (userData, dispatch) => {
  dispatch(makeEditProfileFetching());

  return editUserData(userData)
    .then(() => {
      dispatch(makeEditProfileOk());
      fetchProfileFunction(dispatch);
    })
    .catch(() => {
      dispatch(makeEditProfileFail());
    });
};

export const fetchProfile = () => dispatch => fetchProfileFunction(dispatch);
export const userDataEdit = userData => dispatch =>
  userDataEditFunction(userData, dispatch);
