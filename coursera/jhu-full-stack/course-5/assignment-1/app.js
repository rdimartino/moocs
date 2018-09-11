(function() {
  "use strict";

  angular
    .module("LunchCheck", [])
    .controller("LunchCheckController", LCController);

  LCController.$inject = ["$scope"];
  function LCController($scope) {
    $scope.lunchList = "";
    $scope.message = "";

    $scope.checkLunch = function() {
      var lunchItems = getLunchItemCount($scope.lunchList);
      if (lunchItems === 0) {
        $scope.message = "Please enter data first";
      } else if (lunchItems < 4) {
        $scope.message = "Enjoy!";
      } else {
        $scope.message = "Too much!";
      }
    };

    function getLunchItemCount(list) {
      return list
        .split(",")
        .map(item => item.trim()) // remove extra whitespace from items
        .filter(Boolean).length; // remove blank items
    }
  }
})();
