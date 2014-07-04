function GanttCtrl($scope) {
  $scope.months = [
  {
    name: "Jan",
    startTime: 1388534400,
    endTime: 1391212800,
    rent: 1200,
    style: {
      color: 'red'
    }
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

  var chart_width = 1000
  var total_duration = $scope.months[3]['endTime'] - $scope.months[0]['startTime']

  function addDelayDuration(){
    for(i=0; i< $scope.months.length; i++){
      $scope.months[i]['delay'] = $scope.months[i]['startTime'] - $scope.months[0]['startTime'];
      $scope.months[i]['duration'] = $scope.months[i]['endTime'] - $scope.months[i]['startTime'];
    }
  };

  function addDelayDurationStyle(){
    for(i=0; i< $scope.months.length; i++){
      $scope.months[i]['styleDelay'] = {};
      $scope.months[i]['styleDuration'] = {};
      $scope.months[i].styleDelay.width = (($scope.months[i]['delay'] / total_duration) * chart_width).toString() + 'px';
      $scope.months[i].styleDuration.width = (($scope.months[i]['duration'] / total_duration) * chart_width).toString() + 'px';
    }
  }

  addDelayDuration();
  addDelayDurationStyle();
}