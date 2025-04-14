import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Icon,
  VStack,
  HStack,
  Button,
  Image,
  List,
  ListItem,
  Flex,
  GridItem,
  Grid,
} from "@chakra-ui/react";
import { MdOutlineChat } from "react-icons/md";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { CiUser } from "react-icons/ci";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { SlEqualizer } from "react-icons/sl";
import { IoMdCheckmark } from "react-icons/io";
import { IoBookOutline } from "react-icons/io5";
const features = [
  {
    title: "24/7 Conversation",
    description:
      "Chat with MindCare anytime, anywhere. Get support when you need it most, without waiting.",
    icon: MdOutlineChat,
    bg: "blue",
    iconColor: "blue.600",
  },
  {
    title: "Complete Privacy",
    description:
      "End-to-end encryption keeps your conversations secure. Use anonymously with no account required.",
    icon: IoShieldCheckmarkOutline,
    bg: "teal",
    iconColor: "teal.600",
  },
  {
    title: "Personalized Approach",
    description:
      "Adaptive responses based on your unique situation. MindCare learns to better support your needs over time.",
    icon: CiUser,
    bg: "green",
    iconColor: "green.600",
  },
  {
    title: "Crisis Intervention",
    description:
      "Immediate support during difficult moments with crisis resources and emergency contact options.",
    icon: AiOutlineThunderbolt,
    bg: "purple",
    iconColor: "purple.600",
  },
  {
    title: "Mood Tracking",
    description:
      "Monitor your emotional wellbeing over time with visual mood tracking and progress insights.",
    icon: SlEqualizer,
    bg: "yellow",
    iconColor: "yellow.600",
  },
  {
    title: "Resource Library",
    description:
      "Access a curated collection of articles, exercises, and tools to support your mental health journey.",
    icon: IoBookOutline,
    bg: "red",
    iconColor: "red.600",
  },
];

export default function FeaturesSection() {
  return (
    <Box bg="white" py={20} px={6} id="features">
      <Container maxW="6xl" mx="auto">
        <VStack gap={4} textAlign="center" mb={16}>
          <Heading  size="3xl" fontWeight="bold" color="gray.800">
            Key Features
          </Heading>
          <Text color="gray.600" maxW="2xl">
            Designed with your mental wellness journey in mind.
          </Text>
        </VStack>

        <Grid templateColumns="repeat(3, 1fr)" gap={8}>
          {features.map((feature, index) => (
            <GridItem
              key={index}
              bg={`${feature.bg}.50`}
              p={8}
              rounded="2xl"
              h="full"
              transition="transform 0.3s"
              _hover={{ transform: "translateY(-8px)" }}
            >
              <Flex
                w={16}
                h={16}
                bg={`${feature.bg}.100`}
                rounded="full"
                alignItems="center"
                justifyContent="center"
                mb={5}
              >
                <Icon as={feature.icon} h={8} w={8}  color={feature.iconColor}/>
              </Flex>
              <Heading size="xl" mb={3} color="gray.800" fontWeight={"semibold"} >
                {feature.title}
              </Heading>
              <Text color="gray.600">{feature.description}</Text>
            </GridItem>
          ))}
        </Grid>

        <Box
          mt={20}
          // bgGradient="linear(to-r, blue.50, teal.50)"
          css={{
            backgroundImage:
              "linear-gradient(to bottom right, #eff6ff, #f0fdfa)",
          }}
          rounded="3xl"
          overflow="hidden"
          shadow="lg"
        >
          <SimpleGrid columns={{ base: 1, md: 2 }}>
            <Box
              p={{ base: 8, md: 12 }}
              display="flex"
              alignItems="center"
              // bg={"red.200"}
            >
              <Box>
                <Heading size="lg" mb={6} color="gray.800">
                  Interactive Chat Interface
                </Heading>
                <Text mb={6} color="gray.600">
                  Experience our intuitive chat design with quick-response
                  buttons and fluid conversations. MindCare adapts to your needs
                  with a clean, distraction-free interface.
                </Text>
                <VStack gap={3} alignItems={"flex-start"}>
                  <HStack>
                    <Icon as={IoMdCheckmark} color="teal.500" size={"md"}/>
                    Suggested responses for easier interaction
                  </HStack>
                  <HStack>
                    <Icon as={IoMdCheckmark} color="teal.500" size={"md"}/>
                    Emoji mood selector for quick expression
                  </HStack>
                  <HStack>
                    <Icon as={IoMdCheckmark} color="teal.500" size={"md"}/>
                    Typing indicators and smooth animations
                  </HStack>
                </VStack>
                <Button
                  mt={8}
                  colorScheme="teal"
                  size="lg"
                  rounded="full"
                  as="a"
                  href="#chat"
                >
                  Try the Interface
                </Button>
              </Box>
            </Box>
            <Box
              bg="white"
              p={6}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Image
                src="https://placehold.co/500x400?text=Chat interface demonstration with MindCare chatbot"
                alt="Chat interface demonstration"
                maxW="md"
                rounded="xl"
                shadow="md"
              />
            </Box>
          </SimpleGrid>
        </Box>
      </Container>
    </Box>
  );
}
