import type { NextPage } from 'next'
import { useState, useEffect, useCallback } from 'react'
import { Box, Grid, GridItem, Text, Avatar, HStack, Input, Textarea, Button, Link, Tag, TagLabel } from "@chakra-ui/react"
import { ArrowForwardIcon } from '@chakra-ui/icons'
import { useRouter } from 'next/router'
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'
import axios from 'axios'
import useSWR, { useSWRConfig } from 'swr'
import { User } from "../../model/userModel"
import {Post} from "../../model/postModel"

const postCommentUri = "https://fswd-wp.devnss.com/wp-json/wp/v2/comments"
const userUri = 'https://fswd-wp.devnss.com/wp-json/wp/v2/users/'
const tagUri = 'https://fswd-wp.devnss.com/wp-json/wp/v2/tags/'
const categorieUri = 'https://fswd-wp.devnss.com/wp-json/wp/v2/categories/'

const PostContent: NextPage<{ post: Post }> = ({ post }) => {

    const { mutate } = useSWRConfig()
    const router = useRouter()
    const { id } = router.query
    const [tags, setTags] = useState<any>([])
    const [categories, setSategories] = useState<any>([])
    const [name, setName] = useState<string>("")
    const [comment, setComment] = useState<string>("")
    const [publisher, setPublisher] = useState<User>()

    const tagColorHover = '#B5DEFF'
    const categoriesColor = 'gray.500'

    const fetcher = (url: string) => axios.get(url).then(res => res.data.reverse())
    const { data, error } = useSWR(
        `https://fswd-wp.devnss.com/wp-json/wp/v2/comments?post=${id}`,
        fetcher
    );

    const getTags = useCallback(async () => {
        let result: any = await Promise.all(post.tags.map(async (tag: any) => {
            let result = await axios.get(tagUri + tag)
            return result.data
        }))
        setTags(result)
    }, [post.tags])

    const getCategory = useCallback(async () => {
        let result: any = await Promise.all(post.categories.map(async (categorie: any) => {
            let result = await axios.get(categorieUri + categorie)
            return result.data
        }))
        setSategories(result)
    }, [post.categories])

    const getAuthor = useCallback(async () => {
        let result = await axios.get(userUri + post.author)
        setPublisher(result.data)
    }, [post.author])

    useEffect(() => {
        getTags()
        getCategory()
        getAuthor()
    }, [getTags, getCategory, getAuthor])

    if (!data) {
        return (<></>)
    }

    const postComment = async () => {
        const body = {
            author_name: name,
            content: comment,
            post: id
        }
        try {
            await axios.post(postCommentUri, body, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ZnN3ZDpmc3dkLWNtcw=='
                }
            })

            mutate(`https://fswd-wp.devnss.com/wp-json/wp/v2/comments?post=${id}`)
            setName("")
            setComment("")
        } catch (err: any) {
            console.log(err.response.data)
        }

    }
    return (
        <Box mx={'10%'} bg='#ecebeb' p={5} h={'100%'}>
            <Text fontSize={46} fontWeight='bold' textAlign='center'>{post.title.rendered}</Text>
            {
                publisher && <Text fontSize={24} textAlign='center'>published by <Link
                    // textDecoration={'underline'}
                    fontSize={24}
                    href={`/author/${publisher.id}`}
                    _hover={{
                        color: '#1572A1',
                        textDecoration: 'underline'
                    }}
                    key={publisher.name}
                    mr={2}
                >{publisher.name}</Link>
                </Text>
            }

            <Box
                mt={5}
                mx={'10%'}
                justifyContent={'center'}
                fontSize={22}
                dangerouslySetInnerHTML={{
                    __html: post.content.rendered
                }}>

            </Box>
            <HStack mx={'7%'} mt={5}>
                <Text fontSize={20}>Tags :</Text>
                {
                    tags.map((tag: any) => {
                        return (
                            <Link key={tag.name} href={`/tag/${tag.name}`} _focus={{}}>
                                <Tag
                                    size={'lg'}
                                    variant='solid'
                                    color={'#5ba4a4'}
                                    bg='#d5dfdf'
                                    cursor={'pointer'}
                                >
                                    <TagLabel>{tag.name}</TagLabel>
                                </Tag>
                            </Link>
                        )
                    })
                }
            </HStack>

            <HStack mx={'7%'} mt={5}>
            <Text fontSize={20}>Categories :</Text>
                {categories.map((categorie: any) => {
                    return (
                        <Link
                            href={`/category/${categorie.name}`}
                            color={categoriesColor}
                            textDecoration={'underline'}
                            fontSize={18}
                            // onClick={() => setSearch(tag)}
                            _hover={{
                                color: tagColorHover
                            }}
                            key={categorie.name}
                            mr={2}
                            _focus={{}}
                        >
                            {categorie.name}
                        </Link>
                    )
                })}
            </HStack>
            <Box mx={'5%'} my={'2%'}>
                <Text fontSize={30} fontWeight="bold">Comments</Text>
                {
                    data.map((comment: any) => {
                        return (
                            <Box

                                borderRadius={10}
                                p={3}
                                // position={'relative'}
                                bg={'snow'}
                                boxShadow={'rgba(0, 0, 0, 0.35) 0px 5px 15px;'}
                                mt={5}
                                display={'flex'}
                                flexDirection={'column'}
                                key={comment.id}
                            >
                                <HStack>
                                    <Avatar boxSize={7} />
                                    <Text fontSize={18}>{comment.author_name}</Text>
                                </HStack>
                                <Box
                                    color={'#8E7F7F'}
                                    dangerouslySetInnerHTML={{
                                        __html: comment.content.rendered
                                    }}
                                    m={4}
                                    fontSize={18}
                                />
                                <Text
                                    justifyContent={'flex-end'}
                                    mt={'auto'}
                                    color={'#C8C2BC'}
                                >
                                    {new Date(comment.date).toUTCString()}
                                </Text>
                            </Box>
                        )
                    })
                }
                <Box

                    borderRadius={10}
                    p={3}
                    bg={'snow'}
                    boxShadow={'rgba(0, 0, 0, 0.35) 0px 5px 15px;'}
                    mt={7}
                    display={'flex'}
                    flexDirection={'column'}
                >
                    <Text fontSize={28} fontWeight="bold">
                        Add your comment
                    </Text>

                    <Box p={2}>
                        <Text fontSize={22} mt={2}>Name</Text>
                        <Input
                            variant='outline'
                            placeholder='Name'
                            value={name}
                            borderColor={'#41444B'}
                            bg={'snow'}
                            minW={'20%'}
                            h={10}
                            mt={3}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                        // boxShadow={'rgba(0, 0, 0, 0.35) 0px 2px 10px;'}
                        />
                        <Text fontSize={22} mt={4}>Comment</Text>
                        <Textarea
                            borderColor={'#41444B'}
                            bg={'snow'}
                            my={3}
                            size={'lg'}
                            h={100}
                            value={comment}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setComment(e.target.value)}
                            placeholder='add your comment here ...'
                        />
                        <Button
                            minW={'8%'}
                            rightIcon={<ArrowForwardIcon />}
                            bg={'#2D46B9'}
                            color={'snow'}
                            borderRadius={7}
                            mt={2}
                            variant='outline'
                            _hover={{
                                backgroundColor: '#5D6EC7'
                            }}
                            onClick={() => postComment()}
                        >
                            Comment
                        </Button>
                    </Box>
                </Box>
            </Box>


        </Box>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.query;
    const res = await axios.get(`https://fswd-wp.devnss.com/wp-json/wp/v2/posts/${id}`)
    let result = await axios.get(userUri + res.data.author)


    return {
        props: {
            post: res.data,
            publisher: result.data
        },
    }
}

export default PostContent
