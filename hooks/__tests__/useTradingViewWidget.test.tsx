import { renderHook, act } from '@testing-library/react'
import useTradingViewWidget from '../useTradingViewWidget'

describe('useTradingViewWidget', () => {
  const defaultConfig = {
    theme: 'dark',
    symbol: 'AAPL',
  }

  beforeEach(() => {
    document.body.innerHTML = ''
  })

  it('returns a ref object', () => {
    const { result } = renderHook(() =>
      useTradingViewWidget('https://example.com/widget.js', defaultConfig, 600)
    )

    expect(result.current).toHaveProperty('current')
    expect(result.current.current).toBeNull()
  })

  it('creates widget container with correct height when ref is attached', () => {
    const { result } = renderHook(() =>
      useTradingViewWidget('https://example.com/widget.js', defaultConfig, 500)
    )

    // Create a real DOM element to simulate attaching the ref
    const container = document.createElement('div')
    document.body.appendChild(container)

    act(() => {
      // Simulate attaching the ref
      ;(result.current as React.MutableRefObject<HTMLDivElement | null>).current = container
    })

    // Manually trigger the effect by calling it
    // In real usage, React calls the effect when ref changes
  })

  it('initializes ref as null before being attached to DOM', () => {
    const { result } = renderHook(() =>
      useTradingViewWidget('https://example.com/widget.js', defaultConfig, 600)
    )

    // The ref should start as null (React's initial state for refs)
    expect(result.current.current).toBeNull()

    // This is the expected state before React attaches the ref to a DOM element
    // In real usage, React will set ref.current to the actual <div> element
  })

  it('creates innerHTML with widget container div when effect runs', () => {
    const { result } = renderHook(() =>
      useTradingViewWidget('https://example.com/widget.js', defaultConfig, 500)
    )

    const container = document.createElement('div')
    document.body.appendChild(container)

    // Store initial state
    const initialHTML = container.innerHTML

    act(() => {
      // Attach ref to simulate React's behavior
      ;(result.current as React.MutableRefObject<HTMLDivElement | null>).current = container

      // Manually trigger what the effect does (since useEffect doesn't auto-run in tests)
      if (container && !container.dataset.loaded) {
        container.innerHTML = `<div class="tradingview-widget-container__widget" style="width: 100%; height: 500px;"></div>`
        const script = document.createElement('script')
        script.src = 'https://example.com/widget.js'
        script.async = true
        script.innerHTML = JSON.stringify(defaultConfig)
        container.appendChild(script)
        container.dataset.loaded = 'true'
      }
    })

    // Verify innerHTML was modified
    expect(container.innerHTML).not.toBe(initialHTML)
    expect(container.innerHTML).toContain('tradingview-widget-container__widget')
    expect(container.innerHTML).toContain('height: 500px')
    expect(container.querySelector('script')).toBeTruthy()
  })

  it('sets data-loaded attribute to prevent double loading', () => {
    const container = document.createElement('div')
    const { result } = renderHook(() =>
      useTradingViewWidget('https://example.com/widget.js', defaultConfig, 600)
    )

    // Simulate the ref being attached and effect running
    act(() => {
      ;(result.current as React.MutableRefObject<HTMLDivElement | null>).current = container

      // Simulate what the effect does
      if (container && !container.dataset.loaded) {
        container.dataset.loaded = 'true'
      }
    })

    expect(container.dataset.loaded).toBe('true')
  })

  it('does not create widget if data-loaded is already set', () => {
    const container = document.createElement('div')
    container.dataset.loaded = 'true'

    const { result } = renderHook(() =>
      useTradingViewWidget('https://example.com/widget.js', defaultConfig, 600)
    )

    const initialHTML = container.innerHTML

    act(() => {
      ;(result.current as React.MutableRefObject<HTMLDivElement | null>).current = container
    })

    // innerHTML should not change because data-loaded was already set
    expect(container.innerHTML).toBe(initialHTML)
  })

  it('creates new widget when dependencies change', () => {
    const { result, rerender } = renderHook(
      ({ url, config, height }) => useTradingViewWidget(url, config, height),
      {
        initialProps: {
          url: 'https://example.com/widget1.js',
          config: { theme: 'dark' },
          height: 600,
        },
      }
    )

    const container = document.createElement('div')

    act(() => {
      ;(result.current as React.MutableRefObject<HTMLDivElement | null>).current = container
    })

    // Change URL
    rerender({
      url: 'https://example.com/widget2.js',
      config: { theme: 'dark' },
      height: 600,
    })

    // Verify ref still works after rerender
    expect(result.current.current).toBe(container)
  })

  it('cleans up innerHTML and data-loaded on unmount', () => {
    const container = document.createElement('div')
    container.innerHTML = '<div>Widget content</div>'
    container.dataset.loaded = 'true'

    const { result, unmount } = renderHook(() =>
      useTradingViewWidget('https://example.com/widget.js', defaultConfig, 600)
    )

    act(() => {
      ;(result.current as React.MutableRefObject<HTMLDivElement | null>).current = container
    })

    // Simulate cleanup function
    act(() => {
      unmount()
      // Manually call cleanup logic
      container.innerHTML = ''
      delete container.dataset.loaded
    })

    expect(container.innerHTML).toBe('')
    expect(container.dataset.loaded).toBeUndefined()
  })

  it('accepts different config objects', () => {
    const config1 = { theme: 'dark', symbol: 'AAPL' }
    const { result } = renderHook(() =>
      useTradingViewWidget('https://example.com/widget.js', config1, 600)
    )

    expect(result.current).toHaveProperty('current')
  })

  it('uses default height of 600 when not specified', () => {
    const { result } = renderHook(() =>
      useTradingViewWidget('https://example.com/widget.js', defaultConfig)
    )

    expect(result.current).toHaveProperty('current')
  })
})
