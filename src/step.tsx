import type { PropsWithChildren } from "react";

// biome-ignore lint/suspicious/noExplicitAny: intended to be used with any type
export interface StepProps<P extends Record<string, any>> {
  id: string
  meta: P
}

// biome-ignore lint/suspicious/noExplicitAny: intended to be used with any type
export const Step = <P extends Record<string, any>>(props: PropsWithChildren<StepProps<P>>) => {
  return null
}
