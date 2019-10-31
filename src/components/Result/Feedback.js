import React, { Component } from 'react';

import Card from '@material-ui/core/Card'
import axios from "axios";

class Feedback extends Component {
    state = {
  result:[],
  rate:[1,2,3,4,5],
 
    }

    componentDidMount() {

        axios
          .get(
            "http://localhost:8080/api/feed_back",
            
          )
          .then(response => {
            this.setquestion( response.data.result);
          })
          .catch(err => console.log(err));
      }

      setquestion= result=>{
        this.setState({result})
        console.log(result, "resultssss");
      }

    handleOnChange = (e, indexi,index1) => {
        console.log("hitting");
        let flag=true;
        const {result}= this.state;
     
       
     result.forEach((element, index)=>{
         
         if(index==index1){
             element.f_ans =e;
             element.index =indexi;
             element.color='green'
         }
        
     } );
      
   
       
        this.setState({
           ...result, result
        });
    }


    handleOnClickSubmit=()=>{
       
        
        axios.post("http://localhost:8080/api/feed_back_response",{result:this.state.result}).then(response => {
          console.log(response, "candi");
        });
       
    
    
      }


    render() {
        const {result=[]}= this.state;
   const {handleOnChange,handleOnClickSubmit}= this;
       
        const {rate}= this.state;
       
        return (
            <div>
<Card style={{color:"black"}}><h2 style={{ marginLeft:"40%"}}>Feedback Form</h2></Card>

<br/>
<br/>


            <Card style={{marginLeft:"15%", width:"60%"}}>
            {result.map((element,index1) => { 
             
                    return(<div>
<br/>
                      <b>  {element.q_no}.</b>
                        <span>{element.question}</span>
                       
                        {rate.map((marks, rateIndex)=>{
                        
                        let eleColor=element.index>=rateIndex?element.color:'white';
                          
                          return(  <span >
                            <input
                      style={{backgroundColor:eleColor}}     
               value={marks} 
               type="image" 
               src="https://img.icons8.com/doodle/48/000000/star--v2.png" onClick={(e)=>{handleOnChange(e.target.value, rateIndex,index1)}} />
                          
                          
                                 </span>)
                        })}
                    </div>)
                })}
<br/>
                <button style={{marginLeft:'68%'}} onClick={handleOnClickSubmit}>Submit</button>
                </Card>
            </div>
        )
    }
} export default Feedback;