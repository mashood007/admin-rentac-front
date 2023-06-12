import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import PageHeader from '@/content/Management/Transactions/PageHeader';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from '@/components/Footer';

// import RecentOrders from '@/content/Management/Transactions/RecentOrders';
import CarTable from './table';
import { useQuery } from 'react-query';
import { getCars } from '@/api/cars';

const Cars = () => {

  const { data: carsData, isLoading, refetch } = useQuery(["cars"], () => {
    const params = {
      limit: 1000,
    }
    return getCars(params)
  })

  return (
    <>
      <Head>
        <title>Cars</title>
      </Head>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <CarTable cars={carsData?.cars} />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

Cars.getLayout = (page) => (
  <SidebarLayout>{page}</SidebarLayout>
);

export default Cars;
