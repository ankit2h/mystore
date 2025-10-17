import { SignedIn, SignedOut, SignInButton, UserButton, SignOutButton } from '@clerk/clerk-react'

export default function Sugn() {
  return (
    <header>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            gap: 8,
            alignItems: 'center',
            zIndex: 1000,
            padding: '6px',
            background: 'transparent',
          }}
        >
          <UserButton />
          <SignOutButton />
        </div>
      </SignedIn>
    </header>
  )
}