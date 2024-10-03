const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    ptype: {
      type: String,
      required: true,
    }, 
    id: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    age: {
      type: String,
      required: true,
    },
    fname: {
      type: String,
      required: true,
      minlength: 3,
    },
    mname: {
      type: String,
      required: true,
      minlength: 3,
    },
    lname: {
      type: String,
      required: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      unique:true,
    },
    gender: {
      type: String,
      required: true,
    },

    provice: {
      type: String,
      required: false,

    },
    district: {
      type: String,
      required: false,

    },
    street: {
      type: String,
      required: false,

    },
    city: {
      type: String,
      required: false,

    },
    pcode: {
      type: String,
      required: false,

    },
    phone: {
      type: String,
      required: false,
      

    },
    mstatus: {
      type: String,
      required: false,

    },

    refname: {
      type: String,
      required: false,

    },
    relname: {
      type: String,
      required: false,

    },
    relation: {
      type: String,
      required: false,
    },

    rephone: {
      type: String,
      required: false,
    },
    takingmedicine: {
      type: String,
      required: false,
    },
    answer: {
      type: String,
      required: false,
    },
    anyallergies: {
      type: String,
      required: false,
    },
    anwserall: {
      type: String,
      required: false,
    },

    weight: {
      type: String,
      required: false,

    },
    height: {
      type: String,
      required: false,

    },

    isDeleted: {
      type: Boolean,
      default: false,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

patientSchema.statics.findRecentlyDeleted = function () {
  return this.find({ isDeleted: true });
};

module.exports = mongoose.model("patients", patientSchema);
