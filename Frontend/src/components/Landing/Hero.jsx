//jahnavi
import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  Button,
  HStack,
  VStack,
  Center,
  Image,
  // useBreakpointValue,
  Wrap,
  WrapItem,
  Avatar,
  AvatarGroup,
  Stack,
  For,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  // const isMobile = useBreakpointValue({ base: true, lg: false })
  const navigate = useNavigate();
  const items = [
    {
      name: "Happy",
      src: "",
      emoji: "😊",
      bgColor: "blue.100",
      textColor: "blue.500",
    },
    {
      name: "Mind",
      src: "",
      emoji: "🧠",
      bgColor: "teal.100",
      textColor: "teal.500",
    },
    {
      name: "Thought",
      src: "",
      emoji: "💭",
      bgColor: "green.100",
      textColor: "green.500",
    },
  ];
  const PartnerItems = [
    { name: "Partner 1" },
    { name: "Partner 2" },
    { name: "Partner 3" },
    { name: "Partner 4" },
  ];
  return (
    <Box
      as="section"
      id="home"
      position="relative"
      py={{ base: "20", md: "32" }}
      px="6"
      overflow="hidden"
      css={{
        backgroundImage:
          "linear-gradient(to bottom right, #eff6ff, #f0fdf4)",
      }}
    >
      {/* Decorative background elements */}
      <Box
        position="absolute"
        top="0"
        left="0"
        w="full"
        h="full"
        overflow="hidden"
      >
        <Box
          position="absolute"
          top="20"
          left="10"
          w="64"
          h="64"
          borderRadius="full"
          bg="blue.100"
          opacity="0.4"
          filter="blur(60px)"
        />
        <Box
          position="absolute"
          bottom="20"
          right="10"
          w="80"
          h="80"
          borderRadius="full"
          bg="green.100"
          opacity="0.4"
          filter="blur(60px)"
        />
        <Box
          position="absolute"
          top="40"
          right="40"
          w="40"
          h="40"
          borderRadius="full"
          bg="teal.100"
          opacity="0.3"
          filter="blur(30px)"
        />
      </Box>

      <Container maxW="6xl" position="relative" zIndex="10">
        <Flex
          direction={{ base: "column", lg: "row" }}
          align="center"
          justify="space-between"
          gap="12"
        >
          {/* Content Column */}
          <Box
            w={{ base: "full", lg: "1/2" }}
            textAlign={{ base: "center", lg: "left" }}
          >
            <Heading
              as="h1"
              fontSize={{ base: "4xl", md: "5xl" }}
              fontWeight="bold"
              color="gray.800"
              mb="6"
              css={{ "line-height": "normal" }}
            >
              Your Mental Health Companion
            </Heading>
            <Text
              fontSize="lg"
              color="gray.600"
              mb="8"
              maxW="lg"
              mx={{ base: "auto", lg: "0" }}
            >
              MindCare is here to provide supportive conversations, resources,
              and guidance whenever you need someone to talk to.
            </Text>
            <Flex
              direction={{ base: "column", sm: "row" }}
              justify={{ base: "center", lg: "flex-start" }}
              gap="4"
            >
              <Button
                as="a"
                href="#chat"
                bg="teal.500"
                color="white"
                fontWeight="semibold"
                py="3"
                px="8"
                borderRadius="full"
                _hover={{
                  bg: "teal.600",
                  shadow: "xl",
                  transform: "translateY(-4px)",
                }}
                transition="all 0.3s"
                shadow="lg"
                onClick={() => navigate("/Companion")}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Talk to MindCare
              </Button>
              <Button
                as="a"
                href="#howitworks"
                bg="white"
                color="teal.600"
                fontWeight="semibold"
                py="3"
                px="8"
                borderRadius="full"
                _hover={{ bg: "gray.100", shadow: "lg" }}
                transition="all 0.3s"
                shadow="md"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Learn More
              </Button>
            </Flex>
            <Flex
              mt="12"
              align="center"
              justify={{ base: "center", lg: "flex-start" }}
            >
              <AvatarGroup size="lg" stacking="last-on-top">
                {items.map((item) => (
                  <Avatar.Root key={item.name} bg={item.bgColor}>
                    <Avatar.Fallback name={item.name}>
                      <Text fontSize="sm" color={item.textColor}>
                        {item.emoji}
                      </Text>
                    </Avatar.Fallback>
                    {item.src && <Avatar.Image src={item.src} />}
                  </Avatar.Root>
                ))}
              </AvatarGroup>
              <Text ml="4" color="gray.600" fontSize="sm">
                <Text as="span" fontWeight="bold">
                  1000+
                </Text>{" "}
                conversations daily
              </Text>
            </Flex>
          </Box>

          {/* Illustration Column */}
          <Box
            w={{ base: "full", lg: "1/2" }}
            display="flex"
            justifyContent="center"
          >
            <Box position="relative">
              <Box
                w={{ base: "72", md: "96" }}
                h={{ base: "72", md: "96" }}
                bg="white"
                borderRadius="2xl"
                shadow="xl"
                p="6"
                display="flex"
                alignItems="center"
                justifyContent="center"
                overflow="hidden"
              >
                <Image
                  src="https://placehold.co/600x600?text=Friendly AI mental health chatbot illustration"
                  alt="Friendly AI mental health chatbot illustration"
                  w="full"
                  h="auto"
                  borderRadius="lg"
                  fallbackSrc="https://placehold.co/500x500"
                />
              </Box>

              {/* Chat bubbles */}
              <Box
                position="absolute"
                top="-10"
                left="-12"
                bg="white"
                p="4"
                borderRadius="xl"
                shadow="md"
              >
                <Text fontSize="sm" color="gray.800">
                  How are you feeling today?
                </Text>
              </Box>

              <Box
                position="absolute"
                bottom="-8"
                right="-12"
                bg="teal.500"
                p="4"
                borderRadius="xl"
                shadow="md"
              >
                <Text fontSize="sm" color="white">
                  I'm here to listen and help.
                </Text>
              </Box>

              {/* Pulsing circle */}
              <Box position="absolute" bottom="4" right="4" h="6" w="6">
                <a href="/Companion">
                  <Box
                    position="absolute"
                    borderRadius="full"
                    h="full"
                    w="full"
                    bg="teal.400"
                    opacity="0.75"
                    css={{
                      animation: "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",
                    }}
                  />
                  <Box
                    position="relative"
                    borderRadius="full"
                    h="6"
                    w="6"
                    bg="teal.500"
                  />
                </a>
              </Box>
            </Box>
          </Box>
        </Flex>

        {/* Trust indicators */}
        <VStack mt="16" gap="6">
          <Text color="gray.500">
            Trusted by healthcare professionals worldwide
          </Text>
          <Wrap justify="center" gap="8">
            <For each={PartnerItems}>
              {(item, index) => (
                <WrapItem>
                  <Center
                    w="24"
                    h="12"
                    bg="gray.200"
                    borderRadius="md"
                    opacity="0.7"
                    key={index}
                  >
                    <Text color="gray.600" fontWeight="semibold">
                      {item.name}
                    </Text>
                  </Center>
                </WrapItem>
              )}
            </For>
          </Wrap>
        </VStack>
      </Container>

      {/* Add keyframes for ping animation */}
      <style jsx global>{`
        @keyframes ping {
          75%,
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }
      `}</style>
    </Box>
  );
};

export default Hero;
