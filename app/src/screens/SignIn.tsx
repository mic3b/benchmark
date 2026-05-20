import { useState } from 'react'
import bgGradient from '../assets/bg-gradient.png'
import horizonLogo from '../assets/horizon-logo.svg'
import googleLogo from '../assets/google.svg'
import { ChevronIcon, EyeIcon } from '../components/icons'
import { Checkbox, FieldLabel, TextInput } from '../components/ui'

const FOOTER_LINKS = ['Marketplace', 'License', 'Terms of Use', 'Blog']

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="grid min-h-screen grid-cols-1 bg-white lg:grid-cols-[1fr_min(50%,960px)]">
      <FormPanel showPassword={showPassword} onTogglePassword={() => setShowPassword((v) => !v)} />
      <BrandPanel />
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Left side — sign-in form                                           */
/* ------------------------------------------------------------------ */

type FormProps = { showPassword: boolean; onTogglePassword: () => void }

function FormPanel({ showPassword, onTogglePassword }: FormProps) {
  return (
    <div className="relative flex flex-col px-8 py-10 lg:px-20">
      <a
        href="#"
        className="flex items-center gap-1 text-sm font-medium text-muted tracking-[-0.28px]"
      >
        <ChevronIcon className="size-4 rotate-90" />
        Back to dashboard
      </a>

      <div className="mx-auto flex w-full max-w-[410px] flex-1 flex-col justify-center">
        <h1 className="text-[36px] font-bold leading-[56px] tracking-[-0.72px] text-heading">Sign In</h1>
        <p className="mt-1 text-base text-muted tracking-[-0.32px]">
          Enter your email and password to sign in!
        </p>

        <GoogleButton />
        <OrDivider />

        <form
          className="flex flex-col gap-6"
          onSubmit={(e) => e.preventDefault()}
        >
          <label className="flex flex-col gap-2">
            <FieldLabel required>Email</FieldLabel>
            <TextInput type="email" placeholder="mail@simmmple.com" required />
          </label>

          <label className="flex flex-col gap-2">
            <FieldLabel required>Password</FieldLabel>
            <PasswordInput show={showPassword} onToggle={onTogglePassword} />
          </label>

          <div className="flex items-center justify-between">
            <label className="flex cursor-pointer items-center gap-3 text-sm text-heading">
              <Checkbox defaultChecked />
              Keep me logged in
            </label>
            <a href="#" className="text-sm font-medium text-brand">
              Forget password?
            </a>
          </div>

          <button
            type="submit"
            className="h-[54px] rounded-2xl bg-brand text-sm font-bold text-white tracking-[-0.28px] transition hover:bg-brand-hover"
          >
            Sign In
          </button>

          <p className="text-sm text-heading">
            Not registered yet?{' '}
            <a href="#" className="font-bold text-brand">
              Create an Account
            </a>
          </p>
        </form>
      </div>

      <p className="mt-auto text-sm text-muted">
        © 2022 Horizon UI. All Rights Reserved. Made with love by{' '}
        <span className="font-bold">Simmmple!</span>
      </p>
    </div>
  )
}

function GoogleButton() {
  return (
    <button
      type="button"
      className="mt-9 flex h-[50px] w-full items-center justify-center gap-2 rounded-2xl bg-page text-sm font-medium text-heading transition hover:bg-chip-hover"
    >
      <img src={googleLogo} alt="" className="size-5" />
      Sign in with Google
    </button>
  )
}

function OrDivider() {
  return (
    <div className="my-6 flex items-center gap-3 text-sm font-medium text-muted">
      <span className="h-px flex-1 bg-line" />
      or
      <span className="h-px flex-1 bg-line" />
    </div>
  )
}

function PasswordInput({ show, onToggle }: { show: boolean; onToggle: () => void }) {
  return (
    <div className="relative">
      <TextInput
        type={show ? 'text' : 'password'}
        placeholder="Min. 8 characters"
        className="w-full pr-12"
        minLength={8}
        required
      />
      <button
        type="button"
        onClick={onToggle}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-heading"
        aria-label={show ? 'Hide password' : 'Show password'}
      >
        <EyeIcon />
      </button>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Right side — branding                                              */
/* ------------------------------------------------------------------ */

function BrandPanel() {
  return (
    <div className="relative hidden overflow-hidden rounded-l-[80px] lg:block">
      <img src={bgGradient} alt="" className="absolute inset-0 size-full object-cover" />
      <div className="relative flex h-full flex-col items-center justify-between px-12 py-20">
        <div className="flex flex-1 items-center justify-center">
          <img src={horizonLogo} alt="Horizon UI" width={280} height={375} className="w-[280px]" />
        </div>
        <div className="flex w-full flex-col items-center gap-6">
          <div className="rounded-3xl border-2 border-white/20 px-14 py-6 text-center">
            <p className="text-base text-white">Learn more about Horizon UI on</p>
            <p className="mt-1 text-2xl font-bold text-white">horizon-ui.com</p>
          </div>
          <nav className="flex gap-6 text-sm text-white">
            {FOOTER_LINKS.map((link) => (
              <a key={link} href="#" className="hover:underline">
                {link}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}
