(function () {
    'use strict';

    angular
        .module('app')
        .controller('UsersCtrl', UsersCtrl);

    UsersCtrl.$inject = ['$scope', '$rootScope', '$state', '$stateParams', 'UsersService',
        '$ionicLoading', '$ionicPopup', '$ionicListDelegate'];

    function UsersCtrl($scope, $rootScope, $state, $stateParams, UsersService, $ionicLoading, $ionicPopup, $ionicListDelegate) {
        var vm = this;

        angular.extend(vm, {
            init: init,
            showAdd: showAdd,
            addConfirm: addConfirm,
            showConfirm: showConfirm,
            userDelete: userDelete,
            doRefresh: doRefresh,
            queryClear: queryClear,
            queryChanged: queryChanged,
            userAdd: userAdd,
            userDetails: userDetails
        });

        init();

        function init() {
            $ionicLoading.show({
                template: '<ion-spinner></ion-spinner>'
            });

            vm.users = [];
            vm.usersFilter = [];
            vm.clear = false;
            vm.addShowed = false;
            $rootScope.raisedError = false;

            UsersService.getUsers()
                .then(function (result) {
                    vm.users = result.data;
                    $ionicLoading.hide();
                })
                .catch(errorHandler);
        }

        function showAdd() {
            vm.addShowed = vm.addShowed ? false : true;
        }

        function addConfirm(user) {
            var confirmPopup = $ionicPopup.confirm({
                title: 'Add user',
                template: 'Are you sure you want to add new users?'
            });

            confirmPopup.then(function (res) {
                if (res) {
                    console.log('You are sure');
                } else {
                    console.log('You are not sure');
                }
            });
        }

        function showConfirm(user) {
            var confirmPopup = $ionicPopup.confirm({
                title: 'Delete user',
                template: 'Are you sure you want to delete ' + user.name + '?'
            });

            confirmPopup.then(function (res) {
                if (res) {
                    userDelete(user.id);
                } else {
                    $ionicListDelegate.closeOptionButtons();
                    console.log('You are not sure');
                }
            });
        }

        function userDelete(id) {
            $ionicLoading.show({
                template: '<ion-spinner></ion-spinner>'
            });
            UsersService.deleteItem(id)
                .then(function () {
                    init();
                })
                .catch(errorHandler);

            $ionicLoading.hide();
        }

        function doRefresh() {
            vm.user = [];
            vm.clear = false;
            UsersService.getUsers()
                .then(function (result) {
                    vm.users = result.data;
                    $scope.$broadcast('scroll.refreshComplete');
                })
                .catch(errorHandler);
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

        function userAdd() {
            $state.go('root.user-add');
        }

        function userDetails(item) {
            $state.go('root.user-details', {item: item});
        }

        function errorHandler() {
            $rootScope.raisedError = true;
            $ionicLoading.hide();
        }
    }
})();