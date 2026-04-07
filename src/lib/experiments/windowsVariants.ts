export type WindowsVariant = 'control' | 'cta_b'

export interface WindowsVariantConfig {
  resultsCtaByIntent: {
    high_intent: string
    mid_intent: string
    low_intent: string
  }
  preContactContinueCta: string
}

export function getWindowsVariant(seed = 'windows-default'): WindowsVariant {
  let hash = 0
  for (let i = 0; i < seed.length; i += 1) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0
  return hash % 2 === 0 ? 'control' : 'cta_b'
}

export function getWindowsVariantConfig(variant: WindowsVariant): WindowsVariantConfig {
  if (variant === 'cta_b') {
    return {
      resultsCtaByIntent: {
        high_intent: 'Get matched quotes',
        mid_intent: 'Talk to an expert',
        low_intent: 'Save and compare later',
      },
      preContactContinueCta: 'Continue',
    }
  }

  return {
    resultsCtaByIntent: {
      high_intent: 'Get quotes now',
      mid_intent: 'Speak to an expert',
      low_intent: 'Save my options',
    },
    preContactContinueCta: 'Finish',
  }
}
