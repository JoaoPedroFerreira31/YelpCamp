var express = require("express"), 
	app = express(), 
	bodyParser = require("body-parser"), 
	mongoose = require("mongoose"),
	flash = require("connect-flash"),
	passport = require("passport"),
	LocalStrategy = require("passport-local"),
	methodOverride = require("method-override"),
	passportLocalMongoose = require("passport-local-mongoose"),
	Campground = require("./models/campground.js"),
	Comment = require("./models/comment.js"),
	User = require("./models/user.js"),
	seedDB = require("./seeds");
	
var commentRoutes = require("./routes/comments");
var campgroundRoutes = require("./routes/campgrounds");
var indexRoutes = require("./routes/index");

//conectar mongoose a base de dados 
mongoose.connect("mongodb://localhost/yelp_camp_v11");


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(express.static( __dirname + "/Public"));
app.use(flash());
//seedDB(); //Seed the database 


//Passport config
app.use(require("express-session")({
	secret: "Qualquer coisa",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");  
	res.locals.success = req.flash("success");  
	next();
});


app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

//Iniciar o Servidor 
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The YelpCamp Server Has Started!");
});