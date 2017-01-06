var express = require('express');
var path = require('path');
var router = express.Router();
var pg = require('pg');
pg.defaults.ssl = true;
var connectionString = require(path.join(__dirname, '../', 'config'));

/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', {
		title: 'Express'
	});
});
*/

// CREATE action:
router.get('/returnGeoJSON', function(req, res) {
	var results = [];

	// let data = {text: req.body.text, complete: false};

	pg.connect(connectionString, function(err, client, done) {
		if (err) {
			done();
			console.log(err);
			return res.status(500).json({ success: false, data: err });
		}

    var fetchGeoJSONQuery = "SELECT gid, ST_AsGeoJSON(geom) as geojson, parc_type, taxes FROM trenton_plots WHERE parc_type IN ('VACANT LOT', 'VACANT BUILDING');"

    //client.query("INSERT INTO items(text, complete) values($1, $2)", [data.text, data.complete]);

    var query = client.query(fetchGeoJSONQuery);

    function FeatureCollection(){
        this.type = 'FeatureCollection';
        this.features = new Array();
    }

		query.on('row', function(row) {
			results.push(row);
		})

		query.on('end', function() {
			done();

      var featureCollection = new FeatureCollection();
      var count = 0;
        for (i = 0; i < results.length; i++)
        {

          if(JSON.parse(results[i].geojson).coordinates[0].length===1){
            var newFeature = {
              "type" : "Feature",
              "geometry" : JSON.parse(results[i].geojson),
              "properties" : {
								"site_id" : results[i].gid,
                "parc_type" : results[i].parc_type,
                "taxes" : results[i].taxes
              }
            }

            newFeature.geometry.type = "Polygon"
            newFeature.geometry.coordinates = newFeature.geometry.coordinates[0]
            featureCollection.features[count] = newFeature;
            count++;
          }

        }

        console.log(JSON.stringify(featureCollection.features.slice(0,20)))
        res.send(featureCollection);

		})
	})
});

router.post('/addBudgetItem', function(req, res){

	console.log(req.body)
	console.log(Object.keys(req.body).length)

	if(Object.keys(req.body).length == 5){

		pg.connect(connectionString, function(err, client, done) {

			console.log("let's do this...")

			if (err) {
				done();
				console.log(err);
				return res.status(500).json({ success: false, data: err });
			}

			client.query("INSERT INTO budgetitems(siteid, agency, budgetamt, notes, ispriority) values($1, $2, $3, $4, $5)", [req.body.siteID, req.body.agency, req.body.budgetAmt, req.body.notes, req.body.isPriority]);

		});

	} else {

		console.log("Missing information");

	}

});


router.get('/returnBudgetItems', function(req, res) {
	var results = [];

	pg.connect(connectionString, function(err, client, done) {
		if (err) {
			done();
			console.log(err);
			return res.status(500).json({ success: false, data: err });
		}

    var fetchGeoJSONQuery = "SELECT * FROM budgetitems;"
    var query = client.query(fetchGeoJSONQuery);

		query.on('row', function(row) {
			results.push(row);
		})

		query.on('end', function() {
			done();
			console.log(results);
      res.send(results);
		})
	})
});



/*

// READ action:
router.get('/api/v1/todos', function(req, res) {
	var results = [];

	pg.connect(connectionString, function(err, client, done) {
		if (err) {
			done();
			console.log(err);
			return res.status(500).json({ success: false, data: err });
		}

		var query = client.query('SELECT * FROM items ORDER BY id ASC;');

		query.on('row', function(row) {
			results.push(row);
		})

		query.on('end', function() {
			done();
			return res.json(results);
		});
	});
});

// UPDATE action:
router.put('/api/v1/todos/:todo_id', function(req, res) {

	var results = [];

	var id = req.params.todo_id;

	var data = { text: req.body.text, complete: req.body.complete };

	pg.connect(connectionString, function(err, client, done) {
		if (err) {
			done();
			console.log(err);
			return res.status(500).json({ success: false, data: err });
		}

		client.query("UPDATE items SET text=($1), complete=($2) WHERE id=($3)",
			[data.text, data.complete, id]);

		var query = client.query("SELECT * FROM items ORDER BY id ASC;");

		query.on('row', function(row) {
			results.push(row);
		});

		query.on('end', function() {
			done();
			return res.json(results);
		});
	});
})

// DELETE action:
router.delete('/api/v1/todos/:todo_id', function(req, res) {

	var results = [];

	var id = req.params.todo_id;

	pg.connect(connectionString, function(err, client, done) {
		if (err) {
			done();
			console.log(err);
			return res.status(500).json({ success: false, data: err });
		}

		client.query('DELETE FROM items WHERE id=($1);', [id]);

		var query = client.query('SELECT * FROM items ORDER BY id ASC;');

		query.on('row', function(row) {
			results.push(row);
		});

		query.on('end', function() {
			done();
			return res.json(results);
		});
	});
});

*/

module.exports = router;
