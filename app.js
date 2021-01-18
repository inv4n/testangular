var app = angular.module('app', ['ngTouch', 'ui.grid', 'ui.grid.expandable', 'ui.grid.selection', 'ui.grid.pinning']);

app.controller('MainCtrl', function MainCtrl($http, $log) {
  var vm = this;

  vm.gridOptions = {
    expandableRowTemplate: '<div ui-grid="row.entity.subGridOptions" style="height:150px;"></div>',
    expandableRowHeight: 150,
    //subGridVariable will be available in subGrid scope
    expandableRowScope: {
      subGridVariable: 'subGridScopeVariable'
    }
  };

  vm.gridOptions.columnDefs = [
    { name: 'id' },
    { name: 'name'},
    { name: 'age'},
    { name: 'address.city'}
  ];

  $http.get('https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/500_complex.json')
    .then(function(response) {
      var data = response.data;

      for(i = 0; i < data.length; i++){
        data[i].subGridOptions = {
          columnDefs: [{name: 'Id', field: 'id'}, {name: 'Name', field: 'name'}],
          data: data[i].friends
        };
      }
      vm.gridOptions.data = data;
    });

    vm.gridOptions.onRegisterApi = function(gridApi){
      vm.gridApi = gridApi;
    };

    vm.expandAllRows = function() {
      vm.gridApi.expandable.expandAllRows();
    };

    vm.collapseAllRows = function() {
      vm.gridApi.expandable.collapseAllRows();
    };

    vm.toggleExpandAllBtn = function() {
      vm.gridOptions.showExpandAllButton = !vm.gridOptions.showExpandAllButton;
    };
});
