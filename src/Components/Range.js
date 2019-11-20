import React, {  Component } from "react";




class Range extends Component {
    constructor(props) {
      super(props);
      this.updateRange = this.updateRange.bind(this);
    }
    
    updateRange(e) {
      this.props.updateRange(e.target.value);
    }
    
    render() {
      // console.log(this.props);
      const { range } = this.props;
      return (
        <div className="range">
          <input id="range" type="range"
            value={range}
            min="0"
            max="5"
            step="1"
            onChange={this.updateRange}
          />
          <span id="output">{range}</span>
        </div>
      )
    }
  }
  
  export default Range;