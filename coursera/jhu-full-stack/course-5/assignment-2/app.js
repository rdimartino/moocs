(function() {
  "use strict";

  angular
    .module("ShoppingListCheckOff", [])
    .controller("ToBuyController", ToBuyController)
    .controller("AlreadyBoughtController", AlreadyBoughtController)
    .service("ShoppingListCheckOffService", ShoppingListCheckOffService);

  ToBuyController.$inject = ["ShoppingListCheckOffService"];
  function ToBuyController(ShoppingListCheckOffService) {
    var toBuyCtrl = this;

    toBuyCtrl.items = ShoppingListCheckOffService.getToBuyItems();

    toBuyCtrl.buyItem = function(itemIndex) {
      ShoppingListCheckOffService.buyItem(itemIndex);
    };
  }

  AlreadyBoughtController.$inject = ["ShoppingListCheckOffService"];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var alreadyBoughtCtrl = this;

    alreadyBoughtCtrl.items = ShoppingListCheckOffService.getBoughtItems();
  }

  function ShoppingListCheckOffService() {
    var service = this;

    var buyItems = [
        { name: "cookies", quantity: 10 },
        { name: "crackers", quantity: 9 },
        { name: "apples", quantity: 8 },
        { name: "pumpkins", quantity: 7 },
        { name: "pineapples", quantity: 6 }
      ],
      boughtItems = [];

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
})();
