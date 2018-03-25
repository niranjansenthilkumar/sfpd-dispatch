(function() {
  d3.csv("/data/sfpd_dispatch_data_subset.csv", function(data) {
    console.log(data);

    //empty array for each call type
    var totalTime = [0, 0, 0, 0, 0, 0];
    var count = [0, 0, 0, 0, 0, 0];

    //empty array for life threatening paramter
    var alsTotalTime = [0, 0];
    var alsCount = [0, 0];

    //empty array for unit dispatch
    var unitTotalTime = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    var unitCount = [0, 0, 0, 0, 0, 0, 0, 0, 0];


    var time = [];
    data.forEach(function(d) {
      var date1 = moment(d.entry_timestamp);
      var date2 = moment(d.received_timestamp);
      var date3 = moment(d.dispatch_timestamp);

      var date4 = moment(d.response_timestamp);
      var date5 = moment(d.on_scene_timestamp);

      //calculates total dispatch time for each record
      var total = timeCalculation(date1, date2, date3);

      var responseTotal = responseTimeCalculation(date4, date5);

      //enumerates values into each call type array
      callTimeTotalCount(d.call_type, totalTime, count, total);

      //enumerates values based on if call type was life threatening or not
      alsTimeTotalCount(d.call_type_group, alsTotalTime, alsCount, total);

      unitTimeTotalCount(d.unit_type, unitTotalTime, unitCount, responseTotal);

      time.push(responseTotal);


    });
    avgTime = [];
    avgTimeCalculation(totalTime, count, avgTime);
    avgTimeALS = []
    avgTimeCalculation(alsTotalTime, alsCount, avgTimeALS);


    // console.log(count);
    // console.log(totalTime);
    console.log(avgTime);
    console.log(avgTimeALS);
    console.log(time);
    console.log(unitCount);
  });
}());

function avgTimeCalculation(totalTime, countCall, avgTime){
    length = countCall.length;
    for(i = 0; i < length; i++){
      total = totalTime[i];
      freq = countCall[i];
      avg = total/freq;
      avg = avg/60;
      avg = avg.toFixed(2);
      avgTime.push(avg);
    }
}

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

//determines responseTime based on difference in recieved times.
function responseTimeCalculation(date1, date2){
  //total response time
  differenceInMs = date2.diff(date1); // diff yields milliseconds
  duration = moment.duration(differenceInMs); // moment.duration accepts ms
  differenceInSeconds = duration.asSeconds(); //seconds


  return differenceInSeconds;
}

//if selector that determines where value in array goes based on callType
function callTimeTotalCount(callType, totalTime, count, total){
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
  //hazard detection
  else{
    totalTime[5] += total;
    count[5] += 1;
  }
}


//if selector that determines where value in array goes based on if parameter was Life Threatening
function alsTimeTotalCount(callType, totalTime, count, total){
  if(callType == "Non Life-threatening"){
    totalTime[0] += total;
    count[0] += 1;
  }
  else if(callType == "Potentially Life-Threatening"){
    totalTime[1] += total;
    count[1] += 1;
  }
}



//if selector that determines where value in array goes based on unit_type parameter
function unitTimeTotalCount(unit, totalTime, count, total){
  if(unit == "MEDIC"){
    totalTime[0] += total;
    count[0] += 1;
  }
  else if(unit == "ENGINE"){
    totalTime[1] += total;
    count[1] += 1;
  }
  else if(unit == "CHIEF"){
    totalTime[2] += total;
    count[2] += 1;
  }
  else if(unit == "PRIVATE"){
    totalTime[3] += total;
    count[3] += 1;
  }
  else if(unit == "RESCUE SQUAD"){
    totalTime[4] += total;
    count[4] += 1;
  }
  else if(unit == "TRUCK"){
    totalTime[5] += total;
    count[5] += 1;
  }
  else if(unit == "SUPPORT"){
    totalTime[6] += total;
    count[6] += 1;
  }
  else if(unit == "RESCUE CAPTAIN"){
    totalTime[7] += total;
    count[7] += 1;
  }
  else if(unit == "INVESTIGATION"){
    count[8] += 1;
  }
}
