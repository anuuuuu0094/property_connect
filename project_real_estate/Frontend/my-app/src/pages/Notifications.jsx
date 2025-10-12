import { useEffect, useState } from "react";
import api from "../api/client";

export default function Notifications() {
  const [items, setItems] = useState([]);
  const load = async () => {
    const { data } = await api.get("/notifications");
    setItems(data);
  };
  useEffect(() => { load(); }, []);

  const mark = async (id) => {
    await api.put(`/notifications/${id}/read`);
    load();
  };

  const markAll = async () => {
    await api.put(`/notifications/mark-all/read`);
    load();
  };

  const del = async (id) => {
    await api.delete(`/notifications/${id}`);
    load();
  };

  const getTypeColor = (type) => {
    switch(type) {
      case "info": return "#2196F3";   // blue
      case "success": return "#4CAF50"; // green
      case "warning": return "#FFC107"; // yellow
      case "error": return "#F44336";   // red
      default: return "#9E9E9E";        // gray
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "20px auto", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ textAlign: "center", color: "#333" }}>Notifications</h2>
      <button 
        onClick={markAll} 
        style={{ backgroundColor: "#673AB7", color: "#fff", padding: "8px 16px", border: "none", borderRadius: 5, cursor: "pointer", marginBottom: 16 }}
      >
        Mark all as read
      </button>
      {items.length === 0 ? (
        <p style={{ textAlign: "center", color: "#777" }}>No notifications.</p>
      ) : items.map(n => (
        <div 
          key={n._id} 
          style={{ 
            border: `2px solid ${getTypeColor(n.type)}`, 
            borderRadius: 8, 
            margin: "8px 0", 
            padding: 16, 
            opacity: n.read ? 0.6 : 1,
            backgroundColor: "#f9f9f9",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <b style={{ color: getTypeColor(n.type), fontSize: 16 }}>{n.title}</b>
            <small style={{ fontStyle: "italic", color: "#555" }}>({n.type})</small>
          </div>
          <p style={{ margin: "8px 0", color: "#333" }}>{n.message}</p>
          <div>
            {!n.read && (
              <button 
                onClick={() => mark(n._id)} 
                style={{ marginRight: 8, backgroundColor: "#4CAF50", color: "#fff", border: "none", borderRadius: 5, padding: "6px 12px", cursor: "pointer" }}
              >
                Mark as read
              </button>
            )}
            <button 
              onClick={() => del(n._id)} 
              style={{ backgroundColor: "#F44336", color: "#fff", border: "none", borderRadius: 5, padding: "6px 12px", cursor: "pointer" }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
