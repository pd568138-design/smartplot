
import { useNavigate } from "react-router-dom";

export default function Home(){

  const navigate = useNavigate();

  return(
    <div className="hero">

      <h1>
        AI <span>SmartPlot</span>
      </h1>

      <p>
        Intelligent real-estate and plotting management platform powered by AI analytics,
        modern dashboards, customer management and smart investment insights.
      </p>

      <button onClick={()=>navigate("/dashboard")}>
        Explore Dashboard
      </button>

    </div>
  )
}
