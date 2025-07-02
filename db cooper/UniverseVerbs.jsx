import { useState } from 'react'
import { Button } from './components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card.jsx'
import { Badge } from './components/ui/badge.jsx'
import { CheckCircle, XCircle, RotateCcw } from 'lucide-react'

const UniverseVerbs = ({ onComplete, isCompleted }) => {
  const [partAAnswers, setPartAAnswers] = useState({})
  const [partBAnswers, setPartBAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)

  // Part A: Match verbs to meanings
  const verbs = ['collide', 'expand', 'launch', 'form', 'orbit', 'spin']
  const meanings = [
    'quickly turn around and around',
    'come together with force',
    'move around something',
    'increase in size',
    'send something into space',
    'begin to exist'
  ]

  const partACorrectAnswers = {
    'collide': 'come together with force',
    'expand': 'increase in size',
    'launch': 'send something into space',
    'form': 'begin to exist',
    'orbit': 'move around something',
    'spin': 'quickly turn around and around'
  }

  // Part B: Complete sentences
  const sentences = [
    { id: 1, text: "The rocket was _____ safely while a large crowd of people watched from the ground.", answer: "launched" },
    { id: 2, text: "Some people think that the dinosaurs died out when an asteroid _____ with the Earth.", answer: "collided" },
    { id: 3, text: "Stars are _____ in large clouds of dust and gas.", answer: "formed" },
    { id: 4, text: "The Earth _____ on its axis at an angle of 23.5.", answer: "spins" },
    { id: 5, text: "Mars takes 687 days to _____ the sun.", answer: "orbit" },
    { id: 6, text: "Scientists discovered that the universe is still _____.", answer: "expanding" }
  ]

  const handlePartASelect = (verb, meaning) => {
    if (showResults) return
    setPartAAnswers(prev => ({
      ...prev,
      [verb]: meaning
    }))
  }

  const handlePartBSelect = (sentenceId, verb) => {
    if (showResults) return
    setPartBAnswers(prev => ({
      ...prev,
      [sentenceId]: verb
    }))
  }

  const handleSubmit = () => {
    let correctCount = 0
    
    // Score Part A
    Object.entries(partAAnswers).forEach(([verb, meaning]) => {
      if (partACorrectAnswers[verb] === meaning) {
        correctCount++
      }
    })
    
    // Score Part B
    sentences.forEach(sentence => {
      if (partBAnswers[sentence.id] === sentence.answer) {
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
    setPartAAnswers({})
    setPartBAnswers({})
    setShowResults(false)
    setScore(0)
  }

  const isPartACorrect = (verb) => {
    return partACorrectAnswers[verb] === partAAnswers[verb]
  }

  const isPartBCorrect = (sentenceId) => {
    const sentence = sentences.find(s => s.id === sentenceId)
    return sentence && partBAnswers[sentenceId] === sentence.answer
  }

  const allPartAAnswered = verbs.every(verb => partAAnswers[verb])
  const allPartBAnswered = sentences.every(sentence => partBAnswers[sentence.id])
  const allAnswered = allPartAAnswered && allPartBAnswered

  return (
    <div className="space-y-6">
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Instructions</CardTitle>
          <CardDescription className="text-white/80">
            This exercise has two parts: First match verbs to their meanings, then complete sentences using the correct verb forms.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Part A: Match verbs to meanings */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Part A: Match the verbs to their meanings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Verbs Column */}
            <div className="space-y-3">
              <h4 className="text-white font-medium mb-3">Verbs</h4>
              {verbs.map((verb) => (
                <div
                  key={verb}
                  className={`p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    showResults
                      ? isPartACorrect(verb)
                        ? 'bg-green-500/20 border-green-400 text-white'
                        : partAAnswers[verb]
                        ? 'bg-red-500/20 border-red-400 text-white'
                        : 'bg-white/5 border-white/20 text-white/70'
                      : partAAnswers[verb]
                      ? 'bg-orange-500/30 border-orange-400 text-white'
                      : 'bg-white/5 border-white/20 text-white hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{verb}</span>
                    {showResults && (
                      isPartACorrect(verb) ? (
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      ) : partAAnswers[verb] ? (
                        <XCircle className="w-5 h-5 text-red-400" />
                      ) : null
                    )}
                  </div>
                  {partAAnswers[verb] && (
                    <div className="mt-2 text-sm text-white/80">
                      → {partAAnswers[verb]}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Meanings Column */}
            <div className="space-y-3">
              <h4 className="text-white font-medium mb-3">Meanings</h4>
              {meanings.map((meaning, index) => {
                const isUsed = Object.values(partAAnswers).includes(meaning)
                const selectedVerb = Object.entries(partAAnswers).find(([_, m]) => m === meaning)?.[0]
                
                return (
                  <div
                    key={index}
                    className={`p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                      showResults
                        ? isUsed && selectedVerb && isPartACorrect(selectedVerb)
                          ? 'bg-green-500/20 border-green-400 text-white'
                          : isUsed
                          ? 'bg-red-500/20 border-red-400 text-white'
                          : 'bg-white/5 border-white/20 text-white/70'
                        : isUsed
                        ? 'bg-orange-500/30 border-orange-400 text-white'
                        : 'bg-white/5 border-white/20 text-white hover:bg-white/10'
                    }`}
                    onClick={() => {
                      if (!showResults && !isUsed) {
                        const unmatchedVerb = verbs.find(verb => !partAAnswers[verb])
                        if (unmatchedVerb) {
                          handlePartASelect(unmatchedVerb, meaning)
                        }
                      }
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{meaning}</span>
                      {showResults && isUsed && (
                        selectedVerb && isPartACorrect(selectedVerb) ? (
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-400" />
                        )
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Part B: Complete sentences */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Part B: Complete the sentences with the correct verb forms</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {sentences.map((sentence) => (
            <div key={sentence.id} className="space-y-3">
              <div className="text-white">
                {sentence.id}. {sentence.text.replace('_____', '______')}
              </div>
              
              <div className="flex flex-wrap gap-2">
                {['launched', 'collided', 'formed', 'spins', 'orbit', 'expanding'].map((verb) => (
                  <button
                    key={verb}
                    onClick={() => handlePartBSelect(sentence.id, verb)}
                    disabled={showResults}
                    className={`px-4 py-2 rounded-lg border-2 transition-all duration-200 ${
                      showResults
                        ? partBAnswers[sentence.id] === verb
                          ? isPartBCorrect(sentence.id)
                            ? 'bg-green-500/20 border-green-400 text-white'
                            : 'bg-red-500/20 border-red-400 text-white'
                          : verb === sentence.answer
                          ? 'bg-green-500/20 border-green-400 text-white'
                          : 'bg-white/5 border-white/20 text-white/70'
                        : partBAnswers[sentence.id] === verb
                        ? 'bg-blue-500/30 border-blue-400 text-white'
                        : 'bg-white/5 border-white/20 text-white hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>{verb}</span>
                      {showResults && partBAnswers[sentence.id] === verb && (
                        isPartBCorrect(sentence.id) ? (
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-400" />
                        )
                      )}
                      {showResults && verb === sentence.answer && partBAnswers[sentence.id] !== verb && (
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
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
                  Score: {score}/12
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
                  className="bg-orange-600 hover:bg-orange-700 text-white"
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

export default UniverseVerbs

