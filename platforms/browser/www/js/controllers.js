angular.module('starter.controllers', ['chart.js'])

.controller('DashCtrl', function($scope) {})

.controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state, $ionicLoading) 
{
    $scope.data = {};

    $scope.login = function() {
      $ionicLoading.show({
        content: 'Loading',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200
      });
        LoginService.loginUser($scope.data.username, $scope.data.password)
        .success(function(data) 
        {
            $ionicLoading.hide();
            $state.go('tab.dash');
        }).error(function(data) {
            $ionicLoading.hide();
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Please check your credentials!'
            });
        });
    }
})
.controller('MyConsumptionIndicatorCtrl', function($scope, $window)
{

})
.controller('LastWeekConsumptionCtrl', function(EnergyWeeklyService, $state, $scope, $window)
{
  /*
  $scope.labels = ['May 1', 'May 2', 'May 3', 'May 4', 'May 5', 'May 6', 'May 7'];
  $scope.series = ['Controller 1', 'Controller 2'];
   $scope.data = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
   ];
   */
  $scope.data = [];
  $scope.labels = [];
  $scope.series = [];
  
  EnergyWeeklyService.daily_consumption().success(function(data) 
  {
    var devices = data[0].owner;
    for(i = 0; i < devices.length ; i++)
    {
      $scope.series.push(devices[i].name);

      measures = [];
      for(k = 0; k < devices[i].measurement_daily.length; k++)
      {
        var date = devices[i].measurement_daily[k].date;
        if($scope.labels.indexOf(date) == -1)
        {
          $scope.labels.push(date);
        }
        
        measures.push(devices[i].measurement_daily[k].wh);
      };
        $scope.data.push(measures);
    };
  }
  ).error(
  function(data) {
      $state.go('login');
      $window.sessionStorage.clear();
  });

})
.controller('KitchenIndicatorCtrl', function(Chats, $scope, $window)
{
    Chats.getRanking().success(function(data) 
  {
    var total = 0
    var my_wattage = 0
    for(i = 0; i < data.length ; i++)
    {
      total += data[i].accumulated_kwh;

      if(data[i].kitchen.kitchen_name)
      {
        my_wattage = data[i].accumulated_kwh;
      }
    }

    var average = total / data.length;
    $scope.relative_impact = average > my_wattage;
    
  });
})
.controller('RankingCtrl', function(Chats, $scope, $window)
{ /*
  $scope.labels = ['Max A','Christian D','Hans G', 'Søren D', 'Maria F','Jesper P', 'Carsten M', 'Ulla S', 'Thea K'];
  $scope.data = [
    [400,300,200,120,100,80,70,60,56]
  ]; */
  Chats.getRanking().success(function(data) 
  {
    $scope.data = [[]];
    $scope.labels = [];
    for(i = 0 ; i < data.length ; i++)
    {
      $scope.data[0].push(data[i].accumulated_kwh);
      $scope.labels.push(data[i].kitchen.kitchen_name);
    }
  });
})
.controller('UsageTypeCtrl', function(EnergyWeeklyService, $scope, $window)
{
  EnergyWeeklyService.daily_consumption().success(function(data) 
  {
	$scope.data = [0,0]
	
    for(i = 0; i < data[0].owner.length ; i++)
    {
      if(data[0].owner[i].type.type === 'thermostat')
      {
        $scope.data[0] += data[0].owner[i].accumulated_kwh;
      } else {
        $scope.data[1] += data[0].owner[i].accumulated_kwh;
      }
    }
    $scope.labels = ["Heat", "Electricity"];
  });

})
.controller('AccountCtrl', function($scope, $window) {
  
  $scope.username = $window.sessionStorage.getItem('username');
  $scope.first_name = $window.sessionStorage.getItem('first_name');
  $scope.last_name = $window.sessionStorage.getItem('last_name');
  $scope.room_number = $window.sessionStorage.getItem('room_number');
  $scope.kitchen_name = $window.sessionStorage.getItem('kitchen_name');
  
});