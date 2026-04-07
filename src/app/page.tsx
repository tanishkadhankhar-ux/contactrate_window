export default function Home() {
  return (
    <main className='min-h-screen bg-white'>
      <section className='max-w-content mx-auto px-4 sm:px-6 py-10 sm:py-14'>
        <div className='rounded-lg border border-neutral-200 bg-primary-300 px-4 py-3 text-primary-700 font-semibold'>
          Forbes Advisor
        </div>
        <h1 className='mt-6 text-display sm:text-display-lg text-neutral-900 font-display'>
          Thousands of Americans Are Replacing Windows in 2026
        </h1>
        <p className='mt-3 text-body text-neutral-800'>
          Need help with repair, replacement, or installation? Compare options and connect with verified local partners.
        </p>
        <div className='mt-8 space-y-3'>
          <a
            href='/windows'
            className='block w-full rounded-[8px] bg-primary-700 hover:bg-primary-750 active:bg-primary-800 text-white text-center font-semibold py-3 min-h-[48px]'
          >
            Check If I Qualify
          </a>
          <p className='text-body-sm text-neutral-500 text-center'>No obligation • 3 minutes</p>
        </div>
      </section>
    </main>
  )
}
