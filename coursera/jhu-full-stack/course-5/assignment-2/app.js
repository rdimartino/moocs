(function() {
  "use strict";

  console.log("1");
  angular
    .module("ShoppingListCheckOff", [])
    .controller("ToBuyController", ToBuyController)
    .controller("AlreadyBoughtController", AlreadyBoughtController)
    .service("ShoppingListCheckOffService", ShoppingListCheckOffService);
  console.log("2");
  ToBuyController.$inject = ["ShoppingListCheckOffService"];
  function ToBuyController(ShoppingListCheckOffService) {
    var toBuyCtrl = this;

    toBuyCtrl.items = ShoppingListCheckOffService.getToBuyItems();

    toBuyCtrl.buyItem = function(itemIndex) {
      ShoppingListCheckOffService.buyItem(itemIndex);
    };

    console.log("ho");
  }
  console.log("3");
  AlreadyBoughtController.$inject = ["ShoppingListCheckOffService"];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var alreadyBoughtCtrl = this;

    alreadyBoughtCtrl.items = ShoppingListCheckOffService.getBoughtItems();

    console.log("hi");
  }
  console.log("4");
  function ShoppingListCheckOffService() {
    var service = this;

    var buyItems = ["10 cookies", "10 cookies"],
      boughtItems = ["10 cookies"];

    service.buyItem = function(itemIndex) {
      var item = buyItems.splice(itemIndex, 1).pop();
      boughtItems.push(item);
    };

    service.getToBuyItems = function() {
      return buyItems;
    };

    service.getBoughtItems = function() {
      return boughtItems;
    };
  }
  console.log("5");
})();
