import React, { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Tilt } from './Tilt';

interface ContactFormValues {
  name: string;
  email: string;
  message: string;
}

const contactLinks = [
  {
    label: 'Email',
    value: 'vinayravindranatha@gmail.com',
    href: 'mailto:vinayravindranatha@gmail.com',
    external: false,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
      </svg>
    ),
  },
  {
    label: 'Phone',
    value: '+91 79758 93210',
    href: 'tel:+917975893210',
    external: false,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/vinay-k-r',
    href: 'https://linkedin.com/in/vinay-k-r-a6bb51243',
    external: true,
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    label: 'GitHub',
    value: 'github.com/vi-nayKR',
    href: 'https://github.com/vi-nayKR',
    external: true,
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
      </svg>
    ),
  },
];

export const Contact: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [parallaxOffset, setParallaxOffset] = useState(0);

  const [form, setForm] = useState<ContactFormValues>({ name: '', email: '', message: '' });

  useEffect(() => {
    const onScroll = () => {
      setParallaxOffset(window.scrollY * 0.03);
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const el = document.querySelector('#contact');
    if (el) {
      observer.observe(el);
    }

    return () => {
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  }, []);

  // Use TanStack Query mutation for form submission
  const contactMutation = useMutation({
    mutationFn: async (values: ContactFormValues) => {
      const accessKey = '2ac57ee9-4b3e-49fe-b359-dc35b95a705f';
      
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: values.name,
          email: values.email,
          message: values.message,
          subject: `New Portfolio Message from ${values.name}`
        })
      });

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message || 'Submission failed');
      }
      return data;
    },
    onSuccess: () => {
      setForm({ name: '', email: '', message: '' });
      // Reset status after a few seconds so the user can send another message if they want
      setTimeout(() => {
        contactMutation.reset();
      }, 5000);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    contactMutation.mutate(form);
  };

  return (
    <section id="contact" className="relative py-16 md:py-32 px-4 md:px-6 overflow-hidden">
      {/* Parallax glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] pointer-events-none"
        style={{
          transform: `translate(-50%, calc(-50% + ${parallaxOffset}px))`,
          background: 'radial-gradient(ellipse, rgba(99,102,241,0.07) 0%, transparent 70%)'
        }}
      />

      {/* Outline background Typography */}
      <div
        className="absolute right-[-10%] bottom-10 outline-bg-text select-none pointer-events-none font-black opacity-10 will-change-transform hidden md:block"
        style={{ transform: `translate3d(${parallaxOffset * -1.1}px, 0, 0)` }}
      >
        CONNECT
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-accent font-mono text-xs tracking-widest uppercase mb-4">Get In Touch</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-frost text-balance">
            Let&apos;s Build Something
          </h2>
          <p className="text-muted mt-4 max-w-xl mx-auto leading-relaxed">
            Open to new opportunities. Whether it&apos;s a full-time role, freelance project, or just a chat about tech &mdash; I&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">

          {/* Contact Info */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(-30px)',
              transition: 'opacity 0.7s, transform 0.7s'
            }}
          >
            <div className="space-y-5">
              {contactLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.external ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl apple-glass hover:border-accent/40 transition-all duration-200 group card-hover"
                >
                  <Tilt maxTilt={8} scale={1.02} className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                    <span className="text-accent">{link.icon}</span>
                  </Tilt>
                  <div>
                    <p className="text-xs text-muted font-mono uppercase tracking-wider">{link.label}</p>
                    <p className="text-frost font-medium text-sm mt-0.5">{link.value}</p>
                  </div>
                  <svg className="w-4 h-4 text-muted ml-auto group-hover:text-accent group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                  </svg>
                </a>
              ))}
            </div>

            {/* GitHub activity banner */}
            <div className="mt-8 p-5 rounded-xl apple-glass">
              <p className="text-xs text-muted font-mono mb-3">GitHub Activity</p>
              <img
                src="https://ghchart.rshah.org/ff6b00/vi-nayKR"
                alt="GitHub contribution graph"
                className="w-full rounded opacity-80"
              />
            </div>
          </div>

          {/* Contact Form */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(30px)',
              transition: 'opacity 0.9s, transform 0.9s'
            }}
          >
            <form onSubmit={submitForm} className="space-y-5">
              <div>
                <label className="block text-xs text-muted font-mono uppercase tracking-wider mb-2">Name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  type="text"
                  placeholder="John Doe"
                  required
                  disabled={contactMutation.isPending}
                  className="w-full px-4 py-3 rounded-xl bg-surface/40 border border-border/80 text-frost placeholder:text-muted/50 text-sm focus:outline-none focus:border-accent/60 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs text-muted font-mono uppercase tracking-wider mb-2">Email</label>
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="john@example.com"
                  required
                  disabled={contactMutation.isPending}
                  className="w-full px-4 py-3 rounded-xl bg-surface/40 border border-border/80 text-frost placeholder:text-muted/50 text-sm focus:outline-none focus:border-accent/60 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs text-muted font-mono uppercase tracking-wider mb-2">Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={11}
                  placeholder="Tell me about the project or opportunity..."
                  required
                  disabled={contactMutation.isPending}
                  className="w-full px-4 py-3 rounded-xl bg-surface/40 border border-border/80 text-frost placeholder:text-muted/50 text-sm focus:outline-none focus:border-accent/60 transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={contactMutation.isPending || contactMutation.isSuccess}
                className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                  contactMutation.isSuccess
                    ? 'bg-surface text-muted border border-border'
                    : 'bg-accent hover:bg-accent-glow text-frost'
                }`}
              >
                {contactMutation.isPending ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-frost" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Sending...
                  </>
                ) : contactMutation.isSuccess ? (
                  <>
                    <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                    </svg>
                    Message Sent!
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                    </svg>
                    Send Message
                  </>
                )}
              </button>
              {contactMutation.isError && (
                <p className="text-red-500 text-xs font-mono mt-2 text-center">
                  Error: {contactMutation.error.message}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
