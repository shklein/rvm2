myApp.controller('CalController', ['$scope', '$http', '$compile', 'uiCalendarConfig', function($scope, $http, $compile, uiCalendarConfig )
{


  $scope.eventSources = [];
  $scope.events = [];
  $scope.recipes = [];

  getRecipes();

  function getRecipes() {
    $http.get('/recipes')
      .then(function (response) {
        response.data.forEach(function (recipe) {
            var event = new Event (recipe._id, recipe.title, recipe.date_made);
            event.recipe = recipe;
            event.recipe.dialogShown = false;
            $scope.events.push(event);
          });

            $scope.recipes = response.data;
        

      });
};

              /* Render Tooltip */
    $scope.eventRender = function( event, element, view ) {
        element.attr({'tooltip': event.title,
                     'tooltip-append-to-body': true});
        $compile(element)($scope);
    };

    /* alert on eventClick */
    $scope.alertOnEventClick = function( date, jsEvent, view){
      $scope.recipes.forEach(function (rec) {
          if (rec._id == date.recipe._id) {
            date.recipe.dialogShown = true;

          }
        });
      };







    /* config object */
    $scope.uiConfig = {
      calendar:{
        height: 450,
        editable: true,
        header:{
          left: 'title',
          center: '',
          right: 'today prev,next'
        },
        eventClick: $scope.alertOnEventClick,
        eventDrop: $scope.alertOnDrop,
        eventResize: $scope.alertOnResize,
        eventRender: $scope.eventRender
      }
    };



    /* event sources array*/
    $scope.eventSources = [$scope.events];
    $scope.eventSources2 = [$scope.calEventsExt, $scope.eventsF, $scope.events];


function Event (id, title, start) {
  this.title = title,
  this.date = start,
  this.allDay = true,
  this.stick = true
};





}]);
