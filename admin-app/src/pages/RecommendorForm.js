import React, { useState, useEffect } from "react";
import {
  skincareQuestions,
  foundationQuestions,
  mascaraQuestions,
  lipsstickQuestions,
  blushQuestions,
  lashQuestions,
} from "./RecommendorQuestions";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  FormControlLabel,
  Radio,
  Paper,
  RadioGroup,
  Typography,
} from "@mui/material";

const RecommendorForm = ({
  defaultValue,
  selectedOption,
  productType,
  category,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [recommendationTags, setRecommendationTags] = useState([]);
  const [questionList, setQestionsList] = useState([]);
  console.log(" product type ==========>", productType);
  console.log("category =========>", category);

  const handleOpenPopup = () => {
    setIsOpen(true);
  };
  useEffect(() => {
    if (category.includes("skincare")) {
      setQestionsList(skincareQuestions);
      return;
    }
    if (category.includes("face makeup") && productType.includes("foundation")) {
      setQestionsList(foundationQuestions);
      return;
    }
    if (category.includes("face makeup") && productType.includes("blush")) {
      setQestionsList(blushQuestions);
      return;
    }
    if (category.includes("lips makeup") && productType.includes("lipstick")) {
      setQestionsList(lipsstickQuestions);
      return;
    }
    if (category.includes("eyes makeup") && productType.includes("lash")) {
      setQestionsList(lashQuestions);
      return;
    }
    if (category.includes("eyes makeup") && productType.includes("mascara")) {
      setQestionsList(mascaraQuestions);
      return;
    }
  }, [productType, category]);

  console.log(skincareQuestions);
  const handleClosePopup = () => {
    setIsOpen(false);
    const selectedOptions = recommendationTags.map((tag) => tag.option);
    selectedOption(selectedOptions);
  };
  const handleCancelPopup = () => {
    setIsOpen(false);
    setRecommendationTags([]);
    selectedOption([]);
  };

  const handleOptionSelect = (questionIndex, option) => {
    setRecommendationTags((prevTags) => {
      const updatedTags = prevTags.filter(
        (tag) => tag.questionIndex !== questionIndex
      );
      updatedTags.push({ questionIndex, option });
      return updatedTags;
    });
  };

  useEffect(() => {
    if (defaultValue && defaultValue.length > 0) {
      const defaultTags = questionList.map((question, index) => ({
        questionIndex: index,
        option: defaultValue[index] || "",
      }));
      setRecommendationTags(defaultTags);
    }
  }, [defaultValue, questionList]);
  return (
    <div>
      <Typography variant="h6" component="p">
        Click on this to fill the product recommendations form:
      </Typography>
      <Button variant="contained" onClick={handleOpenPopup}>
        Questionnaire Tags
      </Button>
      <Dialog open={isOpen} onClose={handleClosePopup}>
        
        <DialogContent dividers>
          <Paper
            style={{ width: "500px", maxHeight: "400px", overflow: "auto" }}
          >
            {questionList.map((question, questionIndex) => (
              <div key={questionIndex}>
                <Typography variant="body1" component="p">
                  <strong>
                    Question {questionIndex + 1}: {question.question}
                  </strong>
                </Typography>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    fontSize:"13px"
                  }}
                >
                  {question.options.map((option, optionIndex) => (
                    <FormControlLabel
                      key={optionIndex}
                      control={
                        <Radio     
                        checked={
                            recommendationTags.find(
                              (tag) => tag.questionIndex === questionIndex
                            )?.option === option
                          }
                          onChange={(e) =>
                            handleOptionSelect(questionIndex, e.target.value)
                          }
                          value={option}
                        />
                      }
                      label={option}
                    />
                  ))}
                </div>
              </div>
            ))}
          </Paper>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelPopup} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleClosePopup} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RecommendorForm;