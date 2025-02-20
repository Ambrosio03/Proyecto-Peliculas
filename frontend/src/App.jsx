import { RouterProvider } from "react-router-dom"
import { router } from "./routes"
import { FavoritesProvider } from "./context/FavoritesContext"
import { ReseñasProvider } from "./context/reseñasContext"
import { AuthProvider } from "./context/AuthContext"
import { ToasterProvider } from './context/ToastContext'



const App = () => {
  return (
    <ToasterProvider>
        <FavoritesProvider>
          <ReseñasProvider>
            <AuthProvider>
              <RouterProvider router={router}/>
            </AuthProvider>
          </ReseñasProvider>
        </FavoritesProvider>
    </ToasterProvider>
  )
}

export default App