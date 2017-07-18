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
	.controller("InfoController", [
		"$state",
		"$stateParams",
		"SampleFactory",
		infoControllerFunction
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
	}

	function SampleFactoryFunction($resource) {
		return $resource("api/samples/:name", {}, {
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
		// this.update = function(sample){
		// 	console.log(`trying to update ${sample.name}`);
		// 	sample.name = this[sample.name].updateMe.name
		// 	sample.$update({name: sample.name})
		// }
	}

	function infoControllerFunction($state, $stateParams, SampleFactory){
		this.sample = SampleFactory.get({name: $stateParams.name});
		console.log(this.sample)
	}