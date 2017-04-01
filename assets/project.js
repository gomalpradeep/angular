angular.module('project', ['ngRoute', 'firebase'])
 
.value('fbURL', 'https://ng-projects-list.firebaseio.com/')
.service('fbRef', function(fbURL) {
  return new Firebase(fbURL)
})
.service('fbAuth', function($q, $firebase, $firebaseAuth, fbRef) {
  var auth;
  return function () {
      if (auth) return $q.when(auth);
      var authObj = $firebaseAuth(fbRef);
      if (authObj.$getAuth()) {
        return $q.when(auth = authObj.$getAuth());
      }
      var deferred = $q.defer();
      authObj.$authAnonymously().then(function(authData) {
          auth = authData;
          deferred.resolve(authData);
      });
      return deferred.promise;
  }
})
 
.service('Projects', function($q, $firebase, fbRef, fbAuth, projectListValue) {
  var self = this;
  this.fetch = function () {
    if (this.projects) return $q.when(this.projects);
    return fbAuth().then(function(auth) {
      var deferred = $q.defer();
      var ref = fbRef.child('projects-fresh/' + auth.auth.uid);
      var $projects = $firebase(ref);
      ref.on('value', function(snapshot) {
        if (snapshot.val() === null) {
          $projects.$set(projectListValue);
        }
        self.projects = $projects.$asArray();
        deferred.resolve(self.projects);
      });
 
      //Remove projects list when no longer needed.
      ref.onDisconnect().remove();
      return deferred.promise;
    });
  };
})
 
.config(function($routeProvider) {
  var resolveProjects = {
    projects: function (Projects) {
      return Projects.fetch();
    }
  };
 
  $routeProvider
      .when('/', {
      controller:'ProjectListController as projectList',
       templateUrl:'../assets/list.php',
      resolve: resolveProjects
    })
    .when('/edit/:projectId', {
      controller:'EditProjectController as editProject',
      templateUrl:'../assets/detail.php',
      resolve: resolveProjects
    })
    .when('/new', {
      controller:'NewProjectController as editProject',
      templateUrl:'../assets/detail.php',
      resolve: resolveProjects
    })
    .otherwise({
      redirectTo:'/'
    });
})
 
.controller('ProjectListController', function(projects) {
  var projectList = this;
  projectList.projects = projects;
})
 
.controller('NewProjectController', function($http,$location,$scope,$routeParams, projects) {
  var editProject = this;
  $scope.status = [
        {model : "Active", value : "1"},
        {model : "inactive", value : "0"},

    ];

  editProject.save = function() {
    $http.post('http://localhost/gomal/php/CodeIgniter/site/insertcategory', editProject.project).
    then(function() {
   
      projects.$add(editProject.project).then(function(data) {
          $location.path('/');
      });
    });
  };
})
 
.controller('EditProjectController',
  function($http, $location,$scope, $routeParams, projects) {
    var editProject = this;
    var projectId = $routeParams.projectId,
        projectIndex;
 $scope.status = [
        {model : "Active", value : "1"},
        {model : "inactive", value : "0"},

    ];

    editProject.projects = projects;
    projectIndex = editProject.projects.$indexFor(projectId);
    editProject.project = editProject.projects[projectIndex];
 
    editProject.destroy = function() {
        editProject.projects.$remove(editProject.project).then(function(data) {
            $location.path('/');
        });
    };
 
    editProject.save = function() {
      console.log(editProject.project);
      $http.post('http://localhost/gomal/php/CodeIgniter/site/updatecategory', editProject.project).then(function() {
     // log success
      editProject.projects.$save(editProject.project).then(function(data) {
           $location.path('/');
  });
  });
   


 // $http({
 //          method  : 'POST',
 //          url     :'site/updatecategory',
 //          data    : $editProject.project, //forms user object
 //          headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
 //         })
 //         .then(function (success){
 //            console.log(success);
 //            if(success.data=='success'){
 //                  editProject.projects.$save(editProject.project).then(function(data) {
 //           $location.path('/');
 //        });
 //          //  $scope.message= "Category Updated Successfully";
 //            }else{
 //              $scope.message= "Error occur, Please try again";
 //            }

 //   });
    
    
    };
});