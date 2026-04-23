import axios from "axios";

export default function GrievanceList({ data, refresh }) {
  const token = localStorage.getItem("token");

  const deleteItem = async (id) => {
    await axios.delete(
      `http://localhost:5000/api/grievances/${id}`,
      { headers: { Authorization: token } }
    );
    refresh();
  };

  return (
    <div>
      {data.length === 0 && <p>No grievances found</p>}

      {data.map((g) => (
        <div className="card" key={g._id}>
          <h3>{g.title}</h3>
          <p>{g.description}</p>
          <p><b>Category:</b> {g.category}</p>
          <p><b>Status:</b> {g.status}</p>

          <button onClick={() => deleteItem(g._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}