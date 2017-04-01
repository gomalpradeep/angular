<input type="text" ng-model="projectList.search" class="search-query" id="projects_search"
       placeholder="Search">
<table>
  <thead>
  <tr>
    <th>Category Name</th>
    <th>Status</th>
    <th>Created Date</th>
    <th><a href="#!/new">add<i class="icon-plus-sign"></i></a></th>
  </tr>
  </thead>
  <tbody>
  <tr ng-repeat="project in projectList.projects | filter:projectList.search | orderBy:'name'">
    <td>{{project.name}}</td>
    <td>{{project.status}}</td>
    <td>{{project.create_date}}</td>
    <td>
      <a ng-href="#!/edit/{{project.$id}}">edit<i class="icon-pencil"></i></a>
    </td>
  </tr>
  </tbody>
</table>