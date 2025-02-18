import { RouterProvider } from "react-router-dom"
import { router } from "./routes"
import { FavoritesProvider } from "./context/FavoritesContext"
import { ReseñasProvider } from "./context/reseñasContext"
import { Toaster } from "sonner"
import { AuthProvider } from "./context/AuthContext"


const App = () => {
  return (
    <>
      <FavoritesProvider>
        <ReseñasProvider>
          <AuthProvider>
          <Toaster position="bottom-right" duration={2000} />
          <RouterProvider router={router}/>
          </AuthProvider>
        </ReseñasProvider>
      </FavoritesProvider>

    </>
  )
}

export default App