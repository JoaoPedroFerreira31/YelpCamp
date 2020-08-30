var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");


//INDEX
router.get("/", function(req, res){	
	// Get all campgrounds from DB
	Campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log("Error");
			console.log(err);
		}else{
			res.render("campgrounds/index", {campgrounds:allCampgrounds});
		}
	})	
});



router.get("/new", middleware.isLoggedIn, function(req, res){
	res.render("campgrounds/form");
});

// SHOW - shows more info about one campground
router.get("/:id", function(req, res){
	//encontrar o campground com o ID
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err){
			console.log("Error");
			console.log(err);
		}else{
			//render SHOW template com o acampamento
			res.render("campgrounds/show", {campground: foundCampground});	
		}
	});
});

router.post("/", middleware.isLoggedIn, function(req, res){
	
	//obter os dados do formulário e adicionar à array campgrounds
	var name = req.body.name;
	var image = req.body.image;
	var price = req.body.price;
	var description = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	};
	var newCampground = {name: name , image: image, price: price, description: description, author: author};
	
	//Criar um novo campground e guardar na BD
	Campground.create(newCampground, function(err, newlyCreated){
		if(err){
			console.log(err);
		}else{
			res.redirect("/campgrounds");
		}
	});
});

// Edit Campground Route
router.get("/:id/edit", middleware.donoCampground, function(req, res){
		Campground.findById(req.params.id, function(err, foundCampground){
			res.render("campgrounds/edit", {campground: foundCampground});
		});			
});

// Update Campground Route
router.put("/:id", middleware.donoCampground, function(req, res){
	//Encontrar e dar update ao campground certo
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, campground){
		if(err){
			res.redirect("/campgrounds");
			console.log("Erro");
			console.log(err);
		} else{
			//Direcionar o user para algum lado
			res.redirect("/campgrounds/" + req.params.id)
		} 
	});
});	

// Destroy Campground Route
router.delete("/:id", middleware.donoCampground, function(req, res){
	Campground.findByIdAndRemove(req.params.id, function(err, removeCampground){
		if(err){
			console.log("Erro ao apagar Campground");
			console.log(err);
		} else {
			res.redirect("/campgrounds");
			console.log("Campground apagado da base de dados");
		}
	});
});

module.exports = router;