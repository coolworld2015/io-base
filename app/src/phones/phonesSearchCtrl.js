(function () {
    'use strict';

    angular
        .module('app')
        .controller('PhonesSearchCtrl', PhonesSearchCtrl);

    PhonesSearchCtrl.$inject = ['$state', '$ionicLoading'];

    function PhonesSearchCtrl($state, $ionicLoading) {
        var vm = this;

        angular.extend(vm, {
            init: init,
            change: change,
            toggleChanged: toggleChanged,
            doSearch: doSearch
        });

        init();

        function init() {
            vm.finds = true;
            vm.search = 'phone';
        }

        function change() {
            vm.error = false;
            vm.minLengthError = false;
        }

        function toggleChanged() {
            if (vm.finds) {
                vm.search = 'phone';
            } else {
                vm.search = 'name';
            }
        }

        function doSearch() {
            if (vm.form.$invalid) {
                return;
            }

            if (vm.name.length < 3) {
                vm.minLengthError = true;
                return;
            }

            $ionicLoading.show({
                template: '<ion-spinner></ion-spinner>'
            });
            $state.go('root.phones-search-results', {name: vm.name, search: vm.search, finds: true});
        }
    }
})();