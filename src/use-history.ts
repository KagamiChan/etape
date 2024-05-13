
import { createMemoryHistory, type History } from "history"
import { useCallback, useEffect, useRef, useState } from "react"
import type { StepProps } from "./step"

// biome-ignore lint/suspicious/noExplicitAny: intended to be used with any type
interface UseHistoryParams<P extends Record<string, any> = never> {
  history?: History
  steps: StepProps<P>[]
  basename?: string
  exact: boolean
}

export const useHistory = ({ history: historyOverride, steps, basename = '', exact }: UseHistoryParams) => {
  const [currentStep, setCurrentStep] = useState<string>()
  const history = useRef(historyOverride ?? createMemoryHistory())

  // FIXME: deep compare steps
  const findStep = useCallback((pathname: string) => {
    const relative = pathname.replace(basename, '')
    return steps.find((step) => exact ? step.id === relative : step.id.startsWith(relative))
  }, [basename, exact, steps])

  // FIXME: deep compare steps
  useEffect(() => {
    const unlisten = history.current.listen((update) => {
      const step = findStep(update.location.pathname)
      if (step && steps.includes(step)) {
        setCurrentStep(step.id)
      }
    })

    const step = findStep(history.current.location.pathname)
    if (step && steps.includes(step)) {
      setCurrentStep(step.id)
    }

    return unlisten
  }, [findStep, steps])

  return { history: history.current, currentStep }
}
