(function () {
    'use strict';

    angular
        .module('app')
        .controller('AuditCtrl', AuditCtrl);

    AuditCtrl.$inject = ['$scope', '$rootScope', '$state', 'AuditService', '$ionicLoading'];

    function AuditCtrl($scope, $rootScope, $state, AuditService, $ionicLoading) {
        var vm = this;

        angular.extend(vm, {
            init: init,
            showSearch: showSearch,
            doRefresh: doRefresh,
            queryClear: queryClear,
            queryChanged: queryChanged,
            auditDetails: auditDetails,
			_errorHandler: errorHandler
        });

        init();

        function init() {
            $ionicLoading.show({
                template: '<ion-spinner></ion-spinner>'
            });

            vm.audits = [];
            vm.auditFilter = [];
            vm.clear = false;
            vm.searchShowed = false;

            AuditService.getAudit()
                .then(function (result) {
                    vm.audits = result.data;
                    $ionicLoading.hide();
                });
        }

        function showSearch() {
            vm.searchShowed = vm.searchShowed ? false : true;
        }

        function doRefresh() {
            vm.audits = [];
            vm.clear = false;
            AuditService.getAudit()
                .then(function (result) {
                    vm.audits = result.data;
                    $scope.$broadcast('scroll.refreshComplete');
                });
        }

        function queryChanged() {
            if (vm.query != '') {
                vm.clear = true;
            }
        }

        function queryClear() {
            vm.query = '';
            vm.clear = false;
        }

        function auditDetails(item) {
            $state.go('root.audit-details', {item: item});
        }

        function errorHandler() {
            $rootScope.raisedError = true;
            $ionicLoading.hide();
        }

    }
})();