import * as actionTypes from "../actionTypes";

const applicationIntialState = {
  posts: [],
  questions: [],
  post: {
    index: 1,
    post_id: '',
    post_name: '',
    threshold: 0,
    created_by: '',
    updated_by: ''
  },
  toggleDialog: {
    openDialog: false,
    buttonName: "",
    title: ""
  },
  candidatePost: [],
  candidatePost_Map: {
    post_id: [], user_id: [], created_by: ''
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
    case actionTypes.HANDLE_ON_CANDIDATEPOST:
      var { candidatePost } = state;
      var { candidatePost, postMapValue } = action.payload;
      return {
        ...state,
        [candidatePost]: postMapValue
      };

    case actionTypes.HANDLE_ON_TOGGLE_DIALOG:
      var { toggleDialog, question, questions, post, posts, candidatePost_Map, candidatePost } = state;
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

        } else if (title == "Update CandidatePostMap") {
          candidatePost_Map = {
            ...candidatePost[index],
            index
          }
        }
      }
      debugger;
      return {
        ...state,
        toggleDialog,
        question,
        posts,
        post,
        questions, candidatePost_Map, candidatePost
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
        ...state, question: {
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
        ...state, question: {
          ...question,
          options
        }
      };
    default:
      return state;
  }
};
export default reducer;
