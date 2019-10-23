import * as actionTypes from "../actionTypes";

export const handleOnPosts=(post,value)=>{
  return{
    type:actionTypes.HANDLE_ON_POSTS,
    payload:{
      post,value
    }
  };
};
export const handleOnQuestions=(question,val)=>{
  return{
    type:actionTypes.HANDLE_ON_QUESTIONS,
    payload:{
      question,val
    }
  };
};

export const handleOnToggleDialog=(title= "Create question", buttonName = "Create",index=1)=>{
  return{
    type:actionTypes.HANDLE_ON_TOGGLE_DIALOG,
    payload:{
      title,buttonName,index
    }
  };
}
export const handleFieldChange=(property,property_value,propertyObj)=>{
  return{
    type:actionTypes.HANDLE_FIELD_CHANGE,
    payload:{
      property,property_value,propertyObj
    }
  }
}
export const handleOnClickDeletePost=(uuid)=>{
  return{
    type:actionTypes.HANDLE_ON_CLICK_DELETE_POST,
    payload:{
      uuid
    }
  };
}
export const handleFieldChangeNumber=(number)=>{
  return{
    type:actionTypes.HANDLE_FIELD_CHANGE_NUMBER,
    payload:{
      number
    }
  };
}
export const handleOnChangeOption=(o_index,val_ue)=>{
  return{
    type:actionTypes.HANDLE_CHANGE_OPTION,
    payload:{
      o_index,val_ue
    }
  };
}
