'use client'

import { useForm } from '@formspree/react';


export default function ContactForm() {
  const [state, handleSubmit, reset] = useForm(process.env.NEXT_PUBLIC_FORM_ID as string);
  if (state.succeeded) {
    return(
      <div className="text-center text-lg font-semibold text-forest bg-cream p-4 shadow-lg">
        <p>Thanks for reaching out! We will be in touch soon.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="md:grid grid-cols-2 gap-6 max-md:space-y-6">
        <div>
          <label htmlFor="name" className="block text-xs uppercase tracking-wider font-semibold mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full p-2 bg-snow border border-cream text-forest placeholder:text-forest/50 focus:outline-none focus:ring-2 focus:ring-emerald"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-xs uppercase tracking-wider font-semibold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full p-2 bg-snow border border-cream text-forest placeholder:text-forest/50 focus:outline-none focus:ring-2 focus:ring-emerald"
          />
        </div>
      </div>

      <div>
        <label htmlFor="organization" className="block text-xs uppercase tracking-wider font-semibold mb-2">
          Organization
        </label>
        <input
          type="text"
          id="organization"
          name="organization"
          className="w-full p-2 bg-snow border border-cream text-forest placeholder:text-forest/50 focus:outline-none focus:ring-2 focus:ring-emerald"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-xs uppercase tracking-wider font-semibold mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          className="w-full p-2 bg-snow border border-cream text-forest placeholder:text-forest/50 focus:outline-none focus:ring-2 focus:ring-emerald resize-none"
        />
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={state.submitting}
          className="bg-emerald text-white py-2 px-4 font-title text-lg hover:bg-olive transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {state.submitting ? 'Sending...' : 'Send'}
        </button>
      </div>
    </form>
  )
} 