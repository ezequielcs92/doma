'use client'

import Script from 'next/script'
import { useEffect, useSyncExternalStore } from 'react'
import {
  getAnalyticsConsent,
  getServerAnalyticsConsent,
  subscribeToAnalyticsConsent,
} from '@/components/analytics-consent'
import { captureClickId } from '@/lib/attribution'
import { GOOGLE_ADS_ID } from '@/lib/conversion'

export default function GoogleAdsTag() {
  const consent = useSyncExternalStore(
    subscribeToAnalyticsConsent,
    getAnalyticsConsent,
    getServerAnalyticsConsent
  )

  useEffect(() => {
    captureClickId()
  }, [])

  if (!GOOGLE_ADS_ID || !/^AW-\d+$/.test(GOOGLE_ADS_ID) || consent !== 'accepted') return null

  return (
    <>
      <Script
        id="google-ads-tag"
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-ads-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
gtag('config', '${GOOGLE_ADS_ID}', { allow_enhanced_conversions: true });`}
      </Script>
    </>
  )
}
