import React, { useState, useEffect } from "react";
import Meta from "../components/Meta";
import Container from "../components/Container";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const foundationQuestions = [
  {
    question: "What is your Age?",
    options: [
      {
        label: ">24",
        image: "https://example.com/age-24.jpg",
      },
      {
        label: "25-32",
        image: "https://example.com/age-25-32.jpg",
      },
      {
        label: "45-54",
        image: "https://example.com/age-45-54.jpg",
      },
      {
        label: "55>",
        image: "https://example.com/age-55.jpg",
      },
    ],
  },
  {
    question: "Do you get sunburn easily?",
    options: [
      {
        label: "All the time",
        image: "Images/hyperpigmentation.jpg",
      },
      {
        label: "Sometime",
        image:
          "https://img.freepik.com/free-photo/selfcare-cosmetology-beauty-concept-sensual-attractive-relaxed-naked-redhead-young-woman-freckled-cheeks-closed-eyes-gently-touching-cheek-enjoying-clean-pure-skin-condition-applying-daily-creme_176420-34646.jpg?size=626&ext=jpg&ga=GA1.1.1708761850.1679736585&semt=ais",
      },
      {
        label: "Not sure of it",
        image:
          "https://static.toiimg.com/thumb/msid-67074139,imgsize-127575,width-800,height-600,resizemode-75/67074139.jpg",
      },
      {
        label: "Never",
        image: "Images/darkspots.png",
      },
    ],
  },
  {
    question: "How would you describe your skin type?",
    options: [
      {
        label: "Oily",
        image:
          "https://img.freepik.com/free-icon/fog_318-468040.jpg?size=338&ext=jpg&ga=GA1.2.1708761850.1679736585&semt=ais",
      },
      {
        label: "Dry",
        image:
          "https://img.freepik.com/free-icon/makeup_318-741375.jpg?size=338&ext=jpg&ga=GA1.1.1708761850.1679736585&semt=ais",
      },
      {
        label: "Combination",
        image:
          "https://img.freepik.com/free-icon/drops_318-222742.jpg?size=338&ext=jpg&ga=GA1.2.1708761850.1679736585&semt=ais",
      },
      {
        label: "Normal",
        image:
          "https://img.freepik.com/free-icon/moon_318-744273.jpg?size=338&ext=jpg&ga=GA1.2.1708761850.1679736585&semt=ais",
      },
    ],
  },
 

  {
    question: " Select the tone palatte that best describes your skin!",
    options: [
      {
        label: "Light Skin Tone",
        image: "https://example.com/water-less-than-1-liter.jpg",
      },
      {
        label: "Medium Skin Tone",
        image: "https://example.com/water-1-2-liters.jpg",
      },
      {
        label: "Dark Skin Tone",
        image: "https://example.com/water-2-3-liters.jpg",
      },
      {
        label: "Yellowish Skin Tone",
        image: "https://example.com/water-more-than-3-liters.jpg",
      },
    ],
  },
  {
    question:
      "Check out the veins on your wrist. Which color is the closest match?",
    options: [
      {
        label: "Purple",
        image: "https://example.com/sun-exposure-high.jpg",
      },
      {
        label: "Green",
        image: "https://example.com/sun-exposure-medium.jpg",
      },
      {
        label: "Blue",
        image: "https://example.com/sun-exposure-low.jpg",
      },
    ],
  },
  {
    question: "What type of coverage you prefer?",
    options: [
      {
        label: "Light coverage",
        image: "https://example.com/moisturizer.jpg",
      },
      {
        label: "Medium coverage",
        image: "https://example.com/cleanser.jpg",
      },
      {
        label: "Full coverage",
        image: "https://example.com/serum.jpg",
      },
    ],
  },
  {
    question: "Do you prefer Matte or luminous?",
    options: [
      {
        label: "Matte",
        image: "https://example.com/moisturizer.jpg",
      },
      {
        label: "Luminous",
        image: "https://example.com/cleanser.jpg",
      },
    ],
  },
 
  {
    question: "What is the price range you require for the products?",
    options: [
      {
        label: "Cost-Effective",
        image: "https://example.com/price-cost-effective.jpg",
      },
      {
        label: "High-End",
        image: "https://example.com/price-highend.jpg",
      },
    ],
  },
];

const FoundationQuiz = () => {
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
    if (currentQuestion >= foundationQuestions.length) {
      const selected = selectedOptions.map((option) => option.label);
      const all_data = {
        selected: selected,
        category: "face makeup",
        porductType: "foundation",
      };
      navigate("/SC-Result", { state: { data: all_data } });
    }
  }, [currentQuestion]);

  const currentQuestionData = foundationQuestions[currentQuestion];
  const nextQuestionData = foundationQuestions[currentQuestion + 1];

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

export default FoundationQuiz;

const textContentStyle = {
  flex: 3,
  padding: "1rem",
};

const optionImageStyle = {
  display: "block",
  margin: "0 auto",
  marginBottom: "1rem",
  width: "100px",
  height: "100px",
};
const optionButtonStyle = {
  display: "inline-block",
  margin: "0 0.5rem",
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