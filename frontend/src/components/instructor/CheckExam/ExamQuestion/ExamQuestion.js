import React from 'react';
import {
    Card,
    TextField,
    FormControlLabel,
    Checkbox,
    Box,
    Typography,
    Grid,
} from '@mui/material';

function ExamQuestion({ question, response, index, onMarksChange }) {
    const handleMarksChange = (e) => {
        const marks = e.target.value;
        if (marks <= question.questionMarks) {
            onMarksChange(index, marks);
        }
    };

    return (
        <Card sx={{ p: 2, mb: 2 }}>
            <Grid container spacing={2} alignItems="center" justifyContent="space-between">
                <Grid item>
                    <Typography variant="h6">Question {question.questionNumber}</Typography>
                </Grid>
                <Grid item>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <TextField
                            label="Marks"
                            type="number"
                            size="small"
                            value={response.marksObtained}
                            onChange={handleMarksChange}
                            disabled={question.questionType === 'MCQ' || question.questionType === 'Numerical'}
                            sx={{ width: '100px' }}
                        />
                        <Typography variant="body1">/ {question.questionMarks}</Typography>
                    </Box>
                </Grid>
            </Grid>
            <TextField
                label="Question"
                multiline
                fullWidth
                rows={4}
                disabled
                value={question.questionContent}
                sx={{ mt: 2, mb: 2 }}
            />

            {question.questionType === 'MCQ' && (
                <Box>
                    {question.questionOptions.map((option, idx) => (
                        <FormControlLabel
                            key={idx}
                            control={<Checkbox checked={response.questionSelectedOptions.includes(idx)} />}
                            label={option}
                            disabled
                        />
                    ))}
                </Box>
            )}

            {question.questionType === 'Numerical' && (
                <TextField
                    label="Student's Answer"
                    type="number"
                    disabled
                    value={response.questionGivenAnswer}
                />
            )}

            {question.questionType === 'Subjective' && (
                <TextField
                    label="Student's Answer"
                    multiline
                    fullWidth
                    rows={6}
                    disabled
                    value={response.questionGivenAnswer}
                />
            )}
        </Card>
    );
}

export default ExamQuestion;