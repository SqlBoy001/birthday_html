import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface WishesSectionProps {
  onNext: () => void
}

const WishesSection = ({ onNext }: WishesSectionProps) => {
  const [currentWish, setCurrentWish] = useState(0)
  const [showBalloons, setShowBalloons] = useState(false)

  const wishes = [
    {
      text: "亲爱的，祝你生日快乐！",
      from: "爱你的男朋友",
      color: "text-primary"
    },
    {
      text: "愿你永远保持那灿烂的笑容",
      from: "最爱的人",
      color: "text-pink-500"
    },
    {
      text: "希望你的每一天都充满阳光",
      from: "永远支持你的我",
      color: "text-purple-500"
    }
  ]

  useEffect(() => {
    setShowBalloons(true)
  }, [])

  const nextWish = () => {
    if (currentWish < wishes.length - 1) {
      setCurrentWish(curr => curr + 1)
    } else {
      onNext()
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-r from-pink-50 to-purple-50 flex items-center justify-center">
      {/* 背景气球 */}
      <AnimatePresence>
        {showBalloons && (
          <>
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                initial={{
                  opacity: 0,
                  y: '100vh',
                  x: `${Math.random() * 100}vw`,
                  scale: Math.random() * 0.5 + 0.5
                }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  y: [0, -200, -400, -600],
                  x: `${Math.random() * 100}vw`,
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: Math.random() * 10 + 10,
                  repeat: Infinity,
                  delay: Math.random() * 5
                }}
              >
                <div
                  className={`w-12 h-16 rounded-full ${
                    ['bg-pink-400', 'bg-purple-400', 'bg-primary'][Math.floor(Math.random() * 3)]
                  }`}
                  style={{
                    borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%'
                  }}
                />
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>

      {/* 主要内容 */}
      <div className="relative z-10 text-center max-w-2xl mx-auto px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentWish}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-12"
          >
            <h2 className={`text-4xl font-bold ${wishes[currentWish].color} mb-4`}>
              {wishes[currentWish].text}
            </h2>
            <p className="text-gray-600 text-lg">
              —— {wishes[currentWish].from}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* 生日蛋糕GIF */}
        <div className="mb-8 relative">
          <img
            src="/images/birthday-cake.gif"
            alt="Birthday Cake"
            className="w-48 h-48 mx-auto object-contain"
          />
          {/* 飞心GIF */}
          <img
            src="/images/flying-hearts.gif"
            alt="Flying Hearts"
            className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full w-24 h-24 object-contain"
          />
        </div>

        <motion.button
          className="btn-primary text-lg px-8 py-3"
          onClick={nextWish}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {currentWish < wishes.length - 1 ? '下一个祝福' : '继续旅程'}
        </motion.button>
      </div>
    </div>
  )
}

export default WishesSection 