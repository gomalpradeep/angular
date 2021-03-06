<?php
defined('BASEPATH') OR exit('No direct script access allowed');
?><!DOCTYPE html>

<html ng-app="project">
<head>
	<meta charset="utf-8">
	<title>Welcome to CodeIgniter</title>

	<style type="text/css">

	::selection { background-color: #E13300; color: white; }
	::-moz-selection { background-color: #E13300; color: white; }

	body {
		background-color: #fff;
		margin: 40px;
		font: 13px/20px normal Helvetica, Arial, sans-serif;
		color: #4F5155;
	}

	a {
		color: #003399;
		background-color: transparent;
		font-weight: normal;
	}

	h1 {
		color: #444;
		background-color: transparent;
		border-bottom: 1px solid #D0D0D0;
		font-size: 19px;
		font-weight: normal;
		margin: 0 0 14px 0;
		padding: 14px 15px 10px 15px;
	}

	code {
		font-family: Consolas, Monaco, Courier New, Courier, monospace;
		font-size: 12px;
		background-color: #f9f9f9;
		border: 1px solid #D0D0D0;
		color: #002166;
		display: block;
		margin: 14px 0 14px 0;
		padding: 12px 10px 12px 10px;
	}

	#body {
		margin: 0 15px 0 15px;
	}

	p.footer {
		text-align: right;
		font-size: 11px;
		border-top: 1px solid #D0D0D0;
		line-height: 32px;
		padding: 0 10px 0 10px;
		margin: 20px 0 0 0;
	}

	#container {
		margin: 10px;
		border: 1px solid #D0D0D0;
		box-shadow: 0 0 8px #D0D0D0;
	}
	</style>


<?php $this->load->view('front/header'); ?> 
<script src="<?php echo base_url();?>assets/project.js"></script>
    <script>
    angular.module('project').value('projectListValue', <?php echo $result; ?>);
    </script>
</head>

<body  >

<div class="container">
	<div class="page-header">
  <h1>View Category</h1>
</div>
  
	
  <div ng-view></div>
</div>

</body>

<script>
    // Defining angularjs application.
    var postApp = angular.module('postApp', []);
    // Controller function and passing $http service and $scope var.
    postApp.controller('postController', function($scope, $http) {
      // create a blank object to handle form data.
        $scope.user = {};
      // calling our submit function.

     
        // Posting data to php file

  $("#userForm").validate({
    rules: {
            category_name: {
                required: true,

            },
            status:{
            	required:true
            }
           
    },
    messages: {
             name: {
                required: "Name required",
            },
            status:{
            	required: "Status required",
            }
    },
     submitHandler: function(form) {
    // some other code
    // maybe disabling submit button
    // then:
     $scope.submitForm = function() {  console.log($scope.user);
    
   //  if($scope.user.name!="" )

        $http({
          method  : 'POST',
          url     :'<?php echo base_url(); ?>site/insertcategory',
          data    : $scope.user, //forms user object
          headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
         })
         .then(function (success){
            console.log(success);
            if(success.data=='success'){
            $scope.message= "Category Inserted Successfully";
            }else{
              $scope.message= "Error occur, Please try again";
            }

   });   };  }

  });

   
     
    });
</script>
<?php $this->load->view('front/js_scripts');?>
</html>