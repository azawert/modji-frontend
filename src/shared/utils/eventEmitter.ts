type EventCallback = (...args: any[]) => void

class EventEmitter {
  private events: Record<string, EventCallback[]> = {}

  on(event: string, cb: EventCallback) {
    if (!this.events[event]) {
      this.events[event] = []
    }
    this.events[event].push(cb)
  }

  off(event: string, cb: EventCallback) {
    if (!this.events[event]) {
      return
    }
    this.events[event] = this.events[event].filter(c => c !== cb)
  }

  emit(event: string, ...args: any[]) {
    if (!this.events[event]) {
      return
    }
    this.events[event].forEach(cb => cb(...args))
  }
}

export const eventEmitter = new EventEmitter()
