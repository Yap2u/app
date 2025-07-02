import { useState, useEffect } from 'react'
import { Button } from './components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card.jsx'
import { Badge } from './components/ui/badge.jsx'
import { CheckCircle, XCircle, RotateCcw } from 'lucide-react'

const StudyingUniverse = ({ onComplete, isCompleted }) => {
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)

  const terms = [
    'telescope',
    'space shuttle', 
    'astronaut',
    'satellite',
    'launch pad',
    'lunar buggy',
    'space station',
    'observatory'
  ]

  const descriptions = [
    'A device used to observe distant objects in space',
    'A reusable spacecraft designed to transport crew and cargo to space',
    'A person trained to travel and work in space',
    'An artificial object placed in orbit around Earth or another celestial body',
    'A structure from which rockets and spacecraft are launched',
    'A vehicle designed to operate on the lunar surface',
    'A large spacecraft where astronauts live and work for extended periods',
    'A building equipped for observing astronomical phenomena'
  ]

  const correctAnswers = {
    'telescope': 'A device used to observe distant objects in space',
    'space shuttle': 'A reusable spacecraft designed to transport crew and cargo to space',
    'astronaut': 'A person trained to travel and work in space',
    'satellite': 'An artificial object placed in orbit around Earth or another celestial body',
    'launch pad': 'A structure from which rockets and spacecraft are launched',
    'lunar buggy': 'A vehicle designed to operate on the lunar surface',
    'space station': 'A large spacecraft where astronauts live and work for extended periods',
    'observatory': 'A building equipped for observing astronomical phenomena'
  }

  const handleAnswerSelect = (term, description) => {
    if (showResults) return
    setSelectedAnswers(prev => ({
      ...prev,
      [term]: description
    }))
  }

  const handleSubmit = () => {
    let correctCount = 0
    Object.entries(selectedAnswers).forEach(([term, description]) => {
      if (correctAnswers[term] === description) {
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

  const isAnswerCorrect = (term) => {
    return correctAnswers[term] === selectedAnswers[term]
  }

  const allAnswered = terms.every(term => selectedAnswers[term])

  return (
    <div className="space-y-6">
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Instructions</CardTitle>
          <CardDescription className="text-white/80">
            Match each space exploration term with its correct description. Click on a term, then click on its matching description.
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Terms Column */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Terms</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {terms.map((term) => (
              <div
                key={term}
                className={`p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  showResults
                    ? isAnswerCorrect(term)
                      ? 'bg-green-500/20 border-green-400 text-white'
                      : selectedAnswers[term]
                      ? 'bg-red-500/20 border-red-400 text-white'
                      : 'bg-white/5 border-white/20 text-white/70'
                    : selectedAnswers[term]
                    ? 'bg-blue-500/30 border-blue-400 text-white'
                    : 'bg-white/5 border-white/20 text-white hover:bg-white/10'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium capitalize">{term}</span>
                  {showResults && (
                    isAnswerCorrect(term) ? (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    ) : selectedAnswers[term] ? (
                      <XCircle className="w-5 h-5 text-red-400" />
                    ) : null
                  )}
                </div>
                {selectedAnswers[term] && (
                  <div className="mt-2 text-sm text-white/80">
                    → {selectedAnswers[term]}
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Descriptions Column */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Descriptions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {descriptions.map((description, index) => {
              const isUsed = Object.values(selectedAnswers).includes(description)
              const selectedTerm = Object.entries(selectedAnswers).find(([_, desc]) => desc === description)?.[0]
              
              return (
                <div
                  key={index}
                  className={`p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    showResults
                      ? isUsed && selectedTerm && isAnswerCorrect(selectedTerm)
                        ? 'bg-green-500/20 border-green-400 text-white'
                        : isUsed
                        ? 'bg-red-500/20 border-red-400 text-white'
                        : 'bg-white/5 border-white/20 text-white/70'
                      : isUsed
                      ? 'bg-blue-500/30 border-blue-400 text-white'
                      : 'bg-white/5 border-white/20 text-white hover:bg-white/10'
                  }`}
                  onClick={() => {
                    if (!showResults && !isUsed) {
                      // Find the first unmatched term to auto-select
                      const unmatchedTerm = terms.find(term => !selectedAnswers[term])
                      if (unmatchedTerm) {
                        handleAnswerSelect(unmatchedTerm, description)
                      }
                    }
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{description}</span>
                    {showResults && isUsed && (
                      selectedTerm && isAnswerCorrect(selectedTerm) ? (
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-400" />
                      )
                    )}
                  </div>
                  {isUsed && selectedTerm && (
                    <div className="mt-2 text-sm text-white/80">
                      ← {selectedTerm}
                    </div>
                  )}
                </div>
              )
            })}
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {showResults && (
                <Badge variant="secondary" className="bg-white/20 text-white text-lg px-4 py-2">
                  Score: {score}/8
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
                  className="bg-blue-600 hover:bg-blue-700 text-white"
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

export default StudyingUniverse

