const router = require("express").Router();

const Plot = require("../models/Plot");

/* =========================================
   AREA SUGGESTION
========================================= */

router.post("/suggest-area", async (req, res) => {

  try {

    const { budget } = req.body;

    let suggestions = [];

    if (budget <= 500000) {

      suggestions = [
        "Village Side",
        "Budget Township",
        "Rural Area"
      ];

    } else if (budget <= 2000000) {

      suggestions = [
        "Suburban Area",
        "Residential Zone",
        "Developing City"
      ];

    } else {

      suggestions = [
        "Premium City",
        "Luxury Villa Zone",
        "Commercial Area"
      ];

    }

    res.json(suggestions);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

});

/* =========================================
   ADD NEW PLOT
========================================= */

router.post("/plots", async (req, res) => {

  try {

    const plot = new Plot({

      area: req.body.area,

      location: req.body.location,

      budget: req.body.budget,

      size: req.body.size,

      description: req.body.description,

      waterFacility: req.body.waterFacility,

      drainageFacility: req.body.drainageFacility,

      sellerName: req.body.sellerName,

      sellerPhone: req.body.sellerPhone,

      sellerEmail: req.body.sellerEmail,

      sellerAddress: req.body.sellerAddress

    });

    await plot.save();

    res.json({
      message: "Plot Added Successfully"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Failed To Add Plot"
    });

  }

});

/* =========================================
   GET ALL PLOTS
========================================= */

router.get("/plots", async (req, res) => {

  try {

    const plots = await Plot.find();

    res.json(plots);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Failed To Fetch Plots"
    });

  }

});

/* =========================================
   DELETE PLOT
========================================= */

router.delete("/plots/:id", async (req, res) => {

  try {

    await Plot.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Plot Deleted Successfully"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Delete Failed"
    });

  }

});

/* =========================================
   BOOK PLOT
========================================= */

router.put("/book/:id", async (req, res) => {

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

    console.log(error);

    res.status(500).json({
      message: "Booking Failed"
    });

  }

});

/* =========================================
   CANCEL BOOKING
========================================= */

router.put("/cancel-booking/:id", async (req, res) => {

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

    console.log(error);

    res.status(500).json({
      message: "Cancel Failed"
    });

  }

});

/* =========================================
   REVENUE DETAILS
========================================= */

router.get("/revenue", async (req, res) => {

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

    console.log(error);

  }

});

module.exports = router;