myApp.controller('PostController', ['$scope', '$http',  function($scope, $http)
{

$scope.sources = ["Cookbook", "Magazine", "URL", "other"];
$scope.currentRec = {};
$scope.message = false;

$scope.submitCurrentRec = function () {
  $scope.currentRec.source = 3;
    var data = $scope.currentRec;


    $http.post('/recipes', data).then(function(response) {
      if(response.status == 201) {
        console.log('Recipe saved.');
        $scope.message = true;
        $scope.currentRec = {};
        $scope.selectedSource = 0;
      } else {
        console.log('Error:', response.data);
      }
    });
    };



}]);
