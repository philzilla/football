const fs = require('fs');

exports.addClubPage = (req, res) => {
  res.render('add-club.ejs', {
      title: "Ajouter un club",
  });
};

exports.addClub = (req, res) => {
  if (!req.files) {
      return res.status(400).send("Pas de fichier envoyé");
  }


  let name = req.body.name;
  let content = req.body.content;
  let city = req.body.city;
  let country = req.body.country;
  let uploadedFile = req.files.image;
  let image = uploadedFile.name;
  let fileExtension = uploadedFile.mimetype.split('/')[1];
  image = name + fileExtension;
  
      if (uploadedFile.mimetype === 'image/png' || uploadedFile.mimetype === 'image/jpeg' || uploadedFile.mimetype === 'image/gif') {
        uploadedFile.mv(`public/assets/img/${image}`, (err ) => {
            if (err) {
                return res.status(500).send(err);
            }
            let query = "INSERT INTO `club` (name, content, city, country, image) VALUES ('" +
                
            name + "', '" + content + "', '" + city + "', '" + country + "', '" + image + "')";
            db.query(query, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.redirect('/');
            });
        });
    } else {
        message = "Fichier image invalide";
        res.render('add-club.ejs', {
            message,
            title: "Ajouter un club"
        });
    }
  }


  /*
  exports.editPlayerPage = (req, res) => {
    let playerId = req.params.id;
    let query = "SELECT * FROM `players` WHERE id = '" + playerId + "' ";
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.render('edit-player.ejs', {
            title: "Editer un joueur",
            player: result[0],
        });
    });
}

exports.editPlayer = (req, res) => {
let playerId = req.params.id;
let firstname = req.body.firstname;
let lastname = req.body.lastname;
let position = req.body.position;
let number = req.body.number;


         let query = "UPDATE `players` SET `firstname` = '" + firstname + "', `lastname` = '" + lastname + "', `position` = '" + position + "', `number` = '" + number + "' WHERE `players`.`id` = '" + playerId + "'";

          db.query(query, (err, result) => {
              if (err) {
                  return res.status(500).send(err);
              }
              res.redirect('/');
          });
     
  
}



exports.deletePlayer = (req, res) => {
  let playerId = req.params.id;
  let getImageQuery = 'SELECT image from `players` WHERE id = "' + playerId + '"';
  let deleteUserQuery = 'DELETE FROM players WHERE id = "' + playerId + '"';

  db.query(getImageQuery, (err, result) => {
      if (err) {
          return res.status(500).send(err);
      }

      let image = result[0].image;

      fs.unlink(`public/assets/img/${image}`, (err) => {
          if (err) {
              return res.status(500).send(err);
          }
          db.query(deleteUserQuery, (err, result) => {
              if (err) {
                  return res.status(500).send(err);
              }
              res.redirect('/');
          });
      });
  });
}
*/