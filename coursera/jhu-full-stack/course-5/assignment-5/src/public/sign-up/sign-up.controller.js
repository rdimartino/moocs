(function() {
  "use strict";

  angular.module("public").controller("SignUpController", SignUpController);

  SignUpController.$inject = ["UserInfoService", "MenuService", "$scope"];
  function SignUpController(UserInfoService, MenuService, $scope) {
    var $ctrl = this;
    $ctrl.userInfo = UserInfoService.getInfo();
    $ctrl.info_saved = false;
    $ctrl.invalid_favorites = new Set();
    $scope.isInvalidFavorite = false;

    $ctrl.submit = function() {
      MenuService.getMenuItems().then(function(result) {
        var invalidFavorite = false;
        try {
          invalidFavorite =
            result.menu_items
              .map(item => item.short_name)
              .indexOf($ctrl.userInfo.favorite_dish) === -1;
        } catch (err) {
          console.error(err);
          invalidFavorite = true;
        }
        if (invalidFavorite) {
          $ctrl.invalid_favorites.add($ctrl.userInfo.favorite_dish);
        }
        if ($ctrl.checkInvalidFavorite()) {
          $ctrl.info_saved = false;
        } else {
          UserInfoService.setInfo($ctrl.userInfo);
          $ctrl.info_saved = true;
        }
      });
    };

    $ctrl.checkInvalidFavorite = function() {
      var invalid = $ctrl.invalid_favorites.has($ctrl.userInfo.favorite_dish);
      $scope.isInvalidFavorite = invalid;
      return invalid;
    };
  }
})();
