import React, { useState } from 'react';
import {
    Button,
    Card,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    Box,
    Typography,
    IconButton,
    FormControlLabel,
    Checkbox,
    Grid,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';

function ExamQuestion({ question, qnIndex, handleDeleteQuestion, examData, setExamData }) {
    const [formQuestion, setFormQuestion] = useState(question);
    const [editing, setEditing] = useState(false);

    const qNum = question.questionNumber;

    const saveQuestion = () => {
        setEditing(false);
        const questions = [...examData.Questions];
        questions[qnIndex] = formQuestion;
        setExamData({ ...examData, Questions: questions });
    };

    const handleTypeChange = (e) => {
        setFormQuestion({ ...formQuestion, questionType: e.target.value });
    };

    const addOption = () => {
        setFormQuestion({
            ...formQuestion,
            questionOptions: [...formQuestion.questionOptions, ''],
        });
    };

    const removeOption = (index) => {
        const newOptions = formQuestion.questionOptions.filter((_, i) => i !== index);
        let newAnswerOptions = formQuestion.questionAnswerOptions.filter((ansInd) => ansInd !== index);
        newAnswerOptions = newAnswerOptions.map((ansInd) => (ansInd > index ? ansInd - 1 : ansInd));

        setFormQuestion({
            ...formQuestion,
            questionOptions: newOptions,
            questionAnswerOptions: newAnswerOptions,
        });
    };

    const handleOptionSelect = (index) => {
        let newAnswerOptions;
        if (formQuestion.questionAnswerOptions.includes(index)) {
            newAnswerOptions = formQuestion.questionAnswerOptions.filter((ansInd) => ansInd !== index);
        } else {
            newAnswerOptions = [...formQuestion.questionAnswerOptions, index].sort((a, b) => a - b);
        }
        setFormQuestion({ ...formQuestion, questionAnswerOptions: newAnswerOptions });
    };

    const handleOptionTextChange = (e, index) => {
        const newOptions = [...formQuestion.questionOptions];
        newOptions[index] = e.target.value;
        setFormQuestion({ ...formQuestion, questionOptions: newOptions });
    };

    return (
        <Card sx={{ p: 2, mb: 2 }}>
            <Grid container spacing={2} alignItems="center">
                <Grid item>
                    <Typography variant="h6">{qnIndex + 1}.</Typography>
                </Grid>
                <Grid item xs>
                    {editing ? (
                        <Button variant="contained" onClick={saveQuestion} size="small">
                            Save
                        </Button>
                    ) : (
                        <Button variant="outlined" onClick={() => setEditing(true)} size="small">
                            Edit
                        </Button>
                    )}
                </Grid>
                <Grid item>
                    <IconButton onClick={() => handleDeleteQuestion(qNum)} size="small">
                        <DeleteIcon />
                    </IconButton>
                </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12} sm={8}>
                    <FormControl fullWidth disabled={!editing}>
                        <InputLabel>Question Type</InputLabel>
                        <Select
                            value={formQuestion.questionType}
                            label="Question Type"
                            onChange={handleTypeChange}
                        >
                            <MenuItem value={'MCQ'}>Multiple Choice Question</MenuItem>
                            <MenuItem value={'Numerical'}>Numerical Question</MenuItem>
                            <MenuItem value={'Subjective'}>Subjective Question</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        label="Marks"
                        type="number"
                        fullWidth
                        disabled={!editing}
                        value={formQuestion.questionMarks}
                        onChange={(e) => setFormQuestion({ ...formQuestion, questionMarks: e.target.value })}
                    />
                </Grid>
            </Grid>
            <TextField
                label="Question Content"
                multiline
                fullWidth
                rows={4}
                disabled={!editing}
                value={formQuestion.questionContent}
                onChange={(e) => setFormQuestion({ ...formQuestion, questionContent: e.target.value })}
                sx={{ mt: 2 }}
            />

            {formQuestion.questionType === 'MCQ' && (
                <Box sx={{ mt: 2 }}>
                    {formQuestion.questionOptions.map((option, index) => (
                        <Card key={index} sx={{ display: 'flex', alignItems: 'center', p: 1, mb: 1 }}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={formQuestion.questionAnswerOptions.includes(index)}
                                        onChange={() => handleOptionSelect(index)}
                                        disabled={!editing}
                                    />
                                }
                                label=""
                            />
                            <TextField
                                fullWidth
                                variant="standard"
                                placeholder={`Option ${index + 1}`}
                                value={option}
                                disabled={!editing}
                                onChange={(e) => handleOptionTextChange(e, index)}
                            />
                            {editing && (
                                <IconButton onClick={() => removeOption(index)} size="small">
                                    <CloseIcon />
                                </IconButton>
                            )}
                        </Card>
                    ))}
                    {editing && (
                        <Button startIcon={<AddIcon />} onClick={addOption} sx={{ mt: 1 }}>
                            Add Option
                        </Button>
                    )}
                </Box>
            )}

            {formQuestion.questionType === 'Numerical' && (
                <TextField
                    label="Numerical Answer"
                    type="number"
                    disabled={!editing}
                    value={formQuestion.questionAnswer}
                    onChange={(e) => setFormQuestion({ ...formQuestion, questionAnswer: e.target.value })}
                    sx={{ mt: 2 }}
                />
            )}
        </Card>
    );
}

export default ExamQuestion;