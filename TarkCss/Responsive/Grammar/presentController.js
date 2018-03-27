﻿app.controller('simplePresentCtrl', function ($scope, $rootScope, SpeechService) {
    $scope.verbalTenses = [
        { id: 1, name: 'Simple Present' },
        { id: 2, name: 'Present Continuous' }
    ];

    $scope.verbs = [
        ["To Walk", "Andar", "Berjalan"],
        ["To Eat", "Comer", "Makan"],
        ["To Drink", "Beber", "Minum"],
        ["To Buy", "Comprar", "Membeli"],
        ["To Swim", "Nadar", "Berenang"],
        ["To Sing", "Cantar", "Bernyanyi"],
        ["To Speak", "Falar", "Berbicara"],
        ["To Understand", "Entender", "Mergenti"],
        ["To Work", "Trabalhar", "Bekerja"],
        ["To Study", "Estudar", "Belajar"],
        ["To Learn", "Aprender", "Belajar"],
        ["To Play", "Jogar", "Bermain"]
    ];

    $scope.negative = false;
    $scope.interrogative = false;
    $scope.selectedVerb = $scope.verbs[0];
    $scope.selectedTense = $scope.verbalTenses[0];

    $scope.loadProcessedVerbs = function (verb, speak) {
        var gp_tp = new GrammarProcessor();
        $scope.selectedVerb = verb;
        $scope.engineVerbs = gp_tp.getSimplePresent($rootScope.langFrom.id, $rootScope.langLearn.id, verb[$rootScope.langLearn.id], $scope.negative, $scope.interrogative, $scope.selectedTense.id);

        if (speak) {
            $rootScope.Speak(verb[$rootScope.langFrom.id], $rootScope.langFrom.id);
            $rootScope.Speak(verb[$rootScope.langLearn.id], $rootScope.langLearn.id);
        }
    };

    $scope.selectVerbalTense = function(verbalTense) {
        $scope.selectedTense = verbalTense;
        $scope.loadProcessedVerbs($scope.selectedVerb, false);
    }

    $scope.format = function (verb) {
        return verb[$rootScope.langFrom.id] + ' -> ' + verb[$rootScope.langLearn.id];
    };

    
    $scope.reload = function () {
        $scope.loadProcessedVerbs($scope.selectedVerb, false);
    }

    $scope.$watch('langFrom', $scope.reload);
    $scope.$watch('langLearn', $scope.reload);
    
    $scope.loadProcessedVerbs($scope.verbs[0], false);
});