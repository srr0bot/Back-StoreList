const { Schema, model } = require("mongoose");

/**
 * Schema del departmentos
 */
const DepartmentSchema = new Schema({
    department_name: {
      type: String,
      required: true,
    },
    description: {
        type: String,
        required: true,
    },
    employees: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Employee'
        }
    ]
});

module.exports = model("Departemnt", DepartmentSchema);