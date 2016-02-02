import React from 'react';
import $ from 'jquery';


require('./library/jquery.ui.widget.js');
require('./library/jquery.fileupload.js');


import AddFilesPanel from './addFilesPanel.js';


let AddFiles = React.createClass({
  onFilesSelected: function(items) {
      var curItems = this.state.items;
      curItems = curItems.concat(items);
      this.setState({items: curItems});
    console.log("yes!!!" + JSON.stringify(items));
  },
    getInitialState() {
        return {items:[]};
    },
  componentDidMount: function() {
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
        <AddFilesPanel photos={this.state.items}/>
      </div>);
  }

  /*



  */
});

export default AddFiles;
