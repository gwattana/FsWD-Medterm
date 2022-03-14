import type { NextPage } from 'next'
import ContentCard from "../components/Card/ContentCard"
import { Box, Grid, GridItem } from "@chakra-ui/react"
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'
import axios from "axios"
const Home: NextPage<{ posts: any }> = ({ posts }) => {
  return (
    <Box mx={'5%'} mb={10}>
      <Grid templateColumns={['repeat(1, 1fr)','repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(2, 1fr)','repeat(2, 1fr)','repeat(2, 1fr)']}>
        {
          posts.map((post: any) => {
            return (
              <GridItem key={post.id}>
                <ContentCard post={post} ></ContentCard>
              </GridItem>
            )
          })
        }
      </Grid>
    </Box>
  )
}


export const getServerSideProps: GetServerSideProps = async () => {
  const res = await axios.get(`https://fswd-wp.devnss.com/wp-json/wp/v2/posts`)
  return {
    props: {
      posts: res.data
    },
  }
}
export default Home
