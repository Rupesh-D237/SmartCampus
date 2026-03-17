import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { AppLayout } from './components/AppLayout.jsx'
import { RequireAuth } from './components/RequireAuth.jsx'
import { RequireRole } from './components/RequireRole.jsx'

import { Login } from './pages/Login.jsx'
import { Register } from './pages/Register.jsx'
import { Dashboard } from './pages/Dashboard.jsx'
import { Announcements } from './pages/Announcements.jsx'
import { Events } from './pages/Events.jsx'
import { Chat } from './pages/Chat.jsx'
import { LostFound } from './pages/LostFound.jsx'
import { CampusMap } from './pages/CampusMap.jsx'
import { BusTracking } from './pages/BusTracking.jsx'
import { Assistant } from './pages/Assistant.jsx'
import { Profile } from './pages/Profile.jsx'
import { Timetable } from './pages/Timetable.jsx'
import { Issues } from './pages/Issues.jsx'
import { Admin } from './pages/Admin.jsx'
import { AdminUsers } from './pages/AdminUsers.jsx'
import { AdminEvents } from './pages/AdminEvents.jsx'
import { AdminAnnouncements } from './pages/AdminAnnouncements.jsx'

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/app"
            element={
              <RequireAuth>
                <AppLayout />
              </RequireAuth>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="announcements" element={<Announcements />} />
            <Route path="events" element={<Events />} />
            <Route path="chat" element={<Chat />} />
            <Route path="lost-found" element={<LostFound />} />
            <Route path="timetable" element={<Timetable />} />
            <Route path="issues" element={<Issues />} />
            <Route path="campus-map" element={<CampusMap />} />
            <Route path="bus-tracking" element={<BusTracking />} />
            <Route path="assistant" element={<Assistant />} />
            <Route path="profile" element={<Profile />} />

            <Route
              path="admin"
              element={
                <RequireRole role="ADMIN">
                  <Admin />
                </RequireRole>
              }
            />
            <Route
              path="admin/announcements"
              element={
                <RequireRole role="ADMIN">
                  <AdminAnnouncements />
                </RequireRole>
              }
            />
            <Route
              path="admin/users"
              element={
                <RequireRole role="ADMIN">
                  <AdminUsers />
                </RequireRole>
              }
            />
            <Route
              path="admin/events"
              element={
                <RequireRole role="ADMIN">
                  <AdminEvents />
                </RequireRole>
              }
            />
          </Route>

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
