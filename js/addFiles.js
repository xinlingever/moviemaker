import React from 'react';
import $ from 'jquery';


require('./library/jquery.ui.widget.js');
require('./library/jquery.fileupload.js');
require('./library/jquery.fileupload-process.js');

import AddFilesPanel from './addFilesPanel.js';
import UploadProgress from './uploadProgress.js';

let AddFiles = React.createClass({
  onFilesSelected: function(items) {
      var curItems = this.state.items;
      curItems = curItems.concat(items);
      this.setState({items: curItems});
    console.log("yes!!!" + JSON.stringify(items));
  },
    getInitialState() {
        return {items:[], fileName:'', progress:'0'};
    },
  componentDidMount: function() {
    $('#progress').hide();

    $('#fileupload').fileupload({
        url: 'server/php/',
        dataType: 'json',
        autoUpload: true,
        done: function (e, data) {
          var photosArray = [];
          $.each(data.result.files, function (index, file) {
              //$('<p/>').text(file.name).appendTo(document.body);
              photosArray.push({name: file.name});
              console.log(index + '::::' + file.name);
          });

          console.log('photosArray:' + photosArray.length);
          if(this.onFilesSelected) {
            this.onFilesSelected(photosArray);
          }

          $('#progress').hide();

        }.bind(this),
        progress: function (e, data) {
          if (e.isDefaultPrevented()) {
              return false;
          }
          var curState = this.state;
          curState.fileName = '';
          
          $.each(data.files, function (index, file) {
            curState.fileName += file.name + ' / ';
          });

          this.setState(curState);

        }.bind(this),

        progressall: function (e, data) {
          $('#progress').show();
          if (e.isDefaultPrevented()) {
              return false;
          }
          var curState = this.state;

          var progress = Math.floor(data.loaded / data.total * 100);
          //$('.progress-bar').css({width: progress + '%'});
          curState.progress = progress;
          //curState.fileName = data.files[0].name;
          this.setState(curState);
          console.log('progressssssssssssssss ' + progress );
        }.bind(this),

        error: function(e, data) {
          alert(JSON.stringify(data));
        }
    });


  },
  render() {
    return(
      <div>
        <span className="btn btn-success fileinput-button">
            <i className="glyphicon glyphicon-plus"></i>
            <span>Add files...</span>
            <input id="fileupload" type="file" name="files[]" multiple></input>
        </span>
        <UploadProgress progress={this.state.progress} fileName={this.state.fileName}/>
        <AddFilesPanel key='panel' photos={this.state.items}/>
      </div>);
  }

  /*



  */
});

export default AddFiles;
