"use strict"

angular
	.module("sample-tracker", [
		"ui.router",
		"ngResource"
	])
	.config([
		"$stateProvider",
		"$locationProvider",
		"$urlRouterProvider",
		RouterFunction
	])
	.factory("ExtractionFactory", [
		"$resource",
		ExtractionFactoryFunction
		])
	.factory("SampleFactory", [
		"$resource",
		SampleFactoryFunction
		])
	.controller("ExtractionController", [
		"$state",
		"ExtractionFactory",
		extractionControllerFunction
		])
	.controller("SampleController", [
		"$state",
		"$stateParams",
		"ExtractionFactory",
		"SampleFactory",
		sampleControllerFunction
		])
	.controller("InfoController", [
		"$state",
		"$stateParams",
		"SampleFactory",
		infoControllerFunction
		])
	

	function RouterFunction($stateProvider){
		$stateProvider
			.state("extractions", {
				url: "/extractions",
				templateUrl: "/assets/js/ng-views/extractions.html",
				controller: "ExtractionController",
				controllerAs: "vm"
			})
			.state("samples", {
				url: "/extractions/:name",
				templateUrl: "/assets/js/ng-views/samples.html",
				controller: "SampleController",
				controllerAs: "vm"
			})
			.state("sample-info", {
				url: "/extractions/:name/samples/:id",
				templateUrl: "/assets/js/ng-views/sample-info.html",
				controller: "InfoController",
				controllerAs: "vm"
			})	
	}

	function ExtractionFactoryFunction($resource) {
		return $resource("api/extractions/:name", {}, {
			update: {method: "PUT"}
		})
	}

	function SampleFactoryFunction($resource) {
		return $resource("api/extractions/:name/samples/:id", {}, {
			update: {method: "PUT"}
		})
	}


	function extractionControllerFunction($state, ExtractionFactory){
		this.extractions = ExtractionFactory.query()
		// this.newSample = new SampleFactory()
		// this.create = function() {
		// 	this.newSample.$save().then(function(sample){
		// 		$state.reload()
		// 	})
		// }
	}

	function sampleControllerFunction($state, $stateParams, ExtractionFactory, SampleFactory){
		this.extraction = ExtractionFactory.get({name: $stateParams.name});
		this.newSample = new SampleFactory()
		this.create = function() {
			this.newSample.$save({name: this.extraction.name}).then(function(){
				$state.reload()
			})
		}
	}

	function infoControllerFunction($state, $stateParams, SampleFactory){
		this.sample = SampleFactory.get({name: $stateParams.name});
		
		this.update = function(){
			this.sample.$update({name: $stateParams.name}).then(function(){
				$state.go("samples")
			})
		}

		this.destroy = function(){
			this.sample.$delete({name: $stateParams.name}).then(function(){
				$state.go("samples")
			})
		}
	}
