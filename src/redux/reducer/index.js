import * as actionTypes from "../actionTypes";
import axios from "axios";

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
  priority1: ["Low", "Medium", "High"],
  instructions: [],
  instruction: {
    index: 1,
    uuid: "",
    rule_name: "",
    priority: [],
    created_by: "",
    updated_by: ""
  },
  toggleDialog: {
    openDialog: false,
    buttonName: "",
    title: ""
  },
  candidatePost: [],
  candidatePost_Map: {
    uuid:"",
    post_id: [], user_id: [], created_by: '',
    Selected_Users: []
  },
result_1:[],
  candidates : [],
  response:[],

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
  index: 0,
  login: {
    username: "",
    password: ""
  },
  snackBar: {
    snackbarOpen: false
  }

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
      
    // case actionTypes.HANDLE_ON_RESULT:
    //   var { result, val } = action.payload;
    //   // console.log(val,"val");
    //   return {
    //     ...state,
    //     [question]: val
    //   };
    case actionTypes.HANDLE_ON_CANDIDATEPOST:
      var { candidatePost } = state;
      var { candidatePost, postMapValue } = action.payload;
      return {
        ...state,
        [candidatePost]: postMapValue
      };

    case actionTypes.HANDLE_ON_TOGGLE_DIALOG:
      var { toggleDialog, question, questions, post, posts, candidatePost_Map, candidatePost, instructions, instruction } = state;
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
        } else if (title == "Update Instruction") {
          instruction = {
            ...instructions[index],
            index
          }
        } else {
          candidatePost_Map = {
            ...candidatePost[index], index
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
        questions, candidatePost_Map, candidatePost,
        instruction,
        instructions
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
      var { open } = state;
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
      history.push("/menu/Candidate_Post_Map");
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
      history.push("/menu/result");
      return {
        ...state
      };
    case actionTypes.HANDLE_ON_INSTRUCTION_CLICK:
      var { history } = action.payload;
      history.push("/menu/instruction");
      return {
        ...state
      };
case actionTypes.HANDLE_ON_RESPONSE_CLICK:
  var {history}=action.payload;
  history.push("/menu/response");
  return{
    ...state
  }
    // case actionTypes.ON_CLICK_LOGIN:
    //   var history = action.payload.history;
    //   var snackBar = state;
    //   var snackbarOpen = state.snackBar;
    //   const { username, password } = state.login;
    //   var message = state.message;
    //   snackbarOpen = !snackbarOpen;
    //   debugger;
    //   username === "GWL" && password === "123"
    //     ? history.push("/menu")
    //     : username == "" && password == ""
    //       ? (message = "Enter Credentials")
    //       : (message = "Invalid Credentials");
    //   debugger;
    //   return {
    //     ...state,
    //     message,
    //     open,
    //     username,
    //     password,
    //     snackbarOpen
    //   };

    case actionTypes.HANDLE_AUTHENTICATION:
      var { history } = action.payload;
      var snackBar = state;
      var snackbarOpen = state.snackBar;
      var message = state.snackBar;
      snackbarOpen = !snackbarOpen;
      console.log(history, "histu")
      debugger;
      axios
        .post(`https://evening-dawn-93464.herokuapp.com/api/verify`, {
          "auth_token": sessionStorage.getItem('auth_token')
        })
        .then(response => {
          if (response.data.isloggedIn === false) {
            debugger;
            console.log("Resp1", response);
            history.push("/")

          } else {
            debugger;
            console.log("Resp2", response);

          }
        })

    case actionTypes.HANDLE_ON_SNACKBAR_CLOSE:
      var { snackBar } = state;
      var { snackbarOpen } = state.snackBar;
      debugger;
      snackbarOpen = !snackbarOpen;
      debugger;
      return {
        ...state,
        snackbarOpen
      };
      

    default:
      return state;
  }
};
export default reducer;
