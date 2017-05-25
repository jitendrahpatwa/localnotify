// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers','ngCordova'])

.run(function($ionicPlatform,bgserv,$cordovaLocalNotification,$interval,$cordovaAppVersion) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    setTimeout(function(){
        alert("im called");
        cordova.getAppVersion(function (version) {
            alert(version);
        });
        setTimeout(function(){
        $cordovaAppVersion.getVersionNumber().then(function (version) {
          var appVersion = version;
          alert("appVersion:"+appVersion);
        });
        },10000);
      },15000);
    cordova.plugins.backgroundMode.setEnabled(true);
    cordova.plugins.backgroundMode.isActive();
  });
    /*cordova.plugins.backgroundMode.on('enable', function(){
      var i = 1;
      $interval(function(){
        $cordovaLocalNotification.schedule({
            id: 5,
            title: 'Lets see it in bg notification',
            text: 'Youre sooooo sexy!'+(i++),
            data: {
              customProperty: 'custom value'
            }
          }).then(function (result) {
            console.log('Notification 1 triggered');
          });
      },10000);
    });*///worked on pause

    //define alert for notification for bg alert
    /*cordova.plugins.backgroundMode.setDefaults({
        title: "Stuff required to do in background",
        text: "Please be calm its so safe!",
        //icon: 'icon' // this will look for icon.png in platforms/android/res/drawable|mipmap
        color: "#b3b3b3" // hex format like 'F14F4D'
        //resume: Boolean,
        //hidden: Boolean,
        //bigText: Boolean
    });
    

    cordova.plugins.backgroundMode.on('activate', function(){
      cordova.plugins.backgroundMode.disableWebViewOptimizations(); 
      var j= 1;
      $interval(function(){
      $cordovaLocalNotification.schedule({
            id: 6,
            title: 'Lets see it in activate bg notification',
            text: (j++)+'Youre sooooo sexy activate!',
            data: {
              customProperty: 'custom value'
            }
          }).then(function (result) {
            console.log('Notification 1 triggered');
          });
      },6000);
    });
    cordova.plugins.backgroundMode.overrideBackButton();

    cordova.plugins.backgroundMode.un('activate', function(){
      var j= 1;
      $interval(function(){
      $cordovaLocalNotification.schedule({
            id: 7,
            title: 'Lets see it in unactivate bg notification',
            text: (j++)+'Ohhhh! unactivate',
            data: {
              customProperty: 'custom value'
            }
          }).then(function (result) {
            console.log('Notification 1 triggered');
          });
      },8000);
    });

    cordova.plugins.backgroundMode.on('deactivate', function(){
      var j= 1;
      $interval(function(){
      $cordovaLocalNotification.schedule({
            id: 8,
            title: 'Lets see it in deactivate bg notification',
            text: (j++)+'Youre sooooo sexy deactivate!',
            data: {
              customProperty: 'custom value'
            }
          }).then(function (result) {
            console.log('Notification 1 triggered');
          });
      },9000);
    });

    cordova.plugins.backgroundMode.un('deactivate', function(){
      var j= 1;
      $interval(function(){
      $cordovaLocalNotification.schedule({
            id: 8,
            title: 'Lets see it in deactivate bg notification',
            text: (j++)+'undeactivate!',
            data: {
              customProperty: 'custom value'
            }
          }).then(function (result) {
            console.log('Notification 1 triggered');
          });
      },10000);
    });    

  });*/
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/playlists');
})

.factory("bgserv",function(){
  return {
    callbg:function($cordovaLocalNotification){
      console.log("called from bg");
    }
  }
});
