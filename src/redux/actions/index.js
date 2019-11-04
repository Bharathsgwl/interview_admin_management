import * as actionTypes from "../actionTypes";

export const handleOnPosts = (post, value) => {
  return {
    type: actionTypes.HANDLE_ON_POSTS,
    payload: {
      post, value
    }
  };
};
export const handleOnQuestions = (question, val) => {
  return {
    type: actionTypes.HANDLE_ON_QUESTIONS,
    payload: {
      question, val
    }
  };
};

export const handleOnToggleDialog = (title = "Create question", buttonName = "Create", index = 1) => {
  return {
    type: actionTypes.HANDLE_ON_TOGGLE_DIALOG,
    payload: {
      title, buttonName, index
    }
  };
}
export const handleFieldChange = (property, property_value, propertyObj) => {
  return {
    type: actionTypes.HANDLE_FIELD_CHANGE,
    payload: {
      property, property_value, propertyObj
    }
  }
}
export const handleOnClickDeletePost = (uuid) => {
  return {
    type: actionTypes.HANDLE_ON_CLICK_DELETE_POST,
    payload: {
      uuid
    }
  };
}
export const handleFieldChangeNumber = (number) => {
  return {
    type: actionTypes.HANDLE_FIELD_CHANGE_NUMBER,
    payload: {
      number
    }
  };
}
export const handleOnChangeOption = (o_index, val_ue) => {
  return {
    type: actionTypes.HANDLE_CHANGE_OPTION,
    payload: {
      o_index, val_ue
    }
  };
}
export const handleOnCandidatePost = (candidatePost, postMapValue) => {
  return {
    type: actionTypes.HANDLE_ON_CANDIDATEPOST,
    payload: {
      candidatePost, postMapValue
    }
  };
}
export const handleDrawerOpen = () => {
  return {
    type: actionTypes.HANDLE_DRAWER_OPEN
  }
};
export const handleDrawerClose = () => {
  return {
    type: actionTypes.HANDLE_DRAWER_CLOSE
  }
};
export const handleOnPostClick = (history) => {
  return {
    type: actionTypes.HANDLE_ON_POST_CLICK,
    payload: {
      history
    }
  }
};
export const handleOnQuestionClick = (history) => {
  return {
    type: actionTypes.HANDLE_ON_QUESTION_CLICK,
    payload: {
      history
    }
  }
};
export const handleOnCandidatePostClick = (history) => {
  return {
    type: actionTypes.HANDLE_ON_CANDIDATE_POST_MAP_CLICK,
    payload: {
      history
    }
  }
};
export const handleOnResultClick = (history) => {
  return {
    type: actionTypes.HANDLE_ON_RESULT_CLICK,
    payload: {
      history
    }
  }
};

export const handleOnResponseClick = (history) => {
  return {
    type: actionTypes.HANDLE_ON_RESPONSE_CLICK,
    payload: {
      history
    }
  }
};

export const handleOnInstructionClick = (history) => {
  return {
    type: actionTypes.HANDLE_ON_INSTRUCTION_CLICK,
    payload: {
      history
    }
  }
};

export const onClickLogin = (history) => {
  return {
    type: actionTypes.ON_CLICK_LOGIN,
    payload: {
      history
    }
  };
};

export const handleOnSnackBarClose = () => {
  return {
    type: actionTypes.HANDLE_ON_SNACKBAR_CLOSE
  };
};

export const handleAuthenticaton = (history) => {
  return {
    type: actionTypes.HANDLE_AUTHENTICATION,
    payload: {
      history
    }
  };
};

export const setStatesFromResponse=(attribute,values)=>{
  return{
    type:actionTypes.SET_STATES_FROM_RESPONSE,
    payload:{
      attribute,values
    }
  };
};
