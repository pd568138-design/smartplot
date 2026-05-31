import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard(){

  const navigate=useNavigate();

  const [budget,setBudget]=useState("");

  const [suggestions,setSuggestions]=useState([]);

  const getSuggestions=async()=>{

    const response=await axios.post(
      "http://localhost:5000/suggest-area",
      {
        budget:Number(budget)
      }
    );

    setSuggestions(response.data);

  };

  return(

    <div className="dashboard">

      <div className="card">

        <h1>Find Plot Area</h1>

        <input
          type="number"
          placeholder="Enter Budget"
          value={budget}
          onChange={(e)=>setBudget(e.target.value)}
        />

        <button onClick={getSuggestions}>
          Find Area
        </button>

        <div style={{marginTop:"20px"}}>

          {suggestions.map((item,index)=>(

            <p key={index}>
              📍 {item}
            </p>

          ))}

        </div>

        {suggestions.length>0 && (

          <div
            style={{
              display:"flex",
              gap:"20px",
              marginTop:"30px"
            }}
          >

            <button
              onClick={()=>navigate("/search-plot")}
            >
              Search Plot
            </button>

            <button
              onClick={()=>navigate("/add-plot")}
            >
              Add New Plot
            </button>

          </div>

        )}

      </div>

    </div>

  )

}

