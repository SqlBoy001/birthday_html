import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0)
  const [message, setMessage] = useState('正在准备你的专属惊喜...')

  useEffect(() => {
    const messages = [
      '正在收集美好回忆...',
      '正在装饰派对现场...',
      '正在包装惊喜礼物...',
      '正在点亮生日蜡烛...',
      '马上就要准备好啦...'
    ]

    const interval = setInterval(() => {
      setProgress(prev => {
        const next = prev + 1
        if (next >= 100) {
          clearInterval(interval)
          return 100
        }
        // 根据进度更新消息
        const messageIndex = Math.floor((next / 100) * messages.length)
        setMessage(messages[messageIndex])
        return next
      })
    }, 30)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center bg-gradient-to-r from-pink-50 to-purple-50"
    >
      <div className="text-center max-w-md mx-auto px-4">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-24 h-24 mb-8 mx-auto relative"
        >
          {/* 蛋糕动画 */}
          <svg
            className="w-full h-full text-primary"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              d="M3 10h18v10H3V10zm3-4h12v4H6V6zm5-3h2v3h-2V3z"
              fill="currentColor"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                repeat: Infinity
              }}
            />
          </svg>
          {/* 蜡烛火焰动画 */}
          <motion.div
            className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full"
            animate={{
              y: [0, -10, 0],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="w-4 h-4 bg-yellow-400 rounded-full blur-sm" />
          </motion.div>
        </motion.div>

        {/* 进度条 */}
        <div className="w-full bg-white rounded-full h-2 mb-4">
          <motion.div
            className="bg-primary h-full rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* 加载消息 */}
        <motion.p
          key={message}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="text-xl font-semibold text-primary"
        >
          {message}
        </motion.p>

        {/* 进度百分比 */}
        <motion.p
          className="text-sm text-gray-500 mt-2"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {progress}%
        </motion.p>
      </div>
    </motion.div>
  )
}

export default LoadingScreen 