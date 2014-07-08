function GanttCtrl($scope) {
  $scope.months = [
  {
    name: "A101",
    startTime: 1388534400,
    endTime: 1391212800,
    rent: 1200
  },
  {
    name: "A102",
    startTime: 1391212800,
    endTime: 1393632000,
    rent: 1500
  },
  {
    name: "B101",
    startTime: 1393632000,
    endTime: 1396310400,
    rent: 1100
  },
  {
    name: "B201",
    startTime: 1396310400,
    endTime: 1398902400,
    rent: 1000
  }]

  // total chart width and the base bar height, in px
  var chartWidth = 1150
  var chartBaseBarHeight = 80
  var earliestTime = 0
  var latestTime = 0
  var monthsTotalDuration = 0

  // the total duration of the the dataset
  // assumes the last element's endTime is the last date
  // var monthsTotalDuration = $scope.months[$scope.months.length - 1]['endTime'] - $scope.months[0]['startTime']

  // total duration of the dataset
  // compare and get the lowest time and highest time
  function findTotalDuration(){
    earliestTime = Math.min.apply(Math, $scope.months.map(function(month) {return month.startTime }));
    latestTime = Math.max.apply(Math, $scope.months.map(function(month) {return month.endTime }));
    monthsTotalDuration = latestTime - earliestTime;
  };

  function addDelayDuration(){
    for(i=0; i < $scope.months.length; i++){
      $scope.months[i]['delay'] = $scope.months[i]['startTime'] - $scope.months[0]['startTime'];
      $scope.months[i]['duration'] = $scope.months[i]['endTime'] - $scope.months[i]['startTime'];
    }
  };

  // addDelayDurationStyle adds a style hash to each gantt chart bar by calculating percentage of time to the chartWidth
  function addDelayDurationStyle(){
    for(i=0; i< $scope.months.length; i++){
      $scope.months[i]['styleDelay'] = {};
      $scope.months[i]['styleDuration'] = {};
      $scope.months[i].styleDelay.width = (($scope.months[i]['delay'] / monthsTotalDuration) * chartWidth).toString() + 'px';
      $scope.months[i].styleDuration.width = (($scope.months[i]['duration'] / monthsTotalDuration) * chartWidth).toString() + 'px';
    }
  }

  // sets isMaxRent flag which css stylesheet styles based on the class
  function setMaxRentStyle(){
    for(i=0; i< $scope.months.length; i++){
      $scope.months[i].isMaxRent = false;
    };

    var maxRent = Math.max.apply(Math, $scope.months.map(function(o) {return o.rent }));
    var maxRentIndex = $scope.months.map(function(o) {return o.rent }).indexOf(maxRent);
    $scope.months[maxRentIndex].isMaxRent = true;
  }

  findTotalDuration();
  addDelayDuration();
  addDelayDurationStyle();
  setMaxRentStyle();
}