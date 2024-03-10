const mongoose = require('mongoose');
const moment = require('moment-timezone');

const activitySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Referencia al modelo de usuario
    required: true
  },
  timestamp: {
    type: Date,
    required: true,
    set: function(value) {
      return moment(value).tz('America/Bogota');
    }
  }
});

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;
