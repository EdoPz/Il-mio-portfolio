import './style.css'

// Nav: diventa opaca dopo il primo scroll
const nav = document.querySelector('nav')
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 60)
window.addEventListener('scroll', onScroll, { passive: true })
onScroll()

// Scroll-reveal via IntersectionObserver
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return
      const siblings = Array.from(
        entry.target.parentElement.querySelectorAll('.reveal:not(.visible)')
      )
      const delay = siblings.indexOf(entry.target) * 100
      setTimeout(() => entry.target.classList.add('visible'), delay)
      observer.unobserve(entry.target)
    })
  },
  { threshold: 0.1 }
)

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))

// Form submit — demo feedback
const form = document.querySelector('form')
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    const btn = form.querySelector('button[type="submit"]')
    btn.textContent = 'Messaggio inviato ✓'
    btn.style.borderColor = 'var(--olive-mid)'
    btn.disabled = true
  })
}
