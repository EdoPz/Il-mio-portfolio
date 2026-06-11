import './style.css'

/* ── SCROLL REVEAL ─────────────────────────────────────────────── */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return
      entry.target.classList.add('visible')
      revealObserver.unobserve(entry.target)
    })
  },
  { threshold: 0.12 }
)

document.querySelectorAll('[data-reveal]').forEach((el) => {
  const d = el.dataset.revealDelay
  if (d) el.style.transitionDelay = `${Number(d) * 0.13}s`
  revealObserver.observe(el)
})

/* ── NAV ACTIVE LINK ───────────────────────────────────────────── */
const navLinks = document.querySelectorAll('.nav__links a[href^="#"]')

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return
      navLinks.forEach((link) => {
        link.style.color =
          link.getAttribute('href') === `#${entry.target.id}` ? 'var(--red)' : ''
      })
    })
  },
  { rootMargin: '-50% 0px -50% 0px' }
)

document.querySelectorAll('section[id]').forEach((s) => sectionObserver.observe(s))

/* ── CATERING FORM ─────────────────────────────────────────────── */
const form = document.querySelector('.catering__form')
form?.addEventListener('submit', (e) => {
  e.preventDefault()
  const btn = form.querySelector('button[type="submit"]')
  btn.textContent = "Request Sent — We'll be in touch!"
  btn.disabled = true
  btn.style.opacity = '0.7'
})
