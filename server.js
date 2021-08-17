var express = require('express');
var bodyParser = require('body-parser');
var pg = require('pg');

var app = express();

app.set('port', process.env.PORT || 5000);

app.use(express.static('public'));
app.use(bodyParser.json());

app.post('/adduser', function(req, res) {
    const {Name, age__c, dob__c, email__c, first_name__c, last_name__c, mobile_number__c} = req.body;
    db.query(`Name, age__c, dob__c, email__c, first_name__c, last_name__c, mobile_number__c) VALUES($1, $2, $3, $4, $5,$6,$7) RETURNING *`,
    [Name, age__c, dob__c, email__c, first_name__c, last_name__c, mobile_number__c])
    .then((table)=>res.json({data: table.rows[0]})).catch((err)=>res.json(err));
});

// app.post('/update', function(req, res) {
//     pg.connect(process.env.DATABASE_URL, function (err, conn, done) {
//         // watch for any connect issues
//         if (err) console.log(err);
//         conn.query(
//             'UPDATE salesforce.Heroku_Custom__c SET mobile_number__c = $1, MobilePhone = $1 WHERE LOWER(FirstName) = LOWER($2) AND LOWER(LastName) = LOWER($3) AND LOWER(Email) = LOWER($4)',
//             [req.body.phone.trim(), req.body.firstName.trim(), req.body.lastName.trim(), req.body.email.trim()],
//             function(err, result) {
//                // --host=ec2-3-218-149-60.compute-1.amazonaws.com --port=5432 --username=zehwrzskzdkntg --password --dbname=ds3g3vqpf9qpk
//                 if (err != null || result.rowCount == 0) {
//                   conn.query('INSERT INTO salesforce.Heroku_Custom__c (Name, age__c, dob__c, email__c, first_name__c, last_name__c, mobile_number__c) VALUES ($1, $2, $3, $4, $5,$6,$7)',
//                   [req.body.phone.trim(), req.body.phone.trim(), req.body.firstName.trim(), req.body.lastName.trim(), req.body.email.trim()],
//                   function(err, result) {
//                     done();
//                     if (err) {
//                         res.status(400).json({error: err.message});
//                     }
//                     else {
//                         // this will still cause jquery to display 'Record updated!'
//                         // eventhough it was inserted
//                         res.json(result);
//                     }
//                   });
//                 }
//                 else {
//                     done();
//                     res.json(result);
//                 }
//             }
//         );
//     });
// });

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
