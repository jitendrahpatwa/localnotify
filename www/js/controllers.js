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

.controller('PlaylistsCtrl', function($scope,$cordovaContacts,$cordovaSocialSharing,$cordovaLocalNotification, $ionicPlatform,$timeout,$ionicPlatform) {
   /*var deviceInfo = cordova.require("cordova/plugin/DeviceInformation");
    deviceInfo.get(function(result) {
      //fetch the device data
        alert("result deviceInfo = " + JSON.stringify(result));
    }, function() {
        alert("error deviceInfo");
    });*/ 
   var callcontact = function(){
    alert("in callcontact");
    /*var opts = {                                           //search options
      //filter : searchTerm,                                 // 'Bob'
      multiple: true,                                      // Yes, return any contact that matches criteria
      fields:  [ 'displayName', 'name' ]                   // These are the fields to search for 'bob'.
      //desiredFields: [id];    //return fields.
    };

    if ($ionicPlatform.isAndroid()) {
      opts.hasPhoneNumber = true;         //hasPhoneNumber only works for android.
    };

    $cordovaContacts.find(opts).then(function (contactsFound) {
      $scope.contacts = contactsFound;
      alert(JSON.stringify(contactsFound));
    };*/

    /*$cordovaContacts.find().then(function(allContacts) { //omitting parameter to .find() causes all contacts to be returned
      $scope.contacts = allContacts;
      alert(JSON.stringify($scope.contacts));
    };*/
  };

  /*document.addEventListener("deviceready", onDeviceReady, true);
  onDeviceReady();
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
  }*/
  
  /////diagnostics
  /*Working*/
  var checkAuthorization = function(){
    cordova.plugins.diagnostic.isLocationAuthorized(function(authorized){
        alert("Location is " + (authorized ? "authorized" : "unauthorized"));
        if(authorized){
            checkDeviceSetting();
        }else{
            cordova.plugins.diagnostic.requestLocationAuthorization(function(status){
                switch(status){
                    case cordova.plugins.diagnostic.permissionStatus.GRANTED:
                        alert("Permission granted");
                        checkDeviceSetting();
                        break;
                    case cordova.plugins.diagnostic.permissionStatus.DENIED:
                        alert("Permission denied");
                        // User denied permission
                        break;
                    case cordova.plugins.diagnostic.permissionStatus.DENIED_ALWAYS:
                        alert("Permission permanently denied");
                        // User denied permission permanently
                        break;
                }
            }, function(error){
                alert("switch case checkAuthorization "+error);
            });
        }
    }, function(error){
        alert("The following checkAuthorization error occurred: "+error);
    });
}

var checkDeviceSetting = function(){
    cordova.plugins.diagnostic.isGpsLocationEnabled(function(enabled){
        alert("GPS location setting is " + (enabled ? "enabled" : "disabled"));
        if(!enabled){
            cordova.plugins.locationAccuracy.request(function (success){
                alert("Successfully requested high accuracy location mode: "+success.message);
                cordova.plugins.diagnostic.requestContactsAuthorization(function(status){
                  if(status === cordova.plugins.diagnostic.permissionStatus.GRANTED){
                    alert("Contacts use is authorized");
                    callcontact();
                  }else{
                    alert("contact is not authorized");
                  }
                }, function(error){
                    alert(error);
                });
            }, function onRequestFailure(error){
                alert("Accuracy request failed: error code="+error.code+"; error message="+error.message);
                if(error.code !== cordova.plugins.locationAccuracy.ERROR_USER_DISAGREED){
                    if(confirm("Failed to automatically set Location Mode to 'High Accuracy'. Would you like to switch to the Location Settings page and do this manually?")){
                        cordova.plugins.diagnostic.switchToLocationSettings();
                    }
                }
            }, cordova.plugins.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY);
        }
    }, function(error){
        alert("The following error occurred: "+error);
    });
}

  $timeout(function(){
    //alert("im in timeout");
    cordova.plugins.diagnostic.isLocationAvailable(function(available){
        alert("first Location is " + (available ? "available" : "not available"));
        if(!available){
          checkAuthorization();
          localStorage.LocationAvailable = "No";
          alert("second "+localStorage.LocationAvailable);
        }else{
          localStorage.LocationAvailable = "Yes";
          alert("second "+localStorage.LocationAvailable);
        }
    }, function(error){
        localStorage.LocationAvailable = "No";
        alert("The following error occurred: "+error+" "+localStorage.LocationAvailable);
    });
  },5000);

  //cordova.plugins.diagnostic.isContactsAuthorized(successCallback, errorCallback);
  /*cordova.plugins.diagnostic.isContactsAuthorized(function(authorized){
      alert("App is " + (authorized ? "authorized" : "denied") + " access to contacts");
      cordova.plugins.diagnostic.requestContactsAuthorization(function(status){
        if(status === cordova.plugins.diagnostic.permissionStatus.GRANTED){
          alert("Contacts use is authorized");
        }else{
          alert("contact is not authorized");
        }
      }, function(error){
          alert(error);
      });
  }, function(error){
      alert("The following error occurred: "+error);
  });*/
/*Working*/
  /////

  


  //whatsapp
  $scope.nos = {
    'tel':''
  };
  $scope.sendtow = function(){
    var n = $scope.nos.tel;
    alert(n);
    var msg = "hi "+n;
    $cordovaSocialSharing
    .shareViaWhatsAppToReceiver(n,msg, null, "mydomain.com")
    //.shareViaWhatsApp(n,msg,null,"mydomain.com")
    .then(function(result) {
      alert("android>"+result);
    }, function(err) {
      alert("errandroid>"+err);
      // An error occurred. Show a message to the user
    });
  }
  $scope.sendtow2 = function(){
    var n = $scope.nos.tel;
    alert(n);
    cordova.plugins.Whatsapp.send(n);
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
