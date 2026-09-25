import {
  createUserWithEmailAndPassword,
  onIdTokenChanged,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
} from 'firebase/auth'
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { verifyFirebaseToken } from '../api/users'
import { setAuthToken } from '../api/client'
import { firebaseAuth } from '../lib/firebase'
import type { AppUser } from '../types/api'

interface AuthContextValue {
  user: AppUser | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (firstName: string, lastName: string, email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Firebase persists the session itself; on load (or whenever the ID
    // token refreshes) re-verify with our backend so `user` reflects the
    // app's own user record, not just Firebase's.
    const unsubscribe = onIdTokenChanged(firebaseAuth, async (firebaseUser) => {
      if (!firebaseUser) {
        setAuthToken(null)
        setUser(null)
        setLoading(false)
        return
      }

      try {
        const token = await firebaseUser.getIdToken()
        setAuthToken(token)
        const appUser = await verifyFirebaseToken(token)
        setUser(appUser)
      } catch {
        setAuthToken(null)
        setUser(null)
      } finally {
        setLoading(false)
      }
    })

    return unsubscribe
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      async signIn(email, password) {
        await signInWithEmailAndPassword(firebaseAuth, email, password)
      },
      async signUp(firstName, lastName, email, password) {
        const credential = await createUserWithEmailAndPassword(firebaseAuth, email, password)
        await updateProfile(credential.user, { displayName: `${firstName} ${lastName}` })
      },
      async signOut() {
        await firebaseSignOut(firebaseAuth)
      },
    }),
    [user, loading],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}
