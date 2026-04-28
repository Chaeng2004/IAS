import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import CiaIntroduction from "./CiaIntroduction";
import CiaConfidentiality from "./CiaConfidentiality";
import CiaIntegrity from "./CiaIntegrity";
import CiaAvailability from "./CiaAvailability";
import CiaQuiz from "./CiaQuiz";
import { CRIMSON } from "../../styles/authStyle";

export default function CiaLessonContainer({ isCompleted, onComplete }) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;

  const renderPage = () => {
    switch (currentPage) {
      case 1: return <CiaIntroduction />;
      case 2: return <CiaConfidentiality />;
      case 3: return <CiaIntegrity />;
      case 4: return <CiaAvailability />;
      case 5: return <CiaQuiz isCompleted={isCompleted} onComplete={onComplete} />;
      default: return <CiaIntroduction />;
    }
  };

  return (
    <div style={{ background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "8px", padding: "24px", marginBottom: "24px" }}>
      
      <div style={{ display: "flex", gap: "8px", marginBottom: "24px", alignItems: "center", borderBottom: "1px solid #e2e8f0", paddingBottom: "16px" }}>
        {[1, 2, 3, 4, 5].map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            style={{
              width: "28px", height: "28px", borderRadius: "50%",
              background: currentPage === page ? CRIMSON : "#475569",
              color: "#fff", border: "none", cursor: "pointer",
              fontWeight: "bold", fontSize: "12px", display: "flex", alignItems: "center", justifyContent: "center"
            }}
          >
            {page}
          </button>
        ))}
        {currentPage < totalPages && (
          <button onClick={() => setCurrentPage(currentPage + 1)} style={{ background: "none", border: "none", cursor: "pointer", color: "#475569", display: "flex", alignItems: "center" }}>
            <ArrowRight size={20} />
          </button>
        )}
      </div>

      <div style={{ minHeight: "300px" }}>
        {renderPage()}
      </div>
    </div>
  );
}