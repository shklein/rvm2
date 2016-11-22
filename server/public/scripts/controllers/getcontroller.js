myApp.controller('GetController', ['$scope', '$http', function($scope, $http )

{
  $scope.searchTerm = ["Title", "Main Ingredient", "Rating"];
  $scope.recipes = [];
  $scope.eventSources = [];
  $scope.textBox = false;
  $scope.numBox = false;
  $scope.message = false;
  $scope.showURL = false;




//show/hide search box
  $scope.searchType = function () {
    if ($scope.selectedSource == "Rating") {
      $scope.textBox= false;
      $scope.numBox = true;
    } else {
      $scope.textBox = true;
      $scope.numBox = false;
    }

  };
//query to server
  $scope.searchRecipes = function () {

    var query = " ";

    if ($scope.selectedSource == "Title") {
      query = '/recipes?title=' + $scope.keyword;
    } else if ($scope.selectedSource == "Main Ingredient") {
      query = '/recipes?mainIngred=' + $scope.keyword;
    } else {
      query = '/recipes?rating=' + $scope.rating;
    };

    $http.get(query).then(function (response) {
      response.data.forEach(function (recipe) {
          recipe.dialogShown = false;
          recipe.date_made = new Date(recipe.date_made);
        });
      $scope.recipes = response.data;
      console.log('GET /recipes', response.data);

      if ($scope.recipes.length == 0) {
        $scope.message = true;
      }


      });
    };

$scope.showRecipe = function (id) {
  $scope.recipes.forEach(function (rec) {
      if (rec._id == id) {
        rec.dialogShown = true;
      } else {
        rec.dialogShown = false;
      };


    });
  };



}]);
