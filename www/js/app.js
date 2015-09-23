//https://github.com/CESJ/Exercio_consClimaRest.git

var db = null;
var consClimaRest = angular.module('consClimaRest', ['ionic','ngCordova'])

    .run(function($ionicPlatform, $cordovaSQLite) {
        $ionicPlatform.ready(function() {
            console.log("Passei por aqui..");

        if(window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if(window.StatusBar) {
            StatusBar.styleDefault();
        }

    // Criar Banco de Dados
    console.log("Passei por aqui 2..");
    db = $cordovaSQLite.openDB({name:"my.db"});
    console.log("Passei por aqui 3..");
    $cordovaSQLite.execute(db,"CREATE TABLE IF NOT EXISTS previsao (data_hora Date PRIMARY KEY, temperatura text, humidade text,                                                      velocidade_vento text, nome_cidade text, pressao text, latitude text, longitude text, cidade text,                                                posicao_icone integer)");

  });
})

    consClimaRest.controller('previsaoClimaRestCtrl', function($scope, $http, $cordovaSQLite){

        $scope.url = "http://api.openweathermap.org/data/2.5/weather?q=";
		$scope.temperatura = "";
		$scope.humidade = "";
		$scope.velocidade = "";
		$scope.cidade = "";
		$scope.pressao = "";
		$scope.latitude = "";
		$scope.longitude = "";
        $scope.icone = "";
        $scope.descricao = "";
        $scope.mostrarPrevisaoLayout = false;

        $scope.loadWeather = function(){
            $http
                .get($scope.url+$scope.cidade+"&units=metric&lang=pt")
                .success(function(result){
                    console.log(result);
                    $scope.temperatura = result.main.temp;
                    $scope.humidade = result.main.humidity;
                    $scope.velocidade = result.wind.speed;
                    $scope.cidade = result.name;
                    $scope.pressao = result.main.pressure;
                    $scope.latitude = result.coord.lat;
                    $scope.longitude = result.coord.lon;
                    $scope.icone = result.weather[0].icon;
                    $scope.descricao = result.weather[0].description;

                    $scope.mostrarPrevisaoLayout = true;


                //>>> CHAMAR FUNÇÃO DE INCLUSÃO


                })
                .error(function(){
                    alert("Dados que serão exibidos são de cache!");

                //>>> CHAMAR FUNÇÃO DE SELECT, BUSCANDO O REGISTRO SALVO

                });
        }

        //Banco de Dados
        //-----------------------------------------------------------------------------------------------------------------------------
        //insert
        $scope.resultado = "Teste Banco";
        $scope.previsao = [];

        $scope.insert = function(temperatura, humidade, velocidadeVento, nomeCidade, pressao, lat, lon, icone, descricaoTempo) {
        console.log("Entrei no INSERT");
        var query = "insert into previsao (data_hora, temperatura, humidade, velocidade_vento, nome_cidade, pressao, latitude, longitude,                           cidade, posicao_icone) values (?,?,?,?,?,?,?,?,?,?)";
        $cordovaSQLite.execute(db, query, [temperatura, humidade, velocidadeVento, nomeCidade, pressao, lat, lon, icone, descricaoTempo]).then(
            function(result){
                $scope.resultado = "INSERI COM SUCESSO";
                console.log("INSERI");
            }, function(error){
                $scope.resultado = "FAIO!";
                console.log(error);
                }
            ); // fim do then
        }; // fim do insert


        //select
        //>>>
        //>>>
        //>>>
        //>>>
        //>>>
        //>>>
        //>>>
        //>>>

        //-----------------------------------------------------------------------------------------------------------------------------
    });
