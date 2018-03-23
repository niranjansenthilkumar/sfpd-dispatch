(function() {
  d3.csv("/data/sfpd_dispatch_data_subset.csv", function(data) {
    console.log(data);

    var timedifferences = [];
    //empty array for each call type
    var totalTime = [0, 0, 0, 0, 0, 0];
    var count = [0, 0, 0, 0, 0, 0];
    data.forEach(function(d) {
      var date1 = moment(d.entry_timestamp);
      var date2 = moment(d.received_timestamp);
      var date3 = moment(d.dispatch_timestamp);

      //calculates total dispatch time for each record
      var total = timeCalculation(date1, date2, date3);

      //enumerates values into each call type array
      avgTimeCalculationCallType(d.call_type, totalTime, count, total);

    });

    var avgTime = [0,0,0,0,0,0];
    for (i = 0; i < count.length; i++) {
        total = totalTime[i];
        freq = count[i];
        avg = total/freq;
        avg = avg/60;
        avg = avg.toFixed(2);
        avgTime[i] = avg;

    }

    console.log(count);
    console.log(totalTime);
    console.log(avgTime);

  });
}());

//determines dispatchTime based on difference in recieved times.
function timeCalculation(date1, date2, date3){
  //total dispatch time
  differenceInMs = date2.diff(date1); // diff yields milliseconds
  duration = moment.duration(differenceInMs); // moment.duration accepts ms
  differenceInSeconds = duration.asSeconds(); //seconds

  if (differenceInSeconds != 0){
    differenceInSeconds = differenceInSeconds * -1;
  }

  dispatchMs = date3.diff(date2);
  dispatchTime = moment.duration(dispatchMs);
  dispatchSeconds = dispatchTime.asSeconds();

  var total = differenceInSeconds + dispatchSeconds;
  return total;

}

//if selector that determines where value in array goes based on callType
function avgTimeCalculationCallType(callType, totalTime, count, total){
  if(callType == "Medical Incident"){
    totalTime[0] += total;
    count[0] += 1;
  }
  else if(callType == "Alarms"){
    totalTime[1] += total;
    count[1] += 1;
  }
  else if(callType == "Structure Fire" || callType == "Outside Fire" || callType == "Vehicle Fire"){
    totalTime[2] += total;
    count[2] += 1;
  }
  else if(callType == "Other" || callType == "Citizen Assist / Service Call" || callType == "Elevator / Escalator Rescue"){
    totalTime[3] += total;
    count[3] += 1;
  }
  else if(callType == "Traffic Collision"){
    totalTime[4] += total;
    count[4] += 1;
  }
  else{
    totalTime[5] += total;
    count[5] += 1;
  }
}
