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
	.factory("SampleFactory", [
		"$resource",
		SampleFactoryFunction
		])
	.factory("ExtractionFactory", [
		"$resource",
		ExtractionFactoryFunction
		])
	.controller("SampleController", [
		"$state",
		"SampleFactory",
		sampleControllerFunction
		])
	.controller("InfoController", [
		"$state",
		"$stateParams",
		"SampleFactory",
		infoControllerFunction
		])
	.controller("ExtractionController", [
		"$state",
		"ExtractionFactory",
		extractionControllerFunction
		])
	.controller("ExtractionInfoController", [
		"$state",
		"$stateParams",
		"ExtractionFactory",
		extractionInfoControllerFunction
		])

	function RouterFunction($stateProvider){
		$stateProvider
			.state("samples", {
				url: "/samples",
				templateUrl: "/assets/js/ng-views/samples.html",
				controller: "SampleController",
				controllerAs: "vm"
			})
			.state("sample-info", {
				url: "/samples/:name",
				templateUrl: "/assets/js/ng-views/sample-info.html",
				controller: "InfoController",
				controllerAs: "vm"
			})
			.state("extractions", {
				url: "/extractions",
				templateUrl: "/assets/js/ng-views/extractions.html",
				controller: "ExtractionController",
				controllerAs: "vm"
			})
			.state("extraction-info", {
				url: "/extractions/:name",
				templateUrl: "/assets/js/ng-views/extraction-info.html",
				controller: "ExtractionInfoController",
				controllerAs: "vm"
			})
	}

	function SampleFactoryFunction($resource) {
		return $resource("api/samples/:name", {}, {
			update: {method: "PUT"}
		})
	}

	function ExtractionFactoryFunction($resource) {
		return $resource("api/extractions/:name", {}, {
			update: {method: "PUT"}
		})
	}

	function sampleControllerFunction($state, SampleFactory){
		this.samples = SampleFactory.query()
		this.newSample = new SampleFactory()
		this.create = function() {
			this.newSample.$save().then(function(sample){
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

	function extractionControllerFunction($state, ExtractionFactory){
		this.extractions = ExtractionFactory.query()
		// this.newSample = new SampleFactory()
		// this.create = function() {
		// 	this.newSample.$save().then(function(sample){
		// 		$state.reload()
		// 	})
		// }
	}

	function extractionInfoControllerFunction($state, $stateParams, ExtractionFactory){
		this.extraction = ExtractionFactory.get({name: $stateParams.name});
		console.log(this.extraction)
		this.message = this.extraction
		
		this.update = function(){
			this.extraction.$update({name: $stateParams.name}).then(function(){
				$state.go("extractions")
			})
		}

		// this.destroy = function(){
		// 	this.sample.$delete({name: $stateParams.name}).then(function(){
		// 		$state.go("samples")
		// 	})
		// }
	}