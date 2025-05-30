"use client"

import { useState, useEffect } from "react"
import { sdk } from "@farcaster/frame-sdk"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Trophy, Star, Zap, Gift, CheckCircle, XCircle } from "lucide-react"

interface Question {
  id: number
  question: string
  options: string[]
  correct: number
  explanation: string
}

const questions: Question[] = [
  {
    id: 1,
    question: "What is Farcaster?",
    options: [
      "A centralized social media platform",
      "A decentralized social protocol",
      "A cryptocurrency exchange",
      "A NFT marketplace",
    ],
    correct: 1,
    explanation:
      "Farcaster is a decentralized social protocol built on Ethereum, enabling users to own their social identity and data.",
  },
  {
    id: 2,
    question: "Which blockchain is Celo known for?",
    options: [
      "High transaction fees",
      "Mobile-first approach and low fees",
      "Only supporting Bitcoin",
      "Being a centralized network",
    ],
    correct: 1,
    explanation:
      "Celo is designed with a mobile-first approach, offering low transaction fees and easy-to-use mobile wallets.",
  },
  {
    id: 3,
    question: "What are Farcaster Mini Apps?",
    options: [
      "Mobile applications for iOS/Android",
      "Web apps that run inside Farcaster clients",
      "Smart contracts on Ethereum",
      "Desktop software applications",
    ],
    correct: 1,
    explanation:
      "Mini Apps are web applications built with HTML, CSS, and JavaScript that run inside Farcaster clients like Warpcast.",
  },
  {
    id: 4,
    question: "What makes this quiz special?",
    options: [
      "It's just a regular quiz",
      "It rewards users with NFTs and tokens",
      "It only works on desktop",
      "It requires no blockchain interaction",
    ],
    correct: 1,
    explanation:
      "This quiz rewards participants with NFTs or Celo-based tokens for correct answers, combining education with blockchain rewards!",
  },
]

