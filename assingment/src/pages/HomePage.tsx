import { useState } from "react";
import {  partners } from "../data/brands";
import type { ScreenChange } from "../types";
import { Arrow, BrandLogo } from "../components/BrandLogo";
import { ArrowUpRight, RefreshCcw, Search, Shield } from "lucide-react";
import { Zap, TrendingUp, Tag, ShieldCheck } from "lucide-react";
import isbLogo from "../../Logos/image.png";
import flipkartLogo from "../../Logos/Unknown.png";
import mckinseyLogo from "../../Logos/Unknown-2.png";
import cromaLogo from "../../Logos/Unknown-3.png";
import bajajLogo from "../../Logos/Unknown-4.png";
import mobikwikLogo from "../../Logos/Unknown-5.png";
import cfaLogo from "../../Logos/Unknown-6.png";
import olxLogo from "../../Logos/Unknown-7.png";



type HomePageProps = {
  onShop: () => void;
  onNavigate: ScreenChange;
};

const steps = [
  ["01.", "Choose product & payment plan"],
  ["02.", "Check your eligibility"],
  ["03.", "Pledge mutual funds"],
  ["04.", "Complete your purchase"],
];
export const benefitTitles = [
  {
    title: "Instant approvals",
    icon: Zap,
  },
  {
    title: "Continue getting returns on your investment",
    icon: TrendingUp,
  },
  {
    title: "Zero Downpayment",
    icon: RefreshCcw,
  },
  {
    title: "0% interest",
    icon: ShieldCheck,
  },
  {
    title: "Zero foreclosure charges",
    icon: Tag,
  },
  {
    title: "Long EMI tenures",
    icon: Shield,
  },
];
const faqs = [
  "What is 1Fi?",
  "Is 1Fi safe and legit?",
  "What documents are needed to take a loan?",
  "Are there any hidden fees?",
  "What if markets fall?",
];

const testimonials = [
  ["SK", "Sneha Kulkarni", "The process was so easy. Paying for my favourite product using my investments felt completely effortless."],
  ["AS", "Aditi Sharma", "1Fi gave me the flexibility to get what I needed today while keeping my investments working for me."],
  ["HA", "Harshit Agarwal", "What I liked most is that I could shop without disturbing my long-term financial goals."],
  ["ZM", "Zainab Mehta", "A simple, transparent way to unlock the value of investments when you need it."],
  ["NM", "Nitin Mehra", "The digital journey was quick and the support team made every step easy to understand."],
  ["SK", "Sneha Kulkarni", "I never imagined shopping with mutual funds could be this smooth and convenient."],
  ["AS", "Adil Sharma", "A thoughtful product that lets your money continue earning while you spend."],
  ["HA", "Harshit Agarwal", "The experience was seamless from eligibility to completing my purchase."],
];

