import { useState } from 'react'
import { Button } from './components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card.jsx'
import { Badge } from './components/ui/badge.jsx'
import { Star, Rocket, BookOpen, Brain, Target } from 'lucide-react'
import './App.css'
// import universeBackground from './assets/universe-background.gif' // Commented out until image is available

// Exercise Components
import StudyingUniverse from './StudyingUniverse.jsx'
import WondersUniverse from './WondersUniverse.jsx'
import ReadingQuiz from './ReadingQuiz.jsx'
import UniverseVerbs from './UniverseVerbs.jsx'

function App() {
  const [currentExercise, setCurrentExercise] = useState(null)
  const [totalScore, setTotalScore] = useState(0)
  const [completedExercises, setCompletedExercises] = useState(new Set())

  const exercises = [
    {
      id: 'studying',
      title: 'Studying the Universe',
      description: 'Match space exploration terms with their descriptions',
      icon: <Rocket className="w-6 h-6" />,
      component: StudyingUniverse,
      maxScore: 8
    },
    {
      id: 'wonders',
      title: 'Wonders of the Universe',
      description: 'Match cosmic phenomena with their definitions',
      icon: <Star className="w-6 h-6" />,
      component: WondersUniverse,
      maxScore: 8
    },
    {
      id: 'reading',
      title: 'Universe Reading Quiz',
      description: 'Test your understanding with true/false questions',
      icon: <BookOpen className="w-6 h-6" />,
      component: ReadingQuiz,
      maxScore: 5
    },
    {
      id: 'verbs',
      title: 'Universe Verbs',
      description: 'Learn space-related verbs and complete sentences',
      icon: <Brain className="w-6 h-6" />,
      component: UniverseVerbs,
      maxScore: 12
    }
  ]

  const handleExerciseComplete = (exerciseId, score) => {
    setTotalScore(prev => prev + score)
    setCompletedExercises(prev => new Set([...prev, exerciseId]))
  }

  const handleBackToHome = () => {
    setCurrentExercise(null)
  }

  const totalPossibleScore = exercises.reduce((sum, ex) => sum + ex.maxScore, 0)

  if (currentExercise) {
    const exercise = exercises.find(ex => ex.id === currentExercise)
    const ExerciseComponent = exercise.component
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <Button 
              onClick={handleBackToHome}
              variant="outline"
              className="mb-4 bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              ← Back to Home
            </Button>
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                {exercise.icon}
                {exercise.title}
              </h1>
              <div className="flex items-center gap-4">
                <Badge variant="secondary" className="bg-white/20 text-white">
                  <Target className="w-4 h-4 mr-1" />
                  Total Score: {totalScore}/{totalPossibleScore}
                </Badge>
              </div>
            </div>
          </div>
          <ExerciseComponent 
            onComplete={(score) => handleExerciseComplete(currentExercise, score)}
            isCompleted={completedExercises.has(currentExercise)}
          />
        </div>
      </div>
    )
  }

  return (
    <div 
      className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900"
      /* Temporary gradient background until universe-background.gif is available
      style={{
        backgroundImage: `url(${universeBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
      */
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/50"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-white mb-4 drop-shadow-lg">
            The Universe
          </h1>
          <p className="text-xl text-white/90 mb-8 drop-shadow-md">
            Interactive Exercises to Explore the Cosmos
          </p>
          <div className="flex items-center justify-center gap-4 mb-8">
            <Badge variant="secondary" className="bg-white/20 text-white text-lg px-4 py-2">
              <Target className="w-5 h-5 mr-2" />
              Total Score: {totalScore}/{totalPossibleScore}
            </Badge>
            <Badge variant="secondary" className="bg-white/20 text-white text-lg px-4 py-2">
              <Star className="w-5 h-5 mr-2" />
              Completed: {completedExercises.size}/{exercises.length}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {exercises.map((exercise) => (
            <Card 
              key={exercise.id}
              className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer transform hover:scale-105"
              onClick={() => setCurrentExercise(exercise.id)}
            >
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-3">
                  {exercise.icon}
                  {exercise.title}
                  {completedExercises.has(exercise.id) && (
                    <Badge variant="secondary" className="bg-green-500/80 text-white">
                      ✓ Completed
                    </Badge>
                  )}
                </CardTitle>
                <CardDescription className="text-white/80">
                  {exercise.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Max Score: {exercise.maxScore}</span>
                  <Button 
                    variant="secondary"
                    className="bg-white/20 text-white hover:bg-white/30"
                  >
                    Start Exercise →
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-white/70 text-sm">
            Click on any exercise card to begin your cosmic journey!
          </p>
        </div>
      </div>
    </div>
  )
}

export default App

