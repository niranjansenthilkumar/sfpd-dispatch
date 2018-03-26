var markersArray = [];
var map;
var attributesChecked = {
    "time": {
      "lateNightYes": false,
      "earlyMorningYes": false,
      "morningYes": false,
      "afternoonYes": false,
      "eveningYes": false,
      "nightYes": false
    },
    "unit": {
      "medicalYes": false,
      "fireYes": false,
      "chiefYes": false,
      "privateYes": false,
      "rescueYes": false,
      "otherYes": false
    }
};

function myMap() {
  var myLatLng = {lat: 37.755426, lng: -122.439151};

  var mapOptions = {
        zoom: 12,
        center: myLatLng
  }

  map = new google.maps.Map(document.getElementById("googleMap"), mapOptions);

  initListeners();
  setMarkers(map);
}

function setMarkers(map) {

  d3.csv("/data/sfpd_dispatch_data_subset.csv", function(data) {
    data.forEach(function(d){
      var description = "<p>" + d.unit_type + "</p>";
      var infowindow = new google.maps.InfoWindow({
          content: description
      });
      var lat = d.latitude;
      lat = parseFloat(lat);

      var long = d.longitude;
      long = parseFloat(long);

      var myLatLng = {lat: lat, lng: long};
      var marker = new google.maps.Marker({
          position: myLatLng,
          title: "",
          info: description,
          icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
          map: map
      });
      marker.addListener('click', function() {
      infowindow.open(map, marker);
      });
      markersArray.push(marker);
    });
  });
}

function setMarkersByTimeAndUnit(map, startTime, endTime, unit) {

  d3.csv("/data/sfpd_dispatch_data_subset.csv", function(data) {
    data.forEach(function(d){
      responseTime = d.received_timestamp.substring(10,13);
      responseTime = parseInt(responseTime);
      if((responseTime >= startTime && responseTime <= endTime) && d.unit_type == unit){
      var description = "<p>" + d.unit_type + "</p>";
      var infowindow = new google.maps.InfoWindow({
          content: description
      });
      var lat = d.latitude;
      lat = parseFloat(lat);

      var long = d.longitude;
      long = parseFloat(long);

      var myLatLng = {lat: lat, lng: long};
      var marker = new google.maps.Marker({
          position: myLatLng,
          title: "",
          info: description,
          icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
          map: map
      });
      marker.addListener('click', function() {
      infowindow.open(map, marker);
      });
      markersArray.push(marker);
    }});
  });
}

function setMarkersByTime(map, startTime, endTime) {

  d3.csv("/data/sfpd_dispatch_data_subset.csv", function(data) {
    data.forEach(function(d){
      responseTime = d.received_timestamp.substring(10,13);
      responseTime = parseInt(responseTime);
      if((responseTime >= startTime && responseTime <= endTime)){
      var description = "<p>" + d.unit_type + "</p>";
      var infowindow = new google.maps.InfoWindow({
          content: description
      });
      var lat = d.latitude;
      lat = parseFloat(lat);

      var long = d.longitude;
      long = parseFloat(long);

      var myLatLng = {lat: lat, lng: long};
      var marker = new google.maps.Marker({
          position: myLatLng,
          title: "",
          info: description,
          icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
          map: map
      });
      marker.addListener('click', function() {
      infowindow.open(map, marker);
      });
      markersArray.push(marker);
    }});
  });
}

function setMarkersByUnit(map, unit, color) {
  d3.csv("/data/sfpd_dispatch_data_subset.csv", function(data) {
    data.forEach(function(d){
      responseTime = d.received_timestamp.substring(10,13);
      responseTime = parseInt(responseTime);

      if(d.unit_type == unit){
      var description = "<p>" + d.unit_type + "</p>";
      var infowindow = new google.maps.InfoWindow({
          content: description
      });
      var lat = d.latitude;
      lat = parseFloat(lat);

      var long = d.longitude;
      long = parseFloat(long);

      var myLatLng = {lat: lat, lng: long};
      var marker = new google.maps.Marker({
          position: myLatLng,
          title: "",
          info: description,
          icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
          map: map
      });
      marker.addListener('click', function() {
      infowindow.open(map, marker);
      });
      markersArray.push(marker);
    }});
  });
}

function checkWhichUnitIsActive(unit){
  if (unit.medicalYes == true){
    return "MEDIC";
  }
  else if (unit.fireYes == true){
    return "FIRE";
  }
  else if (unit.chiefYes == true){
    return "CHIEF";
  }
  else if (unit.privateYes == true){
    return "PRIVATE";
  }
  else if (unit.rescueYes == true){
    return "RESCUE";
  }
  else if (unit.otherYes == true){
    return "OTHER";
  }
  else{
    return "ALL";
  }
}

function checkWhichTimeIsActive(time){
  if (time.lateNightYes == true){
    return 00;
  }
  else if (time.earlyMorningYes == true){
    return 04;
  }
  else if (time.morningYes == true){
    return 08;
  }
  else if (time.afternoonYes == true){
    return 12;
  }
  else if (time.eveningYes == true){
    return 16;
  }
  else if (time.nightYes == true){
    return 20;
  }
  else{
    return "ALL";
  }
}


