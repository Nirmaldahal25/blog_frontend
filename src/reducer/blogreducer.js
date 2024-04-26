const Actions = {
  REPLACE_STATE: "replace",
  UPDATE_TITLE: "title",
  UPDATE_CONTENT: "content",
  UPDATE_DATE: "date",
  UPDATE_IMAGE: "image",
};

const InitialState = {
  id: null,
  title: "",
  content: "",
  date: "",
  image_url: "",
  user: -1,
  thumbnail: null,
};

const blogReducer = (state, action) => {
  switch (action.type) {
    case Actions.REPLACE_STATE:
      return { ...state, ...action.payload };
    case Actions.UPDATE_TITLE:
      return { ...state, title: action.payload };
    case Actions.UPDATE_CONTENT:
      return { ...state, content: action.payload };
    case Actions.UPDATE_DATE:
      return { ...state, date: action.payload };
    case Actions.UPDATE_IMAGE:
      return { ...state, thumbnail: action.payload };
    default:
      return state;
  }
};

export default blogReducer;
export { Actions, InitialState };
