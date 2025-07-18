import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'

const SurpriseSection = () => {
  const [isBoxOpen, setIsBoxOpen] = useState(false)
  const [showScratchCard, setShowScratchCard] = useState(false)
  const [isScratched, setIsScratched] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const contextRef = useRef<CanvasRenderingContext2D | null>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [scratchedPercentage, setScratchedPercentage] = useState(0)

  // 惊喜内容
  const surpriseContent = {
    title: "我的承诺",
    content: "亲爱的，这是我为你准备的特别礼物。\n今天过后，我会带你去...\n(此处填写实际的惊喜内容)",
    image: "/images/surprise.jpg" // 需要添加图片
  }

  useEffect(() => {
    if (showScratchCard && canvasRef.current) {
      const canvas = canvasRef.current
      const context = canvas.getContext('2d')
      if (context) {
        contextRef.current = context
        // 设置刮刮卡初始状态
        context.fillStyle = '#CCCCCC'
        context.fillRect(0, 0, canvas.width, canvas.height)
      }
    }
  }, [showScratchCard])

  const handleScratch = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!contextRef.current || !canvasRef.current) return

    const canvas = canvasRef.current
    const context = contextRef.current
    const rect = canvas.getBoundingClientRect()

    let x, y
    if ('touches' in e) {
      x = e.touches[0].clientX - rect.left
      y = e.touches[0].clientY - rect.top
    } else {
      x = e.clientX - rect.left
      y = e.clientY - rect.top
    }

    context.globalCompositeOperation = 'destination-out'
    context.beginPath()
    context.arc(x, y, 20, 0, Math.PI * 2)
    context.fill()

    // 计算已刮开的区域百分比
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height)
    const pixels = imageData.data
    let transparentPixels = 0
    for (let i = 0; i < pixels.length; i += 4) {
      if (pixels[i + 3] === 0) {
        transparentPixels++
      }
    }
    const percentage = (transparentPixels / (pixels.length / 4)) * 100
    setScratchedPercentage(percentage)

    if (percentage > 50 && !isScratched) {
      setIsScratched(true)
      // 触发礼花效果
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })
    }
  }

  const openBox = () => {
    setIsBoxOpen(true)
    setTimeout(() => {
      setShowScratchCard(true)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-lg w-full">
        {!isBoxOpen ? (
          <motion.div
            className="relative aspect-square bg-primary rounded-lg shadow-xl cursor-pointer overflow-hidden"
            whileHover={{ scale: 1.02 }}
            onClick={openBox}
          >
            {/* 礼物盒子 */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{
                scale: isBoxOpen ? 1.5 : 1,
                opacity: isBoxOpen ? 0 : 1
              }}
            >
              <div className="text-white text-center">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-6xl mb-4"
                >
                  🎁
                </motion.div>
                <h2 className="text-2xl font-bold mb-2">你的专属惊喜</h2>
                <p className="text-white/80">点击打开</p>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <AnimatePresence>
            {showScratchCard && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-lg shadow-xl p-6"
              >
                <h3 className="text-2xl font-bold text-primary text-center mb-6">
                  {isScratched ? "惊喜揭晓" : "刮开下面的区域"}
                </h3>
                
                <div className="relative aspect-[4/3] bg-white rounded-lg overflow-hidden">
                  {/* 惊喜内容 */}
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-pink-100 to-purple-100 p-6">
                    <div className="text-center">
                      <h4 className="text-xl font-bold text-primary mb-4">
                        {surpriseContent.title}
                      </h4>
                      <p className="text-gray-700 whitespace-pre-line">
                        {surpriseContent.content}
                      </p>
                    </div>
                  </div>

                  {/* 刮刮卡层 */}
                  {!isScratched && (
                    <canvas
                      ref={canvasRef}
                      width={400}
                      height={300}
                      className="absolute inset-0 w-full h-full cursor-pointer"
                      onMouseDown={() => setIsDrawing(true)}
                      onMouseUp={() => setIsDrawing(false)}
                      onMouseMove={(e) => isDrawing && handleScratch(e)}
                      onTouchStart={() => setIsDrawing(true)}
                      onTouchEnd={() => setIsDrawing(false)}
                      onTouchMove={(e) => isDrawing && handleScratch(e)}
                    />
                  )}
                </div>

                {isScratched && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center mt-6"
                  >
                    <p className="text-gray-600 mb-4">
                      希望这个惊喜能让你开心 ❤️
                    </p>
                    <motion.div
                      className="inline-block"
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, -10, 0]
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    >
                      🎉
                    </motion.div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  )
}

export default SurpriseSection 