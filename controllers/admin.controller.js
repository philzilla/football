exports.getAdminPage = (req, res) => {
  let query = [
      "SELECT * FROM players ORDER BY id ASC",
      "SELECT * FROM users ORDER BY id ASC",
      "SELECT COUNT(*) AS count FROM users"
    ]
  // Julien
  // let query = "SELECT * FROM players INNER JOIN club ON club_id = club.id;"
  db.query(query.join(';'), (err, result) => {
    //  console.log("result :", result)
      if (err) {
          res.redirect('/');
      }

    //  console.log("result[2]: ", result[2]);
      
      res.render('admin/dashboard', {

          title: "Bienvenue",
          players: result[0],
          users: result[1],
          totalUsers: result[2][0].count,
          firstname: req.session.firstname,
          breadcrumb: "Tableau de bord"
      });
  });
  

  /*
  npm install async

  async.parallel({
 one: function(callback) {
    callback(null, 'abc\n');
 },
 two: function(callback) {
   callback(null, 'xyz\n');
 }
}, function(err, results) {
  if (error) throw error;
    res.render('test', {
      columnNames: results.one, 
      dataRegistros: results.two      
   });
});
*/

  

};
