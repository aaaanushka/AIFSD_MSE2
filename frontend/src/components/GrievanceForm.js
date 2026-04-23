import React, { useState } from "react";
import axios from "axios";

function GrievanceForm({ refresh }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Academic"
  });

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");

    await axios.post(
      "http://localhost:5000/api/grievances",
      form,
      { headers: { Authorization: token } }
    );

    setForm({ title: "", description: "", category: "Academic" });
    refresh();
  };

  return (
    <div className="card">
      <h3>Submit Grievance</h3>

      <input
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <input
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      <select
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
      >
        <option>Academic</option>
        <option>Hostel</option>
        <option>Transport</option>
        <option>Other</option>
      </select>

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default GrievanceForm;