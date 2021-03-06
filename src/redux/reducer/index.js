import * as actionTypes from "../actionTypes";

const applicationIntialState = {
  posts: [],
  questions: [],
  open: false,
  post: {
    index: 1,
    post_id: "",
    post_name: "",
    threshold: 0,
    created_by: "",
    updated_by: ""
  },
  instructions:[],
  toggleDialog: {
    openDialog: false,
    buttonName: "",
    title: ""
  },
  question: {
    index: 1,
    post_id: [],
    q_name: "",
    has_option: false,
    options: [],
    q_answer: "",
    timer: 0,
    created_by: "Ansuman",
    updated_by: "Bharath",
    q_comment: "",
    optionNumber: 0
  },
  index: 0
};

const reducer = (state = applicationIntialState, action) => {
  switch (action.type) {
    case actionTypes.HANDLE_ON_POSTS:
      var { post, value } = action.payload;
      // console.log(value,"value");
      return {
        ...state,
        [post]: value
      };

    case actionTypes.HANDLE_ON_QUESTIONS:
      var { question, val } = action.payload;
      // console.log(val,"val");
      return {
        ...state,
        [question]: val
      };

    case actionTypes.HANDLE_ON_TOGGLE_DIALOG:
      var { toggleDialog, question, questions, post, posts } = state;
      var { openDialog, buttonName, title } = toggleDialog;
      var { buttonName, title, index } = action.payload;
      openDialog = !openDialog;
      toggleDialog = {
        title,
        buttonName,
        openDialog
      };
      debugger;
      if (buttonName == "Update") {
        if (title == "Update Question") {
          question = {
            ...questions[index],
            index
          };
          debugger;
        } else if (title == "Update Post") {
          post = {
            ...posts[index],
            index
          };
        }
      }
      debugger;
      return {
        ...state,
        toggleDialog,
        question,
        posts,
        post,
        questions
      };
      debugger;

    case actionTypes.HANDLE_ON_CLICK_DELETE_POST:
      var { posts } = state;
      var { uuid } = action.payload;
      debugger;
      posts = posts.filter(post_list => post_list.uuid != uuid);
      debugger;
      return {
        ...state,
        posts
      };
    case actionTypes.HANDLE_FIELD_CHANGE:
      var { property, property_value, propertyObj } = action.payload;
      console.log(state, property_value, property, property_value, propertyObj);
      return {
        ...state,
        [propertyObj]: {
          ...state[propertyObj],
          [property]: property_value
        }
      };
    case actionTypes.HANDLE_FIELD_CHANGE_NUMBER:
      console.log(state);
      var { question } = state;
      var { options } = question;
      const { number } = action.payload;
      var no = Number(number);

      let prev = options.length;
      if (prev < no) {
        options.push("");
      } else if (prev > no) {
        options.pop();
      } else {
        options.push("");
      }
      let question2 = [];
      options = question2.concat(options);

      return {
        ...state,
        question: {
          ...question,
          options
        }
      };
    case actionTypes.HANDLE_CHANGE_OPTION:
      var { o_index, val_ue } = action.payload;
      var { question } = state;
      var { options } = question;
      question.options[o_index] = val_ue;
      let question1 = [];
      options = question1.concat(options);
      return {
        ...state,
        question: {
          ...question,
          options
        }
      };
    case actionTypes.HANDLE_DRAWER_OPEN:
      var { open } = state.open;
      return {
        ...state,
        open: true
      };
    case actionTypes.HANDLE_DRAWER_CLOSE:
      var { open } = state.open;
      return {
        ...state,
        open: false
      };
    case actionTypes.HANDLE_ON_POST_CLICK:
      var { history } = action.payload;
      history.push("/menu/post");
      return {
        ...state
      };
    case actionTypes.HANDLE_ON_CANDIDATE_POST_MAP_CLICK:
      var { history } = action.payload;
      history.push("menu/Candidate_Post_Map");
      return {
        ...state
      };
    case actionTypes.HANDLE_ON_QUESTION_CLICK:
      var { history } = action.payload;
      history.push("/menu/question");
      return {
        ...state
      };
    case actionTypes.HANDLE_ON_RESULT_CLICK:
      var { history } = action.payload;
      history.push("menu/result");
      return {
        ...state
      };
      case actionTypes.HANDLE_ON_INSTRUCTION_CLICK:
        var { history } = action.payload;
        history.push("/menu/instruction");
        return {
          ...state
        };
    default:
      return state;
  }
};
export default reducer;
