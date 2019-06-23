const mongoose = require("mongoose");

//Department schema
const DepartmentSchema = mongoose.Schema({
    dept_name: {
        require: true,
        type: String,
        trim: true
    }    
});

module.exports = mongoose.model("Department", DepartmentSchema);
