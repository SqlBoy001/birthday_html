import { useState, useEffect } from 'react'
import { Howl } from 'howler'

const useAudioPreload = (audioSources: string[]) => {
  const [loadedAudio, setLoadedAudio] = useState<Howl[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    const preloadAudio = async () => {
      try {
        const loadPromises = audioSources.map(src => {
          return new Promise<Howl>((resolve, reject) => {
            const audio = new Howl({
              src: [src],
              preload: true,
              onload: () => resolve(audio),
              onloaderror: () => reject(new Error(`Failed to load audio: ${src}`))
            })
          })
        })

        const loadedSounds = await Promise.all(loadPromises)
        if (mounted) {
          setLoadedAudio(loadedSounds)
          setIsLoading(false)
        }
      } catch (error) {
        console.error('Error preloading audio:', error)
        if (mounted) {
          setIsLoading(false)
        }
      }
    }

    preloadAudio()

    return () => {
      mounted = false
      // 清理音频资源
      loadedAudio.forEach(audio => audio.unload())
    }
  }, [audioSources])

  return { loadedAudio, isLoading }
}

export default useAudioPreload 