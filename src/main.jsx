import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import UserNameContextProvider from './ContextAPI/UserNameContext.jsx'
import { FullScreenContextProvider } from './ContextAPI/ToggleFullScreenContext.jsx'
import { ThemeContextProvider } from './ContextAPI/ThemeContext.jsx'
import { LanguageContextProvider } from './ContextAPI/LanguageContext.jsx'
import { NavContextProvider } from './ContextAPI/NavBarContext.jsx'
import { RrwebContext, RrwebContextProvider } from './ContextAPI/RrwebContext.jsx'
import { AuthContextProvider } from './ContextAPI/AuthUser.jsx'
import { LoginModalProvider } from './ContextAPI/LoginModalContext.jsx'
import { GifContextProvider } from './ContextAPI/GifContext.jsx'
import { ToggleUiThemeProvider } from './ContextAPI/ToggleUITheme.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserNameContextProvider>
      <FullScreenContextProvider>
        <ThemeContextProvider>
          <LanguageContextProvider>
            <NavContextProvider>
              <RrwebContextProvider>
                <AuthContextProvider>
                  <LoginModalProvider>
                    <GifContextProvider>
                      <ToggleUiThemeProvider>
                        <App />
                      </ToggleUiThemeProvider>
                    </GifContextProvider>
                  </LoginModalProvider>
                </AuthContextProvider>
              </RrwebContextProvider>
            </NavContextProvider>
          </LanguageContextProvider>
        </ThemeContextProvider>
      </FullScreenContextProvider>
    </UserNameContextProvider>
  </React.StrictMode>,
)