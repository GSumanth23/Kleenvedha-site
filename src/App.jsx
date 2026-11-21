import { useMemo, useState, useEffect } from 'react'
import { BUSINESS, CATEGORIES, PRODUCTS, ALSO_SUPPLY } from './data.js'
import logoUrl from './assets/logo.webp'
import upiQrUrl from './assets/upi-qr.svg'

const inr = (n) => '₹' + n.toLocaleString('en-IN')
const waLink = (text) => `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(text)}`

function Logo({ light }) {
  return (
    <a href="#top" className={'logo' + (light ? ' logo--light' : '')} aria-label="Kleen Vedha Solutions home">
      <img src={logoUrl} alt="Kleen Vedha – Cleaner Spaces, Better Places" width="760" height="230" />
    </a>
  )
}

function Bottle({ color, powder }) {
  if (powder) {
    return (
      <svg viewBox="0 0 120 140" className="bottle" aria-hidden="true">
        <path d="M22 40h76l-6 88a8 8 0 0 1-8 7H36a8 8 0 0 1-8-7z" fill={color} />
        <path d="M18 30h84v12H18z" fill="#2b3a42" opacity=".85" />
        <rect x="36" y="66" width="48" height="34" rx="5" fill="#fff" opacity=".92" />
        <rect x="42" y="74" width="36" height="5" rx="2.5" fill={color} />
        <rect x="42" y="84" width="24" height="4" rx="2" fill="#c5d1d6" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 120 140" className="bottle" aria-hidden="true">
      <rect x="46" y="6" width="28" height="16" rx="4" fill="#2b3a42" />
      <path d="M44 22h32v10c14 6 22 16 22 30v62a12 12 0 0 1-12 12H34a12 12 0 0 1-12-12V62c0-14 8-24 22-30z" fill={color} />
      <path d="M34 50c-4 6-5 12-5 20v40" stroke="#fff" strokeOpacity=".35" strokeWidth="6" strokeLinecap="round" fill="none" />
      <rect x="34" y="70" width="52" height="40" rx="6" fill="#fff" opacity=".93" />
      <path d="M60 76c-4 6-7 9-7 13a7 7 0 0 0 14 0c0-4-3-7-7-13z" fill={color} />
      <rect x="44" y="99" width="32" height="4" rx="2" fill="#c5d1d6" />
    </svg>
  )
}

function ProductCard({ p, onAdd }) {
  const [packIdx, setPackIdx] = useState(0)
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const [size, mrp] = p.packs[packIdx]

  const add = () => {
    onAdd({ key: `${p.id}-${size}`, name: (p.code ? `Kleen Vedha ${p.code} – ` : '') + p.name + (p.tag ? ` (${p.tag})` : ''), size, qty, mrp })
    setAdded(true)
    setTimeout(() => setAdded(false), 1400)
  }

  return (
    <article className="card">
      <div className="card__art" style={{ '--tint': p.color }}>
        <Bottle color={p.color} powder={p.powder} />
        {p.code && <span className="card__code">{p.code}</span>}
        {p.bulk && <span className="card__bulk">50 L cans</span>}
      </div>
      <div className="card__body">
        <h3>{p.name}</h3>
        {p.tag && <span className="card__tag">{p.tag}</span>}
        <p>{p.desc}</p>
        <div className="packs" role="radiogroup" aria-label="Pack size">
          {p.packs.map(([s], i) => (
            <button key={s} role="radio" aria-checked={i === packIdx} className={i === packIdx ? 'on' : ''} onClick={() => setPackIdx(i)}>
              {s}
            </button>
          ))}
        </div>
        <div className="card__foot">
          <div className="price">
            {mrp ? (<><small>MRP</small>{inr(mrp)}</>) : <span className="ask">Price on request</span>}
          </div>
          <div className="qty" aria-label="Quantity">
            <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease">−</button>
            <span>{qty}</span>
            <button onClick={() => setQty((q) => q + 1)} aria-label="Increase">+</button>
          </div>
        </div>
        <button className={'btn btn--block' + (added ? ' btn--done' : '')} onClick={add}>
          {added ? '✓ Added to enquiry' : 'Add to enquiry'}
        </button>
      </div>
    </article>
  )
}

function PaySection() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(BUSINESS.upiId)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch { /* clipboard blocked – ID is visible to copy by hand */ }
  }
  return (
    <section className="section section--tint" id="pay">
      <div className="wrap pay">
        <div className="pay__copy">
          <span className="eyebrow">Payment</span>
          <h2>Pay easily with UPI</h2>
          <p>Scan the QR code with any UPI app, such as Google Pay, PhonePe, Paytm or BHIM, or pay straight to our UPI ID.</p>
          <ol className="steps">
            <li><b>1</b><div><strong>Send your enquiry</strong><span>Add products and send the list on WhatsApp or by email.</span></div></li>
            <li><b>2</b><div><strong>We confirm the amount</strong><span>You'll get the final price, including GST and delivery.</span></div></li>
            <li><b>3</b><div><strong>Scan &amp; pay</strong><span>Pay the confirmed amount to Kleen Vedha Solutions LLP.</span></div></li>
            <li><b>4</b><div><strong>Share the screenshot</strong><span>WhatsApp us the payment screenshot and we'll dispatch your order.</span></div></li>
          </ol>
          <p className="pay__note">Please pay only after we've confirmed your order amount. For NEFT/RTGS bank transfer details, <a href={waLink('Hello Kleen Vedha, please share your bank details for NEFT/RTGS payment.')} target="_blank" rel="noreferrer">message us</a>.</p>
        </div>
        <div className="paycard">
          <div className="paycard__head">Scan &amp; Pay</div>
          <img className="paycard__qr" src={upiQrUrl} alt={`UPI QR code for ${BUSINESS.upiName}`} width="260" height="260" />
          <strong className="paycard__name">{BUSINESS.upiName}</strong>
          <div className="paycard__id">
            <span>UPI ID</span>
            <code>{BUSINESS.upiId}</code>
            <button onClick={copy} className="copy">{copied ? '✓ Copied' : 'Copy'}</button>
          </div>
          <a className="btn btn--block paycard__app" href={BUSINESS.upiLink}>Pay with UPI app</a>
          <small className="paycard__foot">Yes Bank · BHIM UPI · works with every UPI app</small>
        </div>
      </div>
    </section>
  )
}

