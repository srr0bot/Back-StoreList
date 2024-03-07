const { Schema, model } = require("mongoose");

/**
 * Schema del empleado
 */
const EmployeeSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    role: {
      type: String,
      required: true,
    },
});

module.exports = model("Employee", EmployeeSchema);