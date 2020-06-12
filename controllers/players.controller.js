const fs = require('fs');

exports.addPlayerPage = (req, res) => {

    let query = "SELECT * FROM `club` ORDER BY name ASC"; 

    db.query(query, (err, result) => {
        if (err) {
            res.redirect('/');
        }

        res.render('add-player.ejs', {
            title: "Ajouter un joueur",
            clubs: result
        });
    });
};

exports.addPlayer = (req, res) => {
  if (!req.files) {
      return res.status(400).send("Pas de fichier envoyé");
  }



  let firstname = req.body.firstname;
  let lastname = req.body.lastname;
  let position = req.body.position;
  let number = req.body.number;
  let uploadedFile = req.files.image;
  let image = uploadedFile.name;
  let fileExtension = uploadedFile.mimetype.split('/')[1];
  image = firstname + '-' + lastname + '.' + fileExtension;
  let club = req.body.club;
  
      if (uploadedFile.mimetype === 'image/png' || uploadedFile.mimetype === 'image/jpeg' || uploadedFile.mimetype === 'image/gif') {
        uploadedFile.mv(`public/assets/img/${image}`, (err ) => {
            if (err) {
                return res.status(500).send(err);
            }
            let query = "INSERT INTO `players` (firstname, lastname, position, number, image, club_id) VALUES ('" +
                firstname + "', '" + lastname + "', '" + position + "', '" + number + "', '" + image + "', '" + club + "')";
            db.query(query, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.redirect('/');
            });
        });
    } else {
        message = "Fichier image invalide";
        res.render('add-player.ejs', {
            message,
            title: "Ajouter un joueur"
        });
    }
  }

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