import React,{Component} from 'react';
import Card from '@material-ui/core/Card'
import {
    
    Grid,
    Paper,
    Table,
    TableHead,
    TableCell,
    TableRow,
    Button
  } from "@material-ui/core";
import axios from "axios";
class Result extends Component{
 state={
     result:[], userId:null
 }

    componentDidMount() {

        axios
          .get(
            "http://localhost:8080/api/result",
            
          )
          .then(response => {
            this.setResult( response.data.result);
          })
          .catch(err => console.log(err));
      }
      setResult= result=>{
        this.setState({result})
        console.log(result, "resultssss");
      }

     uniqueResult=()=>{
          const {userId}= this.state;
          if(userId!=null){
            axios
            .get(
              `http://localhost:8080/api/result/${userId}`,
              
            )
            .then(response => {
                if(response.data.result.length==0){
                    alert("Please enter a valid User ID")
                }
                else{
                    this.setResult( response.data.result); 
                }
              
            })
            .catch(err => console.log(err));
          }
       
      }

      handleChange= (e)=>{
       this.setState({
           userId:e
       })
      }


      render(){
          const {handleChange, uniqueResult} = this;
          const {result =[],userId} = this.state;
          return (<div>
            <Card style={{color:"black"}}><h2 style={{ marginLeft:"40%"}}>Candidate Result</h2></Card>

              <input  type='text' placeholder='Search' value={userId} onChange={(e)=>handleChange(e.target.value)}/>
            <button onClick={uniqueResult}><img style={{height:'3%'}} src="https://img.icons8.com/metro/20/000000/search.png"></img></button>
            <Grid container>
            <Grid item md={12} className="icon">
            
           </Grid>
           
              <Grid item md={1}></Grid>
              <Grid item md={10 }>
                <Paper>
                  <Table>
                    <TableHead>
                      <TableRow >
                        <TableCell style={{color:'black'}}>Sr. No.</TableCell>
                        <TableCell style={{color:'black'}}>User Id</TableCell>
                        <TableCell style={{color:'black'}}>Marks</TableCell>
                        <TableCell style={{color:'black'}}>Percentage</TableCell>
                        <TableCell style={{color:'black'}}>Result</TableCell>
                        
                      </TableRow>
                      {result.map((result, index1) => {
                        return (
                          <TableRow key={index1}>
                            <TableCell>{index1+1}</TableCell>
                            <TableCell>{result.r_user_id}</TableCell>
                            <TableCell>{result.marks}</TableCell>
                            <TableCell>{result.percentage}</TableCell>
                            
                            <TableCell>{result.result}</TableCell>
                           
                              
                          </TableRow>
                        );
                      })}
                    </TableHead>
                  </Table>
                </Paper>
              </Grid>
            <Grid item md={1}></Grid>
         
         </Grid></div>
          );
      }
    
}
export default Result