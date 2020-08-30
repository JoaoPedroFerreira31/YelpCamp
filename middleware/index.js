var Campground = require("../models/campground");
var Comment = require("../models/comment");

// OS MIDDLEWARE ESTAO AQUI
var middlewareObj={};

middlewareObj.donoCampground = function(req, res, next){
	// O user esta logado?
	if(req.isAuthenticated()){
		Campground.findById(req.params.id, function(err, foundCampground){
			if(err){
				req.flash("error", "Campground not found");
				res.redirect("back");
			}else{
				//E o dono do campground?
				if(foundCampground.author.id.equals(req.user._id)){  
					next();
				} else {
					req.flash("error", "You don't have permission to do that");
					res.redirect("back");
				}
			}
	});		
	} else {
		req.flash("error", "You need to be logged in to do that");
		res.redirect("back");
	}	
};

middlewareObj.donoComentario = function(req, res, next){
	// O user esta logado?
	if(req.isAuthenticated()){
		Comment.findById(req.params.comments_id, function(err, foundComment){
			if(err){
				res.redirect("back");
			}else{
				//E o dono do comentario?
				if(foundComment.author.id.equals(req.user._id)){  
					next();
				} else {
					req.flash("error", "You don't have permission to do that");
					res.redirect("back");
				}
			}
	});		
	} else {
		req.flash("error", "You need to be logged in to do that");
		res.redirect("back");
	}	
};

middlewareObj.isLoggedIn =  function(req, res, next){
//Tornar umas pagina acessivel so para login
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error", "You need to be logged in to do that");
	res.redirect("/login");
}


module.exports = middlewareObj;