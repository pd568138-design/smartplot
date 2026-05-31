import { useEffect, useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

export default function SearchPlot() {

  const navigate = useNavigate();

  const [plots, setPlots] = useState([]);

  const [budget, setBudget] = useState("");

  const [suggestions, setSuggestions] = useState([]);

  const [customer, setCustomer] = useState({

    customerName: "",

    customerPhone: "",

    customerEmail: "",

    customerAadhaar: ""

  });

  /* FETCH PLOTS */

  const fetchPlots = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/plots"
      );

      setPlots(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchPlots();

  }, []);

  /* SUGGEST AREA */

  const suggestArea = async () => {

    try {

      const response = await axios.post(

        "http://localhost:5000/suggest-area",

        {
          budget
        }

      );

      setSuggestions(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  /* BOOK PLOT */

  const bookPlot = async (id) => {

    try {

      await axios.put(

        `http://localhost:5000/book/${id}`,

        customer

      );

      alert("Plot Booked Successfully");

      fetchPlots();

    } catch (error) {

      console.log(error);

    }

  };

  /* CANCEL BOOKING */

  const cancelBooking = async (id) => {

    try {

      await axios.put(

        `http://localhost:5000/cancel-booking/${id}`

      );

      alert("Booking Cancelled");

      fetchPlots();

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="dashboard">

      {/* TOP BAR */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px"
        }}
      >

        <h1>🏡 AI SmartPlot</h1>

        <button
          onClick={() => navigate("/addplot")}
        >
          ➕ Add New Plot
        </button>

      </div>

      {/* BUDGET SECTION */}

      <div className="card">

        <h2>Find Plot By Budget</h2>

        <input
          type="number"
          placeholder="Enter Your Budget"
          value={budget}
          onChange={(e) =>
            setBudget(e.target.value)
          }
        />

        <button
          onClick={suggestArea}
          style={{
            marginTop: "20px"
          }}
        >
          Suggest Area
        </button>

        {

          suggestions.length > 0 && (

            <div
              style={{
                marginTop: "20px"
              }}
            >

              <h3>Suggested Areas</h3>

              {

                suggestions.map((item, index) => (

                  <p key={index}>
                    📍 {item}
                  </p>

                ))

              }

            </div>

          )

        }

      </div>

      {/* ALL PLOTS */}

      <div
        className="dashboard-content"
        style={{
          marginTop: "40px"
        }}
      >

        {

          plots.map((plot) => (

            <div
              className="card"
              key={plot._id}
            >

              <h2>{plot.area}</h2>

              <p>
                📍 {plot.location}
              </p>

              <p>
                💰 ₹{plot.budget}
              </p>

              <p>
                📏 {plot.size}
              </p>

              <p>
                📝 {plot.description}
              </p>

              <p>

                💧 Water Facility :

                {

                  plot.waterFacility
                    ? " Available"
                    : " Not Available"

                }

              </p>

              <p>

                🚰 Drainage Facility :

                {

                  plot.drainageFacility
                    ? " Available"
                    : " Not Available"

                }

              </p>

              {/* SELLER DETAILS */}

              <div
                style={{
                  marginTop: "20px"
                }}
              >

                <h3>👨 Seller Details</h3>

                <p>
                  Name : {plot.sellerName}
                </p>

                <p>
                  Phone : {plot.sellerPhone}
                </p>

                <p>
                  Email : {plot.sellerEmail}
                </p>

                <p>
                  Address : {plot.sellerAddress}
                </p>

              </div>

              {/* BOOKING SECTION */}

              {

                plot.booked ? (

                  <div
                    style={{
                      marginTop: "20px"
                    }}
                  >

                    <h3 style={{ color: "red" }}>
                      🔴 Plot Already Booked
                    </h3>

                    <p>
                      👤 {plot.customerName}
                    </p>

                    <p>
                      📞 {plot.customerPhone}
                    </p>

                    <p>
                      📧 {plot.customerEmail}
                    </p>

                    <p>
                      🆔 {plot.customerAadhaar}
                    </p>

                    <button
                      style={{
                        marginTop: "15px",
                        background: "orange"
                      }}
                      onClick={() =>
                        cancelBooking(plot._id)
                      }
                    >
                      Cancel Booking
                    </button>

                  </div>

                ) : (

                  <div
                    style={{
                      marginTop: "20px"
                    }}
                  >

                    <h3 style={{ color: "lightgreen" }}>
                      🟢 Plot Available
                    </h3>

                    <input
                      type="text"
                      placeholder="Customer Name"
                      onChange={(e) =>
                        setCustomer({
                          ...customer,
                          customerName: e.target.value
                        })
                      }
                    />

                    <input
                      type="text"
                      placeholder="Phone Number"
                      onChange={(e) =>
                        setCustomer({
                          ...customer,
                          customerPhone: e.target.value
                        })
                      }
                    />

                    <input
                      type="email"
                      placeholder="Customer Email"
                      onChange={(e) =>
                        setCustomer({
                          ...customer,
                          customerEmail: e.target.value
                        })
                      }
                    />

                    <input
                      type="text"
                      placeholder="Customer Aadhaar"
                      onChange={(e) =>
                        setCustomer({
                          ...customer,
                          customerAadhaar: e.target.value
                        })
                      }
                    />

                    <button
                      style={{
                        marginTop: "15px"
                      }}
                      onClick={() =>
                        bookPlot(plot._id)
                      }
                    >
                      Book Plot
                    </button>

                  </div>

                )

              }

            </div>

          ))

        }

      </div>

    </div>

  );

}