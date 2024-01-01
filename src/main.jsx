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
import News from './pages/components/homepage/news.jsx'
import UserHolding from './pages/components/homepage/userholdings.jsx'
import InvestTablAll from './pages/components/invest/invest_tab_all.jsx'
import ProfileTab from './pages/components/profile/profile_tab.jsx'
import WalletTab from './pages/components/wallet/wallet_tab.jsx'
import PersonalInfo from './pages/components/profile/personal_information/personal_information_tab.jsx'
import Security from './pages/components/profile/security/security.jsx'
import SetPass from './pages/components/profile/security/set_password/set_password.jsx'
import TwoFactorVerifyMobile from './pages/components/profile/security/twofa/two_factor_mobile.jsx'
import CoinDetails from './components/common/coins.jsx'
import CryptoCoin from './components/common/cryptocoin.jsx'
import MyHoldings from './pages/components/invest/invest_tab_my_holdings.jsx'
import Invest from './pages/components/invest/invest.jsx'
import TransactionHistory from './pages/components/wallet/transactions/transactions.jsx'


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
                <Invest/>
                <InvestTablAll/>
              </AuthLayout>
            ),
            children:[
              {
                path: 'my-holdings',
                element:(
                  <MyHoldings />
                )
              }
            ]
          },
          {
            path: "personal-info",
            element: <PersonalInfo />
          },
          {
            path: "security",
            element: <Security />
          },
          {
            path: "set-pass",
            element: <SetPass />
          },
          {
            path: "2fa",
            element: (
              <TwoFactorVerifyMobile />
            )
          },
          {
            path: "coins",
            element: (
              <CoinDetails />
            )
          },
          // {
          //   path:"my-holdings",
          //   element:(
          //     <MyHoldings/>
          //   )
          // },
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
