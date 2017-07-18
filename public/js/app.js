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