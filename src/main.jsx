import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";


const queryClient = new QueryClient();
import { UserProvider } from "./Context/Context.jsx";
ReactDOM.createRoot(document.getElementById('root')).render(
  <UserProvider>
  <React.StrictMode>
     <QueryClientProvider client={queryClient}>
    <App />
    </QueryClientProvider>
  </React.StrictMode>,
  </UserProvider>
)
