'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import {
  Menu,
  X,
  ChevronDown,
  Leaf,
  Heart,
  Sun,
  Moon,
  Droplets,
  Flame,
  Wind,
  Users,
  Clock,
  MapPin,
  Mail,
  Phone,
  Instagram,
  Facebook,
  ArrowRight,
  Star,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Mountain,
  TreePine,
} from 'lucide-react'

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Classes', href: '#classes' },
  { label: 'Instructors', href: '#team' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Book', href: '#booking' },
]

const CLASSES = [
  {
    name: 'Vinyasa Flow',
    icon: Wind,
    duration: '60 min',
    level: 'All Levels',
    instructor: 'Lead Instructor',
    description:
      'A dynamic, breath synchronized practice that builds heat and cultivates mindful movement through flowing sequences.',
    category: 'flow',
    schedule: 'Mon, Wed, Fri — 7:00 AM',
  },
  {
    name: 'Yin Yoga',
    icon: Moon,
    duration: '75 min',
    level: 'All Levels',
    instructor: 'Restorative Specialist',
    description:
      'A slow, meditative practice targeting deep connective tissues. Long held poses encourage release and introspection.',
    category: 'restorative',
    schedule: 'Tue, Thu — 6:30 PM',
  },
  {
    name: 'Power Yoga',
    icon: Flame,
    duration: '60 min',
    level: 'Intermediate',
    instructor: 'Lead Instructor',
    description:
      'An intense, fitness focused practice that builds strength, flexibility, and stamina through challenging sequences.',
    category: 'flow',
    schedule: 'Mon, Wed, Fri — 12:00 PM',
  },
  {
    name: 'Restorative Yoga',
    icon: Droplets,
    duration: '90 min',
    level: 'All Levels',
    instructor: 'Restorative Specialist',
    description:
      'A deeply relaxing practice using props to support the body in gentle postures, promoting healing and stress relief.',
    category: 'restorative',
    schedule: 'Sat — 10:00 AM',
  },
  {
    name: 'Morning Meditation',
    icon: Sun,
    duration: '30 min',
    level: 'All Levels',
    instructor: 'Meditation Guide',
    description:
      'Start your day with guided breathwork and seated meditation to cultivate clarity and calm.',
    category: 'meditation',
    schedule: 'Daily — 6:00 AM',
  },
  {
    name: 'Prenatal Yoga',
    icon: Heart,
    duration: '60 min',
    level: 'All Levels',
    instructor: 'Prenatal Specialist',
    description:
      'Gentle sequences designed to support expecting mothers, easing discomfort and building connection.',
    category: 'specialty',
    schedule: 'Tue, Thu — 10:00 AM',
  },
]

const TEAM = [
  {
    role: 'Lead Instructor',
    initials: 'SF',
    color: 'bg-sage',
    specialty: 'Vinyasa & Power Yoga',
    philosophy:
      'Movement is medicine. Every flow is an opportunity to listen to your body and honor where you are today.',
  },
  {
    role: 'Restorative Specialist',
    initials: 'AW',
    color: 'bg-taupe',
    specialty: 'Yin & Restorative Yoga',
    philosophy:
      'Stillness is not the absence of movement — it is the presence of peace. True healing begins when we slow down.',
  },
  {
    role: 'Meditation Guide',
    initials: 'MK',
    color: 'bg-forest',
    specialty: 'Breathwork & Mindfulness',
    philosophy:
      'The breath is the bridge between body and mind. In each inhale, we find possibility; in each exhale, we find release.',
  },
  {
    role: 'Prenatal Specialist',
    initials: 'JR',
    color: 'bg-sage',
    specialty: 'Prenatal & Postnatal Yoga',
    philosophy:
      'Supporting the journey of motherhood through gentle, intentional movement that nurtures both parent and child.',
  },
]

const GALLERY_ITEMS = [
  { label: 'Main Studio', gradient: 'from-sage/30 to-cream' },
  { label: 'Meditation Room', gradient: 'from-taupe/30 to-sand' },
  { label: 'Garden Terrace', gradient: 'from-forest/20 to-sage/10' },
  { label: 'Wellness Lounge', gradient: 'from-sand to-cream' },
  { label: 'Hot Yoga Room', gradient: 'from-taupe/20 to-cream' },
  { label: 'Private Suite', gradient: 'from-sage/20 to-sand' },
]

