(function() {
  "use strict";

  angular.module("public").controller("SignUpController", SignUpController);

  SignUpController.$inject = ["UserInfoService", "MenuService"];
  function SignUpController(UserInfoService, MenuService) {
    var $ctrl = this;
    $ctrl.userInfo = UserInfoService.getInfo();
    $ctrl.info_saved = false;
    $ctrl.invalid_favorite = false;

    $ctrl.submit = function() {
      UserInfoService.setInfo($ctrl.userInfo);
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
        $ctrl.invalid_favorite = invalidFavorite;
        $ctrl.info_saved = true;
      });
    };
  }
})();
