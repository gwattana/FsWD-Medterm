import type { NextPage } from 'next'
import ContentCard from "../../components/Card/ContentCard"
import { Box, Grid, GridItem, Center, Text, Icon, HStack } from "@chakra-ui/react"
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'
import axios from "axios"
import { AiFillTag } from "react-icons/ai";

const Category: NextPage<{ posts: any, category: any }> = ({ posts, category }) => {
    return (
        <Box mx={'5%'} mb={10}>
            <Center alignContent={'center'}>
                <Box boxShadow={'rgba(0, 0, 0, 0.35) 0px 5px 15px;'} w={'20%'} h={20}>
                    <Center h={'100%'}>
                        <HStack>
                            <Icon as={AiFillTag} boxSize={6} />
                            <Text fontSize={24}> Category : {category.name}</Text>
                        </HStack>
                    </Center>
                </Box>
            </Center>

            <Grid templateColumns={['repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(2, 1fr)', 'repeat(2, 1fr)']}>
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


export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.query;
    const categories = await axios.get(`https://fswd-wp.devnss.com/wp-json/wp/v2/categories`)
    const category = categories.data.filter((c: any) => c.name === id)
    const res = await axios.get(`https://fswd-wp.devnss.com/wp-json/wp/v2/posts?categories=${category[0].id}`)
    return {
        props: {
            posts: res.data,
            category: category[0]
        },
    }
}
export default Category
