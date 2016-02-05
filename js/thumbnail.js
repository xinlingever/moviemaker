import React from 'react';

var _formatFileSize = function (bytes) {
    if (typeof bytes !== 'number') {
        return '';
    }
    if (bytes >= 1000000000) {
        return (bytes / 1000000000).toFixed(2) + ' GB';
    }
    if (bytes >= 1000000) {
        return (bytes / 1000000).toFixed(2) + ' MB';
    }
    return (bytes / 1000).toFixed(2) + ' KB';
};

var getIcon = function(type) {
  var baseDir = '../img/icon/png/';
  switch(type) {
    case 'image/jpeg':
      return baseDir + 'jpeg.png'
    case 'image/gif':
      return baseDir + 'gif.png'

    default:
      return baseDir + 'unkown.png'
  }
};

let Thumbnail = React.createClass({
  getExif: function(pFile) {
    loadImage.parseMetaData(pFile, function(metadata){
      console.log(JSON.stringify(metadata.exif));
      this.setState({thumbnail:metadata.exif.Thumbnail});
    }.bind(this));
  },
  getInitialState() {
    return {thumbnail:null};
  },
  componentWillMount: function() {
    if(this.props.pFile){
      this.getExif(this.props.pFile);
    }
  },
  componentWillUpdate: function(nextProps, nextState) {
    //console.log('addFilesPanel::componentWillUpdate  ' + JSON.stringify(nextProps.photos));
  },
  shouldComponentUpdate: function(nextProps, nextState) {
    //console.log('addFilesPanel::shouldComponentUpdate  ' + JSON.stringify(this.props.photos));
    return this.props != nextProps.photos
      || this.state != nextState;
  },
  render() {
    var thumbnailImage = '';
    var style = {width:'50px'};

    if(this.state.thumbnail) {
        return(<div> <img src={this.state.thumbnail}></img> {this.props.pFile.name}  <img style={style} src={getIcon(this.props.pFile.type)}></img>   {_formatFileSize(this.props.pFile.size)} </div>);
    }else{
      return(<div> {this.props.pFile.name}  <img style={style} src={getIcon(this.props.pFile.type)}></img>   {_formatFileSize(this.props.pFile.size)} </div>);
    }
  }
});

export default Thumbnail;
