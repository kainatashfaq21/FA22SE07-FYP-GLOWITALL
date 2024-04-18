import React, { useState, useEffect } from "react";
import Meta from "../components/Meta";
import Container from "../components/Container";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const blushQuestions = [
  {
    question: "How do you like it?",
    options: [
      {
        label: "Powder",
        image:
          "https://t4.ftcdn.net/jpg/05/26/99/11/240_F_526991141_3Wo2joUF968gPkWoHfdD1R6mPRu6xhsh.jpg",
      },
      {
        label: "Liquid",
        image:
          "https://t3.ftcdn.net/jpg/05/37/86/18/240_F_537861888_rDBTV43bFsvduiLsxBLImCVBy919KbLF.jpg",
      },
      {
        label: "Cream",
        image:
          "https://t4.ftcdn.net/jpg/02/51/17/09/240_F_251170994_qCMvZgr4sspm4dp4xjplvXnf47JyQbS7.jpg",
      },
    ],
  },

  {
    question: "What is your preferred finish?",
    options: [
      {
        label: "Matte",
        image:
          "https://t3.ftcdn.net/jpg/01/45/55/24/240_F_145552440_LfX1RB9CNWiRBWQ9ZvrM0CGqUpyAg5js.jpg",
      },
      {
        label: "Shimmer",
        image:
          "https://img.freepik.com/premium-photo/eyeshadow-blush-swatch-isolated-white_89245-562.jpg?size=626&ext=jpg&ga=GA1.2.1585862874.1679850603&semt=ais",
      },
    ],
  },
  {
    question: "What kind of Coverage do you crave?",
    options: [
      {
        label: "Sheer",
        image:
          "https://cdn-img.prettylittlething.com/e/8/2/d/e82d28b43d6272c485fcf16e9b4db518a89b2713_CMM6136_3.jpg",
      },
      {
        label: "Buildable",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOX1V5mLaM_zyzb1IhKLRepXaceppSXEAU9Q&usqp=CAU",
      },
    ],
  },
  {
    question: "What is your preferred method of blush Application?",
    options: [
      {
        label: "Brush Up",
        image:
          "https://t3.ftcdn.net/jpg/01/57/64/74/240_F_157647418_T0Knkg4DBmwA9gpbiepuhGSaUZAxd3Px.jpg",
      },
      {
        label: "Hands On",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWRxfoGFHQO4FmUINmzMHFe2ZTWdZpbTmOv26HrEGEaTUU93DL9BLuTrkrVUOB2rPZ7y4&usqp=CAU",
      },
    ],
  },
  {
    question: "What is the price range you require for the products?",
    options: [
      {
        label: "Cost-Effective",
        image:
          "https://media.istockphoto.com/id/979015970/vector/price-tag-icon-in-vector.jpg?s=612x612&w=0&k=20&c=4k93vGY0ln3HUoJlPDiWJ8pkUAwybuBYp0O2Na5x58M=",
      },
      {
        label: "High-End",
        image:
          "https://i.pinimg.com/200x/87/2c/0b/872c0ba4f9cba9d92796fb8861d7810b.jpg",
      },
    ],
  },
];

const BlushQuiz = () => {
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
    if (currentQuestion >= blushQuestions.length) {
      const selected = selectedOptions.map((option) => option.label);
      const all_data = {
        selected: selected,
        category: "face makeup",
        porductType: "blush",
      };
      navigate("/SC-Result", { state: { data: all_data } });
    }
  }, [currentQuestion]);

  const currentQuestionData = blushQuestions[currentQuestion];
  const nextQuestionData = blushQuestions[currentQuestion + 1];

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

export default BlushQuiz;

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
