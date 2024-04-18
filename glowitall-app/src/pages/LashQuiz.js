import React, { useState, useEffect } from "react";
import Meta from "../components/Meta";
import Container from "../components/Container";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const lashQuestions = [
  {
    question: "When you open your eyes, do you have crease?",
    options: [
      {
        label: "Yes",
        image: "https://img.freepik.com/free-photo/well-kept-portrait-beautiful-young-woman-white-studio-background-concept-cosmetics-makeup-natural-eco-treatment-skin-care-shiny-healthy-look-fashion-healthcare-copyspace_155003-23272.jpg?w=740&t=st=1679955131~exp=1679955731~hmac=250df9b96748d46b36d9ceadb89785361d11f58f5e855b3e61555e4ad398dd8d",
      },
      {
        label: "No",
        image: "https://img.freepik.com/free-photo/face-young-woman-gray-background_155003-16486.jpg?size=626&ext=jpg&uid=R97680113&ga=GA1.2.1059806880.1679947817&semt=ais",
      },
    ],
  },
  {
    question: "Which outer eye corner placement resembles your's?",
    options: [
      {
        label: "Bellow The Iris",
        image:
          "/Images/chinese2.png",
      },
      {
        label: "Above The Iris",
        image:
          "/Images/chinese1.png",
      },
      {
        label: "Even With The Iris",
        image:
          "/Images/chinese.png",
      },
    ],
  },
  {
    question: "Which lash length do you prefer?",
    options: [
      {
        label: "High Drama",
        image: "/Images/HighDrama.png",
      },
      {
        label: "Classic Lash Length",
        image: "/Images/Lash2.png",
      },
      {
        label: "Stuble & Natural",
        image: "/Images/Lash3.png",
      },
    ],
  },
  {
    question: "Which lash volume do you prefer?",
    options: [
      {
        label: "Just a touch",
        image: "/Images/V1.png",
      },
      {
        label: "Little Volume",
        image: "/Images/v2.png",
      },
      {
        label: "High Volume",
        image: "/Images/v3.png",
      },
    ],
  },
  {
    question: "How often do you wear false lashes?",
    options: [
      {
        label: "Everday",
      },
      {
        label: "Special Events",
      },
      {
        label: "Parties",
      },
      {
        label: "For Bride",
      },
      {
        label: "Any",
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

const LashQuiz = () => {
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
    if (currentQuestion >= lashQuestions.length) {
      const selected = selectedOptions.map((option) => option.label);
      const all_data = {
        selected: selected,
        category: "eyes makeup",
        porductType: "lash",
      };
      navigate("/SC-Result", { state: { data: all_data } });
    }
  }, [currentQuestion]);

  const currentQuestionData = lashQuestions[currentQuestion];
  const nextQuestionData = lashQuestions[currentQuestion + 1];

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

export default LashQuiz;

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
