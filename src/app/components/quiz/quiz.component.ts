import { Component } from '@angular/core';
import { Option } from '../../models/option.model';
import { QuizService } from '../../services/quiz.service';
import { Question } from '../../models/question.model';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss'
})
export class QuizComponent {
  title = ''
  questions!: Question[]
  questionSelected: Question | undefined

  answers: string[] = []
  answerSelected = ''

  questionIndex = 0
  questionMaxIndex = 0

  finished = false

  constructor(
    private quizService: QuizService 
  ){}

  ngOnInit(): void {
    this.getAllQuestions()
  }

  // getOneQuestion(): void {
  //   this.quizService.getQuestion().subscribe({
  //     next: (response: Question) => {
  //       this.title = response.title
  //       this.questionSelected = response
  //     },
  //     error: err => console.log(err)
  //   })
  // }

  getAllQuestions(id?: number): void {
    this.quizService.getQuestions().subscribe({
      next: (response: Question[]) => {
        this.questions = response
        this.questionSelected = this.questions[0]
        this.questionMaxIndex = response.length
      }
    })
  }

  palyerChoose(value: string): void {
    this.answers.push(value)
    
    this.nextStep()
  }

  nextStep(): void {
    this.questionIndex+=1

    if(this.questionMaxIndex > this.questionIndex){
      this.questionSelected = this.questions[this.questionIndex]
    }
    else{
      this.finished = true
      this.checkResults()
    }
  }

  checkResults(): void {
    const contador = this.answers.reduce((acc: any, cur) => {
      acc[cur] = (acc[cur] || 0) + 1;
      return acc;
    }, {});

    const countAlias = Object.keys(contador).reduce((a, b) => contador[a] > contador[b] ? a : b)

    if(countAlias === 'A') {
      this.answerSelected = 'super-herói'
    }else{
      this.answerSelected = 'vilão'
    }

    this.backToStart()
  }
  
  backToStart(){
    if(this.finished){
      setTimeout(() => {
        this.finished = false
      }, 3000);
    }
  }

  trackByfn(index: number, option: Option): number {
    return option.id
  }
}
