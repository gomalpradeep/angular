<input type="text" ng-model="productList.search" class="search-query" id="projects_search"
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
  <tr ng-repeat="product in productList.projects | filter:productList.search | orderBy:'name'">
    <td>{{product.name}}</td>
    <td>{{product.status}}</td>
    <td>{{product.create_date}}</td>
    <td>
      <a ng-href="#!/edit/{{product.$id}}">edit<i class="icon-pencil"></i></a>
    </td>
  </tr>
  </tbody>
</table>