var app = {};
(function(){
  app = {
    self: this,
    geocoder: {},
    gmap: ko.observable(GMap),
    markerModel: ko.observable(marker),
    searchMaker: ko.observableArray([]),
    search: ko.observable(""),
    searchUpdate: function(value){
      if(value.length == 0){
        if(markerModel().markerList())
        {
            app.searchMaker(markerModel().markerList());
        }
        else {
          app.searchMaker([]),
        }
      }else{
        app.searchMaker([]);
        app.markerModel().markerList().forEach(function(item){
          if(item.label.indexOf(search()) > -1){
            searchMaker.push(item);
          }
        })
      }
    },

    openInfoWindow: function(marker){
      app.geocoder.geocode({'location': marker().position}, function(results, status){
        if(status === google.maps.GeocoderStatus.OK){
          if(results[1]){
            var infowindow = new google.maps.InfoWindow;
            infowindow.setContent(results[1].formatted_address);
            infowindow.open(app.gmap().gmap, marker());
            marker().label = results[1];
          }
        }
      });
    },

    placeMarker: function(position){
      var marker = ko.observable(new google.maps.Marker({
          position: position,
          map: app.gmap().gmap,
          label: ""
      }));
      google.maps.event.addListener(marker(), 'click', function(e){
        marker().setMap(null);
        app.markerModel().markerList.pop(marker);
      });
      app.markerModel().add(marker);
      return marker;
    },

    initMap: function(){
      app.gmap().init("map");
      app.geocoder = new google.maps.Geocoder;
      google.maps.event.addListener(app.gmap().gmap, 'click',
        function(e){
            var marker = app.placeMarker(e.latLng);
            app.openInfoWindow(marker);
        });
    }
  }
  app.search.subscribe(app.searchUpdate);
  ko.applyBindings(app);
})();
