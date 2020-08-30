var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware"); 

// Adicionar comentario
router.get("/new", middleware.isLoggedIn ,function(req, res){
	
	// Encontrar campground com id
	Campground.findById(req.params.id,  function(err, campground){
		if(err){
			console.log(err);
		}else{
			res.render("comments/new", {campground: campground});
		}
	})
	
});

router.post("/", middleware.isLoggedIn, function(req, res){
	// Encontrar campground com id
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			req.flash("error", "Something went wrong");
			console.log(err);
			res.redirect("/campgrounds");
		}else{
			// Criar novo comentario
			Comment.create(req.body.comment, function(err, comment){
				if(err){
					console.log(err);
				}else{
				// Adicionar o Id e o Username a um comentario
				comment.author.id = req.user._id;
				comment.author.username = req.user.username;  
				// Guardar o comentario
				comment.save();	
				campground.comments.push(comment);
				campground.save();
				// Redirecionar para o campground show page
					req.flash("success", "Successfully added comment");
					res.redirect("/campgrounds/" + campground._id);
				}
			});
		}
	});
	
});

//Editar um comentario
router.get("/:comments_id/edit", middleware.donoComentario, function(req, res){
	Comment.findById(req.params.comments_id, function(err, comment){
		if(err){
			console.log("Erro");
		   	res.redirect("back");	
		} else {
			res.render("comments/edit", {campground_id: req.params.id, comment: comment});	   
		}
	})
});

//Update de um Comentario
router.put("/:comments_id", middleware.donoComentario, function(req, res){
	Comment.findByIdAndUpdate(req.params.comments_id, req.body.comment, function(err, updateComentario){
		if(err){
			res.redirect("back");
			console.log(err);
		} else {
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
}); 

//Apagar um Comentario
router.delete("/:comments_id", middleware.donoComentario, function(req, res){
	Comment.findByIdAndRemove(req.params.comments_id, function(err, deleteComment){
		if(err){
			res.redirect("back");
			console.log(err);
		} else {
			req.flash("success", "Comment deleted");
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

module.exports = router;