const Plot = require("../models/Plot");

/* ADD PLOT */

exports.addPlot = async (req, res) => {

  try {

    const plot = new Plot(req.body);

    await plot.save();

    res.status(201).json({
      message: "Plot Added Successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

/* GET ALL PLOTS */

exports.getPlots = async (req, res) => {

  try {

    const plots = await Plot.find();

    res.json(plots);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

/* DELETE PLOT */

exports.deletePlot = async (req, res) => {

  try {

    await Plot.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Plot Deleted Successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

/* UPDATE PLOT */

exports.updatePlot = async (req, res) => {

  try {

    await Plot.findByIdAndUpdate(

      req.params.id,

      req.body

    );

    res.json({
      message: "Plot Updated"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

/* BOOK PLOT */

exports.bookPlot = async (req, res) => {

  try {

    const {

      customerName,
      customerPhone,
      customerEmail,
      customerAadhaar

    } = req.body;

    await Plot.findByIdAndUpdate(

      req.params.id,

      {

        booked: true,

        customerName,
        customerPhone,
        customerEmail,
        customerAadhaar,

        bookingDate: new Date()

      }

    );

    res.json({
      message: "Plot Booked Successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

/* CANCEL BOOKING */

exports.cancelBooking = async (req, res) => {

  try {

    await Plot.findByIdAndUpdate(

      req.params.id,

      {

        booked: false,

        customerName: "",

        customerPhone: "",

        customerEmail: "",

        customerAadhaar: "",

        bookingDate: null

      }

    );

    res.json({
      message: "Booking Cancelled"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

/* AREA SUGGESTION */

exports.suggestArea = async (req, res) => {

  const { budget } = req.body;

  let suggestions = [];

  if (budget <= 500000) {

    suggestions = [

      "Village Side",

      "Budget Township",

      "Rural Area"

    ];

  }

  else if (budget <= 2000000) {

    suggestions = [

      "Suburban Area",

      "Residential Zone",

      "Developing Area"

    ];

  }

  else {

    suggestions = [

      "Premium Area",

      "Luxury Zone",

      "Commercial Area"

    ];

  }

  res.json(suggestions);

};

/* REVENUE */

exports.getRevenue = async (req, res) => {

  try {

    const bookedPlots = await Plot.find({

      booked: true

    });

    let revenue = 0;

    bookedPlots.forEach((plot) => {

      revenue += Number(plot.budget);

    });

    res.json({

      totalPlots: bookedPlots.length,

      totalRevenue: revenue

    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};
