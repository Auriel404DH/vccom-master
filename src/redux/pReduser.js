import { profileAPI } from './../api/api';

let SET_USER_PROFILE = 'profile/SET_USER_PROFILE';
let ADD_POST = 'profile/ADD-POST';
let SET_STATUS = 'profile/SET_STATUS';

let initialState = {
  profileData: [
    { id: 1, message: "It's my first post, yoho ^-)" },
    { id: 2, message: 'Hello, my name is Adam' },
    { id: 3, message: 'I like cakes' },
    { id: 4, message: 'I want to tell you about Gagarin' },
    { id: 5, message: 'I fuck GUAP' },
  ],
  profile: null,
  status: '',
};

const profileReduser = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST: {
      let newPost = {
        id: 6,
        message: action.userText,
      };
      let stateCopy = { ...state };
      stateCopy.profileData = [...state.profileData, newPost];

      return stateCopy;
    }
    case SET_USER_PROFILE: {
      let stateCopy = { ...state };

      stateCopy.profile = action.profile;

      return stateCopy;
    }
    case SET_STATUS: {
      return {
        ...state,
        status: action.status,
      };
    }
    default:
      return state;
  }
};

export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile });
export const addPost = (userText) => ({ type: ADD_POST, userText });
const setStatus = (status) => ({ type: SET_STATUS, status });

export const getProfileThunkCreator = (userId) => async (dispatch) => {
  let response = await profileAPI.getProfile(userId);
  dispatch(setUserProfile(response.data));
};

export const setStatusThunk = (userID) => async (dispatch) => {
  let response = await profileAPI.getStatus(userID);
  dispatch(setStatus(response.data));
};

export const updateStatusThunk = (status) => async (dispatch) => {
  let response = await profileAPI.updateStatus(status);
  if (response.data.resultCode === 0) {
    dispatch(setStatus(status));
  }
};

export default profileReduser;