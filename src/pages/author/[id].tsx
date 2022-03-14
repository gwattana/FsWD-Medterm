import type { NextPage } from 'next'
import { Box, Grid, GridItem, Center, Text, Icon, HStack, Avatar } from "@chakra-ui/react"
import { useRouter } from 'next/router'
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'
import axios from 'axios'
import { User } from "../../model/userModel"
import ContentCard from "../../components/Card/ContentCard"
import { LinkIcon } from '@chakra-ui/icons'
import { HiUser } from "react-icons/hi";
const AuthorPage: NextPage<{ author: User, posts: any }> = ({ author, posts }) => {
    return (
        <Box mx={'10%'} p={5}>
            <Center alignContent={'center'}>
                <Box boxShadow={'rgba(0, 0, 0, 0.35) 0px 5px 15px;'} minW={200} w={'25%'} h={40} p={2}>
                    <Center h={'50%'}>
                        <Icon as={HiUser} boxSize={6} />
                        <Text fontSize={24} ml={2} mt={1}>Author </Text>
                    </Center>
                    <Center>
                        <Avatar boxSize={10} name='Author Image' src={author.avatar_urls[96]} />
                        <Text fontSize={26} noOfLines={1} ml={4} fontWeight="bold">
                            {author.name}
                        </Text>
                    </Center>
                </Box>
            </Center>

            {
                posts.map((post: any) => {
                    return (
                        <GridItem key={post.id}>
                            <ContentCard post={post} ></ContentCard>
                        </GridItem>
                    )
                })
            }

        </Box>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.query;
    const res = await axios.get(`https://fswd-wp.devnss.com/wp-json/wp/v2/users/${id}`)
    const posts = await axios.get(`https://fswd-wp.devnss.com/wp-json/wp/v2/posts?author=1`)
    return {
        props: {
            author: res.data,
            posts: posts.data
        },
    }
}

export default AuthorPage
