var fs = require("fs");
var d3 = require("d3");
var _ = require("lodash");

d3.csv("/data/sfpd_dispatch_data_subset.csv", function(data) {
  console.log(data);

  var minLand = d3.extent(data, function(d) { return d.number_of_alarms; });
  console.log(minLand);

  var large_land = data.filter(function(d) { return d.station_area == 10; });
  console.log(large_land);

  console.log(moment.locale());
});
