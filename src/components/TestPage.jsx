
// src/components/TestPage.jsx
import React, { useState } from "react";
import jsPDF from "jspdf";
import questions from "../data/questions.json";
import scaleImage from "../assets/scale.png";  // ✅ Correct import

const TestPage = () => {
  const [childName, setChildName] = useState("");
  const [startTest, setStartTest] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));

  const handleScore = (score) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentIndex] = score;
    setAnswers(updatedAnswers);
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const totalScore = answers.reduce((sum, val) => sum + (val || 0), 0);

  const getDiagnosis = () => {
    if (totalScore < 70) return "No Autism";
    if (totalScore >= 70 && totalScore <= 106) return "Mild Autism";
    if (totalScore >= 107 && totalScore <= 153) return "Moderate Autism";
    return "Severe Autism";
  };

/*  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("ISAA Autism Screening Result", 20, 20);

    doc.setFontSize(12);
    doc.text(`Child Name: ${childName}`, 20, 40);
    doc.text(`Total Score: ${totalScore}`, 20, 50);
    doc.text(`Diagnosis: ${getDiagnosis()}`, 20, 60);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 70);

    doc.save(`ISAA_Result_${childName.replace(/\s/g, "_")}.pdf`);
  }; */

const downloadPDF = () => {
  const doc = new jsPDF();

  // ---------- Page Setup ----------
  doc.setFontSize(22);
  doc.setTextColor(0, 51, 102); // dark blue title
  doc.text("ISAA Autism Screening Report", 105, 20, null, null, "center");

  // ---------- Child Info Box ----------
  doc.setFillColor(230, 240, 255); // light blue background
  doc.roundedRect(15, 30, 180, 30, 5, 5, "F");

  doc.setTextColor(0, 0, 0);
  doc.setFontSize(12);
  doc.text(`Child Name: ${childName}`, 20, 45);
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 55);

  // ---------- Score Box ----------
  doc.setFillColor(200, 255, 200); // light green background
  doc.roundedRect(15, 70, 180, 25, 5, 5, "F");

  doc.setTextColor(0, 102, 0); // green text
  doc.setFontSize(14);
  doc.text(`Total Score: ${totalScore}`, 20, 85);
  doc.text(`Diagnosis: ${getDiagnosis()}`, 20, 95);

  // ---------- Optional: Scale Image ----------
  const img = scaleImage; // imported scale image
  doc.addImage(img, "PNG", 60, 110, 90, 40); // x, y, width, height

  // ---------- Optional: Questions & Answers ----------
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(12);
  let startY = 160;
  answers.forEach((score, index) => {
    if (startY > 270) { // Add new page if overflowing
      doc.addPage();
      startY = 20;
    }
    doc.text(`Q${index + 1}: ${questions[index]} - Score: ${score}`, 15, startY);
    startY += 8;
  });

  // ---------- Save PDF ----------
  doc.save(`ISAA_Result_${childName.replace(/\s/g, "_")}.pdf`);
};


  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
      {!startTest ? (
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">Enter Child's Name</h1>
          <input
            className="w-full p-2 border rounded"
            type="text"
            value={childName}
            onChange={(e) => setChildName(e.target.value)}
            placeholder="e.g., Aarav Sharma"
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={() => {
              if (childName.trim() !== "") setStartTest(true);
            }}
          >
            Start Test
          </button>
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-semibold mb-4">Child: {childName}</h2>

          {/* ✅ Response Scale Image */}
          <div className="mt-6 flex justify-center">
            <img 
              src={scaleImage} 
              alt="Answer scale" 
              className="w-80 h-auto object-contain"
            />
          </div>



          <div className="bg-gray-100 p-4 rounded shadow">
            <p className="text-lg mb-4">
              Q{currentIndex + 1}. {questions[currentIndex]}
            </p>
            <div className="flex gap-3">
              {[1, 2, 3, 4, 5].map((score) => (
                <button
                  key={score}
                  className={`px-4 py-2 rounded border ${
                    answers[currentIndex] === score
                      ? "bg-blue-600 text-white"
                      : "bg-white"
                  }`}
                  onClick={() => handleScore(score)}
                >
                  {score}
                </button>
              ))}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="w-full bg-gray-300 h-4 rounded-full">
              <div
                className="bg-blue-500 h-4 rounded-full"
                style={{
                  width: `${((currentIndex + 1) / questions.length) * 100}%`,
                }}
              ></div>
            </div>
            <p className="text-center mt-2">
              {currentIndex + 1}/{questions.length} Questions Answered
            </p>
          </div>

          {/* Final Score + Diagnosis + PDF */}
          {currentIndex === questions.length - 1 &&
            answers[answers.length - 1] !== null && (
              <div className="mt-6 p-4 border rounded bg-green-100 text-green-800 font-semibold">
                <p>Total Score: {totalScore}</p>
                <p>Diagnosis: {getDiagnosis()}</p>
                <button
                  onClick={downloadPDF}
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Download Result as PDF
                </button>
              </div>
            )}
        </div>
      )}
    </div>
  );
};

export default TestPage;


