import type { NextPage } from 'next'
import {
  Box,
  Grid,
  GridItem,
  Text,
  Avatar,
  AvatarBadge,
  AvatarGroup,
  HStack,
  Link,
  useColorModeValue,
  Tag,
  TagLabel,
  TagLeftIcon,
  TagRightIcon,
  TagCloseButton,
  Flex,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  VisuallyHidden
} from '@chakra-ui/react'
import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import useSWR from "swr";
import { User } from "../../model/userModel"
const tagUri = 'https://fswd-wp.devnss.com/wp-json/wp/v2/tags/'
const categorieUri = 'https://fswd-wp.devnss.com/wp-json/wp/v2/categories/'
const userUri = 'https://fswd-wp.devnss.com/wp-json/wp/v2/users/'

const ContentCard: NextPage<{ post: any }> = ({ post }) => {
  const [tags, setTags] = useState<any>([])
  const [categories, setSategories] = useState<any>([])
  const [author, setAuthor] = useState<User>()

  const tagColorHover = useColorModeValue('#B5DEFF', '#F0D9FF')
  const categoriesColor = useColorModeValue('gray.500', '#BBBBBB')

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
    setAuthor(result.data)
  }, [post.author])

  useEffect(() => {
    getTags()
    getCategory()
    getAuthor()
  }, [getTags, getCategory, getAuthor])

  return (
    <Box
      height={200}
      mx={['0%', '5%', '5%']}
      borderRadius={10}
      // position={'relative'}
      boxShadow={'rgba(0, 0, 0, 0.35) 0px 5px 15px;'}
      mt={10}
      display={'flex'}
      flexDirection={'column'}
      bg={'#f1eae5'}
    >
      <Grid templateColumns='repeat(3, 1fr)' h={'100%'}>
        <GridItem colSpan={2}>
          <Box p={5}>
            <HStack>
              {
                author ?
                  <>
                    {/* <Avatar boxSize={9} name='Prosper Otemuyiwa' src={author.avatar_urls[96]} /> */}
                    {/* <Text fontSize={20} noOfLines={1}>{author.name}</Text> */}
                    <Link
                      href={`/author/${author.id}`}
                      _focus={{}}
                    >
                      <Avatar boxSize={9} name='Author Image' src={author.avatar_urls[96]} />
                    </Link>
                    <Link
                      color={categoriesColor}
                      // textDecoration={'underline'}
                      fontSize={20}
                      href={`/author/${author.id}`}
                      _hover={{
                        color: tagColorHover,
                        textDecoration: 'underline'
                      }}
                      key={author.name}
                      mr={2}
                      noOfLines={1}
                      _focus={{}}
                    >
                      {author.name}
                    </Link>
                  </>
                  :
                  <>
                    <SkeletonCircle size='9' />
                    {/* <Skeleton /> */}
                  </>
              }
            </HStack>
            <Link
              fontSize={24}
              fontWeight={'bold'}
              fontFamily={'Prompt'}
              href={`/content/${post.id}`}
              _hover={{
                color: useColorModeValue('#BBBBBB', '#BBBBBB')
              }}
              _focus={{
                boxShadow: 'none'
              }}
              noOfLines={1}
            >
              {post.title.rendered}
            </Link>
            <Box
              noOfLines={4}
              overflow={'hidden'}
              dangerouslySetInnerHTML={{
                __html: post.excerpt.rendered
              }}
            ></Box>
          </Box>
        </GridItem>
        <GridItem colSpan={1}>
          <Grid templateRows='repeat(2, 1fr)' h={'100%'}>
            <GridItem rowSpan={1} alignSelf={'center'}>
              <Text fontSize={20}>Category</Text>
              <Flex flexWrap="wrap" alignItems="center" marginTop="0.5rem">
                {
                  !categories.length ?
                    <>
                      <Skeleton>Hold</Skeleton>
                    </>
                    :
                    categories.map((categorie: any) => {
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
                    })
                }
              </Flex>
            </GridItem>
            <GridItem rowSpan={1}>
              <Text fontSize={20} pb={3}>Tags</Text>
              <HStack>
                {
                  tags.map((tag: any) => {
                    return (
                      <Link key={tag.name} href={`/tag/${tag.name}`} _focus={{}}>
                        <Tag
                          size={'md'}
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
            </GridItem>
          </Grid>
        </GridItem>
      </Grid>
    </Box >
  )
}

export default ContentCard
