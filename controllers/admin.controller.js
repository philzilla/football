exports.getAdminPage = (req, res) => {
  let query = "SELECT players.*, club.name, club.country FROM players INNER JOIN club ON club_id = club.id" 

  // Julien
 // let query = "SELECT * FROM players INNER JOIN club ON club_id = club.id;"
  
  db.query(query, (err, result) => {
      console.log("result :", result)
      if (err) {
          res.redirect('/');
      }
      res.render('admin/dashboard', {
          
          title: "Bienvenue",
          players: result,

      });
  });
};
