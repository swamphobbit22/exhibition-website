import React from 'react'

const Help = () => {
  return (
    <section id="help-section" className='bg-[var(--bg-primary)] text-[var(--text-primary)] min-h-screen'>
        <div className="px-2 pt-32 max-w-xl mx-auto text-sm leading-relaxed pb-6">
            <h2 className='text-3xl text-center pb-4 font-semibold'>Frequently Asked Questions</h2>
            <hr className='pb-4 text-[var(--text-accent)] '/>

            <div className='mb-2 p-2 border-2 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 dark:border-2 border-[var(--border-secondary)] bg-[var(--bg-primary)]'>
                <h3 className='text-lg'>Why is the search sometimes slow or unresponsive?</h3>
                <p className='text-[var(--text-secondary)]'>This can happen if you've been logged in for a while. Try refreshing the page, or if you're logged in, log out and back in again. That usually resolves it.</p>
            </div>

            <div className='mb-2 p-2 border-2 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 dark:border-2 border-[var(--border-secondary)] bg-[var(--bg-primary)]'>
                <h3 className='text-lg'>Do I need an account to use the site?</h3>
                <p className='text-[var(--text-secondary)]'>No — you can browse, search, and view artwork without signing up. An account is only needed if you want to save favourites or create collections.</p>
            </div>

            <div className='mb-2 p-2 border-2 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 dark:border-2 border-[var(--border-secondary)] bg-[var(--bg-primary)]'>
                <h3 className='text-lg'>My favourites or collections aren’t updating — what should I do?</h3>
                <p className='text-[var(--text-secondary)]'>Network issues or API delays can affect updates. If something doesn’t update right away, try refreshing the page or navigating away and back again.</p>
            </div>

            <div className='mb-2 p-2 border-2 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 dark:border-2 border-[var(--border-secondary)] bg-[var(--bg-primary)]'>
                <h3 className='text-lg'>Why do some search results seem unrelated to my search term?</h3>
                <p className='text-[var(--text-secondary)]'>The museums structure their data differently, and sometimes results include items that are only loosely related. The most relevant items usually appear first. You can also filter by institution to narrow things down.</p>
            </div>

            <div className='mb-2 p-2 border-2 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 dark:border-2 border-[var(--border-secondary)] bg-[var(--bg-primary)]'>
                <h3 className='text-lg'>Can I search by artist, era or style?</h3>
                <p className='text-[var(--text-secondary)]'>Yes — the search is flexible. You can enter an artist’s name, an era like “Viking,” a date, or even a style.</p>
            </div>

            <div className='mb-2 p-2 border-2 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 dark:border-2 border-[var(--border-secondary)] bg-[var(--bg-primary)]'>
                <h3 className='text-lg'>How do I remove an item from a collection or favourites?</h3>
                <p className='text-[var(--text-secondary)]'>Just click the red "Remove" button or the heart icon again. It will update the page and reflect the change.</p>
            </div>

            <div className='mb-2 p-2 border-2 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 dark:border-2 border-[var(--border-secondary)] bg-[var(--bg-primary)]'>
                <h3 className='text-lg'>What happens if I delete my account?</h3>
                <p className='text-[var(--text-secondary)]'>It’s permanent. All your collections and favourites will be deleted and can't be recovered.</p>
            </div>
        </div>
    </section>

  )
}

export default Help;
