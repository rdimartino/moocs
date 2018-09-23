(function() {
  "use strict";

  angular
    .module("MenuApp")
    .controller("MainItemsController", MainItemsController);

  MainItemsController.$inject = ["MenuDataService", "itemsResult"];
  function MainItemsController(MenuDataService, itemsResult) {
    var itemsCtrl = this;
    console.log(itemsResult);
    itemsCtrl.itemsResult = itemsResult;
  }
})();
