import React, { useState, useEffect } from "react";
import Meta from "../components/Meta";
import Container from "../components/Container";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const skincareQuestions = [
  {
    question: "What is your Age?",
    options: [
      {
        label: ">24",
      },
      {
        label: "25-32",
      },
      {
        label: "45-54",
      },
      {
        label: "<55",
      },
    ],
  },
  {
    question: "What is your Skin Concern?",
    options: [
      {
        label: "Acne",
        image: "Images/acne.png",
      },
      {
        label: "Pores",
        image:
          "https://img.freepik.com/free-photo/selfcare-cosmetology-beauty-concept-sensual-attractive-relaxed-naked-redhead-young-woman-freckled-cheeks-closed-eyes-gently-touching-cheek-enjoying-clean-pure-skin-condition-applying-daily-creme_176420-34646.jpg?size=626&ext=jpg&ga=GA1.1.1708761850.1679736585&semt=ais",
      },
      {
        label: "Signs of Aging",
        image:
          "https://static.toiimg.com/thumb/msid-67074139,imgsize-127575,width-800,height-600,resizemode-75/67074139.jpg",
      },
      {
        label: "Dark Spots",
        image: "Images/darkspots.png",
      },
      {
        label: "Fine Lines & Wrinkles",
        image: "Images/wrnikles.png",
      },
      {
        label: "Dullness",
        image: "Images/dullness.png",
      },
      {
        label: "Dark Circles",
        image: "Images/dark circles.jpeg",
      },
      {
        label: "Hyperpigmentation",
        image: "Images/hyperpigmentation.jpg",
      },
    ],
  },
  {
    question: "What is your Skin Type?",
    options: [
      {
        label: "Normal",
        image:
          "https://img.freepik.com/free-icon/moon_318-744273.jpg?size=338&ext=jpg&ga=GA1.2.1708761850.1679736585&semt=ais",
      },
      {
        label: "Oily",
        image:
          "https://img.freepik.com/free-icon/drops_318-222742.jpg?size=338&ext=jpg&ga=GA1.2.1708761850.1679736585&semt=ais",
      },
      {
        label: "Dry",
        image:
          "https://img.freepik.com/free-icon/fog_318-468040.jpg?size=338&ext=jpg&ga=GA1.2.1708761850.1679736585&semt=ais",
      },
      {
        label: "Combination",
        image:
          "https://img.freepik.com/free-icon/makeup_318-741375.jpg?size=338&ext=jpg&ga=GA1.1.1708761850.1679736585&semt=ais",
      },
      
    ],
  },
  {
    question: "How often is your skin sensitive?",
    options: [
      {
        label: "Rarely",
        image:
          "https://img.freepik.com/free-icon/pulse_318-583977.jpg?size=338&ext=jpg&ga=GA1.1.1708761850.1679736585&semt=ais",
      },
      {
        label: "Sometimes",
        image:
          "https://img.freepik.com/free-icon/heart-beat_318-242813.jpg?size=338&ext=jpg&ga=GA1.1.1708761850.1679736585&semt=ais",
      },
      {
        label: "All the time",
        image:
          "https://img.freepik.com/free-icon/rate_318-167109.jpg?size=338&ext=jpg&ga=GA1.1.1708761850.1679736585&semt=ais",
      },
    ],
  },
  {
    question: "How often do you get pimples?",
    options: [
      {
        label: "Rarely",
        image:
          "https://img.freepik.com/free-icon/timetable_318-812577.jpg?size=338&ext=jpg&ga=GA1.1.1708761850.1679736585&semt=ais",
      },
      {
        label: "Occasionally",
        image:
          "https://img.freepik.com/free-icon/calendar_318-263873.jpg?size=338&ext=jpg&ga=GA1.1.1708761850.1679736585&semt=ais",
      },
      {
        label: "Frequently",
        image:
          "https://img.freepik.com/free-icon/calendar_318-449334.jpg?size=338&ext=jpg&ga=GA1.1.1708761850.1679736585&semt=ais",
      },
      {
        label: "Always",
        image:
          "https://img.freepik.com/free-icon/open_318-204973.jpg?size=338&ext=jpg&ga=GA1.2.1708761850.1679736585&semt=ais",
      },
    ],
  },
  {
    question: "How much makeup do you use on a daily basis?",
    options: [
      {
        label: "Normal",
      },
      {
        label: "A little",
      },
      {
        label: "A decent amount",
      },
      {
        label: "Full Coverage",
      },
    ],
  },
  {
    question: "How much water do you take everyday?",
    options: [
      {
        label: "Less than 1 liter",
      },
      {
        label: "1-2 liters",
      },
      {
        label: "2-3 liters",
      },
      {
        label: "More than 3 liters",
      },
    ],
  },
  {
    question: "How much time do you spend under direct sun exposure per day?",
    options: [
      {
        label: "High",
      },
      {
        label: "Medium",
      },
      {
        label: "Low",
      },
      {
        label: "None",
      },
    ],
  },
  {
    question: "What are you looking for?",
    options: [
      {
        label: "Moisturizer",
        image: "https://img.freepik.com/free-photo/flat-lay-body-cream-plain-background_23-2148241867.jpg?size=338&ext=jpg&ga=GA1.1.1708761850.1679736585&semt=sph",
      },
      {
        label: "Cleanser",
        image: "Images/cleanser.jpg",
      },
      {
        label: "Serum",
        image: "https://img.freepik.com/free-photo/skin-oil-droppers-assortment-with-wooden-pieces_23-2148761386.jpg?size=338&ext=jpg&ga=GA1.2.1708761850.1679736585&semt=sph",
      },
      {
        label: "Eye Cream",
        image: "https://img.freepik.com/free-photo/skin-care-banner-concept-with-lotion_23-2149449121.jpg?size=626&ext=jpg&ga=GA1.2.1708761850.1679736585&semt=ais",
      },
      {
        label: "Sunblock",
        image: "https://img.freepik.com/free-photo/white-sunscreen-cream-coming-out-orange-bottle-against-orange-backdrop_23-2148154032.jpg?size=338&ext=jpg&ga=GA1.2.1708761850.1679736585&semt=ais",
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

const SkinCareQuiz = () => {
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
    if (currentQuestion >= skincareQuestions.length) {
      const selected = selectedOptions.map((option) => option.label);
      const all_data = {
        selected: selected,
        category: "skincare",
        porductType: "",
      };
      navigate("/SC-Result", { state: { data: all_data } });
    }
  }, [currentQuestion]);

  const currentQuestionData = skincareQuestions[currentQuestion];
  const nextQuestionData = skincareQuestions[currentQuestion + 1];

  return (
    <>
   {/*<div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="row">
        <div className="col-12" style={{ textAlign: 'center' }}>
          <img src="https://www.sephora.com/contentimages/editorial/2018/mayskincare/skincarefinder/desktop/2018-05-01-lp-skincare-finder-question-page-us-ca-d-slice.jpg" style={{ width: '100%', maxWidth: '100%' }} alt="Centered Image" />
        </div>
      </div>
    </div>*/}
      <div className="content py-4" >
        <div className="text-content" style={textContentStyle} /*style={{"marginTop":"-500px","marginLeft":"200px"}}*/>
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

export default SkinCareQuiz;

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
