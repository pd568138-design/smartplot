import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddPlot() {

  const navigate = useNavigate();

  const [plots, setPlots] = useState([]);

  const [data, setData] = useState({

    /* PLOT DETAILS */

    area: "",
    location: "",
    budget: "",
    size: "",
    description: "",

    waterFacility: false,
    drainageFacility: false,

    /* SELLER DETAILS */

    sellerName: "",
    sellerPhone: "",
    sellerEmail: "",
    sellerAddress: ""

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

  /* ADD PLOT */

  const addPlot = async () => {

    try {

      await axios.post(

        "http://localhost:5000/plots",

        data

      );

      alert("Plot Added Successfully");

      setData({

        area: "",
        location: "",
        budget: "",
        size: "",
        description: "",

        waterFacility: false,
        drainageFacility: false,

        sellerName: "",
        sellerPhone: "",
        sellerEmail: "",
        sellerAddress: ""

      });

      fetchPlots();

    } catch (error) {

      console.log(error);

      alert("Failed To Add Plot");

    }

  };

  /* DELETE PLOT */

  const deletePlot = async (id) => {

    try {

      await axios.delete(
        `http://localhost:5000/plots/${id}`
      );

      alert("Plot Deleted Successfully");

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

        <h1>🏡 Add New Plot</h1>

        <button
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

      </div>

      {/* ADD PLOT FORM */}

      <div className="card">

        <h2>Plot Details</h2>

        <input
          type="text"
          placeholder="Area"
          value={data.area}
          onChange={(e) =>
            setData({
              ...data,
              area: e.target.value
            })
          }
        />

        <input
          type="text"
          placeholder="Location"
          value={data.location}
          onChange={(e) =>
            setData({
              ...data,
              location: e.target.value
            })
          }
        />

        <input
          type="number"
          placeholder="Budget"
          value={data.budget}
          onChange={(e) =>
            setData({
              ...data,
              budget: e.target.value
            })
          }
        />

        <input
          type="text"
          placeholder="Plot Size"
          value={data.size}
          onChange={(e) =>
            setData({
              ...data,
              size: e.target.value
            })
          }
        />

        <textarea
          placeholder="Description"
          value={data.description}
          onChange={(e) =>
            setData({
              ...data,
              description: e.target.value
            })
          }
          style={{
            width: "100%",
            height: "100px",
            marginTop: "15px",
            padding: "10px",
            borderRadius: "10px"
          }}
        />

        {/* FACILITIES */}

        <div style={{ marginTop: "20px" }}>

          <label>

            <input
              type="checkbox"
              checked={data.waterFacility}
              onChange={(e) =>
                setData({
                  ...data,
                  waterFacility: e.target.checked
                })
              }
            />

            {" "}💧 Water Facility

          </label>

        </div>

        <div style={{ marginTop: "15px" }}>

          <label>

            <input
              type="checkbox"
              checked={data.drainageFacility}
              onChange={(e) =>
                setData({
                  ...data,
                  drainageFacility: e.target.checked
                })
              }
            />

            {" "}🚰 Drainage Facility

          </label>

        </div>

        {/* SELLER DETAILS */}

        <h2 style={{ marginTop: "30px" }}>
          👨 Seller Details
        </h2>

        <input
          type="text"
          placeholder="Seller Name"
          value={data.sellerName}
          onChange={(e) =>
            setData({
              ...data,
              sellerName: e.target.value
            })
          }
        />

        <input
          type="text"
          placeholder="Seller Phone"
          value={data.sellerPhone}
          onChange={(e) =>
            setData({
              ...data,
              sellerPhone: e.target.value
            })
          }
        />

        <input
          type="email"
          placeholder="Seller Email"
          value={data.sellerEmail}
          onChange={(e) =>
            setData({
              ...data,
              sellerEmail: e.target.value
            })
          }
        />

        <input
          type="text"
          placeholder="Seller Address"
          value={data.sellerAddress}
          onChange={(e) =>
            setData({
              ...data,
              sellerAddress: e.target.value
            })
          }
        />

        <button
          style={{
            marginTop: "25px"
          }}
          onClick={addPlot}
        >
          Add Plot
        </button>

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
                {plot.description}
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

              {/* BOOKING STATUS */}

              {

                plot.booked ? (

                  <div
                    style={{
                      marginTop: "20px"
                    }}
                  >

                    <h3 style={{ color: "red" }}>
                      🔴 Plot Booked
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

                  </div>

                ) : (

                  <h3
                    style={{
                      color: "lightgreen"
                    }}
                  >
                    🟢 Plot Available
                  </h3>

                )

              }

              <button
                style={{
                  background: "red",
                  marginTop: "20px"
                }}
                onClick={() =>
                  deletePlot(plot._id)
                }
              >
                Delete Plot
              </button>

            </div>

          ))

        }

      </div>

    </div>

  );

}