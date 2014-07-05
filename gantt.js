function GanttCtrl($scope) {
  $scope.months = [
  {
    name: "Jan",
    startTime: 1388534400,
    endTime: 1391212800,
    rent: 1200
  },
  {
    name: "Feb",
    startTime: 1391212800,
    endTime: 1393632000,
    rent: 1500
  },
  {
    name: "March",
    startTime: 1393632000,
    endTime: 1396310400,
    rent: 1100
  },
  {
    name: "April",
    startTime: 1396310400,
    endTime: 1398902400,
    rent: 1000
  }]

  // total chart width and the base bar height, in px
  var chartWidth = 1150
  var chartBaseBarHeight = 80

  // the total duration of the the dataset
  // assumes the last element's endTime is the last date
  var monthsTotalDuration = $scope.months[$scope.months.length - 1]['endTime'] - $scope.months[0]['startTime']

  function addDelayDuration(){
    for(i=0; i< $scope.months.length; i++){
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
      $scope.months[i].styleDuration.height = (($scope.months[i]['rent'] / 1000) * chartBaseBarHeight).toString() + 'px';
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

  addDelayDuration();
  addDelayDurationStyle();
  setMaxRentStyle();
}