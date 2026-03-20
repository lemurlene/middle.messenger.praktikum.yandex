type Listener<T extends unknown[] = unknown[]> = (...args: T) => void;

export class EventBus {
  private listeners: Record<string, Listener[]> = {};

  on(event: string, callback: Listener): void {
    (this.listeners[event] ??= []).push(callback);
  }

  off(event: string, callback: Listener): void {
    this.listeners[event] = (this.listeners[event] ?? []).filter((l) => l !== callback);
  }

  emit(event: string, ...args: unknown[]): void {
    (this.listeners[event] ?? []).forEach((l) => l(...args));
  }
}
