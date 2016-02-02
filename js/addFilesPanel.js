import React from 'react';

let AddFilesPanel = React.createClass({
  getInitialState(){
    return {focused:0};
  },
  clicked(index){
    this.setState({focused:index});
  },
  render(){
    var self = this;
    var displayContent;
    if(!this.props.photos || this.props.photos.length === 0) {
      return (<div>Please click the button to select your photos first.</div>);
    }

    return (
      <div>
        <ul>
          {

            this.props.photos.map(function(item,index){
              var style="";
              if(self.state.focused == index){
                style="focused";
              }
              //
              return <li className={style} onClick={self.clicked.bind(self,index)}>{item.name}</li>;
            })
          }
        </ul>
        <p>Selected:{this.props.photos[self.state.focused]}</p>

        </div>
    );
  }
});

export default AddFilesPanel
