import {
  Box,
  Flex,
  Text,
  Link,
  Button,
  IconButton,
  VStack,
  HStack,
} from "@chakra-ui/react";
import Head from "next/head";
import { RxHamburgerMenu } from "react-icons/rx";
const Navbar = () => {
  const links = ["Home", "About", "How It Works", "Features","Companion", "Resources"];

  return (
    <Box
      bg="white"
      py={3}
      px={6}
      shadow="md"
      position="fixed"
      w="full"
      zIndex={50}
    >
      <Flex justify="space-between" align="center" maxW="container.xl" mx="16">
        {/* Logo */}
        <Text
          fontSize="2xl"
          fontWeight="bold"
          color="teal.600"
          fontFamily="'National Park', sans-serif"
        >
          <Link href="/" color="teal.600">
            MindCare
          </Link>
        </Text>

        {/* Desktop Nav */}
        <HStack as="ul" gap={6} display={{ base: "none", md: "flex" }}>
          {links.map((link, i) => (
            <Link
              key={i}
              href={link.toLowerCase() === "Companion" || link.toLowerCase() === "resources" ? link : `/#${link.toLowerCase().replace(/\s+/g, "")}`}
              color="gray.700"
              _hover={{ color: "teal.600" }}
              transition="color 0.3s"
            >
              {link}
            </Link>
          ))}
          <Link
            href="login"
            color="white"
            px={4}
            py={2}
            rounded={"md"}
            bg="teal.600"
            _hover={{ color: "teal.300", bg: "teal.700" }}
            transition="color 0.3s"
            fontFamily="'National Park', sans-serif"
          >
            Log In
          </Link>
        </HStack>

        {/* Auth Buttons */}
        {/* <HStack spacing={4} display={{ base: 'none', md: 'flex' }}>
            <Link
              href="#hero"
              color="gray.700"
              _hover={{ color: 'teal.600' }}
              transition="color 0.3s"
            >
              Log In
            </Link>
          </HStack> */}

        {/* Mobile Hamburger */}
        {/* <IconButton
            aria-label="Toggle Menu"
            icon={<RxHamburgerMenu />}
            display={{ base: 'flex', md: 'none' }}
            onClick={onToggle}
            variant="ghost"
            color="gray.700"
          /> */}
      </Flex>

      {/* Mobile Menu */}
      {/* {isOpen && (
          <Box
            display={{ md: 'none' }}
            bg="white"
            w="full"
            mt={4}
            pb={4}
            px={6}
          >
            <VStack align="start" spacing={4}>
              {links.map((link) => (
                <Link
                  key={link}
                  href={`#${link.toLowerCase().replace(/\s+/g, '')}`}
                  color="gray.700"
                  _hover={{ color: 'teal.600' }}
                  transition="color 0.3s"
                >
                  {link}
                </Link>
              ))}
              <Divider borderColor="gray.200" />
              <Link
                href="#hero"
                color="gray.700"
                _hover={{ color: 'teal.600' }}
                pt={2}
              >
                Log In
              </Link>
              <Button
                as={Link}
                href="#hero"
                bg="teal.600"
                color="white"
                w="full"
                textAlign="center"
                _hover={{ bg: 'teal.700' }}
                mt={2}
              >
                Sign Up
              </Button>
            </VStack>
          </Box>
        )} */}
    </Box>
  );
};

export default Navbar;
