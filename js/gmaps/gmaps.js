
var GMap =
{
  gmap: null,

  init: function(DOMElement){
    GMap.gmap = new google.maps.Map(
      document.getElementById(DOMElement),
      {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
      }
    );
  }
}
