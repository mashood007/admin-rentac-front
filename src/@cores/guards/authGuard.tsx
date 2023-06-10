// ** React Imports
import { ReactNode, ReactElement, useEffect } from 'react'

// ** Next Import
import { useRouter } from 'next/router'
import useAuthStore from '@/states/authStore'

// ** Hooks Import
// import { useAuth } from 'src/hooks/useAuth'
// import useStore from 'src/states/store'
// import { StateMachine } from 'mdi-material-ui'

interface AuthGuardProps {
  children: ReactNode
  fallback: ReactElement | null
}

const AuthGuard = (props: AuthGuardProps) => {
  const { children, fallback } = props
  const auth = useAuthStore()
  const accessToken = useAuthStore((state: any) => state.accessToken)

  const router = useRouter()
  // const userDetails = useStore((state: any) => state.userDetails)

  const unAuthRoutes: any[] = [
    '/',
    '/signin',
    '/set-password'
  ]

  useEffect(
    () => {
      if (!router.isReady) {
        // window.location.href = '/login'
        return
      }

      if (!accessToken) {

        // skiping router redirection
        if (unAuthRoutes.includes(router.pathname)) {
          return
        }

        if (router.asPath !== '/') {
          router.replace({
            pathname: '/signin',
            query: { returnUrl: router.asPath }
          })
        } else {
          router.replace('/signin')
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.route]
  )

  // if (auth.loading || auth.user === null) {
  //   return fallback
  // }

  return <>{children}</>
}

export default AuthGuard
