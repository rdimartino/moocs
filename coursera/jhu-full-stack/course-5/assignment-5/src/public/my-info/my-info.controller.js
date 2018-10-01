(function() {
  "use strict";

  angular.module("public").controller("MyInfoController", MyInfoController);

  MyInfoController.$inject = ["ApiPath", "myInfo", "myFavorite"];
  function MyInfoController(ApiPath, myInfo, myFavorite) {
    var $ctrl = this;
    $ctrl.basePath = ApiPath;
    $ctrl.myInfo = myInfo;
    $ctrl.signedUp = !!$ctrl.myInfo.first_name;
    $ctrl.myFavorite = myFavorite;
    $ctrl.validFavorite = !!$ctrl.myFavorite.name;
  }
})();
