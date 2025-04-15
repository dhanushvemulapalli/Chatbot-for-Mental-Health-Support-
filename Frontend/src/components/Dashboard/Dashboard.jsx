import {
  Box,
  Grid,
  GridItem,
  Flex,
  Text,
  Heading,
  Button,
  Image,
  Link,
  Tag,
  Center,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import {
  BsSun,
  BsMoon,
  BsChatDots,
  BsBookmarkStar,
  BsBarChart,
} from "react-icons/bs";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [quote, setQuote] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/api/quote")
      .then((res) => res.json())
      .then((data) => {
        console.log(data[0].q); // Quote text
        console.log(data[0].a); // Author
        setQuote(data[0]);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Center h="300px">
        <Spinner size="lg" />
      </Center>
    );
  }
  return (
    <>
      <Flex>
        <Sidebar />
        <Box
          as="section"
          id="dashboard"
          p={{ base: 6, md: 8, lg: 10 }}
          w={"-webkit-fill-available"}
        >
          <Grid
            templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
            gap={{ base: 6, lg: 8 }}
          >
            {/* Welcome Section */}
            <Box
              bg="white"
              borderRadius="2xl"
              p={6}
              shadow="sm"
              border="1px solid"
              borderColor="#C9E4CA4D"
            >
              <Flex justify="space-between" align="center" mb={6}>
                <Heading size="lg" color="#2C3E50">
                  Welcome, John
                </Heading>
              </Flex>

              <Box mb={6}>
                <Text color="#2C3E50">Your mood this week:</Text>
                <Flex mt={1} gap={1} fontSize="2xl">
                  <Text>😊</Text>
                  <Text>😌</Text>
                  <Text>😐</Text>
                  <Text>😌</Text>
                  <Text>😊</Text>
                </Flex>
              </Box>

              <Text color="#2C3E50">How are you feeling today?</Text>
              <Flex wrap="wrap" gap={2} mt={3}>
                {[
                  "😊 Happy",
                  "😌 Calm",
                  "😐 Neutral",
                  "😔 Sad",
                  "😣 Stressed",
                ].map((label) => (
                  <Button
                    key={label}
                    rounded="full"
                    bg="#E6F4F1"
                    color="#2C3E50"
                    _hover={{ bg: "#C9E4CA" }}
                  >
                    {label}
                  </Button>
                ))}
              </Flex>
              <Box
                position="relative"
                w="full"
                rounded="xl"
                overflow="hidden"
              >
                <Image
                  src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2MzQ2fDB8MXxzZWFyY2h8MXx8bWFpbiUyMHZpZXclMjBmZWF0dXJlZCUyMGltYWdlJTIwcHJvZmVzc2lvbmFsJTIwaGlnaCUyMHF1YWxpdHklMjBmZWF0dXJlZHxlbnwwfDB8fHwxNzQzMTU5NDUyfDA&ixlib=rb-4.0.3&q=80&w=1080?q=80"
                  fallbackSrc="https://placehold.co/600x400?text=Find+Your+Balance"
                  alt="Motivational background"
                  mt={6}
                  rounded="lg"
                  objectFit="cover"
                  h="12rem"
                  w="full"
                  filter="brightness(0.6)"
                />
                {/* Quote Overlay */}
                <VStack
                  position="absolute"
                  top="0"
                  left="0"
                  w="full"
                  h="full"
                  justify="center"
                  align="center"
                  px={6}
                  textAlign="center"
                  color="white"
                  zIndex="1"
                >
                  <Text fontSize="xl" fontWeight="bold">
                    “{quote.q}”
                  </Text>
                  <Text fontSize="md" opacity={0.8}>
                    — {quote.a}
                  </Text>
                </VStack>
              </Box>
            </Box>

            {/* Interaction Cards */}
            <Grid gap={4}>
              {[
                {
                  icon: <BsChatDots size={28} color="#2C3E50" />,
                  bg: "#E6F4F1",
                  title: "Chat with MindCare",
                  text: "Talk about your feelings and get support",
                  link: "#chat",
                  btnBg: "#C9E4CA",
                  hoverBg: "#B8D5B9",
                },
                {
                  icon: <BsBookmarkStar size={28} color="#2C3E50" />,
                  bg: "#FFD8D8",
                  title: "Self-Help Exercises",
                  text: "Browse activities for mental wellness",
                  link: "#resources",
                  btnBg: "#FFD8D8",
                  hoverBg: "#FFCACA",
                },
                {
                  icon: <BsBarChart size={28} color="#2C3E50" />,
                  bg: "#E6F4F1",
                  title: "Mood Insights",
                  text: "Track your emotional patterns",
                  link: "#insights",
                  btnBg: "#E6F4F1",
                  hoverBg: "#D5E3E0",
                },
              ].map(({ icon, bg, title, text, link, btnBg, hoverBg }) => (
                <Box
                  key={title}
                  bg="white"
                  borderRadius="2xl"
                  p={6}
                  shadow="sm"
                  border="1px solid"
                  borderColor="#C9E4CA4D"
                  _hover={{ transform: "translateY(-2px)" }}
                  transition="all 0.2s"
                >
                  <Flex align="center" mb={4}>
                    <Flex
                      w={12}
                      h={12}
                      rounded="full"
                      bg={bg}
                      align="center"
                      justify="center"
                      shadow="sm"
                      mr={4}
                    >
                      {icon}
                    </Flex>
                    <Box>
                      <Heading size="md" color="#2C3E50">
                        {title}
                      </Heading>
                      <Text color="#2C3E50A0">{text}</Text>
                    </Box>
                  </Flex>
                  <Link href={link}>
                    <Button
                      w="full"
                      bg={btnBg}
                      _hover={{ bg: hoverBg }}
                      color="#2C3E50"
                      rounded="lg"
                      fontWeight="medium"
                    >
                      {title.includes("Chat")
                        ? "Start Chatting"
                        : title.includes("Self")
                        ? "Explore Resources"
                        : "View Insights"}
                    </Button>
                  </Link>
                </Box>
              ))}
            </Grid>
          </Grid>
        </Box>
      </Flex>
    </>
  );
}