function EnquiryDrawer({ open, onClose, items, setItems }) {
  const [name, setName] = useState('')
  const [org, setOrg] = useState('')
  const [area, setArea] = useState('')

  const total = items.reduce((s, i) => s + (i.mrp ? i.mrp * i.qty : 0), 0)

  const message = () => {
    const lines = items.map((i, n) => `${n + 1}. ${i.name} – ${i.size} × ${i.qty}`)
    return [
      'Hello Kleen Vedha, I would like a quote for:',
      ...lines,
      name && `\nName: ${name}`,
      org && `Organisation: ${org}`,
      area && `Delivery area: ${area}`,
    ].filter((l) => l !== false && l !== '').join('\n')
  }

  const update = (key, d) => setItems((arr) => arr.map((i) => (i.key === key ? { ...i, qty: Math.max(1, i.qty + d) } : i)))
  const remove = (key) => setItems((arr) => arr.filter((i) => i.key !== key))

  return (
    <div className={'drawer' + (open ? ' drawer--open' : '')} aria-hidden={!open}>
      <div className="drawer__scrim" onClick={onClose} />
      <aside className="drawer__panel" role="dialog" aria-label="Your enquiry">
        <header>
          <h3>Your enquiry</h3>
          <button className="icon-btn" onClick={onClose} aria-label="Close">✕</button>
        </header>
        {items.length === 0 ? (
          <div className="drawer__empty">
            <p>No products added yet.</p>
            <a href="#products" className="btn" onClick={onClose}>Browse products</a>
          </div>
        ) : (
          <>
            <ul className="drawer__list">
              {items.map((i) => (
                <li key={i.key}>
                  <div>
                    <strong>{i.name}</strong>
                    <span>{i.size}{i.mrp ? ` · MRP ${inr(i.mrp)}` : ' · price on request'}</span>
                  </div>
                  <div className="qty qty--sm">
                    <button onClick={() => update(i.key, -1)} aria-label="Decrease">−</button>
                    <span>{i.qty}</span>
                    <button onClick={() => update(i.key, 1)} aria-label="Increase">+</button>
                  </div>
                  <button className="remove" onClick={() => remove(i.key)} aria-label={`Remove ${i.name}`}>Remove</button>
                </li>
              ))}
            </ul>
            <div className="drawer__total">
              <span>Estimated at MRP</span>
              <strong>{inr(total)}</strong>
            </div>
            <p className="drawer__note">Bulk and institutional orders get special rates. We'll confirm your final price, plus GST, when we reply. Then you can <a href="#pay" onClick={onClose}>pay by UPI</a>.</p>
            <div className="drawer__form">
              <input placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
              <input placeholder="Company / institution (optional)" value={org} onChange={(e) => setOrg(e.target.value)} />
              <input placeholder="Delivery area in Hyderabad" value={area} onChange={(e) => setArea(e.target.value)} />
            </div>
            <a className="btn btn--wa btn--block" href={waLink(message())} target="_blank" rel="noreferrer">Send on WhatsApp</a>
            <a className="btn btn--ghost btn--block" href={`mailto:${BUSINESS.email}?subject=${encodeURIComponent('Product enquiry – Kleen Vedha')}&body=${encodeURIComponent(message())}`}>Send by email</a>
          </>
        )}
      </aside>
    </div>
  )
}

