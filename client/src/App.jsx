import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { UserProvider } from './hooks/UserContext'
import AppRouter from './routes/AppRouter'
import Header from './components/Header'
import './App.css'

const queryClient = new QueryClient()

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <BrowserRouter>
          <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
            <Header />
            <AppRouter />
          </div>
        </BrowserRouter>
      </UserProvider>
    </QueryClientProvider>
  )
}

export default App