let Course =
    {
        courseCode : 'CS 202',
        year : '2021',
        semester : 'Autumn',
        announcements : ['There is an exam', 'Dont cheat'],
        studentsList : ['cse200001043@iiti.ac.in', 'cse200001044@iiti.ac.in'],
        instructorsList : ['cse200001003@iiti.ac.in'],
        Exams : [
            {
                examName : 'Mid Semester Examination',
                examMarks : '100',
                instructions: 'This is the mse of this course and will judge on various basis, dont cheat.',
                weightage : '40',
                startTimings : new Date("2021-05-18T10:00:00Z"),
                endTimings : new Date("2021-05-18T12:00:00Z"),
                Questions : [
                    {
                        questionType : 'Multiple Choice Questions',
                        questionNo : '1',
                        questionContent : 'Given the language L = {ab, aa, baa}, which of the following strings are in L* ?',
                        questionOptions : ['ababbababab', 'ababababab', 'abaabababa', 'ababababab'],
                        questionAnswer : ['A']
                    },
                    {
                        questionType : 'Subjective',
                        questionNo : '2',
                        questionContent : 'Consider the language L given by the regular expression (a+b)∗b(a+b) over the alphabet {a,b}. The smallest number of states needed in a deterministic finite-state automaton (DFA) accepting L is ___________ .',
                        questionOptions : [],
                        questionAnswer : []
                    },
                    {
                        questionType : 'Multiple Correct Choice Questions',
                        questionNo : '3',
                        questionContent : 'Which of the following statement is true for Dead state in Finite automata?',
                        questionOptions : ['It cannot be reached anytime', 'There is no necessity of the state', 'If control enters no way to come out from the state', 'If control enters Finite Automata dead'],
                        questionAnswer : ['A', 'B', 'D']
                    }
                ],
                Submissions : [
                    {
                        studentEmail : 'cse200001043@iiti.ac.in',
                        responses :[
                            {
                                questionID : '1',
                                status : 'Answered',
                                response : 'A'
                            },
                            {
                                questionID : '2',
                                status : 'Not Answered',
                                response : ''
                            },
                            {
                                questionID : '3',
                                status : 'Answered',
                                response : 'ABC'
                            }
                        ],
                        marksObtained : '80'
                    },
                    {
                        studentEmail : 'cse200001044@iiti.ac.in',
                        responses :[
                            {
                                questionID : '1',
                                status : 'Answered',
                                response : 'A'
                            },
                            {
                                questionID : '2',
                                status : 'Not Seen',
                                response : ''
                            },
                            {
                                questionID : '3',
                                status : 'Answered',
                                response : 'BCD'
                            }
                        ],
                        marksObtained : '10'
                    }
                ]
            }
        ],
    }

let list = [
    {
        studentName : 'Priyansh Jaseja',
        studentEmail : 'cse200001063@iiti.ac.in' 
    },
    {
        studentName : 'Mihir Karandikar',
        studentEmail : 'cse200001044@iiti.ac.in' 
    }
]

export default list