import { ReactNode } from 'react';
import type { NextPage } from 'next'
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

const Links = ['Dashboard', 'Projects', 'Team'];

const NavLink = ({ title, link, fontSize }: { title: string, link: string, fontSize: number }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    fontSize={fontSize}
    alignSelf={'flex-end'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    _focus={{}}
    href={link}>
    {title}
  </Link>
);

const Navbar: NextPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <Box px={4} mt={3}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <NavLink title={'Home'} link={'/'} fontSize={40} ></NavLink>
          <Flex alignItems={'center'}>
            {/* <IconButton aria-label='Search database' isRound size={'lg'} onClick={toggleColorMode}
              icon={
                colorMode === 'light' ? <MoonIcon boxSize={6} /> : <SunIcon boxSize={6} />
              }
            /> */}
          </Flex>
        </Flex>
      </Box>
    </>
  );
}

export default Navbar