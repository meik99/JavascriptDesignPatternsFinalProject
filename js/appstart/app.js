var app;
(function(){
  app = {
    self: this,
    gmap: ko.observable(GMap),

    initMap: function(){
      app.gmap().init("map");
    }

  }
  ko.applyBindings(app);
})();
