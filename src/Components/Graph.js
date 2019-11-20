import React, {Component}  from 'react';
import { Line } from 'react-chartjs-2';

class Graph extends Component {
  constructor(props){
    super(props);
    this.state = {
      data:{
        labels:[ 1, 2, 3, 4, 5],
        datasets:[
          {
            label: "Equipo",
            borderColor: "rgba(51, 51, 51, 1)",
            backgroundColor:"rgba(51,51,51,0)",
            data:[ Math.floor((Math.random() * 100) + 1) ,Math.floor((Math.random() * 100) + 1), Math.floor((Math.random() * 100) + 1),Math.floor((Math.random() * 100) + 1),Math.floor((Math.random() * 100) + 1)]
          },
          {
            label: "Chef",
            borderColor: "rgba(168, 168, 168, 1)",
            backgroundColor: "rgba(168, 168, 168, 0.37)",
            data:[ Math.floor((Math.random() * 100) + 1) ,Math.floor((Math.random() * 100) + 1), Math.floor((Math.random() * 100) + 1),Math.floor((Math.random() * 100) + 1),Math.floor((Math.random() * 100) + 1)]
          },
          {
            label: "Yo",
            borderColor: "rgba(104, 0, 30, 1)",
            backgroundColor: "rgba(104, 0, 30, 0)",
            data:[ Math.floor((Math.random() * 100) + 1) ,Math.floor((Math.random() * 100) + 1), Math.floor((Math.random() * 100) + 1),Math.floor((Math.random() * 100) + 1),Math.floor((Math.random() * 100) + 1)]
          },
          {
            label: "Yo Futuro",
            borderColor: "rgba(204, 0, 67, 1)",
            backgroundColor: "rgba(204, 0, 67, 0)",
            data:[ Math.floor((Math.random() * 100) + 1) ,Math.floor((Math.random() * 100) + 1), Math.floor((Math.random() * 100) + 1),Math.floor((Math.random() * 100) + 1),Math.floor((Math.random() * 100) + 1)]
          }
        ]
      }
    }
  }
  render(){
    return(
      <Line 
      width={600} height={600}
        options={{
          responsive:true
        }}
        data={this.state.data}
        />
    )
  }
}
export default Graph;