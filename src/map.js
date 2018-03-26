function myMap() {

  var time = [0,0,0,0,0,0];

  var myLatLng = {lat: 37.755426, lng: -122.439151};

  var map = new google.maps.Map(document.getElementById('googleMap'), {
    zoom: 12,
    center: myLatLng
  });
  d3.csv("/data/sfpd_dispatch_data_subset.csv", function(data) {

    var markersArray = []
    data.forEach(function(d) {

      responseTime = d.received_timestamp.substring(10,13);
      responseTime = parseInt(responseTime);
      markersArray.push(responseTime);


      if(d.unit_type == "RESCUE SQUAD"){
      var latitude = d.latitude;
      latitude = parseFloat(latitude);

      var longitude = d.longitude;
      longitude = parseFloat(longitude);

      var infowindow = new google.maps.InfoWindow({
          content: d.unit_type
      });

      var myLatLng = {lat: latitude, lng: longitude};
      var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'Hello World!',
        icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
      });

      marker.addListener('click', function() {
      infowindow.open(map, marker);
      });
      }

      if(d.unit_type == "PRIVATE"){
      var latitude = d.latitude;
      latitude = parseFloat(latitude);

      var longitude = d.longitude;
      longitude = parseFloat(longitude);

      var infowindow = new google.maps.InfoWindow({
          content: d.unit_type
      });

      var myLatLng = {lat: latitude, lng: longitude};
      var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'Hello World!',
        icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
      });

      marker.addListener('click', function() {
      infowindow.open(map, marker);
      });
      }

    });
    console.log(time);
    console.log(markersArray);
  });

}
//seperating time based on 4 hour intervals during the day
function timeIterator(time, responseTime){
  //substring to determine the hour of the responsecall
  responseTime = responseTime.substring(10,12);
  responseTime = parseInt(responseTime);
  if(responseTime > 00 && responseTime < 05){
      time[0] += 1;
  }
}




//set on map helper function
function setOnMap(time){
  if(responseTime >= 00 && responseTime <= 03){

  }
  else if(responseTime >= 04 && responseTime <= 07){

  }
  else if(responseTime >= 08 && responseTime <= 11){

  }
  else if(responseTime >= 12 && responseTime <= 15){

  }
  else if(responseTime >= 16 && responseTime < 19){

  }
  else if(responseTime > 20 && responseTime < 23){

  }

}
