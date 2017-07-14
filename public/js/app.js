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
	.controller("SampleController", [
		"$state",
		"SampleFactory",
		sampleControllerFunction
		])

	function RouterFunction($stateProvider){
		$stateProvider
			.state("samples", {
				url: "/samples",
				templateUrl: "/assets/js/ng-views/samples.html",
				controller: "SampleController",
				controllerAs: "vm"
			})
	}

	function SampleFactoryFunction($resource) {
		return $resource("api/samples/:name", {}, {

		})
	}

	function sampleControllerFunction($state, SampleFactory){
		console.log("inside the sampleControllerFunction!")
		this.samples = SampleFactory.query();
	}