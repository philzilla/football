const bcrypt = require("bcrypt");

exports.registerPage = (req, res) => {
  res.render('auth/register.ejs', {
      title: "S'inscrire",
  });
};


exports.register = (req, res) => {

  let firstname = req.body.firstname;
  let lastname = req.body.lastname;
  let email = req.body.email;
  let password = req.body.password;

  let emailQuery = "SELECT * FROM `users` WHERE email = '" + email + "'";

  db.query(emailQuery, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (result.length > 0) {
      message = "Le compte existe déjà";
      res.redirect("auth/register", {
        message,
        title: "Ajouter un utilisateur",
      });
    } else {

      bcrypt.hash(password, 10, function (err, hash) {

        let query =
          "INSERT INTO `users` (firstname, lastname, email, password) VALUES ('" +
          firstname +
          "', '" +
          lastname +
          "', '" +
          email +
          "', '" +
          hash +
          "')";

        db.query(query, (err, result) => {
          if (err) {
            return res.status(500).send(err);
          }
          res.redirect("/");
        });
      }
      );
    }
  })



}