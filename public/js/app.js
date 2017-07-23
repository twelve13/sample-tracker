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
		"ExtractionFactory",
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
				controllerAs: "vm",
				params: {obj: null}
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

	function infoControllerFunction($state, $stateParams, SampleFactory, ExtractionFactory){
		this.sample = SampleFactory.get({name: $stateParams.name, id: $stateParams.id});
		this.extraction = ExtractionFactory.get({name: $stateParams.name});
		
		this.update = function(){
			this.sample.$update({name: $stateParams.name, id: $stateParams.id}).then(function(){
				$state.go("samples", {"name": "Unassigned"})
			})
		}
		

		this.destroy = function(){
			this.sample.$delete({name: $stateParams.name, id: $stateParams.id}).then(function(){
				$state.go("samples", {"name": "Unassigned"})
			})
		}


		
			
		
		this.addtoext = function() {
			console.log("creating")
			let newSample = new SampleFactory()
			newSample.name = this.sample.name;
			newSample.notes = this.sample.notes;
			newSample.strs = this.sample.strs;
			newSample.mito = this.sample.mito;
			newSample.priority = this.sample.priority;
			newSample.analyst = this.sample.analyst;
			newSample.cleaned = this.sample.cleaned;
			newSample.cleaned_date = this.sample.cleaned_date;
			newSample.sampled = this.sample.sampled;
			newSample.sampled_date = this.sample.sampled_date;
			newSample.$save({name: this.extraction.name}).then(function(){
				$state.reload()
			})
		}
		


	}
