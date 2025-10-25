import { render, screen } from '@testing-library/react'
import TradingViewWidget from '../TradingViewWidget'
import * as useTradingViewWidgetHook from '@/hooks/useTradingViewWidget'

// Mock the custom hook
jest.mock('@/hooks/useTradingViewWidget')

describe('TradingViewWidget', () => {
  const mockRef = { current: document.createElement('div') }
  const mockUseTradingViewWidget = useTradingViewWidgetHook.default as jest.MockedFunction<
    typeof useTradingViewWidgetHook.default
  >

  beforeEach(() => {
    jest.clearAllMocks()
    mockUseTradingViewWidget.mockReturnValue(mockRef)
  })

  const defaultProps = {
    scriptUrl: 'https://s3.tradingview.com/external-embedding/embed-widget-test.js',
    config: { theme: 'dark', width: '100%' },
  }

  it('renders without title', () => {
    render(<TradingViewWidget {...defaultProps} />)

    const container = document.querySelector('.tradingview-widget-container')
    expect(container).toBeInTheDocument()
  })

  it('renders with title', () => {
    render(<TradingViewWidget {...defaultProps} title="Market Overview" />)

    expect(screen.getByText('Market Overview')).toBeInTheDocument()
    expect(screen.getByText('Market Overview')).toHaveClass('font-semibold', 'text-2xl')
  })

  it('calls useTradingViewWidget hook with correct parameters', () => {
    const customConfig = { theme: 'light', symbol: 'AAPL' }
    const customHeight = 800

    render(
      <TradingViewWidget
        scriptUrl="https://example.com/script.js"
        config={customConfig}
        height={customHeight}
      />
    )

    expect(mockUseTradingViewWidget).toHaveBeenCalledWith(
      'https://example.com/script.js',
      customConfig,
      customHeight
    )
  })

  it('uses default height of 600 when not provided', () => {
    render(<TradingViewWidget {...defaultProps} />)

    expect(mockUseTradingViewWidget).toHaveBeenCalledWith(
      defaultProps.scriptUrl,
      defaultProps.config,
      600
    )
  })

  it('applies custom className', () => {
    render(<TradingViewWidget {...defaultProps} className="custom-class" />)

    const container = document.querySelector('.tradingview-widget-container')
    expect(container).toHaveClass('custom-class')
  })

  it('applies default tradingview-widget-container class', () => {
    render(<TradingViewWidget {...defaultProps} />)

    const container = document.querySelector('.tradingview-widget-container')
    expect(container).toHaveClass('tradingview-widget-container')
  })

  it('merges custom className with default class', () => {
    render(<TradingViewWidget {...defaultProps} className="my-custom-class" />)

    const container = document.querySelector('.tradingview-widget-container')
    expect(container).toHaveClass('tradingview-widget-container', 'my-custom-class')
  })

  it('creates widget placeholder div with correct height', () => {
    render(<TradingViewWidget {...defaultProps} height={500} />)

    const widgetDiv = document.querySelector('.tradingview-widget-container__widget')
    expect(widgetDiv).toBeInTheDocument()
  })

  it('memoizes component to prevent unnecessary re-renders', () => {
    const { rerender } = render(<TradingViewWidget {...defaultProps} />)

    const firstCallCount = mockUseTradingViewWidget.mock.calls.length

    // Rerender with same props
    rerender(<TradingViewWidget {...defaultProps} />)

    // Should not call hook again due to memoization
    expect(mockUseTradingViewWidget.mock.calls.length).toBe(firstCallCount)
  })

  it('re-renders when props change', () => {
    const { rerender } = render(<TradingViewWidget {...defaultProps} />)

    mockUseTradingViewWidget.mockClear()

    // Rerender with different config
    rerender(<TradingViewWidget {...defaultProps} config={{ theme: 'light' }} />)

    expect(mockUseTradingViewWidget).toHaveBeenCalled()
  })
})