export default function App() {
  const [cat, setCat] = useState('all')
  const [q, setQ] = useState('')
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem('kv-enquiry') || '[]') } catch { return [] }
  })
  const [drawer, setDrawer] = useState(false)
  const [menu, setMenu] = useState(false)

  useEffect(() => {
    try { localStorage.setItem('kv-enquiry', JSON.stringify(items)) } catch { /* ignore */ }
  }, [items])

  useEffect(() => {
    document.body.style.overflow = drawer ? 'hidden' : ''
  }, [drawer])

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase()
    return PRODUCTS.filter((p) =>
      (cat === 'all' || p.cat === cat) &&
      (!term || `${p.code || ''} ${p.name} ${p.tag || ''} ${p.desc}`.toLowerCase().includes(term))
    )
  }, [cat, q])

  const addItem = (it) =>
    setItems((arr) => {
      const ex = arr.find((i) => i.key === it.key)
      return ex ? arr.map((i) => (i.key === it.key ? { ...i, qty: i.qty + it.qty } : i)) : [...arr, it]
    })

  const count = items.reduce((s, i) => s + i.qty, 0)
  const bulkList = PRODUCTS.filter((p) => p.bulk || p.id === 'k7')

  const [form, setForm] = useState({ name: '', phone: '', org: '', msg: '' })
  const contactMsg = `Hello Kleen Vedha,\n${form.msg || 'I would like to know more about your products.'}\n\nName: ${form.name}\nPhone: ${form.phone}${form.org ? `\nOrganisation: ${form.org}` : ''}`

  return (
    <>
      <div className="topbar">
        <span>🚚 Free door delivery in & around Hyderabad on orders above {inr(BUSINESS.freeDeliveryAbove)}</span>
        <a href={`tel:${BUSINESS.phone}`}>{BUSINESS.phoneDisplay}</a>
      </div>

      <header className="nav" id="top">
        <div className="wrap nav__inner">
          <Logo />
          <nav className={'nav__links' + (menu ? ' open' : '')} onClick={() => setMenu(false)}>
            <a href="#products">Products</a>
            <a href="#bulk">Bulk supply</a>
            <a href="#about">About</a>
            <a href="#pay">Pay</a>
            <a href="#contact">Contact</a>
          </nav>
          <div className="nav__cta">
            <button className="enq-btn" onClick={() => setDrawer(true)} aria-label={`Open enquiry, ${count} items`}>
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M7 4h-2l-1 2v2h2l3.6 7.6-1.4 2.4c-.6 1.3.4 3 1.8 3h11v-2H10l1.1-2h7.4c.8 0 1.4-.4 1.7-1l3.6-6.5L22 8H7.2l-.9-2H7z"/></svg>
              <span>Enquiry</span>
              {count > 0 && <b>{count}</b>}
            </button>
            <button className="burger" onClick={() => setMenu((m) => !m)} aria-label="Menu">☰</button>
          </div>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="wrap hero__inner">
            <div className="hero__copy">
              <span className="eyebrow">Housekeeping & cleaning chemicals · Hyderabad</span>
              <h1>Cleaner spaces. <em>Better places.</em></h1>
              <p>
                Kleen Vedha makes bathroom, floor, glass, kitchen, laundry and hygiene products for homes,
                offices, hotels, hospitals, schools and apartment communities. Packs run from 250 ml bottles
                to 50 L cans.
              </p>
              <div className="hero__actions">
                <a href="#products" className="btn btn--lg">View products</a>
                <a href={waLink('Hello Kleen Vedha, I would like a quote.')} target="_blank" rel="noreferrer" className="btn btn--lg btn--wa">Get a quote on WhatsApp</a>
              </div>
              <ul className="hero__points">
                <li>20+ products</li>
                <li>250 ml – 50 L packs</li>
                <li>Institutional rates</li>
              </ul>
            </div>
            <div className="hero__visual" aria-hidden="true">
              <div className="blob" />
              <div className="shelf">
                {['#1d8fd1', '#6aa43f', '#24b5c9', '#2f5fd0', '#c86fc9'].map((c, i) => (
                  <div key={c} className="shelf__item" style={{ '--d': `${i * 0.12}s` }}>
                    <Bottle color={c} />
                  </div>
                ))}
              </div>
              <div className="bubble b1" /><div className="bubble b2" /><div className="bubble b3" />
            </div>
          </div>
        </section>

        <section className="serve">
          <div className="wrap serve__inner">
            {['Offices & IT parks', 'Hotels & restaurants', 'Hospitals & clinics', 'Schools & colleges', 'Apartments & gated communities', 'Homes'].map((s) => (
              <span key={s}>{s}</span>
            ))}
          </div>
        </section>

        <section className="section" id="products">
          <div className="wrap">
            <div className="section__head">
              <span className="eyebrow">Our range</span>
              <h2>Products</h2>
              <p>Choose a pack size and quantity, then add it to your enquiry. All prices are MRP. GST is extra, and bulk orders get better rates.</p>
            </div>

            <div className="filters">
              <div className="chips" role="tablist">
                {CATEGORIES.map((c) => (
                  <button key={c.id} role="tab" aria-selected={cat === c.id} className={cat === c.id ? 'on' : ''} onClick={() => setCat(c.id)}>
                    {c.label}
                  </button>
                ))}
              </div>
              <input className="search" type="search" placeholder="Search products…" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search products" />
            </div>

            {filtered.length ? (
              <div className="grid">
                {filtered.map((p) => <ProductCard key={p.id} p={p} onAdd={addItem} />)}
              </div>
            ) : (
              <p className="empty">No products match “{q}”. Try another word, or <a href={waLink(`Hello, do you supply ${q}?`)} target="_blank" rel="noreferrer">ask us on WhatsApp</a>.</p>
            )}
          </div>
        </section>

        <section className="section section--tint" id="bulk">
          <div className="wrap bulk">
            <div className="bulk__copy">
              <span className="eyebrow">For institutions & facility teams</span>
              <h2>Bulk supply in 50 L cans</h2>
              <p>
                Running housekeeping for a hotel, hospital, campus or large office? Most of our range comes in
                50 litre cans at institutional prices, which cuts your cost per litre and saves on packaging.
              </p>
              <ul className="ticks">
                <li>Free door delivery near Hyderabad on orders above {inr(BUSINESS.freeDeliveryAbove)}</li>
                <li>GST invoice for every order</li>
                <li>Repeat monthly supply on request</li>
              </ul>
              <a className="btn btn--lg" href={waLink('Hello Kleen Vedha, I need a bulk (50 L) price quote for my organisation.')} target="_blank" rel="noreferrer">Request bulk rates</a>
            </div>
            <div className="bulk__list">
              <h4>Available in 50 L cans</h4>
              <ul>
                {bulkList.map((p) => (
                  <li key={p.id}>
                    <span className="dot" style={{ background: p.color }} />
                    {p.code ? `${p.code} – ` : ''}{p.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <div className="section__head">
              <span className="eyebrow">One supplier for everything</span>
              <h2>We also supply</h2>
            </div>
            <div className="also">
              {ALSO_SUPPLY.map((a, i) => (
                <div className="also__item" key={a.title}>
                  <span className="also__num">0{i + 1}</span>
                  <h3>{a.title}</h3>
                  <p>{a.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--dark" id="about">
          <div className="wrap about">
            <div>
              <span className="eyebrow eyebrow--light">About us</span>
              <h2>Clean made simple, for every kind of space.</h2>
            </div>
            <div className="about__text">
              <p>
                {BUSINESS.legalName} is a Hyderabad-based maker and supplier of cleaning and housekeeping
                chemicals. Our Kleen Vedha range covers everything a housekeeping team uses daily, from
                bathroom sanitisers and floor cleaners to glass, steel, kitchen, laundry and hygiene products.
              </p>
              <div className="stats">
                <div><strong>20+</strong><span>cleaning products</span></div>
                <div><strong>50 L</strong><span>bulk cans available</span></div>
                <div><strong>Free</strong><span>delivery above {inr(BUSINESS.freeDeliveryAbove)}</span></div>
              </div>
            </div>
          </div>
        </section>

        <PaySection />

        <section className="section" id="contact">
          <div className="wrap contact">
            <div className="contact__info">
              <span className="eyebrow">Contact</span>
              <h2>Let's get you a quote</h2>
              <p>Message us with what you need. We usually reply the same working day.</p>
              <ul className="contact__list">
                <li><span>Phone</span><a href={`tel:${BUSINESS.phone}`}>{BUSINESS.phoneDisplay}</a></li>
                <li><span>WhatsApp</span><a href={waLink('Hello Kleen Vedha')} target="_blank" rel="noreferrer">{BUSINESS.phoneDisplay}</a></li>
                <li><span>Email</span><a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a></li>
                <li><span>Location</span>{BUSINESS.city}</li>
              </ul>
            </div>
            <form className="contact__form" onSubmit={(e) => { e.preventDefault(); window.open(waLink(contactMsg), '_blank') }}>
              <label>Name<input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></label>
              <label>Phone<input required type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></label>
              <label className="full">Company / institution (optional)<input value={form.org} onChange={(e) => setForm({ ...form, org: e.target.value })} /></label>
              <label className="full">What do you need?<textarea rows="4" value={form.msg} onChange={(e) => setForm({ ...form, msg: e.target.value })} placeholder="e.g. 10 × 5 L floor cleaner every month for our office" /></label>
              <div className="full form__actions">
                <button type="submit" className="btn btn--wa">Send on WhatsApp</button>
                <a className="btn btn--ghost" href={`mailto:${BUSINESS.email}?subject=${encodeURIComponent('Enquiry – Kleen Vedha')}&body=${encodeURIComponent(contactMsg)}`}>Send by email</a>
              </div>
            </form>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="wrap footer__inner">
          <div>
            <Logo light />
            <p>{BUSINESS.legalName}<br />{BUSINESS.city}</p>
          </div>
          <div className="footer__cols">
            <div>
              <h5>Explore</h5>
              <a href="#products">Products</a><a href="#bulk">Bulk supply</a><a href="#about">About</a><a href="#pay">Pay online</a><a href="#contact">Contact</a>
            </div>
            <div>
              <h5>Reach us</h5>
              <a href={`tel:${BUSINESS.phone}`}>{BUSINESS.phoneDisplay}</a>
              <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>
            </div>
          </div>
        </div>
        <div className="wrap footer__legal">
          <span>© {new Date().getFullYear()} {BUSINESS.legalName}. All rights reserved.</span>
          <span>Prices shown are MRP. GST extra as applicable.</span>
        </div>
      </footer>

      <a className="wa-float" href={waLink('Hello Kleen Vedha')} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp">
        <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true"><path fill="#fff" d="M16 3a13 13 0 0 0-11.2 19.6L3 29l6.6-1.7A13 13 0 1 0 16 3zm0 23.6c-2 0-4-.5-5.7-1.6l-.4-.2-3.9 1 1-3.8-.3-.4A10.6 10.6 0 1 1 16 26.6zm5.8-7.9c-.3-.2-1.9-.9-2.2-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7 0a8.7 8.7 0 0 1-4.3-3.7c-.3-.6.3-.5 1-1.6.1-.2 0-.4 0-.5l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4s-1.2 1.1-1.2 2.7 1.2 3.2 1.4 3.4 2.4 3.6 5.7 5c2.1.9 3 1 4 .8.7-.1 1.9-.8 2.2-1.5s.3-1.4.2-1.5-.3-.2-.6-.3z"/></svg>
      </a>

      <EnquiryDrawer open={drawer} onClose={() => setDrawer(false)} items={items} setItems={setItems} />
    </>
  )
}
