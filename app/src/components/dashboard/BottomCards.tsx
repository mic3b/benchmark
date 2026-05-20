import avatar1 from '../../assets/avatar-1.jpg'
import avatar2 from '../../assets/avatar-2.jpg'
import avatar3 from '../../assets/avatar-3.jpg'
import creditCard from '../../assets/credit-card.svg'
import starbucksBg from '../../assets/starbucks-bg.jpg'
import starbucksLogo from '../../assets/starbucks-logo.png'
import { Card, AddButton } from '../ui'
import {
  ClockIcon,
  FastfoodIcon,
  FireIcon,
  MoreVertIcon,
  TimerIcon,
  VideoIcon,
} from '../icons'

export function BottomCards() {
  return (
    <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
      <CourseCtaCard />
      <TeamMembersCard />
      <CardSecurityCard />
      <CashbackCard />
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Course CTA — "New lession is available"                            */
/* ------------------------------------------------------------------ */

function CourseCtaCard() {
  return (
    <Card padding="none">
      <div className="p-6 pb-3">
        <div className="mb-6 flex items-start gap-4">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-bad-soft">
            <FireIcon />
          </div>
          <div>
            <p className="text-xs font-bold text-muted">Business Design</p>
            <p className="text-base font-bold text-heading">New lession is available</p>
          </div>
        </div>
        <p className="mb-5 text-xl font-bold leading-7 text-heading">
          What do you need to know to<br />
          create better products?
        </p>
        <div className="mb-5 flex items-center gap-8 text-sm font-bold text-heading">
          <span className="flex items-center gap-2">
            <TimerIcon className="size-5 text-muted" /> 85 mins
          </span>
          <span className="flex items-center gap-2">
            <VideoIcon className="size-5 text-muted" /> Video format
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-line bg-chip-dark px-6 py-4">
        <AvatarStack />
        <button className="rounded-2xl bg-brand px-5 py-2 text-sm font-bold text-white hover:bg-brand-hover">
          Get Started
        </button>
      </div>
    </Card>
  )
}

function AvatarStack() {
  return (
    <div className="flex -space-x-2">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="size-8 rounded-full border-2 border-white"
          style={{
            backgroundImage: `linear-gradient(135deg, hsl(${i * 60}, 70%, 60%), hsl(${i * 60 + 40}, 70%, 50%))`,
          }}
          aria-hidden
        />
      ))}
      <div className="flex size-8 items-center justify-center rounded-full border-2 border-white bg-page text-[10px] font-bold text-brand">
        18+
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Team members                                                       */
/* ------------------------------------------------------------------ */

const TEAM = [
  { name: 'Adela Parkson', role: 'Creative Director', img: avatar1 },
  { name: 'Christian Mad', role: 'Product Designer', img: avatar2 },
  { name: 'Jason Statham', role: 'Junior Graphic Designer', img: avatar3 },
]

function TeamMembersCard() {
  return (
    <Card>
      <div className="mb-5 flex items-start justify-between">
        <p className="text-lg font-bold text-heading">Team members</p>
        <AddButton />
      </div>
      <ul className="flex flex-col gap-3">
        {TEAM.map((m) => (
          <li
            key={m.name}
            className="flex items-center gap-3 rounded-2xl bg-white px-3 py-3 shadow-card-soft"
          >
            <img src={m.img} alt="" className="size-11 rounded-full object-cover" />
            <div className="flex-1">
              <p className="text-sm font-bold text-heading">{m.name}</p>
              <p className="text-xs text-muted">{m.role}</p>
            </div>
            <button aria-label={`More for ${m.name}`} className="text-muted">
              <MoreVertIcon />
            </button>
          </li>
        ))}
      </ul>
    </Card>
  )
}

/* ------------------------------------------------------------------ */
/* Control card security                                              */
/* ------------------------------------------------------------------ */

function CardSecurityCard() {
  return (
    <Card className="flex flex-col">
      <div className="mb-7 flex h-24 items-center">
        <img src={creditCard} alt="" className="size-24" />
      </div>
      <p className="mb-2 text-2xl font-bold leading-8 text-heading">
        Control card security<br />in-app with a tap
      </p>
      <p className="mb-6 text-sm text-muted">Discover our cards benefits, with one tap.</p>
      <button className="mt-auto h-12 rounded-2xl bg-brand text-sm font-bold text-white hover:bg-brand-hover">
        Cards
      </button>
    </Card>
  )
}

/* ------------------------------------------------------------------ */
/* Starbucks cashback                                                 */
/* ------------------------------------------------------------------ */

function CashbackCard() {
  return (
    <Card padding="none" className="relative overflow-hidden">
      <div className="relative h-44">
        <img src={starbucksBg} alt="" className="size-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-overlay to-transparent" />
        <button
          aria-label="View hours"
          className="absolute top-4 right-4 flex size-11 items-center justify-center rounded-xl border border-white/30 bg-white/20 backdrop-blur-md text-white"
        >
          <ClockIcon />
        </button>
      </div>
      <div className="relative px-5 pt-3 pb-6">
        <img
          src={starbucksLogo}
          alt="Starbucks"
          className="absolute -top-9 left-5 size-16 rounded-full border-4 border-white object-cover shadow-md"
        />
        <div className="pt-9">
          <p className="text-2xl font-bold text-heading">Starbucks</p>
          <p className="mt-2 flex items-center gap-2 text-sm font-medium text-muted">
            <FastfoodIcon className="size-5 text-muted" /> 10% cashback &amp; off
          </p>
        </div>
      </div>
    </Card>
  )
}
