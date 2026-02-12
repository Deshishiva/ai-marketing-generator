"use client";

import { useState, useEffect } from "react";

export default function Page() {
  const [product, setProduct] = useState("");
  const [audience, setAudience] = useState("");
  const [tone, setTone] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  async function generateContent() {
    if (!product || !audience || !tone) {
      setReply("Please fill all fields.");
      return;
    }

    setLoading(true);
    setReply("");

    try {
      const response = await fetch("http://localhost:3001/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          product,
          audience,
          tone
        })
      });

      if (!response.ok) {
        throw new Error("Server error");
      }

      const data = await response.json();
      setReply(data.reply);
    } catch (error) {
      console.error("Frontend Error:", error);
      setReply("Something went wrong. Please try again.");
    }

    setLoading(false);
  }

  return (
    <>
      <div className={`page ${mounted ? "fadeIn" : ""}`}>
        <div className="card slideUp">
          <h1 className="title">AI Marketing Generator </h1>

          <input
            className="input"
            placeholder="Product Name"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
          />

          <input
            className="input"
            placeholder="Target Audience"
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
          />

          <input
            className="input"
            placeholder="Tone (Bold, Funny, Professional...)"
            value={tone}
            onChange={(e) => setTone(e.target.value)}
          />

          <button
            onClick={generateContent}
            disabled={loading}
            className="button"
          >
            {loading ? "Generating..." : "Generate Content"}
          </button>

          {reply && (
            <div className="result">
              <div style={{ whiteSpace: "pre-wrap" }}>{reply}</div>
            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
        html, body {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
          background: #000;
        }
      `}</style>

      <style jsx>{`
        .page {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(-45deg, #5c4d7e, #203a43, #1a2588, #8b80be);
          background-size: 400% 400%;
          animation: gradientMove 12s ease infinite;
          opacity: 0;
          transition: opacity 1s ease;
          font-family: sans-serif;
        }

        .fadeIn {
          opacity: 1;
        }

        .card {
          width: 100%;
          max-width: 700px;
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(20px);
          padding: 40px;
          border-radius: 20px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);
          color: white;
        }

        .slideUp {
          animation: slideUp 0.8s ease forwards;
        }

        .title {
          text-align: center;
          margin-bottom: 30px;
        }

        .input {
          width: 100%;
          padding: 12px;
          margin-bottom: 15px;
          border-radius: 10px;
          border: none;
          outline: none;
          font-size: 14px;
          transition: 0.3s;
        }

        .input:focus {
          transform: scale(1.02);
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.62);
        }

        .button {
          width: 100%;
          padding: 14px;
          border-radius: 12px;
          border: none;
          background: linear-gradient(90deg, #ff8a00, #e52e71);
          color: white;
          font-weight: bold;
          cursor: pointer;
          transition: 0.3s ease;
        }

        .button:hover {
          transform: scale(1.05);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);
        }

        .button:active {
          transform: scale(0.95);
        }

        .button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .result {
          margin-top: 25px;
          background: rgba(0, 0, 0, 0.3);
          padding: 20px;
          border-radius: 15px;
          animation: fadeUp 0.5s ease forwards;
        }

        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes slideUp {
          from {
            transform: translateY(40px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}
