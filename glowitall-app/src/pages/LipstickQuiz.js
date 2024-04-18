import React, { useState, useEffect } from "react";
import Meta from "../components/Meta";
import Container from "../components/Container";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const lipstickQuestions = [
  {
    question: "What kind of Coverage do you crave?",
    options: [
      {
        label: "Light coverage",
      },
      {
        label: "Medium coverage",
      },
      {
        label: "Full coverage",
      },
    ],
  },

  {
    question: "What formula do you have in mind?",
    options: [
      {
        label: "Liquid",
        image: "https://cdn.shopify.com/s/files/1/0227/7284/2568/products/80000854.png?v=1613494584",
      },
      {
        label: "Bullet",
        image:
          "https://www.heygirl.pk/cdn/shop/products/huda_beauty_Bachelorette_pakistan.jpg?v=1630020113&width=823",
      },
      {
        label: "Everything",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxIU3b7MlKSoRVFIxdadLoShjMzXOzYFO4gIk_RAtX7froDpUeIxNsrsSjO_3gYQoOIRs&usqp=CAU",
      },
    ],
  },
  {
    question: "What is your preferred finish?",
    options: [
      {
        label: "Matte",
        image:
          "Images/L1.png",
      },
      {
        label: "Gloss",
        image:
          "https://img.freepik.com/free-photo/closeup-woman-hand-with-pink-nails-near-lips-fingernails-with-pink-manicure_186202-7376.jpg?size=626&ext=jpg&uid=R97680113&ga=GA1.1.1059806880.1679947817&semt=ais",
      },
      {
        label: "Sheer",
        image:
          "https://img.freepik.com/free-photo/close-up-portrait-beautiful-woman_155003-42849.jpg?size=626&ext=jpg&uid=R97680113&ga=GA1.1.1059806880.1679947817&semt=ais",
      },
      {
        label: "Everthing",
        image:
          "https://img.freepik.com/free-photo/still-life-cosmetics-with-lipstick_23-2149234386.jpg?size=626&ext=jpg&uid=R97680113&ga=GA1.2.1059806880.1679947817&semt=ais",
      },
    ],
  },
  {
    question: "Choose your color family!",
    options: [
      {
        label: "Power Nude",
        image: "Images/F1.png",
      },
      {
        label: "Pop of Pink",
        image: "Images/F2.png",
      },
      {
        label: "Rich Red",
        image: "Images/F3.png",
      },
      {
        label: "Cool Coral",
        image: "Images/F4.png",
      },
      {
        label: "Bold Berry",
        image: "Images/F5.png",
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

const LipstickQuiz = () => {
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
    if (currentQuestion >= lipstickQuestions.length) {
      const selected = selectedOptions.map((option) => option.label);
      const all_data = {
        selected: selected,
        category: "lips makeup",
        porductType: "lipstick",
      };
      navigate("/SC-Result", { state: { data: all_data } });
    }
  }, [currentQuestion]);

  const currentQuestionData = lipstickQuestions[currentQuestion];
  const nextQuestionData = lipstickQuestions[currentQuestion + 1];

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

export default LipstickQuiz;

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
