import type { NextPage } from 'next'
import ContentCard from "../../components/Card/ContentCard"
import { Box, Grid, GridItem, Center, Text, Icon, HStack } from "@chakra-ui/react"
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'
import axios from "axios"
import { AiFillTag } from "react-icons/ai";

const Tag: NextPage<{ posts: any, tag: any }> = ({ posts, tag }) => {
    return (
        <Box mx={'5%'} mb={10}>
            <Center alignContent={'center'}>
                <Box boxShadow={'rgba(0, 0, 0, 0.35) 0px 5px 15px;'} minW={'20%'} h={20} p={2}>
                    <Center h={'100%'}>
                        <HStack>
                            <Icon as={AiFillTag} boxSize={6} />
                            <Text fontSize={24}> Tag : {tag.name}</Text>
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
    const tags = await axios.get(`https://fswd-wp.devnss.com/wp-json/wp/v2/tags`)
    const tag = tags.data.filter((t: any) => t.name === id)
    const res = await axios.get(`https://fswd-wp.devnss.com/wp-json/wp/v2/posts?tags=${tag[0].id}`)
    return {
        props: {
            posts: res.data,
            tag: tag[0]
        },
    }
}
export default Tag
