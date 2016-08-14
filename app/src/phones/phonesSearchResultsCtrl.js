(function () {
    'use strict';

    angular
        .module('app')
        .controller('PhonesSearchResultsCtrl', PhonesSearchResultsCtrl);

    PhonesSearchResultsCtrl.$inject = ['$scope', '$rootScope', '$state', 'items',
        '$ionicLoading', '$ionicPopup', '$ionicListDelegate'];

    function PhonesSearchResultsCtrl($scope, $rootScope, $state, items, $ionicLoading, $ionicPopup, $ionicListDelegate) {
        var vm = this;

        angular.extend(vm, {
            init: init,
            queryChanged: queryChanged,
            queryClear: queryClear,
            phoneDetails: phoneDetails,
            phonesSearch: phonesSearch
        });

        init();

        function init() {
            vm.phones = items;
            vm.phonesFilter = items;
            vm.clear = false;
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

        function phoneDetails(item) {
            $state.go('root.phone-details', {item: item});
        }


        function phonesSearch() {
            $state.go('root.phones-search');
        }
    }
})();