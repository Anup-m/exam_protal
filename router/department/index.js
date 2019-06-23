var express = require("express");

var router = express();

//Department  Model
var Department = require("../../models/Department");

router.post('/addDepartment', (req, res) => {
    const dept = new Department(req.body);
    dept.save().then(result => {
        res.status(201).json({
            msg:'Department Added...',
            dept: result
        })
    }).catch(error =>{
        console.log(error);
        res.status(500).json({
            error:error
        })
    });
});


module.exports = router;