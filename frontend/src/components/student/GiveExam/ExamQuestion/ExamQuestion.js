import React from 'react';
import { useDispatch } from 'react-redux';
import {
    Card,
    TextField,
    FormControlLabel,
    Checkbox,
    Box,
    Typography,
    RadioGroup,
    Radio,
} from '@mui/material';
import { saveQuestionResponse } from '../../../../redux/actions/Responses';

function ExamQuestion({ question, response }) {
    const dispatch = useDispatch();

    const handleMCQChange = (event) => {
        const optionIndex = parseInt(event.target.value, 10);
        let newSelectedOptions;

        // For single-choice MCQ (assuming radio buttons), replace the selection
        // For multiple-choice (checkboxes), add/remove from the array
        if (question.singleChoice) { // Assuming a property to distinguish
            newSelectedOptions = [optionIndex];
        } else {
            const currentIndex = response.questionSelectedOptions.indexOf(optionIndex);
            if (currentIndex === -1) {
                newSelectedOptions = [...response.questionSelectedOptions, optionIndex];
            } else {
                newSelectedOptions = response.questionSelectedOptions.filter(i => i !== optionIndex);
            }
        }
        
        dispatch(saveQuestionResponse({
            ...response,
            questionSelectedOptions: newSelectedOptions,
            status: 'Attempted',
        }));
    };

    const handleTextChange = (event) => {
        const { value } = event.target;
        dispatch(saveQuestionResponse({
            ...response,
            questionGivenAnswer: value,
            status: value.trim() ? 'Attempted' : 'NotAttempted',
        }));
    };

    return (
        <Card sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
                Question {question.questionNumber} ({question.questionMarks} Marks)
            </Typography>
            <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', mb: 2 }}>
                {question.questionContent}
            </Typography>

            {question.questionType === 'MCQ' && (
                <RadioGroup
                    value={response.questionSelectedOptions[0] ?? null}
                    onChange={handleMCQChange}
                >
                    {question.questionOptions.map((option, index) => (
                        <FormControlLabel
                            key={index}
                            value={index}
                            control={<Radio />}
                            label={option}
                        />
                    ))}
                </RadioGroup>
            )}

            {question.questionType === 'Numerical' && (
                <TextField
                    label="Your Answer"
                    type="number"
                    value={response.questionGivenAnswer}
                    onChange={handleTextChange}
                />
            )}

            {question.questionType === 'Subjective' && (
                <TextField
                    label="Your Answer"
                    multiline
                    fullWidth
                    rows={8}
                    value={response.questionGivenAnswer}
                    onChange={handleTextChange}
                />
            )}
        </Card>
    );
}

export default ExamQuestion;