const PRICING = [
  {
    name: 'Drop In',
    description: 'Perfect for visitors or trying your first class',
    features: [
      'Single class access',
      'Mat and props included',
      'Access to changing rooms',
    ],
    cta: 'Book a Class',
  },
  {
    name: 'Monthly Membership',
    description: 'Our most popular option for dedicated practitioners',
    features: [
      'Unlimited classes',
      'Priority booking',
      'Guest passes each month',
      'Wellness lounge access',
      'Member workshops',
    ],
    popular: true,
    cta: 'Start Membership',
  },
  {
    name: 'Class Pack',
    description: 'Flexible sessions at your own pace',
    features: [
      '10 class bundle',
      'Valid for 3 months',
      'All class styles included',
      'Shareable with a friend',
    ],
    cta: 'Get Your Pack',
  },
]

const TESTIMONIALS = [
  {
    text: 'Serenity Flow completely transformed my relationship with yoga. The instructors create such a warm, welcoming space that I never feel intimidated, even as a beginner.',
    initials: 'EM',
    role: 'Member for 2 years',
    color: 'bg-sage',
  },
  {
    text: 'The restorative classes here are unlike anything I have experienced. I leave each session feeling genuinely renewed, both physically and mentally.',
    initials: 'KP',
    role: 'Member for 1 year',
    color: 'bg-taupe',
  },
  {
    text: 'As someone who works at a desk all day, the evening Yin classes have been life changing. My chronic back pain has significantly improved since joining.',
    initials: 'DL',
    role: 'Member for 6 months',
    color: 'bg-forest',
  },
]

