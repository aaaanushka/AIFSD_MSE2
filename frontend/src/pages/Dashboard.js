import React, { useEffect, useState } from "react";
import axios from "axios";
import GrievanceForm from "../components/GrievanceForm";
import GrievanceList from "../components/GrievanceList";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // ================= FETCH =================
  const fetchData = async () => {
    const res = await axios.get(
      "https://aifsd-mse2-1-r9a9.onrender.com/api/grievances",
      { headers: { Authorization: token } }
    );
    setData(res.data);
  };

  // ================= SEARCH =================
  const searchData = async () => {
    const res = await axios.get(
      `https://aifsd-mse2-1-r9a9.onrender.com/api/grievances?search=${search}`,
      { headers: { Authorization: token } }
    );
    setData(res.data);
  };

  // ================= LOAD =================
  useEffect(() => {
    if (!token) navigate("/");
    else fetchData();
  }, [token, navigate]);

  // ================= LOGOUT =================
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={{ maxWidth: "900px", margin: "20px auto" }}>

      {/* Header */}
      <div className="card" style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Dashboard</h2>
        <button onClick={logout}>Logout</button>
      </div>

      {/* Form + Search */}
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>

        <div style={{ flex: 1 }}>
          <GrievanceForm refresh={fetchData} />
        </div>

        <div className="card" style={{ flex: 1 }}>
          <h3>Search</h3>

          <input
            value={search}
            placeholder="Search..."
            onChange={(e) => setSearch(e.target.value)}
          />

          <button onClick={searchData}>Search</button>

          <button onClick={fetchData} style={{ marginTop: "10px" }}>
            Reset
          </button>
        </div>
      </div>

      {/* List */}
      <div style={{ marginTop: "20px" }}>
        <GrievanceList data={data} refresh={fetchData} />
      </div>
    </div>
  );
}

export default Dashboard;