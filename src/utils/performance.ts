interface PerformanceMetrics {
  fps: number
  memory?: {
    usedJSHeapSize: number
    totalJSHeapSize: number
  }
  timing: {
    navigationStart: number
    loadEventEnd: number
    domComplete: number
    firstContentfulPaint?: number
  }
}

// 扩展Performance接口以包含memory属性
declare global {
  interface Performance {
    memory?: {
      usedJSHeapSize: number
      totalJSHeapSize: number
      jsHeapSizeLimit: number
    }
  }
}

class PerformanceMonitor {
  private static instance: PerformanceMonitor
  private frameCount: number = 0
  private lastTime: number = performance.now()
  private fps: number = 0
  private callbacks: ((metrics: PerformanceMetrics) => void)[] = []

  private constructor() {
    this.measureFPS()
    this.collectMetrics()
  }

  public static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor()
    }
    return PerformanceMonitor.instance
  }

  private measureFPS() {
    const measureFrame = () => {
      this.frameCount++
      const currentTime = performance.now()
      const deltaTime = currentTime - this.lastTime

      if (deltaTime >= 1000) {
        this.fps = Math.round((this.frameCount * 1000) / deltaTime)
        this.frameCount = 0
        this.lastTime = currentTime
        this.collectMetrics()
      }

      requestAnimationFrame(measureFrame)
    }

    requestAnimationFrame(measureFrame)
  }

  private async collectMetrics() {
    const metrics: PerformanceMetrics = {
      fps: this.fps,
      timing: {
        navigationStart: performance.timing.navigationStart,
        loadEventEnd: performance.timing.loadEventEnd,
        domComplete: performance.timing.domComplete,
      }
    }

    // 收集内存使用情况（如果可用）
    if (performance.memory) {
      metrics.memory = {
        usedJSHeapSize: performance.memory.usedJSHeapSize,
        totalJSHeapSize: performance.memory.totalJSHeapSize
      }
    }

    // 收集首次内容绘制时间（如果可用）
    try {
      const paintEntries = performance.getEntriesByType('paint')
      const firstContentfulPaint = paintEntries.find(
        entry => entry.name === 'first-contentful-paint'
      )
      if (firstContentfulPaint) {
        metrics.timing.firstContentfulPaint = firstContentfulPaint.startTime
      }
    } catch (e) {
      console.warn('First Contentful Paint measurement not available')
    }

    // 通知所有订阅者
    this.callbacks.forEach(callback => callback(metrics))
  }

  public subscribe(callback: (metrics: PerformanceMetrics) => void) {
    this.callbacks.push(callback)
    return () => {
      this.callbacks = this.callbacks.filter(cb => cb !== callback)
    }
  }

  public getMetrics(): PerformanceMetrics {
    return {
      fps: this.fps,
      timing: {
        navigationStart: performance.timing.navigationStart,
        loadEventEnd: performance.timing.loadEventEnd,
        domComplete: performance.timing.domComplete,
      }
    }
  }

  public static logMetrics() {
    const metrics = PerformanceMonitor.getInstance().getMetrics()
    console.log('Performance Metrics:', {
      fps: metrics.fps,
      loadTime: metrics.timing.loadEventEnd - metrics.timing.navigationStart,
      domComplete: metrics.timing.domComplete - metrics.timing.navigationStart,
    })
  }
}

export default PerformanceMonitor 