exports.getHomePage = (req, res) => {
    let query = "SELECT  `players.id`, `players.firstname`, `players.lastname`, `players.position`, `players.number`, `players.image`,`club.name`,`club.city`,`club.country` " + " FROM players INNER JOIN club ON  club_id = club.id;" 
    
    
    db.query(query, (err, result) => {
        console.log("result :", result)
        if (err) {
            res.redirect('/');
        }
        res.render('index.ejs', {
            
            title: "Bienvenue",
            players: result,

        });
    });
};
