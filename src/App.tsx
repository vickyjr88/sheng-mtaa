import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { AboutPage } from './pages/AboutPage'
import { MchongoanoDetailPage } from './pages/MchongoanoDetailPage'
import { MchongoanosPage } from './pages/MchongoanosPage'
import { ProfilePage } from './pages/ProfilePage'
import { ShengDetailPage } from './pages/ShengDetailPage'
import { ShengsPage } from './pages/ShengsPage'
import { SignInPage } from './pages/SignInPage'
import { SignUpPage } from './pages/SignUpPage'
import { UserPage } from './pages/UserPage'

export function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<ShengsPage />} />
        <Route path="/shengs" element={<ShengsPage />} />
        <Route path="/shengs/:slug" element={<ShengDetailPage />} />
        <Route path="/mchongoanos" element={<MchongoanosPage />} />
        <Route path="/mchongoanos/:id" element={<MchongoanoDetailPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/users/:slug" element={<UserPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  )
}
