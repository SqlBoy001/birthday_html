import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Howl } from 'howler'
import WelcomeSection from './WelcomeSection'
import PhotosSection from './PhotosSection'
import WishesSection from './WishesSection'
import MemoriesSection from './MemoriesSection'
import LetterSection from './LetterSection'
import SurpriseSection from './SurpriseSection'

const MainContent = () => {
  const [currentSection, setCurrentSection] = useState(0)
  const [bgMusic, setBgMusic] = useState<Howl | null>(null)

  useEffect(() => {
    // 初始化背景音乐
    const music = new Howl({
      src: ['/music/background.mp3'], // 需要添加音乐文件
      loop: true,
      volume: 0.5,
    })
    setBgMusic(music)

    return () => {
      music.unload()
    }
  }, [])

  const sections = [
    {
      id: 'welcome',
      component: <WelcomeSection onNext={() => setCurrentSection(1)} />,
    },
    {
      id: 'photos',
      component: <PhotosSection onNext={() => setCurrentSection(2)} />,
    },
    {
      id: 'wishes',
      component: <WishesSection onNext={() => setCurrentSection(3)} />,
    },
    {
      id: 'memories',
      component: <MemoriesSection onNext={() => setCurrentSection(4)} />,
    },
    {
      id: 'letter',
      component: <LetterSection onNext={() => setCurrentSection(5)} />,
    },
    {
      id: 'surprise',
      component: <SurpriseSection />,
    },
  ]

  return (
    <div className="min-h-screen">
      <motion.div
        key={currentSection}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        {sections[currentSection].component}
      </motion.div>
    </div>
  )
}

export default MainContent 