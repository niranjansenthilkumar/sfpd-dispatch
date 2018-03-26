var avgTime = [];

$(document).ready(function () {
  d3.csv("/sfpd-dispatch/data/sfpd_dispatch_data_subset.csv", function(data) {
    console.log(data);

    //empty array for each call type
    var totalTime = [0, 0, 0, 0, 0, 0];
    var count = [0, 0, 0, 0, 0, 0];

    //empty array for life threatening paramter
    var alsTotalTime = [0, 0];
    var alsCount = [0, 0];

    //empty array for unit dispatch
    var unitTotalTime = [0, 0, 0, 0, 0, 0];
    var unitCount = [0, 0, 0, 0, 0, 0];

    //empty array for hospitalTime
    var hospitalTotalTime = [0, 0];
    var hospitalCount = [0, 0];

    var batallionTotalTime = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var batallionCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    var time = [];
    data.forEach(function(d) {
      var date1 = moment(d.entry_timestamp);
      var date2 = moment(d.received_timestamp);
      var date3 = moment(d.dispatch_timestamp);

      var date4 = moment(d.response_timestamp);
      var date5 = moment(d.on_scene_timestamp);

      var date6 = moment(d.transport_timestamp);
      var date7 = moment(d.hospital_timestamp);

      //calculates total dispatch time for each record
      var total = timeCalculation(date1, date2, date3);

      var responseTotal = responseTimeCalculation(date4, date5);
      var hospitalTotal = responseTimeCalculation(date6, date7);

      //enumerates values into each call type array
      callTimeTotalCount(d.call_type, totalTime, count, total);

      //enumerates values based on if call type was life threatening or not
      alsTimeTotalCount(d.call_type_group, alsTotalTime, alsCount, total);
      alsTimeTotalCount(d.call_type_group, hospitalTotalTime, hospitalCount, hospitalTotal);

      //enumerates values based on if unit type
      unitTimeTotalCount(d.unit_type, unitTotalTime, unitCount, responseTotal);

      battalionTimeTotalCount(d.battalion, batallionTotalTime, batallionCount, responseTotal);

      time.push(hospitalTotal);


    });
    avgTimeLocal = [];
    avgTimeCalculation(totalTime, count, avgTimeLocal);
    avgTime = avgTimeLocal.map(Number);
    //someFunction(avgTime, time);

    avgTimeALS = [];
    avgTimeCalculation(alsTotalTime, alsCount, avgTimeALS);
    avgTimeALS = avgTimeALS.map(Number);

    avgTimeUnit = [];
    avgTimeCalculation(unitTotalTime, unitCount, avgTimeUnit);
    avgTimeUnit = avgTimeUnit.map(Number);

    avgTimeHospital = [];
    avgTimeCalculation(hospitalTotalTime, hospitalCount, avgTimeHospital);
    avgTimeHospital = avgTimeHospital.map(Number);

    avgTimeBattalion = [];
    avgTimeCalculation(batallionTotalTime, batallionCount, avgTimeBattalion);
    avgTimeBattalion = avgTimeBattalion.map(Number);

    // console.log(count);
    // console.log(totalTime);
    console.log(avgTime);
    console.log(avgTimeALS);
    console.log(avgTimeUnit);
    console.log(avgTimeHospital);
    console.log(avgTimeBattalion);
  });
}());

function returnTime(avgTime){
  return avgTime;
}

function avgTimeCalculation(totalTime, countCall, avgTime){
    length = countCall.length;
    for(i = 0; i < length; i++){
      total = totalTime[i];
      freq = countCall[i];
      avg = total/freq;
      avg = avg/60;
      avg = avg.toFixed(1);
      avgTime.push(avg);
    }
    return avgTime;
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
  if(!isNaN(total)){
  if(callType == "Non Life-threatening"){
    totalTime[0] += total;
    count[0] += 1;
  }
  else if(callType == "Potentially Life-Threatening"){
    totalTime[1] += total;
    count[1] += 1;
  }}
}

//if selector that determines where value in array goes based on unit_type parameter
function unitTimeTotalCount(unit, totalTime, count, total){
  if(!isNaN(total)){
  if(unit == "MEDIC"){
    totalTime[0] += total;
    count[0] += 1;
  }
  else if(unit == "ENGINE" || unit == "TRUCK"){
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
  else if(unit == "RESCUE SQUAD" || unit == "RESCUE CAPTAIN"){
    totalTime[4] += total;
    count[4] += 1;
  }
  //Other: SUPPORT AND INVESTIGATION
  else{
    totalTime[5] += total;
    count[5] += 1;
  }}}

  //if selector that determines where value in array goes based on battalion unit
function battalionTimeTotalCount(unit, totalTime, count, total){
    if(!isNaN(total)){
    if(unit == "B01"){
      totalTime[0] += total;
      count[0] += 1;
    }
    else if(unit == "B02"){
      totalTime[1] += total;
      count[1] += 1;
    }
    else if(unit == "B03"){
      totalTime[2] += total;
      count[2] += 1;
    }
    else if(unit == "B04"){
      totalTime[3] += total;
      count[3] += 1;
    }
    else if(unit == "B05"){
      totalTime[4] += total;
      count[4] += 1;
    }
    else if(unit == "B06"){
      totalTime[5] += total;
      count[5] += 1;
    }
    else if(unit == "B07"){
      totalTime[6] += total;
      count[6] += 1;
    }
    else if(unit == "B08"){
      totalTime[7] += total;
      count[7] += 1;
    }
    else if(unit == "B09"){
      totalTime[8] += total;
      count[8] += 1;
    }
    else if(unit == "B10"){
      totalTime[9] += total;
      count[9] += 1;
    }
    else if(unit == "B11"){
      totalTime[10] += total;
      count[10] += 1;
    }
    //Other: B99
    else{
      totalTime[10] += total;
      count[10] += 1;
    }}}
