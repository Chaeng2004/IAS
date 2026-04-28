import React, { useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import { CRIMSON } from "../../styles/authStyle"; 

export default function CiaQuiz({ isCompleted, onComplete, answers, setAnswers }) {
  const [lessonError, setLessonError] = useState("");
  
  const handleOptionChange = (question, value) => {
    setAnswers({ ...answers, [question]: value });
  };

  const handleSubmitLesson = () => {
    if (
      answers.q1 === "Solution 3" &&
      answers.q2 === "Solution 1" &&
      answers.q3 === "Solution 4" &&
      answers.q4 === "Solution 2"
    ) {
      setLessonError("");
      onComplete();
    } else {
      setLessonError("One or more answers are incorrect. Please review the CIA Triad principles and try again.");
    }
  };

  return (
    <div style={{ animation: "fadeIn 0.3s" }}>
      <p style={{ color: "#444", fontSize: "14px", lineHeight: "1.6", marginBottom: "16px" }}>
        Now it's time for a quiz! Answer the following question to check if you understood the topic.
      </p>
      <p style={{ color: "#444", fontSize: "14px", lineHeight: "1.6", marginBottom: "24px" }}>
        Today, most systems are protected by a firewall. A properly configured firewall can prevent malicious entities from accessing a system and helps protect an organization's resources. For this quiz, imagine a system that handles personal data but is not protected by a firewall:
      </p>
      
      <div style={{ opacity: isCompleted ? 0.7 : 1, pointerEvents: isCompleted ? "none" : "auto" }}>
        {['q1', 'q2', 'q3', 'q4'].map((qId, index) => {
           const questions = [
             "1. How could an intruder harm the security goal of confidentiality?",
             "2. How could an intruder harm the security goal of integrity?",
             "3. How could an intruder harm the security goal of availability?",
             "4. What happens if at least one of the CIA security goals is harmed?"
           ];
           const optionsList = [
             ["By deleting all the databases.", "By stealing a database where general configuration information for the system is stored.", "By stealing a database where names and emails are stored and uploading it to a website.", "Confidentiality can't be harmed by an intruder."],
             ["By changing the names and emails of one or more users stored in a database.", "By listening to incoming and outgoing network traffic.", "By bypassing the access control mechanisms used to manage database access.", "Integrity can only be harmed when the intruder has physical access to the database."],
             ["By exploiting a software bug that allows the attacker to bypass the normal authentication mechanisms for a database.", "By redirecting sensitive emails to other individuals.", "Availability can only be harmed by unplugging the power supply of the storage devices.", "By launching a denial of service attack on the servers."],
             ["All three goals must be harmed for the system's security to be compromised; harming just one goal has no effect on the system's security.", "The system's security is compromised even if only one goal is harmed.", "It is acceptable if an attacker reads or changes data since at least some of the data is still available. The system's security is compromised only if its availability is harmed.", "It is acceptable if an attacker changes data or makes it unavailable, but reading sensitive data is not tolerable. The system's security is compromised only if its confidentiality is harmed."]
           ];

           return (
             <div key={qId} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "20px", marginBottom: "16px" }}>
                <div style={{ fontWeight: 600, fontSize: "15px", color: "#111", marginBottom: "12px" }}>{questions[index]}</div>
                {optionsList[index].map((opt, i) => (
                  <label key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px", cursor: "pointer", padding: "8px", borderRadius: "6px", transition: "background 0.2s", fontSize: "14px", color: "#334155" }}>
                    <input type="radio" name={qId} value={`Solution ${i+1}`} checked={answers[qId] === `Solution ${i+1}`} onChange={(e) => handleOptionChange(qId, e.target.value)} style={{ marginTop: "2px" }}/>
                    Solution {i+1}: {opt}
                  </label>
                ))}
             </div>
           );
        })}
      </div>

      {!isCompleted ? (
        <div style={{ marginTop: "20px" }}>
          <button onClick={handleSubmitLesson} style={{ padding: "10px 20px", background: "#f8fafc", color: "#334155", border: "1px solid #cbd5e1", borderRadius: "4px", cursor: "pointer", fontWeight: "600" }}>
            Submit answers
          </button>
          {lessonError && (
            <p style={{ color: CRIMSON, fontSize: "14px", marginTop: "12px", display: "flex", alignItems: "center", gap: "6px" }}>
              <XCircle size={16} /> {lessonError}
            </p>
          )}
        </div>
      ) : (
        <div style={{ marginTop: "20px", display: "inline-flex", alignItems: "center", gap: "8px", padding: "12px 16px", background: "#dcfce7", color: "#166534", borderRadius: "6px", fontWeight: "600", border: "1px solid #bbf7d0" }}>
          <CheckCircle size={20} /> Lesson Successfully Completed!
        </div>
      )}
    </div>
  );
}