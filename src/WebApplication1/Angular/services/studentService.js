angular.module('services')
.factory('studentService', ['$http', '$q', function ($http, $q) {
    var stu = {};

    stu.getlist = function (search, page) {

        var d = $q.defer();
        $http.get('/api/Student/', { params: { s: search, p: page } })
        .then(function (data) {
            d.resolve(data);
        }, function (data) {
            d.resolve(data);
        });
        return d.promise;
    };

    stu.save = function (model) {
        var d = $q.defer();
        $http.post('/api/Student/', model)
        .then(function (data) {
            d.resolve(data);
        }, function (data) {
            d.resolve(data);
        })

        return d.promise;
    };

    return stu;
}]);