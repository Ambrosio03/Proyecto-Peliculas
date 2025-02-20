import { createContext } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ToasterContext = createContext();

export const ToasterProvider = ({ children }) => {
    const showToast = {
        success: (message) => {
            toast.success(message, {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        },
        error: (message) => {
            toast.error(message, {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        },
        favoriteAdded: (title) => {
            toast(
                <div className="flex items-center">
                    <span className="text-xl mr-2">❤️</span>
                    <span>{`¡${title} añadida a favoritos!`}</span>
                </div>, 
                {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                }
            );
        },
        favoriteRemoved: (title) => {
            toast(
                <div className="flex items-center">
                    <span className="text-xl mr-2">💔</span>
                    <span>{`${title} eliminada de favoritos`}</span>
                </div>,
                {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                }
            );
        },
        reviewAdded: (title) => {
            toast(
                <div className="flex items-center">
                    <span className="text-xl mr-2">✍️</span>
                    <span>{`¡Reseña publicada para ${title}!`}</span>
                </div>,
                {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                }
            );
        },
        reviewDeleted: () => {
            toast(
                <div className="flex items-center">
                    <span className="text-xl mr-2">🗑️</span>
                    <span>Reseña eliminada</span>
                </div>,
                {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                }
            );
        }
    };

    return (
        <ToasterContext.Provider value={showToast}>
            {children}
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </ToasterContext.Provider>
    );
}; 