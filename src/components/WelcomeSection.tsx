import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

interface WelcomeSectionProps {
  onNext: () => void
}

const WelcomeSection = ({ onNext }: WelcomeSectionProps) => {
  const [showButton, setShowButton] = useState(false)
  const [name, setName] = useState('')
  const targetName = '亲爱的小美' // 替换为女朋友的名字

  useEffect(() => {
    // 文字逐个显示动画
    let index = 0
    const interval = setInterval(() => {
      if (index <= targetName.length) {
        setName(targetName.slice(0, index))
        index++
      } else {
        clearInterval(interval)
        setShowButton(true)
      }
    }, 200)

    return () => clearInterval(interval)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-50 to-purple-50"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="text-center">
        <motion.div
          className="mb-8"
          variants={itemVariants}
        >
          <h1 className="text-6xl font-bold text-primary mb-4">
            {name}
            <motion.span
              animate={{
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              |
            </motion.span>
          </h1>
          <p className="text-xl text-gray-600">今天是你的特别日子</p>
        </motion.div>

        <motion.div
          className="space-y-6"
          variants={itemVariants}
        >
          <p className="text-lg text-gray-500">
            准备好开始这段神奇的旅程了吗？
          </p>

          {showButton && (
            <motion.button
              className="btn-primary text-lg px-8 py-3"
              onClick={onNext}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 8px rgba(255,105,180,0.3)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              开始旅程
            </motion.button>
          )}
        </motion.div>

        {/* 装饰元素 */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
                backgroundColor: 'rgba(255,105,180,0.2)',
                borderRadius: '50%'
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{
                duration: Math.random() * 2 + 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}

export default WelcomeSection 