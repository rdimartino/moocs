(function() {
  "use strict";

  angular.module("common").service("UserInfoService", UserInfoService);

  UserInfoService.$inject = [];
  function UserInfoService() {
    var service = this;

    service.userInfo = {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      favorite_dish: ""
    };

    service.getInfo = function() {
      return service.userInfo;
    };

    service.setInfo = function(info) {
      service.userInfo = info;
    };
  }
})();
