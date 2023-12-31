import Head from 'next/head'
// import signinStyle from '@/styles/Signin.module.css'
import { useMutation } from 'react-query'
import { login } from '@/api/auth/login'
// import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import { Box, Button, Card, CardContent, Container, Divider, Grid, TextField } from '@mui/material';
import { useState } from 'react';
import useUserStore from '@/states/userStore';



const Signin = () => {
  const router = useRouter()
  const storeAuthToken = useUserStore((state: any) => state.storeAuthToken)
  const storeUser = useUserStore((state: any) => state.storeUser)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


  const { mutate: loginMutate, isLoading: isLoading } = useMutation('ab', login, {
    onSuccess: (response: any) => {
      const { data } = response
      storeAuthToken(data?.accessToken)
      storeUser({ email: data?.email, userId: data?.userId })
      localStorage.setItem('accessToken', JSON.stringify(data?.accessToken))
      router.push('/')
    },
  })
  return (
    <div>
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
          sx={{ padding: 10 }}
        >
          <Grid item xs={6} sx={{ padding: 2 }}>
            <Card>
              {/* <CardHeader title="SignIn" /> */}
              <Divider />
              <CardContent>
                <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { m: 1 }
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <Grid xs={12}>
                    <TextField
                      required
                      id="outlined-required"
                      label="Email"
                      placeholder="joe@sample.com"
                      fullWidth
                      onChange={(e) => {
                        setEmail(e.target.value)
                      }}
                    />
                  </Grid>
                  <Grid xs={12}>
                    <TextField
                      id="outlined-password-input"
                      label="Password"
                      type="password"
                      autoComplete="current-password"
                      fullWidth
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value)
                      }}
                    />
                  </Grid>
                  <Grid xs={5} sx={{ padding: 2 }}>
                    <Button fullWidth variant="contained" onClick={() => {
                      if (email && password) {
                        loginMutate({ email: email, password: password })
                      }
                    }}>SignIn</Button>
                  </Grid>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default Signin
