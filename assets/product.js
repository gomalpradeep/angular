angular.module('product', ['ngRoute', 'firebase'])
 
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
 
.service('Products', function($q, $firebase, fbRef, fbAuth, projectListValue) {
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
  var resolveProducts = {
    projects: function (Products) {
      return Products.fetch();
    }
  };
 
  $routeProvider
      .when('/', {
      controller:'ProductListValue as productList',
       templateUrl:'../assets/list.php',
      resolve: resolveProducts
    })
    .when('/edit/:projectId', {
      controller:'EditProductController as editProduct',
      templateUrl:'../assets/detail.php',
      resolve: resolveProducts
    })
    .when('/new', {
      controller:'NewProductController as editProduct',
      templateUrl:'../assets/detail.php',
      resolve: resolveProducts
    })
    .otherwise({
      redirectTo:'/'
    });
})
 
.controller('ProductListController', function(products) {
  var productList = this;
  projectList.products = products;
})
 
.controller('NewProductController', function($http,$location,$scope,$routeParams, products) {
  var editProduct = this;
  $scope.status = [
        {model : "Active", value : "1"},
        {model : "inactive", value : "0"},

    ];

  editProduct.save = function() {
    $http.post('http://localhost/gomal/php/CodeIgniter/site/insertcategory', editProduct.products).
    then(function() {
   
      projects.$add(editProduct.project).then(function(data) {
          $location.path('/');
      });
    });
  };
})
 
.controller('EditProductController',
  function($http, $location,$scope, $routeParams, projects) {
    var editProduct = this;
    var projectId = $routeParams.projectId,
        projectIndex;
 $scope.status = [
        {model : "Active", value : "1"},
        {model : "inactive", value : "0"},

    ];

    editProduct.projects = projects;
    projectIndex = editProduct.projects.$indexFor(projectId);
    editProduct.project = editProduct.projects[projectIndex];
 
    editProduct.destroy = function() {
        editProduct.projects.$remove(editProduct.project).then(function(data) {
            $location.path('/');
        });
    };
 
    editProduct.save = function() {
      console.log(editProduct.project);
      $http.post('http://localhost/gomal/php/CodeIgniter/site/updatecategory', editProduct.project).then(function() {
     // log success
      editProduct.projects.$save(editProduct.project).then(function(data) {
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