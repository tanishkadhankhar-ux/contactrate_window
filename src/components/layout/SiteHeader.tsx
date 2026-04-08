import type { ReactNode } from 'react'
import Image from 'next/image'

export function SiteHeader({ rightSlot }: { rightSlot?: ReactNode }) {
  return (
    <header className='sticky top-0 z-50 border-b border-neutral-200 bg-white'>
      <div className='max-w-content mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3'>
        <a href='/' className='flex items-center'>
          <Image
            src='/forbes-advisor-logo.png'
            alt='Forbes Advisor'
            width={320}
            height={64}
            priority
            className='h-8 w-auto sm:h-9'
          />
        </a>
        {rightSlot ?? <span className='text-sm text-neutral-500'>Advertiser Disclosure</span>}
      </div>
    </header>
  )
}

