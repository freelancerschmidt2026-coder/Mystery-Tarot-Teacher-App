import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./dropdownMenu.css";

const DropdownMenu = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { label: "Sanctuary", path: "/sanctuary" },
    { label: "Dashboard", path: "/dashboard" },
    { label: "Journey Map", path: "/journey" },
    { label: "Design Studio", path: "/design-studio" },
    { label: "Add-Ons Store", path: "/store" },
    { label: "Marketplace", path: "/marketplace" },
    { label: "NotePad", path: "/notepad" },
    { label: "Luna Menu", path: "/luna" },
    { label: "Ritual Mode", path: "/luna/rituals" },
    { label: "Dreamwork", path: "/luna/dreamwork" },
    { label: "Mentor System", path: "/luna/mentor" },
    { label: "Voice Settings", path: "/luna/voice-settings" },
    { label: "Shadow Work Chamber", path: "/shadow-work" },
    { label: "Tarot Timeline", path: "/timeline" },
    { label: "Encyclopedia", path: "/encyclopedia" },
    { label: "Tarot Library", path: "/library" },
    { label: "Courses", path: "/courses" },
    { label: "Lessons", path: "/lessons" },
    { label: "Training", path: "/training" },
    { label: "Showcase Room", path: "/showcase" },
    { label: "Member Profile", path: "/profile" },
    { label: "Reader Ranking", path: "/readers/ranking" }
  ];

  return (
    <div className="dropdown-container">
      <button className="dropdown-toggle" onClick={() => setOpen(!open)}>
        Menu ▾
      </button>

      {open && (
        <div className="dropdown-menu">
          {menuItems.map((item) => (
            <div
              key={item.path}
              className="dropdown-item"
              onClick={() => {
                navigate(item.path);
                setOpen(false);
              }}
            >
              {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
