import { useState, useEffect } from 'react'

const useImagePreload = (imageSources: string[]) => {
  const [loadedImages, setLoadedImages] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    const preloadImages = async () => {
      try {
        const loadPromises = imageSources.map(src => {
          return new Promise<string>((resolve, reject) => {
            const img = new Image()
            img.src = src
            img.onload = () => resolve(src)
            img.onerror = () => reject(new Error(`Failed to load image: ${src}`))
          })
        })

        const loadedSources = await Promise.all(loadPromises)
        if (mounted) {
          setLoadedImages(loadedSources)
          setIsLoading(false)
        }
      } catch (error) {
        console.error('Error preloading images:', error)
        if (mounted) {
          setIsLoading(false)
        }
      }
    }

    preloadImages()

    return () => {
      mounted = false
    }
  }, [imageSources])

  return { loadedImages, isLoading }
}

export default useImagePreload 