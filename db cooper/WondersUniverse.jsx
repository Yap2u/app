import { useState } from 'react'
import { Button } from './components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card.jsx'
import { Badge } from './components/ui/badge.jsx'
import { CheckCircle, XCircle, RotateCcw } from 'lucide-react'

const WondersUniverse = ({ onComplete, isCompleted }) => {
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)

  const terms = [
    'asteroid',
    'black hole',
    'comet',
    'constellation',
    'crater',
    'eclipse',
    'galaxy',
    'planet'
  ]

  const definitions = [
    'a large rock that moves around in space',
    'an area in space where gravity is so strong that nothing can escape from it',
    'a bright object in space that has a tail made from gas and dust',
    'a group of stars that make a pattern in the sky',
    'a large hole on the surface of a planet made by something that hit it',
    'a short period when all or part of the Sun or Moon is dark',
    'a group of stars and other substances',
    'a very large object in space that moves around a star'
  ]

  const correctAnswers = {
    'asteroid': 'a large rock that moves around in space',
    'black hole': 'an area in space where gravity is so strong that nothing can escape from it',
    'comet': 'a bright object in space that has a tail made from gas and dust',
    'constellation': 'a group of stars that make a pattern in the sky',
    'crater': 'a large hole on the surface of a planet made by something that hit it',
    'eclipse': 'a short period when all or part of the Sun or Moon is dark',
    'galaxy': 'a group of stars and other substances',
    'planet': 'a very large object in space that moves around a star'
  }

  const handleAnswerSelect = (term, definition) => {
    if (showResults) return
    setSelectedAnswers(prev => ({
      ...prev,
      [term]: definition
    }))
  }

  const handleSubmit = () => {
    let correctCount = 0
    Object.entries(selectedAnswers).forEach(([term, definition]) => {
      if (correctAnswers[term] === definition) {
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
            Match each cosmic phenomenon with its correct definition. Click on a term, then click on its matching definition.
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Terms Column */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Cosmic Phenomena</CardTitle>
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
                    ? 'bg-purple-500/30 border-purple-400 text-white'
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

        {/* Definitions Column */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Definitions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {definitions.map((definition, index) => {
              const isUsed = Object.values(selectedAnswers).includes(definition)
              const selectedTerm = Object.entries(selectedAnswers).find(([_, def]) => def === definition)?.[0]
              
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
                      ? 'bg-purple-500/30 border-purple-400 text-white'
                      : 'bg-white/5 border-white/20 text-white hover:bg-white/10'
                  }`}
                  onClick={() => {
                    if (!showResults && !isUsed) {
                      // Find the first unmatched term to auto-select
                      const unmatchedTerm = terms.find(term => !selectedAnswers[term])
                      if (unmatchedTerm) {
                        handleAnswerSelect(unmatchedTerm, definition)
                      }
                    }
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{definition}</span>
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
                  className="bg-purple-600 hover:bg-purple-700 text-white"
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

export default WondersUniverse

