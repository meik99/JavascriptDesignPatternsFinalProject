var marker = {
  markerList: ko.observableArray([]),
  add: function(marker){
    if(this.markerList.indexOf(marker) < 0){
      this.markerList.push(marker);
    }
  }
};
