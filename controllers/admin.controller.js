exports.getAdminPage = (req, res) => {
  let query = [
      "SELECT * FROM players ORDER BY id ASC",
      "SELECT * FROM users ORDER BY id ASC"
    
    ]



  // Julien
 // let query = "SELECT * FROM players INNER JOIN club ON club_id = club.id;"
  db.query(query.join(';'), (err, result) => {
    //  console.log("result :", result)
      if (err) {
          res.redirect('/');
      }
      res.render('admin/dashboard', {
          
          title: "Bienvenue",
          players: result[0],
          users: result[1],

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
