import Head from 'next/head'
// import signinStyle from '@/styles/Signin.module.css'
import { Formik, Field, Form, FormikHelpers } from 'formik';
import { useMutation, QueryClient, useQueryClient } from 'react-query'
import { login } from '@/api/auth/login'
// import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import useAuthStore from '@/states/authStore'
import { Box, Button, Card, CardContent, CardHeader, Container, Divider, Grid, TextField } from '@mui/material';
import { useState } from 'react';


interface Values {
  email: string;
  password: string;
}

// const { mutate: deleteApprovalGroupMutate, isLoading: isDeleteLoading } = useMutation('login', login, {
//   onSuccess: () => {
//     // Invalidate and refetch
//     // queryClient.invalidateQueries({ queryKey: ['todos'] })
//     // return ""
//   },
// })



// const { mutate: deleteApprovalGroupMutate, isLoading: isDeleteLoading } = useMutation('deleteApprovalGroups', deleteApprovalGroup, {
//   onSuccess: () => {
//     toast.success('Approval policy deleted successfully!');
//     props?.refetchApprovalGroups();
//   },
// })

const Signin = () => {
  const router = useRouter()
  const storeAuthToken = useAuthStore((state: any) => state.storeAuthToken)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


  const { mutate: loginMutate, isLoading: isLoading } = useMutation('ab', login, {
    onSuccess: (response: any) => {
      const { data } = response
      storeAuthToken(data?.accessToken)
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
