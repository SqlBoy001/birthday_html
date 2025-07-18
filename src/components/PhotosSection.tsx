import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { useSpring } from '@react-spring/three'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'

interface PhotosSectionProps {
  onNext: () => void
}

const PhotosSection = ({ onNext }: PhotosSectionProps) => {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null)
  const [view, setView] = useState<'wall' | '3d'>('wall')
  const containerRef = useRef<HTMLDivElement>(null)

  // 示例照片数据
  const photos = [
    {
      id: 1,
      src: '/images/photo1.jpg',
      title: '我们的第一张合照',
      date: '2023-01-01'
    },
    {
      id: 2,
      src: '/images/photo2.jpg',
      title: '春游时光',
      date: '2023-03-15'
    },
    // 添加更多照片...
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-50 to-purple-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="text-center mb-8"
        >
          <h2 className="text-4xl font-bold text-primary mb-4">我们的美好回忆</h2>
          <div className="flex justify-center gap-4 mb-8">
            <motion.button
              className={`btn-primary ${view === 'wall' ? 'opacity-100' : 'opacity-70'}`}
              onClick={() => setView('wall')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              照片墙
            </motion.button>
            <motion.button
              className={`btn-primary ${view === '3d' ? 'opacity-100' : 'opacity-70'}`}
              onClick={() => setView('3d')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              3D相册
            </motion.button>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {view === 'wall' ? (
            <PhotoWall
              photos={photos}
              onSelect={setSelectedPhoto}
              selectedPhoto={selectedPhoto}
            />
          ) : (
            <PhotoAlbum3D photos={photos} />
          )}
        </AnimatePresence>

        <motion.button
          className="btn-primary mt-8 mx-auto block"
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

const PhotoWall = ({
  photos,
  onSelect,
  selectedPhoto
}: {
  photos: any[]
  onSelect: (id: number | null) => void
  selectedPhoto: number | null
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {photos.map((photo) => (
        <motion.div
          key={photo.id}
          layoutId={`photo-${photo.id}`}
          className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group"
          whileHover={{ scale: 1.05 }}
          onClick={() => onSelect(photo.id)}
        >
          <img
            src={photo.src}
            alt={photo.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <h3 className="text-white font-semibold text-lg mb-2">{photo.title}</h3>
            <p className="text-white/90 text-sm font-medium">{photo.date}</p>
          </div>
        </motion.div>
      ))}

      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            onClick={() => onSelect(null)}
          >
            <motion.div
              layoutId={`photo-${selectedPhoto}`}
              className="relative max-w-4xl max-h-[90vh] w-full mx-4"
            >
              <img
                src={photos.find(p => p.id === selectedPhoto)?.src}
                alt={photos.find(p => p.id === selectedPhoto)?.title}
                className="w-full h-full object-contain rounded-lg"
              />
              <button
                className="absolute top-4 right-4 text-white text-xl"
                onClick={() => onSelect(null)}
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

const PhotoAlbum3D = ({ photos }: { photos: any[] }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-[600px] rounded-lg overflow-hidden"
    >
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <OrbitControls enableZoom={false} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        
        {/* 3D相册模型 */}
        <mesh>
          <boxGeometry args={[1, 1.5, 0.1]} />
          <meshStandardMaterial color="#FF69B4" />
        </mesh>
      </Canvas>
    </motion.div>
  )
}

export default PhotosSection 