export function HomePage({ onShop, onNavigate }: HomePageProps) {
  const [openFaq, setOpenFaq] = useState(1);

  return (
    <main className="home-screen">
      <header className="site-header">
        <button className="logo-button" onClick={() => onNavigate("home")}>
          <BrandLogo />
        </button>
        <nav>
          <a href="#how-it-works">How it Works</a>
          <a href="#shop" onClick={onShop}>
            Shop
          </a>
          <a href="#calculator">Calculator</a>
          <a href="#contact">Contact Us</a>
          <a href="#partners">Partner With Us</a>
          <a href="#faqs">FAQs</a>
        </nav>
        <button className="header-cta" onClick={onShop}>
          Shop Now <Arrow />
        </button>
      </header>

      <section className="hero-section">
        <div className="hero-content">
          <span className="pill">✦ NO-COST EMIs</span>
          <h1>
            Shop today
            <br />
            <em>Pay later</em> using
            <br />
            <b>mutual funds.</b>
          </h1>
          <p>
            No credit score required. No interest.
            <br />
            Fully backed by your investments.
          </p>
          <div className="hero-actions">
            <button className="check-eligiblity flex justify-between" onClick={onShop}>
              Check Eligibility <ArrowUpRight size={14} strokeWidth={2.2} />
            </button>
            <button className="start-shopping flex justify-between items-center gap-2" onClick={onShop}>
              Start Shopping <Search size={14} strokeWidth={2.2} />
            </button>
          </div>
        </div>
      </section>

      <section className="product-strip">
        {[
          ["FEATURED PRODUCTS", "Google Pixel 10"],
          ["BEST SELLERS", "iPhone 17 Pro Max"],
          ["BEST DEALS", "MacBook Pro"],
        ].map(([label, product]) => (
          <div key={label}>
            <small>{label}</small>
            <strong>{product}</strong>
          </div>
        ))}
      </section>

      <section className="how-section" id="how-it-works">
        <span className="section-tag">HOW IT WORKS</span>
        <div className="section-heading">
          <h2>
            Shop using mutual funds
            <br />
            <em>in 4 easy steps</em>
          </h2>
          <button className="primary-button flex items-center justify-between" onClick={onShop}>
            Check Eligibility <ArrowUpRight size={14} strokeWidth={2.2} />
          </button>
        </div>
        <div className="steps">
          {steps.map(([number, title]) => (
            <article key={number}>
              <b>{number}</b>
              <strong>{title}</strong>
              <p>
                Select EMI tenure from 3 months to 10 years for your favourite
                devices.
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="partners-section" id="partners">
        <span className="section-tag">TRUSTED BY THE BEST</span>
        <div className="partner-copy">
          <h2>
            Our Valued <em>Partners</em>
          </h2>
          <p>
            Collaborating with pioneers in payments technology, finance, and
            digital commerce.
          </p>
           <div className=" flex justify-start gap-4">
            <button className=" start-shopping  border-none flex justify-between items-center" onClick={onShop}>
              Check Eligibility <ArrowUpRight size={14} strokeWidth={2.2} />
            </button>
            <button className="check-eligiblity  flex justify-between items-center gap-2" onClick={onShop}>
              Start Shopping <Search size={14} strokeWidth={2.2} />
            </button>
          </div>
        </div>
        <div className="partner-grid">
          {partners.map((partner) => (
            <span key={partner}>{partner}</span>
          ))}
        </div>
      </section>

      <section className="benefits-section" id="calculator">
        <span className="section-tag">KEY BENEFITS</span>
        <div className="section-heading">
          <h2>
            The <em>Smartest</em> way to
            <br />
            <em>Spend & Keep Earning</em>
          </h2>
          <button className="outline-button flex justify-between items-center" onClick={onShop}>
            Shop Now <ArrowUpRight size={14} strokeWidth={2.2} />
          </button>
        </div>
        <div className="benefit-grid">
          {benefitTitles.map(({ title, icon: Icon }) => (
            <article key={title}>
              <span><Icon size={14} strokeWidth={2.2}/></span>
              <strong>{title}</strong>
              <p>
                Get your favourite products on no-cost EMIs while your
                investments keep earning.
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="institutions-section">
        <h2>
          Backed by <strong>Investors &amp; Builders</strong>
          <br />
          from <em className="italic">Top Institutions</em>
        </h2>
        <div className="institution-grid">
          {[
            ["isb", "ISB", isbLogo],
            ["flipkart", "Flipkart", flipkartLogo],
            ["mckinsey", "McKinsey", mckinseyLogo],
            ["croma", "croma", cromaLogo],
            ["bajaj", "BAJAJ", bajajLogo],
            ["mobikwik", "MobiKwik", mobikwikLogo],
            ["pine", "pine labs"],
            ["cfa", "CFA Institute", cfaLogo],
            ["amex", "AMERICAN", "EXPRESS"],
            ["olx", "olx", olxLogo],
          ].map(([className, ...content]) => {
            const logo = content.at(-1)?.includes("/") ? content.pop() : undefined;
            const words = content;
            return (
            <span className={`institution-logo ${className}`} key={className}>
              {logo ? <img src={logo} alt={`${className} logo`} /> : words.map((word) => <b key={word}>{word}</b>)}
            </span>
            );
          })}
        </div>
      </section>

      <section className="testimonials-section">
        <span className="section-tag">TESTIMONIALS</span>
        <h2>Why People <em>Love Us</em></h2>
        <div className="testimonial-grid">
          {testimonials.map(([initials, name, quote]) => (
            <article key={`${name}-${quote}`}>
              <div className="testimonial-person"><span>{initials}</span><strong>{name}</strong></div>
              <p>“{quote}”</p>
            </article>
          ))}
        </div>
      </section>

      <section className="faq-section" id="faqs">
        <span className="section-tag">FAQs</span>
        <div className="section-heading">
          <h2>
            Everything <em>you need to know,</em>
            <br />
            <b>at a glance</b>
          </h2>
          <button className="outline-button flex justify-between items-center">
            View All FAQs <ArrowUpRight size={14} strokeWidth={2.2} />
          </button>
        </div>
        {faqs.map((question, index) => (
          <details key={question} open={openFaq === index}>
            <summary
              className={openFaq === index ? "text-[#7729e8]" : ""}
              onClick={(event) => {
                event.preventDefault();
                setOpenFaq(openFaq === index ? -1 : index);
              }}
            >
              {question}
              <span>⌄</span>
            </summary>
            {index === 1 && (
              <p>
                Yes. 1Fi works with SEBI-approved RTA for pledging and
                RBI-regulated lending partners for loans.
              </p>
            )}
          </details>
        ))}
      </section>

      <footer id="contact">
        <div className="footer-columns">
          <div className="footer-column footer-company">
            <BrandLogo/>
            <strong>Fiquity Technology Private Limited</strong>
            <span>GST<br />09AAFCF4917D1Z1</span>
            <span>CIN<br />U62099UP2024PTC193189</span>
            <span>support@1fi.in</span>
          </div>
          <div className="footer-column">
            <strong>Lending Partner</strong>
            <span>Loans are provided by RBI-regulated NBFC partner</span>
            <span>RBI Reg No.<br />N-02.0032</span>
            <span>www.1fi.in</span>
          </div>
          <div className="footer-column">
            <strong>Quick Links</strong>
            <a href="#how-it-works">Check Eligibility</a>
            <a href="#shop" onClick={onShop}>Start Shopping</a>
            <a href="#contact">Support</a>
          </div>
          <div className="footer-column">
            <strong>Support Links</strong>
            <a href="#contact">About Us</a>
            <a href="#contact">Contact Us</a>
            <a href="#faqs">FAQs</a>
            <a href="#contact">Terms and Conditions</a>
            <a href="#contact">Privacy Policy</a>
          </div>
          <div className="footer-column footer-social">
            <strong>Follow Us</strong>
            <div><a href="#contact" aria-label="Instagram">◎</a><a href="#contact" aria-label="LinkedIn">in</a></div>
          </div>
        </div>
        <div className="footer-bottom"><span>© 2026 Fiquity Technology Private Limited. All rights reserved.</span><span>Built with care for smarter spending.</span></div>
      </footer>
    </main>
  );
}
