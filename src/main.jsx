import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import SignUp from './components/authcomponents/signup.jsx'
import Login from './components/authcomponents/login.jsx'
import MailOpener from './components/authcomponents/verifyemail.jsx'
import VerifyPan from './components/authcomponents/verifypan.jsx'
import SetPassword from './components/authcomponents/forgotpassword.jsx'
import SendEmail from './components/authcomponents/forgotpassword-email.jsx'
import EnterOtp from './components/authcomponents/otp.jsx'
import HomePage from './pages/homepage.jsx'
import AuthLayout from './protectedrouting/authlayout.jsx'
import Invest from './pages/investpage.jsx'
import News from './pages/components/homepage/news.jsx'
import UserHolding from './pages/components/homepage/userholdings.jsx'
import InvestTablAll from './pages/components/invest/invest_tab_all.jsx'
import ProfileTab from './pages/components/profile/profile_tab.jsx'
import WalletTab from './pages/components/wallet/wallet_tab.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />
      },
      {
        path: "/verifymail",
        element: <MailOpener />
      },
      {
        path: "/verify-pan",
        element: <VerifyPan />
      },
      {
        path: "/set-password",
        element: <SetPassword />
      },
      {
        path: "/forgot-password/email",
        element: <SendEmail />
      },
      {
        path: "/otp",
        element: <EnterOtp />
      },
      {
        path: "/home",
        element: (
          <AuthLayout authentication>
            <HomePage />
          </AuthLayout>
        ),
        children: [
          // Nested route for /invest under /home
          {
            path: '',
            element: (
              <>
                <UserHolding />
                <News />
              </>
            ),
          },
          {
            path: "invest",
            element: (
              <AuthLayout authentication>
                <InvestTablAll />
              </AuthLayout>
            )
          },
          {
            path: "profile",
            element: (
              <AuthLayout authentication>
                <ProfileTab />
              </AuthLayout>
            )
          },
          {
            path: "wallet",
            element: (
              <AuthLayout authentication>
                <WalletTab />
              </AuthLayout>
            )
          }
        ]
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
