import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Howl } from 'howler'

interface MemoriesSectionProps {
  onNext: () => void
}

const MemoriesSection = ({ onNext }: MemoriesSectionProps) => {
  const [currentMemory, setCurrentMemory] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [bgm, setBgm] = useState<Howl | null>(null)

  const memories = [
    {
      id: 1,
      image: '/images/memory1.jpg',
      title: '我们的第一次约会',
      description: '那天的阳光真好，你的笑容更美',
      date: '2023-01-15'
    },
    {
      id: 2,
      image: '/images/memory2.jpg',
      title: '一起看日落',
      description: '夕阳下，我们许下了美好的约定',
      date: '2023-03-20'
    },
    {
      id: 3,
      image: '/images/memory3.jpg',
      title: '浪漫晚餐',
      description: '烛光中，你是最耀眼的那颗星',
      date: '2023-06-01'
    }
  ]

  useEffect(() => {
    // 初始化背景音乐
    const music = new Howl({
      src: ['/music/memories.mp3'], // 需要添加音乐文件
      loop: true,
      volume: 0.3,
    })
    setBgm(music)

    return () => {
      if (music) {
        music.unload()
      }
    }
  }, [])

  useEffect(() => {
    if (isPlaying) {
      // 自动播放下一张
      const timer = setInterval(() => {
        setCurrentMemory(curr => {
          if (curr >= memories.length - 1) {
            setIsPlaying(false)
            return curr
          }
          return curr + 1
        })
      }, 3000)

      return () => clearInterval(timer)
    }
  }, [isPlaying, memories.length])

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
    if (bgm) {
      if (!isPlaying) {
        bgm.play()
      } else {
        bgm.pause()
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-50 to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-primary mb-4">我们的故事</h2>
          <p className="text-gray-600">每一刻都值得珍藏</p>
        </motion.div>

        {/* 记忆展示区 */}
        <div className="relative aspect-video rounded-xl overflow-hidden shadow-xl mb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentMemory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <img
                src={memories[currentMemory].image}
                alt={memories[currentMemory].title}
                className="w-full h-full object-cover"
              />
              {/* 渐变遮罩 */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              {/* 文字信息 */}
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <motion.h3
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-2xl font-bold mb-2"
                >
                  {memories[currentMemory].title}
                </motion.h3>
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-white/80 mb-2"
                >
                  {memories[currentMemory].description}
                </motion.p>
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-white/60 text-sm"
                >
                  {memories[currentMemory].date}
                </motion.p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 控制按钮 */}
        <div className="flex justify-center items-center gap-4">
          <motion.button
            className="btn-primary px-6 py-2"
            onClick={() => setCurrentMemory(curr => Math.max(0, curr - 1))}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={currentMemory === 0}
          >
            上一个
          </motion.button>

          <motion.button
            className="btn-primary px-6 py-2"
            onClick={togglePlay}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isPlaying ? '暂停' : '播放'}
          </motion.button>

          <motion.button
            className="btn-primary px-6 py-2"
            onClick={() => setCurrentMemory(curr => Math.min(memories.length - 1, curr + 1))}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={currentMemory === memories.length - 1}
          >
            下一个
          </motion.button>
        </div>

        {/* 进度指示器 */}
        <div className="flex justify-center items-center gap-2 mt-6">
          {memories.map((_, index) => (
            <motion.div
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === currentMemory ? 'bg-primary' : 'bg-gray-300'
              }`}
              whileHover={{ scale: 1.2 }}
              onClick={() => setCurrentMemory(index)}
            />
          ))}
        </div>

        {/* 继续按钮 */}
        <motion.button
          className="btn-primary mt-12 mx-auto block"
          onClick={onNext}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          继续我们的旅程
        </motion.button>
      </div>
    </div>
  )
}

export default MemoriesSection 