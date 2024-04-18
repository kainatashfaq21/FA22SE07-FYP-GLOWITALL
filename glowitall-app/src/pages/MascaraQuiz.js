import React, { useState, useEffect } from "react";
import Meta from "../components/Meta";
import Container from "../components/Container";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const mascaraQuestions = [
  {
    question: "Which is your preferred lash look?",
    options: [
      {
        label: "False Lash Effect",
        image: "/Images/falselash.jpg",
      },
      {
        label: "Long & Defined",
        image: "/Images/longlashes.jpg",
      },
      {
        label: "Big & Curled",
        image: "/Images/curledlashes.jpg",
      },
      {
        label: "Flarred & Winged",
        image: "/Images/wingedlashes.jpg",
      },
      {
        label: "Bold & Dramatic",
        image: "/Images/boldlashes.jpg",
      },
      {
        label: "Natural & Stuble",
        image: "/Images/lightlash.jpg",
      },
    ],
  },

  {
    question: "Which brush type do you prefer",
    options: [
      {
        label: "Curved Brush for easy application",
        image: "https://img.freepik.com/premium-photo/black-mascara-brush-stroke-closeup-isolated-white-background_360074-20444.jpg?w=826",
      },
      {
        label: "Lash Building Brush for definition",
        image:
          "https://img.freepik.com/free-photo/black-mascara-eyes_144627-21339.jpg?w=740&t=st=1679856768~exp=1679857368~hmac=a35a07980e1a27843f3e013988c3cb49a6153c9051ce0bdca4f2df9c35795746",
      },
      {
        label: "Flexible Brush for suppleness",
        image:
          "https://img.freepik.com/free-photo/top-view-rimmel-white-background_23-2148210694.jpg?w=740&t=st=1679857559~exp=1679858159~hmac=223ef90c9267f0b7932543d21cc51921a862bfb232c4b612a74dbfa2a6f0c06e",
      },
    ],
  },
  {
    question: "What's your go to formula?",
    options: [
      {
        label: "Waterproof",
      },
      {
        label: "Washable",
      },
    ],
  },
  {
    question: "What is the price range you require for the products?",
    options: [
      {
        label: "Cost-Effective",
        image: "https://media.istockphoto.com/id/979015970/vector/price-tag-icon-in-vector.jpg?s=612x612&w=0&k=20&c=4k93vGY0ln3HUoJlPDiWJ8pkUAwybuBYp0O2Na5x58M=",
      },
      {
        label: "High-End",
        image: "https://i.pinimg.com/200x/87/2c/0b/872c0ba4f9cba9d92796fb8861d7810b.jpg",
      },
    ],
  },
];

const MascaraQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const navigate = useNavigate();

  const handleOptionSelect = (option) => {
    setSelectedOptions((prevSelectedOptions) => [
      ...prevSelectedOptions,
      option,
    ]);
    setCurrentQuestion((prevQuestion) => prevQuestion + 1);
  };

  useEffect(() => {
    if (currentQuestion >= mascaraQuestions.length) {
      const selected = selectedOptions.map((option) => option.label);
      const all_data = {
        selected: selected,
        category: "eyes makeup",
        porductType: "mascara",
      };
      navigate("/SC-Result", { state: { data: all_data } });
    }
  }, [currentQuestion]);

  const currentQuestionData = mascaraQuestions[currentQuestion];
  const nextQuestionData = mascaraQuestions[currentQuestion + 1];

  return (
    <>
      <div className="content py-4">
        <div className="text-content" style={textContentStyle}>
          <h4 className="Start-content py-2">
            {currentQuestionData?.question}
          </h4>
          <div className="options-container" style={optionsContainerStyle}>
            {currentQuestionData?.options.map((option, index) => (
              <div className="option" key={index}>
                {option.image && (
                  <div>
                    <img
                      src={option.image}
                      alt={option.label}
                      style={optionImageStyle}
                    />
                    <br />
                  </div>
                )}
                <button
                  className="rec-button"
                  onClick={() => handleOptionSelect(option)}
                  style={optionButtonStyle}
                >
                  <span className="option-label" style={optionLabelStyle}>
                    {option.label}
                  </span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MascaraQuiz;

const textContentStyle = {
  flex: 3,
  padding: "1rem",
};

const optionImageStyle = {
  display: "block",
  margin: "20px",
  marginBottom: "1rem",
  width: "200px",
  height: "200px",
};
const optionButtonStyle = {
  display: "inline-block",
  margin: "20px",
  marginLeft:"55px",
  padding: "0.5rem 1rem",
  borderRadius: "0.25rem",
  backgroundColor: "#ccc",
  border: "none",
  cursor: "pointer",
  maxWidth: "200px",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  transition: "max-width 0.3s",
};

const optionLabelStyle = {
  fontSize: "1rem",
};

const optionsContainerStyle = {
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
};
