myApp.controller('ListController', ['$scope', '$http', function($scope, $http )

{
  $scope.searchTerm = ["Title", "Main Ingredient", "Rating"];
  $scope.recipes = [];
  $scope.message = false;
  $scope.showURL = false;

getRecipes();

//query to server
  function getRecipes () {

    $http.get('/recipes')
      .then(function (response) {
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
