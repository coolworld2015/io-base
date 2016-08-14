(function () {
    'use strict';

    angular
        .module('app')
        .controller('PhoneDetailsCtrl', PhoneDetailsCtrl);

    PhoneDetailsCtrl.$inject = ['$stateParams'];

    function PhoneDetailsCtrl($stateParams) {
        var vm = this;

        angular.extend(vm, {
            init: init
        });

        angular.extend(vm, $stateParams.item);

        init();

        function init() {
        }
    }

})();
