import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../../components/instructor/CourseHomepage/Navbar/Navbar';
import Footer from '../../../components/instructor/CourseHomepage/Footer/Footer';
import { Link } from "react-router-dom";

function CourseHomepage() {
  const { index }= useParams();
  
let Courses = ([
  {
      courseCode : 'CS 202',
      courseName : 'Automata and Logic',
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
  },
  {
    courseCode : 'CS 208',
    courseName : 'Software Engineering',
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
},
  
])

let exam=Courses[index].Exams;
let a=Courses[index].announcements;
  return(
    <> 
    <Navbar/>
    <br/>
    <h1 align="center">{Courses[index].courseName}</h1>
    <br/>
    <h2> &nbsp;&nbsp;List of Upcoming Exams:- </h2>
    <br/>
    {exam.map((exam,index) => {
        return <>      
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
            <div class="card w-75 border-secondary mb-3">
                <h5 class="card-header" align="center">{exam.examName}</h5>
                    <div class="card-body">
                        <h5 class="card-title">Exam Date to be here </h5>
                        <p class="card-text">Total marks={exam.examMarks} 
                        <br/> 
                        Total weightage={exam.weightage} <br/>
                        Instructions:- {exam.instructions}
                        </p>
                        <a href="#" class="btn btn-primary">View</a>
                    </div>
            </div>
        </div>
        <br/>
        </>})}
        <h2> &nbsp;&nbsp;Announcements:- </h2>

        {a.map((a,index) => {
            return <>      
            <ul>
                <li>
                    {a}
                </li>
            </ul>
            </>})}

        <form>
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center',}}>
        <div class="mb-3 w-75" >
            <input type="text" placeholder="Announce something to class..." class="form-control" id="exampleInputPassword1"/>
            <br/>
            <button type="submit" class="btn btn-primary">Add Announcements</button>
        </div>
        </div>
        
        </form>
    <Footer/>
    </>
  )
}

export default CourseHomepage;


