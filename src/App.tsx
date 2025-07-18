import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LoadingScreen from './components/LoadingScreen'
import MainContent from './components/MainContent'
import PerformanceMonitor from './utils/performance'
import { getDeviceCapabilities } from './utils/deviceDetect'
import useImagePreload from './hooks/useImagePreload'
import useAudioPreload from './hooks/useAudioPreload'

// 预加载的资源列表
const imageAssets = [
  '/images/photo1.jpg',
  '/images/photo2.jpg',
  '/images/photo3.jpg',
  '/images/surprise.jpg'
]

const audioAssets = [
  '/music/background.mp3',
  '/music/memories.mp3'
]

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const { loadedImages, isLoading: imagesLoading } = useImagePreload(imageAssets)
  const { loadedAudio, isLoading: audioLoading } = useAudioPreload(audioAssets)

  useEffect(() => {
    // 初始化性能监控
    const performanceMonitor = PerformanceMonitor.getInstance()
    const unsubscribe = performanceMonitor.subscribe(metrics => {
      if (metrics.fps < 30) {
        console.warn('Low FPS detected:', metrics.fps)
      }
    })

    // 检查设备兼容性
    const capabilities = getDeviceCapabilities()
    if (!capabilities.supportsWebGL) {
      console.warn('WebGL is not supported on this device')
    }

    // 资源加载完成后关闭加载屏幕
    if (!imagesLoading && !audioLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 1000) // 给用户一个视觉反馈的时间
      return () => clearTimeout(timer)
    }

    return () => {
      unsubscribe()
    }
  }, [imagesLoading, audioLoading])

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <LoadingScreen key="loading" />
      ) : (
        <motion.div
          key="main"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen"
        >
          <MainContent />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default App
