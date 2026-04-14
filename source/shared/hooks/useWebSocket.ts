import { useCallback, useEffect, useRef } from 'react'
import { AppState } from 'react-native'

const WS_URL = 'wss://k8s.mectest.ru/test-app/ws'
const AUTH_TOKEN = '3B803BA1-FC43-41CD-8312-BA2C8DF0C89D'
const RECONNECT_DELAY = 8000

export type WsEvent =
  | { type: 'ping' }
  | { type: 'like_updated'; postId: string; likesCount: number }
  | {
      type: 'comment_added'
      id: string
      postId: string
      author: object
      text: string
      createdAt: string
    }

type Listener = (event: WsEvent) => void

const listeners = new Set<Listener>()
let ws: WebSocket | null = null
let reconnectTimer: ReturnType<typeof setTimeout> | null = null

function connect() {
  if (ws && (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING)) {
    return
  }

  console.log('[WS] Connecting to', `${WS_URL}?token=${AUTH_TOKEN}`)
  ws = new WebSocket(`${WS_URL}?token=${AUTH_TOKEN}`)

  ws.onopen = () => {
    console.log('[WS] Connected')
  }

  ws.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data) as WsEvent
      console.log('[WS] Message received:', data.type, data)
      if (data.type === 'ping') return
      listeners.forEach((listener) => listener(data))
    } catch (e) {
      console.warn('[WS] Failed to parse message:', event.data, e)
    }
  }

  ws.onclose = (event) => {
    console.log('[WS] Disconnected, code:', event.code, 'reason:', event.reason)
    ws = null
    scheduleReconnect()
  }

  ws.onerror = (event) => {
    console.error('[WS] Error:', event)
    ws?.close()
  }
}

function scheduleReconnect() {
  if (reconnectTimer) return
  reconnectTimer = setTimeout(() => {
    reconnectTimer = null
    if (listeners.size > 0) {
      connect()
    }
  }, RECONNECT_DELAY)
}

function subscribe(listener: Listener) {
  listeners.add(listener)
  if (listeners.size === 1) {
    connect()
  }
  return () => {
    listeners.delete(listener)
    if (listeners.size === 0) {
      if (reconnectTimer) {
        clearTimeout(reconnectTimer)
        reconnectTimer = null
      }
      ws?.close()
      ws = null
    }
  }
}

export function useWebSocket(onEvent: Listener) {
  const callbackRef = useRef(onEvent)
  callbackRef.current = onEvent

  const stableListener = useCallback((event: WsEvent) => {
    callbackRef.current(event)
  }, [])

  useEffect(() => {
    const unsubscribe = subscribe(stableListener)

    const appStateSubscription = AppState.addEventListener('change', (state) => {
      if (state === 'active' && listeners.size > 0) {
        connect()
      }
    })

    return () => {
      unsubscribe()
      appStateSubscription.remove()
    }
  }, [stableListener])
}
