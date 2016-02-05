import React from 'react';

import Thumbnail from './thumbnail.js';

let AddFilesPanel = React.createClass({
  getInitialState() {
    return {focused:0};
  },
  clicked(index) {
    this.setState({focused:index});
  },
  componentWillReceiveProps: function() {
    //console.log('addFilesPanel::componentWillReceiveProps  ' + JSON.stringify(this.props.photos));
  },
  componentWillUpdate: function(nextProps, nextState) {
    //console.log('addFilesPanel::componentWillUpdate  ' + JSON.stringify(nextProps.photos));
  },
  shouldComponentUpdate: function(nextProps, nextState) {
    //console.log('addFilesPanel::shouldComponentUpdate  ' + JSON.stringify(this.props.photos));
    return this.props.photos.length !== nextProps.photos.length
      || this.state != nextState;
  },
  render() {
    var self = this;
    var displayContent;
    if(!this.props.photos || this.props.photos.length === 0) {
      return (<div>Please click the button to select your photos first.</div>);
    }

    return (
      <div>
        <ul>
          {

            this.props.photos.map(function(item, index) {
              var style="";
              if(self.state.focused == index) {
                style="focused";
              }
              //
              return <Thumbnail key={'photo' + index} className={style} onClick={self.clicked.bind(self,index)} pFile={item} >{self.props.photos[index].name}</Thumbnail>;
            })
          }
        </ul>
        <p>Selected:{self.props.photos[self.state.focused].name}</p>

        </div>
    );
  }
});

export default AddFilesPanel
