(function () {
    'use strict';

    angular
        .module('app')
        .factory('UsersService', UsersService);
		
	UsersService.$inject = ['$rootScope', '$http', '$q'];
	
    function UsersService($rootScope, $http, $q) {
		var webUrl = $rootScope.myConfig.webUrl;
		
        return {
            users: [],
			getUsers: getUsers,
            findByName: findByName,
            addItem: addItem,
            editItem: editItem,
            deleteItem: deleteItem,
			_sort: sort
        };
		
        function getUsers() {
            var url = webUrl + 'api/users/get';
            return $http.get(url)
                .then(function (result) {
                    result.data.sort(sort);
                    return result;
                });
        }

        function findByName(name) {
            var url = webUrl + 'api/users/findByName/' + name;
            return $http.get(url)
                .then(function (result) {
                    result.data;
                    return result;
                });
        }

         function addItem(item) {
            var url = webUrl + 'api/users/add';
            return $http.post(url, item)
                .then(function (result) {
                    return result;
                });
        }
		
        function editItem(item) {
            var url = webUrl + 'api/users/update';
            return $http.post(url, item)
                .then(function (result) {
                    return result;
                });
        }

        function deleteItem(id) {
            var url = webUrl + 'api/users/delete';
            var item = {
                "id": id
            };
            return $http.post(url, item)
                .then(function (result) {
                    return result;
                });
        }
		
        function sort(a, b) {
            var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
            if (nameA < nameB) {
                return -1
            }
            if (nameA > nameB) {
                return 1
            }
            return 0;
        }		
    }
})();