export default function FarcasterQuiz() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [answers, setAnswers] = useState<number[]>([])
  const [showExplanation, setShowExplanation] = useState(false)
  const [gameComplete, setGameComplete] = useState(false)
  const [context, setContext] = useState<any>(null)

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Get context information
        const frameContext = sdk.context
        setContext(frameContext)

        // Signal that the app is ready
        await sdk.actions.ready()
        setIsLoaded(true)
      } catch (error) {
        console.error("Failed to initialize Farcaster SDK:", error)
        setIsLoaded(true) // Still show the app even if SDK fails
      }
    }

    initializeApp()
  }, [])

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null) return
    setSelectedAnswer(answerIndex)
    setShowResult(true)

    const newAnswers = [...answers, answerIndex]
    setAnswers(newAnswers)

    if (answerIndex === questions[currentQuestion].correct) {
      setScore(score + 1)
    }
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowResult(false)
      setShowExplanation(false)
    } else {
      setGameComplete(true)
    }
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setScore(0)
    setShowResult(false)
    setAnswers([])
    setShowExplanation(false)
    setGameComplete(false)
  }

  const handleClaimReward = async () => {
    try {
      // In a real implementation, this would interact with smart contracts
      // For now, we'll show a success message and potentially open a cast composer
      await sdk.actions.composeCast({
        text: `🎉 Just completed the Farcaster Quiz and scored ${score}/${questions.length}! 🧠✨\n\nBuilding on @farcaster and @celo is amazing! 🚀`,
        embeds: [window.location.href],
      })
    } catch (error) {
      console.error("Failed to share result:", error)
    }
  }

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100
    if (percentage === 100) return "Perfect! You're a Farcaster & Celo expert! 🏆"
    if (percentage >= 75) return "Excellent! You know your stuff! 🌟"
    if (percentage >= 50) return "Good job! Keep learning! 💪"
    return "Nice try! There's always room to grow! 🌱"
  }

  const getRewardMessage = () => {
    if (score === questions.length) return "🎁 Claim your exclusive NFT reward!"
    if (score >= questions.length * 0.75) return "🪙 Claim your Celo token reward!"
    if (score >= questions.length * 0.5) return "⭐ Claim your participation badge!"
    return "🎯 Try again to earn rewards!"
  }

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-lg">Loading your quiz experience...</p>
        </div>
      </div>
    )
  }

  if (gameComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 p-4 flex items-center justify-center">
        <Card className="w-full max-w-md mx-auto bg-white/95 backdrop-blur-sm shadow-2xl border-0">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
                Quiz Complete!
              </h2>
              <p className="text-gray-600 mb-4">{getScoreMessage()}</p>
            </div>

            <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl p-6 mb-6">
              <div className="text-3xl font-bold text-gray-800 mb-2">
                {score}/{questions.length}
              </div>
              <div className="text-sm text-gray-600 mb-3">Final Score</div>
              <Progress value={(score / questions.length) * 100} className="h-3" />
            </div>

            <div className="space-y-3">
              <Button
                onClick={handleClaimReward}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
                disabled={score === 0}
              >
                <Gift className="w-5 h-5 mr-2" />
                {getRewardMessage()}
              </Button>

              <Button
                onClick={handleRestart}
                variant="outline"
                className="w-full border-2 border-purple-300 text-purple-600 hover:bg-purple-50 font-semibold py-3 rounded-xl transition-all duration-300"
              >
                <Zap className="w-5 h-5 mr-2" />
                Try Again
              </Button>
            </div>

            {context?.user && (
              <div className="mt-6 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  Great job, {context.user.displayName || context.user.username || "Farcaster User"}! 🎉
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  const question = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 p-4">
      <div className="max-w-2xl mx-auto pt-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">🧠 Farcaster Quiz Challenge</h1>
          <p className="text-purple-100">Test your knowledge and earn rewards!</p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white font-medium">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <Badge variant="secondary" className="bg-white/20 text-white border-0">
              Score: {score}/{currentQuestion + (showResult ? 1 : 0)}
            </Badge>
          </div>
          <Progress value={progress} className="h-2 bg-white/20" />
        </div>

        {/* Question Card */}
        <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0 mb-6">
          <CardContent className="p-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 leading-relaxed">{question.question}</h2>

            <div className="space-y-3">
              {question.options.map((option, index) => {
                let buttonClass = "w-full p-4 text-left rounded-xl border-2 transition-all duration-300 font-medium "

                if (selectedAnswer === null) {
                  buttonClass += "border-gray-200 hover:border-purple-300 hover:bg-purple-50 text-gray-700"
                } else if (index === question.correct) {
                  buttonClass += "border-green-500 bg-green-50 text-green-700"
                } else if (index === selectedAnswer && index !== question.correct) {
                  buttonClass += "border-red-500 bg-red-50 text-red-700"
                } else {
                  buttonClass += "border-gray-200 bg-gray-50 text-gray-500"
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={buttonClass}
                    disabled={selectedAnswer !== null}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option}</span>
                      {selectedAnswer !== null && (
                        <div>
                          {index === question.correct && <CheckCircle className="w-5 h-5 text-green-600" />}
                          {index === selectedAnswer && index !== question.correct && (
                            <XCircle className="w-5 h-5 text-red-600" />
                          )}
                        </div>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>

            {showResult && (
              <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                <div className="flex items-start space-x-3">
                  <Star className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-blue-800 mb-1">
                      {selectedAnswer === question.correct ? "Correct! 🎉" : "Not quite right 🤔"}
                    </p>
                    <p className="text-blue-700 text-sm">{question.explanation}</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Next Button */}
        {showResult && (
          <div className="text-center">
            <Button
              onClick={handleNext}
              className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              {currentQuestion < questions.length - 1 ? "Next Question" : "View Results"}
              <Zap className="w-5 h-5 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
