import { useState, useEffect } from "react"

interface Skip {
  id: string
  name: string
  capacity: string
  price: number
  duration: string
  image: string
  popular?: boolean
  description: string
}

interface ApiSkip {
  id: string | number
  name?: string
  title?: string
  capacity?: string
  size?: string
  price?: number
  cost?: number
  duration?: string
  hire_period?: string
  image?: string
  description?: string
  popular?: boolean
  yards?: number
  price_before_vat?: number
  vat?: number
  hire_period_days?: number
}

interface UseSkipsApiResult {
  skips: Skip[]
  loading: boolean
  error: string | null
  refetch: () => void
}

const getDefaultDescription = (yards: number): string => {
  const descriptions: { [key: number]: string } = {
    4: "Perfect for small home projects and garden clearance",
    5: "Most popular choice for medium-sized renovations",
    6: "Ideal for larger home improvement projects",
    8: "Great for commercial projects and major clearouts",
    10: "Perfect for construction and demolition waste",
    12: "Maximum capacity for large-scale projects",
  }
  return descriptions[yards] || `Suitable for projects requiring ${yards} yards of waste capacity`
}

const transformApiSkip = (apiSkip: ApiSkip, index: number): Skip => {
  const priceWithVat = apiSkip.price_before_vat && apiSkip.vat
    ? Math.round(apiSkip.price_before_vat * (1 + apiSkip.vat / 100))
    : apiSkip.price_before_vat || 0;

  return {
    id: String(apiSkip.id || `skip-${index}`),
    name: apiSkip.size ? `${apiSkip.size} Yard Skip` : `Skip ${index + 1}`,
    capacity: apiSkip.size ? `${apiSkip.size} Yards` : "",
    price: priceWithVat,
    duration: apiSkip.hire_period_days
      ? `${apiSkip.hire_period_days} day hire period`
      : "14 day hire period",
    image: `/images/skips/${apiSkip.size}-yarder-skip.jpg`,
    description: getDefaultDescription(Number(apiSkip.size) || index + 4),
    popular: index === 1,
  };
}

const getFallbackSkips = (): Skip[] => [
  {
    id: "4-yard",
    name: "4 Yard Skip",
    capacity: "4 Yards",
    price: 221,
    duration: "14 day hire period",
    image: "/images/skips/4.jpg",
    description: "Perfect for small home projects and garden clearance",
  },
  {
    id: "5-yard",
    name: "5 Yard Skip",
    capacity: "5 Yards",
    price: 241,
    duration: "14 day hire period",
    image: "/images/skips/5.jpg",
    popular: true,
    description: "Most popular choice for medium-sized renovations",
  },
  {
    id: "6-yard",
    name: "6 Yard Skip",
    capacity: "6 Yards",
    price: 264,
    duration: "14 day hire period",
    image: "/images/skips/6.jpg",
    description: "Ideal for larger home improvement projects",
  },
  {
    id: "8-yard",
    name: "8 Yard Skip",
    capacity: "8 Yards",
    price: 320,
    duration: "14 day hire period",
    image: "/images/skips/8.jpg",
    description: "Great for commercial projects and major clearouts",
  },
  {
    id: "10-yard",
    name: "10 Yard Skip",
    capacity: "10 Yards",
    price: 360,
    duration: "14 day hire period",
    image: "/images/skips/10.jpg",
    description: "Perfect for construction and demolition waste",
  },
  {
    id: "12-yard",
    name: "12 Yard Skip",
    capacity: "12 Yards",
    price: 390,
    duration: "14 day hire period",
    image: "/images/skips/12.jpg",
    description: "Maximum capacity for large-scale projects",
  },
]

export function useSkipsApi(postcode = "NR32", area = "Lowestoft"): UseSkipsApiResult {
  const [skips, setSkips] = useState<Skip[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchSkips = async (retryCount = 0) => {
    const maxRetries = 2
    setLoading(true)
    setError(null)

    try {
      const apiUrl = `https://app.wewantwaste.co.uk/api/skips/by-location?postcode=${encodeURIComponent(postcode)}&area=${encodeURIComponent(area)}`
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        signal: AbortSignal.timeout(10000), // 10s timeout
      })

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}: ${response.statusText}`)
      }

      const apiData = await response.json()

      // New: Handle if response is just an array
      const rawSkips = Array.isArray(apiData)
        ? apiData
        : apiData.data || apiData.skips || apiData.results || []

      if (!Array.isArray(rawSkips) || rawSkips.length === 0) {
        console.warn("No skips found in API response, using fallback data")
        setSkips(getFallbackSkips())
        return
      }

      const transformedSkips: Skip[] = rawSkips.map(transformApiSkip)

      // Sort by numeric size
   transformedSkips.sort((a, b) => {
  const aYards = parseInt(String(a.capacity).match(/\d+/)?.[0] || "0", 10)
  const bYards = parseInt(String(b.capacity).match(/\d+/)?.[0] || "0", 10)
  return aYards - bYards
})
      setSkips(transformedSkips)
    } catch (error) {
      console.error("Error fetching skips:", error)
      if (retryCount < maxRetries) {
        setTimeout(() => fetchSkips(retryCount + 1), 1000 * (retryCount + 1)) // Retry with backoff
        return
      }

      const errorMessage = error instanceof Error ? error.message : "Unknown error"
      setError(`Failed to load skip options: ${errorMessage}. Showing default options.`)
      setSkips(getFallbackSkips())
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSkips()
  }, [postcode, area])

  const refetch = () => {
    fetchSkips()
  }

  return { skips, loading, error, refetch }
}