function initListeners() {
  document.getElementById("lateNightYes").addEventListener("click", function() {
          resetAttribute("time");
          attributesChecked.time.lateNightYes = true;
          setOnMap();
          //setMarkersByTime(map, 00, 03);
          console.log(attributesChecked.unit);
          unit = checkWhichUnitIsActive(attributesChecked.unit)
          console.log(unit);
          if(unit == "ALL"){
            setMarkersByTime(map, 00, 03);
          }
          setMarkersByTimeAndUnit(map, 00, 03, unit);

      });
  document.getElementById("earlyMorningYes").addEventListener("click", function() {
              resetAttribute("time");
              attributesChecked.time.earlyMorningYes = true;
              setOnMap();
              unit = checkWhichUnitIsActive(attributesChecked.unit)
              if(unit == "ALL"){
                setMarkersByTime(map, 04, 07);
              }
              setMarkersByTimeAndUnit(map, 04, 07, unit);
          });
  document.getElementById("morningYes").addEventListener("click", function() {
              resetAttribute("time");
              attributesChecked.time.morningYes = true;
              setOnMap();
              unit = checkWhichUnitIsActive(attributesChecked.unit)
              if(unit == "ALL"){
                setMarkersByTime(map, 08, 11);
              }
              setMarkersByTimeAndUnit(map, 08, 11, unit);
          });
  document.getElementById("afternoonYes").addEventListener("click", function() {
              resetAttribute("time");
              attributesChecked.time.afternoonYes = true;
              setOnMap();
              unit = checkWhichUnitIsActive(attributesChecked.unit)
              if(unit == "ALL"){
                setMarkersByTime(map, 12, 15);
              }
              setMarkersByTimeAndUnit(map, 12, 15, unit);
          });
  document.getElementById("eveningYes").addEventListener("click", function() {
              resetAttribute("time");
              attributesChecked.time.eveningYes = true;
              setOnMap();
              unit = checkWhichUnitIsActive(attributesChecked.unit)
              if(unit == "ALL"){
                setMarkersByTime(map, 16, 19);
              }
              setMarkersByTimeAndUnit(map, 16, 19, unit);
          });
  document.getElementById("nightYes").addEventListener("click", function() {
              resetAttribute("time");
              attributesChecked.time.nightYes = true;
              setOnMap();
              unit = checkWhichUnitIsActive(attributesChecked.unit)
              if(unit == "ALL"){
                setMarkersByTime(map, 20, 23);
              }
              setMarkersByTimeAndUnit(map, 20, 23, unit);
          });
  //units
  document.getElementById("medicalYes").addEventListener("click", function() {
          resetAttribute("unit");
          attributesChecked.unit.medicalYes = true;
          setOnMap();
          time = checkWhichTimeIsActive(attributesChecked.time)
          if(time == "ALL"){
            setMarkersByUnit(map, "MEDIC");
          }
          setMarkersByTimeAndUnit(map, time, time+3, "MEDIC");
      });
  document.getElementById("fireYes").addEventListener("click", function() {
              resetAttribute("unit");
              attributesChecked.unit.fireYes = true;
              setOnMap();
              time = checkWhichTimeIsActive(attributesChecked.time)
              if(time == "ALL"){
                setMarkersByUnit(map, "ENGINE");
              }
              setMarkersByTimeAndUnit(map, time, time+3, "ENGINE");
          });
  document.getElementById("chiefYes").addEventListener("click", function() {
              resetAttribute("unit");
              attributesChecked.unit.chiefYes = true;
              setOnMap();
              time = checkWhichTimeIsActive(attributesChecked.time)
              if(time == "ALL"){
                setMarkersByUnit(map, "CHIEF");
              }
              setMarkersByTimeAndUnit(map, time, time+3, "CHIEF");
          });
  document.getElementById("privateYes").addEventListener("click", function() {
              resetAttribute("unit");
              attributesChecked.unit.privateYes = true;
              setOnMap();
              if(time == "ALL"){
                setMarkersByUnit(map, "PRIVATE");
              }
              setMarkersByTimeAndUnit(map, time, time+3, "PRIVATE");
          });
  document.getElementById("rescueYes").addEventListener("click", function() {
              resetAttribute("unit");
              attributesChecked.unit.rescueYes = true;
              setOnMap();
              if(time == "ALL"){
                setMarkersByUnit(map, "RESCUE CAPTAIN");
              }
              setMarkersByTimeAndUnit(map, time, time+3, "RESCUE CAPTAIN");
          });
  document.getElementById("otherYes").addEventListener("click", function() {
              resetAttribute("unit");
              attributesChecked.unit.otherYes = true;
              setOnMap();
              if(time == "ALL"){
                setMarkersByUnit(map, "SUPPORT");
              }
              setMarkersByTimeAndUnit(map, time, time+3, "SUPPORT");
          });
}

function setOnMap() {
    for (var i = 0; i < markersArray.length; i++) {
        var check = true;
        var tempMarker = markersArray[i];
        for (var attr in attributesChecked) {
            if (attributesChecked.hasOwnProperty(attr)) {
                var attributeChoices = attributesChecked[attr];
                for (var setting in attributeChoices) {
                    if (attributeChoices.hasOwnProperty(setting)) {
                        if (attributeChoices[setting] && tempMarker[attr] != setting) {
                            check = false;
                        }
                    }
                }
            }
        }
        if (check) {
            markersArray[i].setMap(map);
        } else {
            markersArray[i].setMap(null);
        }
    }
}
