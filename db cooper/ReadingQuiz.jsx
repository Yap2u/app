import { useState } from 'react'
import { Button } from './components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card.jsx'
import { Badge } from './components/ui/badge.jsx'
import { CheckCircle, XCircle, RotateCcw } from 'lucide-react'

const ReadingQuiz = ({ onComplete, isCompleted }) => {
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)

  const readingText = `The universe is everything that exists, which includes all the planets, stars, galaxies and other physical things that are in space.

The first models of the universe were developed by Greek and Indian philosophers, which put Earth at the center. Later, when data was more accurate, Nicolaus Copernicus created a model with the Sun at the center of the Solar System.

Eventually, after more improvements, scientists were able to say that our Solar System is in the Milky Way galaxy, which is one of many galaxies in the universe.

The Big Bang theory explains how many people believe the universe began. In the beginning, the universe was tiny and then expanded over billions of years to the size it is today. Giant clouds came together during this process to form galaxies, stars and other physical things in the universe.

It is not known exactly how big the universe is. Information that is sent from Earth may never reach some parts of space, because it expands faster than light can travel across it.

However, astronomers have calculated that the universe is 13.8 billion years old.`

  const questions = [
    {
      id: 1,
      statement: "The first models of the universe were created by Chinese astronomers.",
      correct: false,
      explanation: "They were developed by Greek and Indian philosophers."
    },
    {
      id: 2,
      statement: "The Sun was the central piece of Copernicus' model of the Solar System.",
      correct: true,
      explanation: "Copernicus created a model with the Sun at the center of the Solar System."
    },
    {
      id: 3,
      statement: "For the last few million years, the universe has been getting smaller.",
      correct: false,
      explanation: "The universe has been expanding (getting larger)."
    },
    {
      id: 4,
      statement: "Scientists have measured the exact size of the universe.",
      correct: false,
      explanation: "The exact size of the universe is still unknown."
    },
    {
      id: 5,
      statement: "Space expands faster than the speed of light.",
      correct: true,
      explanation: "The text states that the universe expands faster than light can travel across it."
    }
  ]

  const handleAnswerSelect = (questionId, answer) => {
    if (showResults) return
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }))
  }

  const handleSubmit = () => {
    let correctCount = 0
    questions.forEach(question => {
      if (selectedAnswers[question.id] === question.correct) {
        correctCount++
      }
    })
    setScore(correctCount)
    setShowResults(true)
    if (!isCompleted) {
      onComplete(correctCount)
    }
  }

  const handleReset = () => {
    setSelectedAnswers({})
    setShowResults(false)
    setScore(0)
  }

  const isAnswerCorrect = (questionId) => {
    return selectedAnswers[questionId] === questions.find(q => q.id === questionId)?.correct
  }

  const allAnswered = questions.every(question => selectedAnswers[question.id] !== undefined)

  return (
    <div className="space-y-6">
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Instructions</CardTitle>
          <CardDescription className="text-white/80">
            Read the text below carefully, then decide if each statement is true or false.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Reading Text */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardHeader>
          <CardTitle className="text-white">The Universe</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-white/90 leading-relaxed space-y-4">
            {readingText.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-4 text-sm text-white/60 italic">
            Source: Wikipedia
          </div>
        </CardContent>
      </Card>

      {/* Questions */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardHeader>
          <CardTitle className="text-white">True or False Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {questions.map((question) => (
            <div key={question.id} className="space-y-3">
              <div className="text-white font-medium">
                {question.id}. {question.statement}
              </div>
              
              <div className="flex gap-3">
                {[true, false].map((option) => (
                  <button
                    key={option}
                    onClick={() => handleAnswerSelect(question.id, option)}
                    disabled={showResults}
                    className={`px-6 py-2 rounded-lg border-2 transition-all duration-200 ${
                      showResults
                        ? selectedAnswers[question.id] === option
                          ? isAnswerCorrect(question.id)
                            ? 'bg-green-500/20 border-green-400 text-white'
                            : 'bg-red-500/20 border-red-400 text-white'
                          : option === question.correct
                          ? 'bg-green-500/20 border-green-400 text-white'
                          : 'bg-white/5 border-white/20 text-white/70'
                        : selectedAnswers[question.id] === option
                        ? 'bg-blue-500/30 border-blue-400 text-white'
                        : 'bg-white/5 border-white/20 text-white hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>{option ? 'True' : 'False'}</span>
                      {showResults && selectedAnswers[question.id] === option && (
                        isAnswerCorrect(question.id) ? (
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-400" />
                        )
                      )}
                      {showResults && option === question.correct && selectedAnswers[question.id] !== option && (
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {showResults && !isAnswerCorrect(question.id) && (
                <div className="bg-red-500/10 border border-red-400/30 rounded-lg p-3">
                  <div className="text-red-300 text-sm">
                    <strong>Explanation:</strong> {question.explanation}
                  </div>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {showResults && (
                <Badge variant="secondary" className="bg-white/20 text-white text-lg px-4 py-2">
                  Score: {score}/5
                </Badge>
              )}
              {isCompleted && (
                <Badge variant="secondary" className="bg-green-500/80 text-white">
                  ✓ Completed
                </Badge>
              )}
            </div>
            <div className="flex gap-3">
              {showResults && (
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Try Again
                </Button>
              )}
              {!showResults && (
                <Button
                  onClick={handleSubmit}
                  disabled={!allAnswered}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  Submit Answers
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ReadingQuiz

