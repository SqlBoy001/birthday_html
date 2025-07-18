import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'

interface LetterSectionProps {
  onNext: () => void
}

const LetterSection = ({ onNext }: LetterSectionProps) => {
  const [isSpinning, setIsSpinning] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)

  const prizes = [
    { id: 1, name: "浪漫晚餐", icon: "🍽️" },
    { id: 2, name: "电影约会", icon: "🎬" },
    { id: 3, name: "购物狂欢", icon: "🛍️" },
    { id: 4, name: "旅行计划", icon: "✈️" },
    { id: 5, name: "惊喜礼物", icon: "🎁" },
    { id: 6, name: "温泉之旅", icon: "♨️" },
    { id: 7, name: "游乐园约会", icon: "🎡" },
    { id: 8, name: "烘焙课程", icon: "🧁" },
    { id: 9, name: "花艺体验", icon: "💐" }
  ]

  const startSpin = () => {
    if (isSpinning) return
    setIsSpinning(true)
    setShowResult(false)

    // 模拟抽奖动画
    let currentIndex = 0
    const totalSpins = 30 // 总转动次数
    let speed = 50 // 初始速度
    let count = 0

    const spin = () => {
      if (count >= totalSpins) {
        setIsSpinning(false)
        setShowResult(true)
        // 触发礼花效果
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        })
        return
      }

      setSelectedIndex(currentIndex)
      currentIndex = (currentIndex + 1) % prizes.length
      count++

      // 逐渐减慢速度
      if (count > totalSpins * 0.7) {
        speed += 20
      }

      setTimeout(spin, speed)
    }

    spin()
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-lg w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold text-primary mb-2">幸运抽奖</h2>
          <p className="text-gray-600">点击开始，看看会抽中什么惊喜吧！</p>
        </motion.div>

        {/* 九宫格抽奖区 */}
        <div className="grid grid-cols-3 gap-4 bg-white rounded-xl p-4 shadow-xl mb-8">
          {prizes.map((prize, index) => (
            <motion.div
              key={prize.id}
              className={`aspect-square rounded-lg flex items-center justify-center flex-col p-4 cursor-pointer ${
                selectedIndex === index
                  ? 'bg-primary text-white'
                  : 'bg-pink-100 text-gray-700'
              }`}
              animate={{
                scale: selectedIndex === index ? 1.1 : 1,
                transition: { duration: 0.2 }
              }}
            >
              <span className="text-3xl mb-2">{prize.icon}</span>
              <span className="text-sm font-medium">{prize.name}</span>
            </motion.div>
          ))}
        </div>

        {/* 控制按钮 */}
        <div className="text-center">
          <motion.button
            className="btn-primary text-lg px-8 py-3"
            onClick={isSpinning ? undefined : startSpin}
            whileHover={isSpinning ? {} : { scale: 1.05 }}
            whileTap={isSpinning ? {} : { scale: 0.95 }}
            disabled={isSpinning}
          >
            {isSpinning ? '抽奖中...' : '开始抽奖'}
          </motion.button>
        </div>

        {/* 结果展示 */}
        <AnimatePresence>
          {showResult && selectedIndex !== null && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center mt-8"
            >
              <h3 className="text-2xl font-bold text-primary mb-4">
                恭喜你抽中了 {prizes[selectedIndex].icon}
              </h3>
              <p className="text-xl text-gray-700 mb-6">
                {prizes[selectedIndex].name}
              </p>
              <motion.button
                className="btn-primary"
                onClick={onNext}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                继续旅程
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default LetterSection 