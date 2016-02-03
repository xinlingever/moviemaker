import React from 'react';

let UploadProgress = React.createClass({
  render() {
    var style = {
      width: this.props.progress + '%'
    };
    return(
      <div id="progress" className="progress progress-striped active" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="50">
          <div className="progress-bar progress-bar-success" style={style}>{this.props.fileName}</div>
      </div>);
  }

  /*



  */
});

export default UploadProgress;
