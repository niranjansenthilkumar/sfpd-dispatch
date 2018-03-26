var ctx = document.getElementById('myChart').getContext('2d');

var time = [4.4, 4, 5.5, 5.3, 3.2]
var als = [4.9, 4];
var hospital = [15.6, 15];
var unit = [8.4, 3.3, 4.3, 8.1, 4.4, 8];
var batallion = [5.2, 5.6, 6.2, 4.6, 4.9, 5.4, 5.6, 6.6, 6.4, 6.7, 7.9];

var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["Medical", "Alarm", "Fires", "Service", "Traffic"],
        datasets: [{
            label: 'Average Dispatch Time:',
            data: time,
            backgroundColor: [
                '#d53e4f',
                '#f46d43',
                '#fdae61',
                '#fee08b',
                '#ffffbf',
                '#e6f598',
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
          xAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'call type (excluding hazards)'
              }
          }],
            yAxes: [{
                ticks: {
                    beginAtZero:true
                },
                scaleLabel: {
                  display: true,
                  labelString: 'response time (minutes)'
                }
            }]
        },
        legend: {
          display: false
        },
        tooltips: {
            callbacks: {
              label: function(tooltipItem) {
                     return tooltipItem.yLabel + " minutes";
              }
            }
        }
    }
});

var ctx = document.getElementById('lifeThreateningChart').getContext('2d');
var lifeThreateningChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Non Life-threatening', 'Potentially Life-threatening'],
    datasets: [{
      label: 'Average Dispatch Time',
      data: als,
      backgroundColor: [
          '#d53e4f',
          '#fdae61'
        ]
    },]
  },
  options: {
      scales: {
        xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'call type priority'
            }
        }],
          yAxes: [{
              ticks: {
                  beginAtZero:true,
                  suggestedMax: 8
              },
              scaleLabel: {
                display: true,
                labelString: 'dispatch time (minutes)'
              }
          }]
      },
      legend: {
        display: false
      },
      tooltips: {
          callbacks: {
            label: function(tooltipItem) {
                   return tooltipItem.yLabel + " minutes";
            }
          }
      }
  }
});

var ctx = document.getElementById('responseTimeChart').getContext('2d');
var responseTimeChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Non Life-threatening', 'Potentially Life-threatening'],
    datasets: [{
      label: 'Average Dispatch Time',
      data: hospital,
      backgroundColor: ["#f46d43",
                       "#fee08b"]
    },]
  },
  options: {
      scales: {
        xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'call type priority'
            }
        }],
          yAxes: [{
              ticks: {
                  beginAtZero:true,
                  suggestedMax: 20,
                  stepSize: 2
              },
              scaleLabel: {
                display: true,
                labelString: 'response time (minutes)'
              }
          }]
      },
      legend: {
        display: false
      },
      tooltips: {
          callbacks: {
             label: function(tooltipItem) {
                    return tooltipItem.yLabel + " minutes";
             }
          }
      }
  }
});

var ctx = document.getElementById('unitTimeChart').getContext('2d');
var unitTimeChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Medical', 'Fire-Related', 'Chief', 'Private', 'Rescue', 'Other'],
    datasets: [{
      label: 'Average Dispatch Time',
      data: unit,
      backgroundColor: [
          '#d53e4f',
          '#f46d43',
          '#fdae61',
          '#fee08b',
          '#ffffbf',
          '#e6f598',
      ],
    },]
  },
  options: {
      scales: {
        xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'call type priority'
            }
        }],
          yAxes: [{
              ticks: {
                  beginAtZero:true,
                  suggestedMax: 12,
                  stepSize: 2
              },
              scaleLabel: {
                display: true,
                labelString: 'response time (minutes)'
              }
          }]
      },
      legend: {
        display: false
      },
      tooltips: {
          callbacks: {
             label: function(tooltipItem) {
                    return tooltipItem.yLabel + " minutes";
             }
          }
      }
  }
});


var ctx = document.getElementById('batTimeChart').getContext('2d');
var batTimeChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['B01', 'B02', 'B03', 'B04', 'B05', 'B06', 'B07', 'B08', 'B09', 'B10', 'B99'],
    datasets: [{
      label: 'Average Dispatch Time',
      data: batallion,
      backgroundColor: [
          '#d53e4f',
          '#f46d43',
          '#fdae61',
          '#fee08b',
          '#ffffbf',
          '#e6f598',
          '#abdda4',
          '#66c2a5',
          '#a6d96a',
          '#66bd63',
          '#1a9850'
      ],
    },]
  },
  options: {
      scales: {
        xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'call type priority'
            }
        }],
          yAxes: [{
              ticks: {
                  beginAtZero:true,
                  suggestedMax: 12,
                  stepSize: 2
              },
              scaleLabel: {
                display: true,
                labelString: 'response time (minutes)'
              }
          }]
      },
      legend: {
        display: false
      },
      tooltips: {
          callbacks: {
             label: function(tooltipItem) {
                    return tooltipItem.yLabel + " minutes";
             }
          }
      }
  }
});