const CATEGORIES = ['all', 'flow', 'restorative', 'meditation', 'specialty'] as const

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [testimonialIndex, setTestimonialIndex] = useState(0)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const filteredClasses =
    activeCategory === 'all'
      ? CLASSES
      : CLASSES.filter((c) => c.category === activeCategory)

  const prevTestimonial = () =>
    setTestimonialIndex((i) => (i === 0 ? TESTIMONIALS.length - 1 : i - 1))
  const nextTestimonial = () =>
    setTestimonialIndex((i) => (i === TESTIMONIALS.length - 1 ? 0 : i + 1))

  return (
    <>
      {/* ═══ 1. STICKY NAV ═══ */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-cream/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16 md:h-20">
          <a href="#" className="font-heading text-2xl md:text-3xl font-semibold text-forest tracking-wide">
            Serenity Flow
          </a>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-body text-forest/80 hover:text-forest transition-colors tracking-wide uppercase"
              >
                {link.label}
              </a>
            ))}
          </div>

          <button
            className="md:hidden text-forest p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile nav */}
        <div
          className={`md:hidden absolute top-full left-0 right-0 bg-cream/98 backdrop-blur-md border-b border-sand transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            mobileOpen
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 -translate-y-4 pointer-events-none'
          }`}
        >
          <div className="px-6 py-6 flex flex-col gap-4">
            {NAV_LINKS.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`text-lg font-heading text-forest/80 hover:text-forest transition-all duration-300 ${
                  mobileOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
                }`}
                style={{
                  transitionDelay: mobileOpen ? `${index * 60}ms` : '0ms',
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* ═══ 2. HERO FULL ═══ */}
      <section id="hero" className="relative h-screen w-full overflow-hidden">
        <Image
          src="/images/hero.png"
          alt="Serenity Flow yoga studio interior with natural light"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest/70 via-forest/30 to-transparent" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <p className="font-body text-cream/80 uppercase tracking-[0.3em] text-sm mb-4">
            Yoga &amp; Wellness Studio
          </p>
          <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-light text-cream leading-tight max-w-4xl">
            Find Your Flow,
            <br />
            Find Your Peace
          </h1>
          <p className="font-body text-cream/70 mt-6 max-w-xl text-lg">
            A sanctuary for mindful movement, deep rest, and holistic wellness
            rooted in nature and community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <Button
              asChild
              size="lg"
              className="bg-sage hover:bg-sage/90 text-cream rounded-full px-8 font-body"
            >
              <a href="#booking">Book a Class</a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-cream/40 text-cream hover:bg-cream/10 rounded-full px-8 font-body"
            >
              <a href="#classes">View Schedule</a>
            </Button>
          </div>
        </div>
        <a
          href="#about"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce"
          aria-label="Scroll down"
        >
          <ChevronDown className="text-cream/60" size={32} />
        </a>
      </section>

      {/* ═══ 3. ABOUT SPLIT ═══ */}
      <section id="about" className="py-24 md:py-32 bg-cream">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div className="relative">
            <div className="rounded-3xl overflow-hidden">
              <Image
                src="/images/feature.png"
                alt="Serenity Flow studio practice space"
                width={800}
                height={600}
                className="object-cover w-full h-[400px] md:h-[520px]"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-sage/20 rounded-full blur-2xl" />
          </div>
          <div>
            <p className="font-body text-sage uppercase tracking-[0.2em] text-sm mb-3">
              Our Story
            </p>
            <h2 className="font-heading text-4xl md:text-5xl text-forest leading-tight mb-6">
              Where Stillness Meets Strength
            </h2>
            <p className="font-body text-forest/70 leading-relaxed mb-6">
              Serenity Flow was born from a simple belief: that wellness is not a
              luxury, but a necessity. Inspired by the tranquility of Japanese
              zen gardens and the warmth of Scandinavian retreats, our studio is
              designed to feel like a deep breath — spacious, calming, and
              entirely your own.
            </p>
            <p className="font-body text-forest/70 leading-relaxed mb-8">
              We offer a curated range of yoga styles, meditation practices, and
              wellness workshops led by experienced practitioners who meet you
              exactly where you are on your journey.
            </p>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-sage/15 flex items-center justify-center">
                  <Leaf className="text-sage" size={20} />
                </div>
                <div>
                  <p className="font-heading text-2xl text-forest">6+</p>
                  <p className="text-sm text-forest/60 font-body">Class Styles</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-sage/15 flex items-center justify-center">
                  <Users className="text-sage" size={20} />
                </div>
                <div>
                  <p className="font-heading text-2xl text-forest">4</p>
                  <p className="text-sm text-forest/60 font-body">Instructors</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-sage/15 flex items-center justify-center">
                  <Heart className="text-sage" size={20} />
                </div>
                <div>
                  <p className="font-heading text-2xl text-forest">7</p>
                  <p className="text-sm text-forest/60 font-body">Days a Week</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 4. SERVICES / CLASS SCHEDULE ═══ */}
      <section id="classes" className="py-24 md:py-32 bg-sand/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="font-body text-sage uppercase tracking-[0.2em] text-sm mb-3">
              Our Classes
            </p>
            <h2 className="font-heading text-4xl md:text-5xl text-forest">
              Explore Our Practice
            </h2>
            <p className="font-body text-forest/60 mt-4 max-w-2xl mx-auto">
              From dynamic flows to deep restorative holds, find the practice
              that speaks to your body and mind.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-body capitalize transition-all ${
                  activeCategory === cat
                    ? 'bg-forest text-cream'
                    : 'bg-cream text-forest/70 hover:bg-sand'
                }`}
              >
                {cat === 'all' ? 'All Classes' : cat}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {filteredClasses.map((cls) => {
              const IconComp = cls.icon
              return (
                <Card
                  key={cls.name}
                  className="border-sand/60 bg-cream/80 backdrop-blur-sm hover:shadow-md transition-shadow"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-sage/15 flex items-center justify-center">
                          <IconComp className="text-sage" size={18} />
                        </div>
                        <div>
                          <CardTitle className="text-xl font-heading text-forest">
                            {cls.name}
                          </CardTitle>
                          <p className="text-sm text-forest/50 font-body mt-0.5">
                            {cls.instructor}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant="secondary"
                        className="bg-sage/10 text-sage border-0 font-body"
                      >
                        {cls.level}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-forest/70 font-body text-sm leading-relaxed mb-4">
                      {cls.description}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4 text-forest/50 font-body">
                        <span className="flex items-center gap-1">
                          <Clock size={14} />
                          {cls.duration}
                        </span>
                        <span>{cls.schedule}</span>
                      </div>
                      <a
                        href="#booking"
                        className="text-sage hover:text-forest font-body font-semibold flex items-center gap-1 transition-colors"
                      >
                        Book <ArrowRight size={14} />
                      </a>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ 5. TEAM CARDS ═══ */}
      <section id="team" className="py-24 md:py-32 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="font-body text-sage uppercase tracking-[0.2em] text-sm mb-3">
              Our Teachers
            </p>
            <h2 className="font-heading text-4xl md:text-5xl text-forest">
              Guided by Experience
            </h2>
            <p className="font-body text-forest/60 mt-4 max-w-2xl mx-auto">
              Our instructors bring years of dedicated practice and a genuine
              passion for sharing the transformative power of yoga and
              mindfulness.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {TEAM.map((member) => (
              <div key={member.role} className="text-center group">
                <div
                  className={`w-28 h-28 rounded-full ${member.color} mx-auto flex items-center justify-center text-cream font-heading text-3xl font-light mb-6 group-hover:scale-105 transition-transform`}
                >
                  {member.initials}
                </div>
                <h3 className="font-heading text-xl text-forest mb-1">
                  {member.role}
                </h3>
                <p className="font-body text-sage text-sm mb-4">
                  {member.specialty}
                </p>
                <p className="font-body text-forest/60 text-sm leading-relaxed italic">
                  &ldquo;{member.philosophy}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 6. GALLERY GRID ═══ */}
      <section id="gallery" className="py-24 md:py-32 bg-sand/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="font-body text-sage uppercase tracking-[0.2em] text-sm mb-3">
              Our Spaces
            </p>
            <h2 className="font-heading text-4xl md:text-5xl text-forest">
              A Place to Breathe
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {GALLERY_ITEMS.map((item, i) => (
              <div
                key={item.label}
                className={`relative rounded-2xl overflow-hidden ${
                  i === 0 ? 'col-span-2 row-span-2 h-64 md:h-96' : 'h-40 md:h-48'
                } bg-gradient-to-br ${item.gradient} group cursor-default`}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  {i === 0 && <Mountain className="text-forest/10" size={80} />}
                  {i === 1 && <Moon className="text-forest/10" size={48} />}
                  {i === 2 && <TreePine className="text-forest/10" size={48} />}
                  {i === 3 && <Sparkles className="text-forest/10" size={48} />}
                  {i === 4 && <Flame className="text-forest/10" size={48} />}
                  {i === 5 && <Leaf className="text-forest/10" size={48} />}
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-forest/40 to-transparent">
                  <p className="font-heading text-cream text-lg">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 7. PRICING CARDS ═══ */}
      <section id="pricing" className="py-24 md:py-32 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="font-body text-sage uppercase tracking-[0.2em] text-sm mb-3">
              Membership
            </p>
            <h2 className="font-heading text-4xl md:text-5xl text-forest">
              Invest in Your Wellbeing
            </h2>
            <p className="font-body text-forest/60 mt-4 max-w-2xl mx-auto">
              Flexible plans designed to fit your practice. Contact us for
              current pricing and introductory offers.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {PRICING.map((plan) => (
              <Card
                key={plan.name}
                className={`relative border-sand/60 ${
                  plan.popular
                    ? 'bg-forest text-cream ring-2 ring-sage'
                    : 'bg-cream/80'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-sage text-cream border-0 font-body">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center pt-8">
                  <CardTitle
                    className={`font-heading text-2xl ${
                      plan.popular ? 'text-cream' : 'text-forest'
                    }`}
                  >
                    {plan.name}
                  </CardTitle>
                  <p
                    className={`font-body text-sm mt-2 ${
                      plan.popular ? 'text-cream/70' : 'text-forest/60'
                    }`}
                  >
                    {plan.description}
                  </p>
                  <p
                    className={`font-heading text-sm mt-3 ${
                      plan.popular ? 'text-sage' : 'text-taupe'
                    }`}
                  >
                    Contact for pricing
                  </p>
                </CardHeader>
                <CardContent className="pt-4">
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className={`flex items-center gap-2 font-body text-sm ${
                          plan.popular ? 'text-cream/80' : 'text-forest/70'
                        }`}
                      >
                        <Leaf
                          size={14}
                          className={plan.popular ? 'text-sage' : 'text-sage'}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    asChild
                    className={`w-full rounded-full font-body ${
                      plan.popular
                        ? 'bg-sage hover:bg-sage/90 text-cream'
                        : 'bg-forest hover:bg-forest/90 text-cream'
                    }`}
                  >
                    <a href="#booking">{plan.cta}</a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 8. TESTIMONIALS CAROUSEL ═══ */}
      <section className="py-24 md:py-32 bg-forest">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="font-body text-sage uppercase tracking-[0.2em] text-sm mb-3">
            Community Voices
          </p>
          <h2 className="font-heading text-4xl md:text-5xl text-cream mb-16">
            What Our Members Say
          </h2>

          <div className="relative">
            <div className="flex items-center justify-center gap-2 mb-8">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  className="text-sage fill-sage"
                />
              ))}
            </div>

            <blockquote className="font-heading text-2xl md:text-3xl text-cream/90 font-light leading-relaxed mb-10 min-h-[120px]">
              &ldquo;{TESTIMONIALS[testimonialIndex].text}&rdquo;
            </blockquote>

            <div className="flex items-center justify-center gap-4 mb-8">
              <div
                className={`w-14 h-14 rounded-full ${TESTIMONIALS[testimonialIndex].color} flex items-center justify-center text-cream font-heading text-xl`}
              >
                {TESTIMONIALS[testimonialIndex].initials}
              </div>
              <div className="text-left">
                <p className="font-body text-cream/70 text-sm">
                  {TESTIMONIALS[testimonialIndex].role}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4">
              <button
                onClick={prevTestimonial}
                className="w-10 h-10 rounded-full border border-cream/20 flex items-center justify-center text-cream/60 hover:text-cream hover:border-cream/40 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={18} />
              </button>
              <div className="flex gap-2">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setTestimonialIndex(i)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === testimonialIndex ? 'bg-sage w-6' : 'bg-cream/30'
                    }`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={nextTestimonial}
                className="w-10 h-10 rounded-full border border-cream/20 flex items-center justify-center text-cream/60 hover:text-cream hover:border-cream/40 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 9. BOOKING FORM ═══ */}
      <section id="booking" className="py-24 md:py-32 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <p className="font-body text-sage uppercase tracking-[0.2em] text-sm mb-3">
                Book Your Practice
              </p>
              <h2 className="font-heading text-4xl md:text-5xl text-forest leading-tight mb-6">
                Begin Your Journey
              </h2>
              <p className="font-body text-forest/70 leading-relaxed mb-8">
                Ready to step onto the mat? Fill out the form and we will get
                back to you to confirm your class, answer any questions, and help
                you find the perfect practice for your goals.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-sage/15 flex items-center justify-center">
                    <Clock className="text-sage" size={18} />
                  </div>
                  <div>
                    <p className="font-heading text-forest">Flexible Scheduling</p>
                    <p className="font-body text-sm text-forest/60">
                      Classes run 7 days a week, morning to evening
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-sage/15 flex items-center justify-center">
                    <Heart className="text-sage" size={18} />
                  </div>
                  <div>
                    <p className="font-heading text-forest">All Levels Welcome</p>
                    <p className="font-body text-sm text-forest/60">
                      No experience needed — just bring an open mind
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-sage/15 flex items-center justify-center">
                    <Leaf className="text-sage" size={18} />
                  </div>
                  <div>
                    <p className="font-heading text-forest">Equipment Provided</p>
                    <p className="font-body text-sm text-forest/60">
                      Mats, blocks, straps, and bolsters are all included
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Card className="border-sand/60 bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="font-heading text-2xl text-forest">
                  Reserve Your Spot
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form
                  className="space-y-4"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="font-body text-sm text-forest/70 mb-1 block">
                        First Name
                      </label>
                      <Input
                        placeholder="Your first name"
                        className="bg-cream/50 border-sand font-body"
                      />
                    </div>
                    <div>
                      <label className="font-body text-sm text-forest/70 mb-1 block">
                        Last Name
                      </label>
                      <Input
                        placeholder="Your last name"
                        className="bg-cream/50 border-sand font-body"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="font-body text-sm text-forest/70 mb-1 block">
                      Email
                    </label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      className="bg-cream/50 border-sand font-body"
                    />
                  </div>
                  <div>
                    <label className="font-body text-sm text-forest/70 mb-1 block">
                      Preferred Class
                    </label>
                    <select className="w-full h-10 rounded-md border border-sand bg-cream/50 px-3 text-sm font-body text-forest">
                      <option value="">Select a class</option>
                      {CLASSES.map((cls) => (
                        <option key={cls.name} value={cls.name}>
                          {cls.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="font-body text-sm text-forest/70 mb-1 block">
                      Message (optional)
                    </label>
                    <Textarea
                      placeholder="Any injuries, experience level, or questions..."
                      className="bg-cream/50 border-sand font-body min-h-[100px]"
                    />
                  </div>
                  <Button className="w-full bg-forest hover:bg-forest/90 text-cream rounded-full font-body">
                    Request Booking
                  </Button>
                  <p className="text-xs text-forest/40 font-body text-center">
                    We will respond within 24 hours to confirm your booking.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ═══ 10. NEWSLETTER STRIP ═══ */}
      <section className="py-16 bg-sage">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Mail className="text-cream/80" size={24} />
            <h2 className="font-heading text-3xl md:text-4xl text-cream">
              Wellness in Your Inbox
            </h2>
          </div>
          <p className="font-body text-cream/70 mb-8 max-w-xl mx-auto">
            Join our community for weekly yoga tips, mindfulness practices, and
            studio updates delivered straight to you.
          </p>
          <form
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-cream/20 border-cream/30 text-cream placeholder:text-cream/50 font-body flex-1"
            />
            <Button className="bg-forest hover:bg-forest/90 text-cream rounded-full font-body px-8">
              Subscribe
            </Button>
          </form>
        </div>
      </section>

      {/* ═══ 11. FOOTER FULL ═══ */}
      <footer className="py-16 md:py-20 bg-forest text-cream">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <h3 className="font-heading text-3xl mb-4">Serenity Flow</h3>
              <p className="font-body text-cream/60 leading-relaxed max-w-sm mb-6">
                A sanctuary for mindful movement, deep rest, and holistic
                wellness. Rooted in nature, guided by community.
              </p>
              <div className="flex gap-4">
                <a
                  href="mailto:hello@serenityflow.studio"
                  className="w-10 h-10 rounded-full bg-cream/10 flex items-center justify-center hover:bg-cream/20 transition-colors"
                  aria-label="Email us"
                >
                  <Mail size={18} />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-cream/10 flex items-center justify-center hover:bg-cream/20 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={18} />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-cream/10 flex items-center justify-center hover:bg-cream/20 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook size={18} />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-heading text-lg mb-4 text-cream/90">
                Quick Links
              </h4>
              <ul className="space-y-2 font-body text-sm">
                <li>
                  <a href="#about" className="text-cream/60 hover:text-cream transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#classes" className="text-cream/60 hover:text-cream transition-colors">
                    Class Schedule
                  </a>
                </li>
                <li>
                  <a href="#team" className="text-cream/60 hover:text-cream transition-colors">
                    Our Instructors
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="text-cream/60 hover:text-cream transition-colors">
                    Membership
                  </a>
                </li>
                <li>
                  <a href="#booking" className="text-cream/60 hover:text-cream transition-colors">
                    Book a Class
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-heading text-lg mb-4 text-cream/90">
                Contact
              </h4>
              <ul className="space-y-3 font-body text-sm text-cream/60">
                <li className="flex items-center gap-2">
                  <Mail size={14} className="text-sage" />
                  <a
                    href="mailto:hello@serenityflow.studio"
                    className="hover:text-cream transition-colors"
                  >
                    hello@serenityflow.studio
                  </a>
                </li>
                <li>
                  <a href="#booking" className="hover:text-cream transition-colors flex items-center gap-2">
                    <MapPin size={14} className="text-sage" />
                    Contact us for studio location
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-cream/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-body text-sm text-cream/40">
              &copy; 2026 Serenity Flow. All rights reserved.
            </p>
            <p className="font-body text-xs text-cream/30">
              Designed with intention. Built with care.
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}
