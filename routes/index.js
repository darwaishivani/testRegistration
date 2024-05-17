var express = require("express");
const passport = require("passport");
var router = express.Router();
const userModel = require("./users");

/* GET home page. */
router.get("/", function (req, res, next) {
	res.render("index");
});

router.get("/feed", function (req, res, next) {
	userModel.find().then(function (allusers) {
		// console.log(allusers)
		res.render("feed", { allusers });
		// res.send(allusers)
	});
});
router.get("/like/:id", function (req, res, next) {
	userModel.findOne({ _id: req.params.id }).then(function (user) {
		//res.send(user);
		user.like++;
		user.save().then(function (Saveduser) {
			//res.send(Saveduser);
			res.redirect("back");
		});
	});
});

router.get("/viewpage/:id", function (req, res, next) {
	userModel.findOne({ _id: req.params.id }).then(function (user) {
		//res.send(user);

		res.render("viewpage",{user});
		});
	
});

router.post("/create", function (req, res, next) {
	userModel
		.create({
			name: req.body.name,
			email: req.body.email,
			profile: req.body.profile,
		})
		.then(function (createdUser) {
			res.send(createdUser);
		});
});

router.get("/delete/:id", function (req, res, next) {
	userModel.findOneAndDelete({ _id: req.params.id }).then(function (allusers) {
		//res.render("feed");
		//res.send(allusers);
		res.redirect("back");
	});
});

router.post("/edited/:id", function (req, res, next) {
	userModel.findOne({ _id: req.params.id }).then(function (allusers) {
		//res.render("feed");
		res.send(allusers);
	});
});

router.get("/edit/:id", function (req, res, next) {
	userModel.findOne({ _id: req.params.id }).then(function (allusers) {
		//res.render("feed");
		res.send(allusers);
	});
});

// router.get("/profile", function (req, res, next) {
// 	userModel
// 		.findOne({ _id: "645f782c42e53c42cfdd93bd" })
// 		.then(function (allusers) {
// 			//res.render("feed");
// 			res.send(allusers);
// 		});
// });

// router.get("/login", function (req, res, next) {
// 	res.render("login");
// });
router.post("/register", (req, res, next) => {
	var newUser = new UserModel({
		name: req.body.username,
   email: req.body.email,
		})
		UserModel.register(newUser, req.body.password).then(function (u) {
			passport.authenticate("local")(req, res, function () {
				res.redirect("/viewpage")
			})
		})
			.catch(function (e) {
				res.send(e);
			})
	});

	router.post("/login", passport.authenticate("local", {
		successRedirect: "/viewpage",
		failureRedirect: "/",
	}),
		function (req, res, next) { }
	);

	router.get("/logout", function (req, res, next) {
		req.logout(function (err) {
			if (err) {
				return next(err);
			}
			res.redirect("/");
		});
	});


function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	else {
		res.redirect("/")
	}
}


module.exports = router;
