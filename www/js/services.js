angular.module('starter.services', [])

.factory('Chats', function($q, $http, $window) {
  // Might use a resource here that returns a JSON array

  ranking = function() 
  {

    var deferred = $q.defer();
    var promise = deferred.promise;
	//https://limitless-garden-4668.herokuapp.com/
    $http({
          method: 'GET',
          url: 'http://wiser.omk.dk:8002/ranking/',
          headers: {'Content-Type':'application/json',
                    'Authorization': 'JWT ' + $window.sessionStorage.getItem('token')}
      })
      .success(function(data, status, headers, config) 
      {
          deferred.resolve(data.results);
      })
      .error(function(data, status, headers, config) 
      {
        deferred.reject('Server did not respond.');
      });

      promise.success = function(fn) {
          promise.then(fn);
          return promise;
      };
      promise.error = function(fn) {
          promise.then(null, fn);
          return promise;
      };
      return promise;
  };
  
  return {
    getRanking: ranking
  };
})
.factory('EnergyWeeklyService', function($q, $http, $window) {
  // Might use a resource here that returns a JSON array

  daily_consumption = function() 
  {

    var deferred = $q.defer();
    var promise = deferred.promise;

    var room_number = $window.sessionStorage.getItem('room_number');

    $http({
          method: 'GET',
          url: 'http://wiser.omk.dk:8002/daily_consumption/?room_number='+room_number,
          headers: {'Content-Type':'application/json',
                    'Authorization': 'JWT ' + $window.sessionStorage.getItem('token')}
      })
      .success(function(data, status, headers, config) 
      {
          deferred.resolve(data.results);
      })
      .error(function(data, status, headers, config) 
      {
        deferred.reject('Server did not respond.');
      });

      promise.success = function(fn) {
          promise.then(fn);
          return promise;
      };
      promise.error = function(fn) {
          promise.then(null, fn);
          return promise;
      };
      return promise;
  };
  
  return {
    daily_consumption: daily_consumption
  };
})
.service('LoginService', function($q, $http, $window) {
    return {
        loginUser: function(name, pw) {
            var deferred = $q.defer();
            var promise = deferred.promise;

              $http({
                  method: 'POST',
                  url: 'http://wiser.omk.dk:8002/api-token-auth/',
                  data: {username: name, password: pw},
                  headers: {'Content-Type':'application/json'}
                })
                .success(function(data, status, headers, config) {

                  if(data.token != undefined)
                  {
                    deferred.resolve('Welcome ' + name + '!');
                    $window.sessionStorage.setItem('token', data.token);
                    // this callback will be called asynchronously
                    // when the response is available

                    $http({
                    method: 'GET',
                    url: 'http://wiser.omk.dk:8002/person/?username='+name,
                    headers: {'Content-Type':'application/json',
                    'Authorization': 'JWT ' + $window.sessionStorage.getItem('token')}
                    })
                    .success(function(data, status, headers, config) {
                      userObj = data.results;
                      $window.sessionStorage.setItem('username', userObj[0].username);
                      $window.sessionStorage.setItem('first_name', userObj[0].person.first_name);
                      $window.sessionStorage.setItem('last_name', userObj[0].person.last_name)
                      $window.sessionStorage.setItem('room_number', userObj[0].person.room_number);
                      $window.sessionStorage.setItem('kitchen_name', userObj[0].person.kitchen.kitchen_name);
                    });

                  } else {
                    deferred.reject('Wrong credentials.');
                  }
                  })
                .error(function(data, status, headers, config) {
                  deferred.reject('Server did not respond.');
                  // called asynchronously if an error occurs
                  // or server returns response with an error status.
                });

            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        }
    }
});
