<form name="myForm">
  <div class="control-group" ng-class="{error: myForm.name.$invalid && !myForm.name.$pristine}">
    <label>Category Name</label>
    <input type="text" name="name" ng-model="editProject.project.name" required>
    <span ng-show="myForm.name.$error.required && !myForm.name.$pristine" class="help-inline">
        Required {{myForm.name.$pristine}}</span>
  </div>

   <div class="control-group" ng-class="{error: myForm.status.$invalid && !myForm.status.$pristine}">
    <label>Category Status</label>

<select name="status" ng-model="editProject.project.status" required>
<option ng-repeat="x in status" value="{{x.value}}">{{x.model}}</option>
</select>

    <span ng-show="myForm.status.$error.required && !myForm.status.$pristine" class="help-inline">
        Required {{myForm.status.$pristine}}</span>
  </div>
 
 
  <a href="#/" class="btn">Cancel</a>
  <button ng-click="editProject.save()" ng-disabled="myForm.$invalid"
          class="btn btn-primary">Save</button>
  <button ng-click="editProject.destroy()"
          ng-show="editProject.project.$id" class="btn btn-danger">Delete</button>
</form>