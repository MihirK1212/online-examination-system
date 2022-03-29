let exam = 
{
    examName : 'Mid Semester Examination',
    examMarks : '100',
    examWeightage : '40',
    instructions: 'This is the mse of this course and will judge on various basis, dont cheat.',
    startTiming : new Date("2022-03-16T17:00:00"),
    endTiming : new Date("2022-03-16T19:04:00"),
    Questions : [
        {
            questionType : "MCQ",
            questionNumber : 1,
            questionContent : "MCQ Question 1",
            questionMarks : 3,
            questionOptions : ["Op 1","Op 2","Op 3"],
            questionAnswerOptions : [0,2],
            questionAnswer : "",
        },
        {
            questionType : "Numerical",
            questionNumber : 2,
            questionContent : "Numerical Question 1",
            questionMarks : 4,
            questionOptions : [],
            questionAnswerOptions : [],
            questionAnswer : "22.37",
        },
        {
            questionType : "MCQ",
            questionNumber : 3,
            questionContent : "MCQ Question 2",
            questionMarks : 2,
            questionOptions : ["Op 1","Op 2","Op 3","Op 4"],
            questionAnswerOptions : [1],
            questionAnswer : "",
        },
        {
            questionType : "Subjective",
            questionNumber : 4,
            questionContent : "Subjective Question 1",
            questionMarks : 6,
            questionOptions : [],
            questionAnswerOptions : [],
            questionAnswer : "",
        },
        {
            questionType : "MCQ",
            questionNumber : 5,
            questionContent : "MCQ Question 3",
            questionMarks : 5,
            questionOptions : ["Op 1","Op 2","Op 3","Op 4","Op 5"],
            questionAnswerOptions : [0,2,3],
            questionAnswer : "",
        },
        {
            questionType : "Subjective",
            questionNumber : 6,
            questionContent : "Subjective Question 2",
            questionMarks : 5,
            questionOptions : [],
            questionAnswerOptions : [],
            questionAnswer : "",
        },
    ],
    Submissions : [
        {
            studentEmail : 'cse200001043@iiti.ac.in',
            responses :[
                {
                    questionNumber : 1,
                    status : 'Attempted',
                    questionGivenAnswer : '',
                    questionSelectedOptions : [0,2,3],
                    marksObtained : 0
                },
                {
                    questionNumber : 2,
                    status : 'Attempted',
                    questionGivenAnswer : '22.37',
                    questionSelectedOptions : [],
                    marksObtained : 0
                },
                {
                    questionNumber : 3,
                    status : 'Attempted',
                    questionGivenAnswer : '',
                    questionSelectedOptions : [1],
                    marksObtained : 0
                },
                {
                    questionNumber : 4,
                    status : 'Attempted',
                    questionGivenAnswer : 'this is my answer for subjective question 1',
                    questionSelectedOptions : [],
                    marksObtained : 0
                },
                {
                    questionNumber : 5,
                    status : 'Attempted',
                    questionGivenAnswer : '',
                    questionSelectedOptions : [0,3],
                    marksObtained : 0
                },
                {
                    questionNumber : 6,
                    status : 'Attempted',
                    questionGivenAnswer : 'this is my answer for subjective question 2',
                    questionSelectedOptions : [],
                    marksObtained : 0
                }
            ],
            marksObtained : ''
        },
        {
            studentEmail : 'cse200001044@iiti.ac.in',
            responses :[
                {
                    questionNumber : 1,
                    status : 'Attempted',
                    questionGivenAnswer : '',
                    questionSelectedOptions : [0,2],
                    marksObtained : 0
                },
                {
                    questionNumber : 2,
                    status : 'Attempted',
                    questionGivenAnswer : '104.22',
                    questionSelectedOptions : [],
                    marksObtained : 0
                },
                {
                    questionNumber : 3,
                    status : 'Attempted',
                    questionGivenAnswer : '',
                    questionSelectedOptions : [0,3],
                    marksObtained : 0
                },
                {
                    questionNumber : 4,
                    status : 'Attempted',
                    questionGivenAnswer : 'this is my wrong different answer for subjective question 1',
                    questionSelectedOptions : [],
                    marksObtained : 0
                },
                {
                    questionNumber : 5,
                    status : 'Attempted',
                    questionGivenAnswer : '',
                    questionSelectedOptions : [0,2,3],
                    marksObtained : 0
                },
                {
                    questionNumber : 6,
                    status : 'Attempted',
                    questionGivenAnswer : 'this is my other answer for subjective question 2',
                    questionSelectedOptions : [],
                    marksObtained : 0
                }
            ],
            marksObtained : ''
        }
    ]
}

export default exam