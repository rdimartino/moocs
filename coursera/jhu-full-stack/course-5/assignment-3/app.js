(function() {
  "use strict";

  angular
    .module("NarrowItDownApp", [])
    .controller("NarrowItDownController", NarrowItDownController)
    .service("MenuSearchService", MenuSearchService)
    .directive("foundItems", FoundItems)
    .constant(
      "ApiBasePath",
      "https://davids-restaurant.herokuapp.com/menu_items.json"
    );

  NarrowItDownController.$inject = ["MenuSearchService"];
  function NarrowItDownController(MenuSearchService) {
    var ctrl = this;

    ctrl.searchTerm = "";
    ctrl.found = null;
    ctrl.loading = false;

    ctrl.getItems = function() {
      ctrl.loading = true;
      MenuSearchService.getMatchedMenuItems(ctrl.searchTerm).then(results => {
        ctrl.found = results;
        ctrl.loading = false;
      });
    };

    ctrl.removeItem = function(index) {
      ctrl.found.splice(index, 1);
    };
  }

  MenuSearchService.$inject = ["$http", "ApiBasePath"];
  function MenuSearchService($http, ApiBasePath) {
    var service = this;

    service.getMatchedMenuItems = function(searchTerm) {
      if (searchTerm === "") return Promise.resolve([]);
      return $http.get(ApiBasePath).then(function(result) {
        var foundItems = [];
        try {
          if (result.status !== 200)
            throw new Error(
              `Bad status code ${result.status} for search term "${searchTerm}"`
            );
          foundItems = result.data.menu_items.filter(
            item => item.description.indexOf(searchTerm) !== -1
          );
        } catch (err) {
          console.error(err);
        }
        return foundItems;
      });
    };
  }

  function FoundItems() {
    var ddo = {
      restrict: "E",
      scope: {
        foundItems: "<",
        onRemove: "&"
      },
      templateUrl: "foundItems.html"
    };
    return ddo;
  }
})();
