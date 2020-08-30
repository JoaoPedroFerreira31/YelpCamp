var mongosse = require("mongoose");
var Campground = require("./models/campground.js"); 
var Comment = require("./models/comment");

var data = [
	{
	 name: "Cloud's Rest",
	 image: "https://image.freepik.com/fotos-gratis/acampar-a-noite-no-lago_23-2148223510.jpg", 
	 description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
	},
	{
	 name: "Desert Mesa",
	 image: "https://image.freepik.com/fotos-gratis/hiker-levantar-em-a-acampamento-frente-laranja-barraca-e-				mochila-em-a-montanhas_1150-9163.jpg", 
	 description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
	},
	{
	 name: "Canyon Floor",
	 image: "https://image.freepik.com/fotos-gratis/acampar-a-noite-no-lago_23-2148223510.jpg", 
	 description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
	},
]

function seedDB(){
// Remover todos os campgrounds
	Campground.remove({}, function(err){
		if(err){
			console.log(err);	
		}else{
			console.log("Removed campgrounds!");	
		}
// Adicionar campgrounds
	data.forEach(function(seed){
		Campground.create(seed, function(err, campground){
			if(err){
				console.log("Erro");
				console.log(err);
			}else{
				console.log("Guardado na Base de dados");
				// Criar Comentarios				
				Comment.create(
					{ 
						text: "This place is great, but I wish there was internet",
						author: "Homer",	   
					}, function(err, comment){
						if(err){
							console.log("Erro");
							console.log(err);
						}else{
							campground.comments.push(comment);
							campground.save();
							console.log("Novo comentario criado");
						}
					});			
				}	
			});	
		});		
	});
}	

module.exports = seedDB;