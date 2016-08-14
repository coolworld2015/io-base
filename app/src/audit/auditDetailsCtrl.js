(function () {
    'use strict';

    angular
        .module('app')
        .controller('AuditDetailsCtrl', AuditDetailsCtrl);

    AuditDetailsCtrl.$inject = ['$stateParams', '$filter'];

    function AuditDetailsCtrl($stateParams, $filter) {
        var vm = this;

        angular.extend(vm, {
            init: init
        });

        angular.extend(vm, $stateParams.item);

        init();

        function init() {
			vm.ip = $filter('ipfilter')(vm.ip);
        }
    }

})();
