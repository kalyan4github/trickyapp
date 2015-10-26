angular.module('ionicApp',['ionic','ionicApp.Main','ionicApp.Page2'])
  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      if(window.cordova && window.cordova.plugins.keyboard){
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if(window.StatusBar){
        StatusBar.styleDefault();
      }
      Parse.initialize("IOlZtwy5IPBX6ZO0FpABGOUWk211PedNrAm394Yx", "KZVma1qn6BVfIk8XcwfgzQ4jswSCDwAQhEnKz4av");


    });
  })

  .config(function ($stateProvider,$urlRouterProvider) {
    $stateProvider
      .state('login',{
        url:'/login',
        templateUrl:'templates/login.html',
        controller:'LoginCtrl'
      })
      .state('signup',{
        url:'/signup',
        templateUrl:'templates/signup.html',
        controller:'LoginCtrl'
      });
    $urlRouterProvider.otherwise('/main');
  })
  .controller('LoginCtrl', function ($scope,$state) {
    $scope.data={};
    $scope.signupEmail= function () {
      var user = new Parse.User();
      user.set("username",$scope.data.username);
      user.set("password",$scope.data.password);
      user.set("email",$scope.data.email);
      user.set("something","some string");
      user.signUp(null,{
        success: function(user){
          alert("success");
        },
        error: function (user, error) {
          alert("Error: "+ error.code+" "+error.message);
        }
      });
    };
    $scope.loginEmail= function () {
      Parse.User.logIn($scope.data.username,$scope.data.password,{
        success: function (user) {
          console.log(user);
          alert("success");
        },
        error: function (user,error) {
          alert("error "+ error.message);
        }
      });
    };
  });
/**************************************************
 +	Module:		ionicApp.Main
 +	Exports:
 +		MainCtrl
 **************************************************/
angular.module('ionicApp.Main',['ionic'])

  .config(function ($stateProvider,$urlRouterProvider) {
    $stateProvider
      .state('main',{
        url:'/main',
        templateUrl:'templates/main.html',
        controller:'MainCtrl'
      });
  })

  .controller("MainCtrl",function(){
    console.log("Main Controller says: Hello World");
  });

/**************************************************
 +	Module:		ionicApp.Page2
 +	Exports:
 +		userService
 +		Page2Ctrl
 **************************************************/

angular.module('ionicApp.Page2',['ionic'])

  .config(function ($stateProvider,$urlRouterProvider) {
    $stateProvider
      .state('page2',{
        url:'/page2',
        templateUrl:'templates/page2.html',
        controller:'Page2Ctrl'
      });
  })

  .factory('userService', function ($http) {
    return {
      getUsers: function () {
        return $http.get('https://randomuser.me/api/?results=10').then(function (response) {
          return response.data.results;
        });
      }
    }
  })

  .controller("Page2Ctrl", function ($scope,userService) {
    userService.getUsers().then(function (users) {
      $scope.users=users;
    });
  });

