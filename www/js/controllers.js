angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope,$cordovaLocalNotification, $ionicPlatform) {
   var deviceInfo = cordova.require("cordova/plugin/DeviceInformation");
    deviceInfo.get(function(result) {
      //fetch the device data
        alert("result deviceInfo = " + JSON.stringify(result));
    }, function() {
        alert("error deviceInfo");
    }); 


  document.addEventListener("deviceready", onDeviceReady, true);
 
  function onDeviceReady() {
    window.plugins.sim.getSimInfo(successCallback, errorCallback);
  }
   
  function successCallback(result) {
    alert(JSON.stringify(result));
  }
   
  function errorCallback(error) {
    alert(JSON.stringify(error));
  }
   
  // Android only: check permission 
  function hasReadPermission() {
    window.plugins.sim.hasReadPermission(successCallback, errorCallback);
  }
   
  // Android only: request permission 
  function requestReadPermission() {
    window.plugins.sim.requestReadPermission(successCallback, errorCallback);
  }



  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];

  $scope.Notify = function(){
    alert("Notifying...");
  };
  $ionicPlatform.ready(function () {
         
        $scope.scheduleSingleNotification = function () {
          alert("Notifying...");
          $cordovaLocalNotification.schedule({
            id: 1,
            title: 'Lets see it in notification',
            text: 'Youre so sexy!',
            data: {
              customProperty: 'custom value'
            }
          }).then(function (result) {
            console.log('Notification 1 triggered');
          });
        };
         
        $scope.scheduleDelayedNotification = function () {
          var now = new Date().getTime();
          var _10SecondsFromNow = new Date(now + 10 * 1000);
 
          $cordovaLocalNotification.schedule({
            id: 2,
            title: 'Warning',
            text: 'Im so late',
            at: _10SecondsFromNow
          }).then(function (result) {
            console.log('Notification 2 triggered');
          });
        };
 
        $scope.scheduleEveryMinuteNotification = function () {
          $cordovaLocalNotification.schedule({
            id: 3,
            title: 'Warning',
            text: 'Dont fall asleep',
            every: 'minute'
          }).then(function (result) {
            console.log('Notification 3 triggered');
          });
        };      
         
        $scope.updateSingleNotification = function () {
          $cordovaLocalNotification.update({
            id: 2,
            title: 'Warning Update',
            text: 'This is updated text!'
          }).then(function (result) {
            console.log('Notification 1 Updated');
          });
        };  
 
        $scope.cancelSingleNotification = function () {
          $cordovaLocalNotification.cancel(3).then(function (result) {
            console.log('Notification 3 Canceled');
          });
        };      
         
    });
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
