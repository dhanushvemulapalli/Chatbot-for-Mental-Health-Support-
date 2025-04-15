import {
  Box,
  Text,
  Heading,
  Flex,
  Grid,
  Button,
  Image,
  VStack,
  Icon,
  HStack,
  Accordion,
  Container,
} from "@chakra-ui/react";
import { IoMdCheckmark } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export default function HowItWorks() {
  const navigate = useNavigate();
  const faq = [
    {
      question: "Is MindCare a replacement for therapy?",
      answer:
        "No, MindCare is a supportive tool but not a substitute for professional mental health treatment. We recommend professional help when needed.",
    },
    {
      question: "How is my data kept private?",
      answer:
        "Your conversations are encrypted. We don't store personally identifiable information and never sell your data.",
    },
    {
      question: "Can I access MindCare on any device?",
      answer:
        "Yes! MindCare works on smartphones, tablets, and desktops. History syncs when you create an account.",
    },
  ];
  return (
    <Box
      as="section"
      id="howitworks"
      py="20"
      css={{
        backgroundImage: "linear-gradient(to bottom right, #ebf8ff, #f0fff4)",
      }}
      px="6"
    >
      <Container maxW="6xl" mx="auto">
        {/* Section Header */}
        <Box textAlign="center" mb="16">
          <Heading
            as="h2"
            fontSize={{ base: "3xl", md: "4xl" }}
            fontWeight="bold"
            color="gray.800"
            mb="4"
          >
            How MindCare Works
          </Heading>
          <Text color="gray.600" maxW="2xl" mx="auto">
            Simple, intuitive, and designed with your mental wellness in mind.
          </Text>
        </Box>

        {/* Steps */}
        <Grid
          templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
          gap={8}
          mb={16}
        >
          {[
            {
              step: "1",
              bgColor: "blue.100",
              textColor: "blue.600",
              title: "Connect with MindCare",
              description:
                "Start a conversation anytime through our secure chat interface. No registration required.",
            },
            {
              step: "2",
              bgColor: "teal.100",
              textColor: "teal.600",
              title: "Share Your Thoughts",
              description:
                "Tell MindCare what's on your mind or use quick response buttons to express your feelings.",
            },
            {
              step: "3",
              bgColor: "green.100",
              textColor: "green.600",
              title: "Receive Support",
              description:
                "Get personalized responses, coping strategies, and resources tailored to your needs.",
            },
          ].map(({ step, bgColor, textColor, title, description }, index) => (
            <Box
              key={index}
              bg="white"
              rounded="2xl"
              shadow="md"
              p={8}
              transition="transform 0.3s"
              _hover={{ transform: "translateY(-8px)" }}
            >
              <Flex
                bg={bgColor}
                w={16}
                h={16}
                rounded="full"
                align="center"
                justify="center"
                mb={6}
                mx="auto"
              >
                <Text fontSize="2xl" fontWeight="bold" color={textColor}>
                  {step}
                </Text>
              </Flex>
              <Heading
                as="h3"
                fontSize="xl"
                fontWeight="bold"
                color="gray.800"
                mb={4}
                textAlign="center"
              >
                {title}
              </Heading>
              <Text color="gray.600" textAlign="center">
                {description}
              </Text>
            </Box>
          ))}
        </Grid>

        {/* Interactive Chat Experience */}
        <Box bg="white" rounded="2xl" shadow="lg" overflow="hidden">
          <Flex direction={{ base: "column", md: "row" }}>
            {/* Left Content */}
            <Box p={{ base: 8, md: 12 }} flexBasis={{ md: "50%" }}>
              <Heading
                as="h3"
                fontSize="2xl"
                fontWeight="bold"
                color="gray.800"
                mb={6}
              >
                Interactive Chat Experience
              </Heading>
              <VStack gap={4} alignItems={"flex-start"}>
                {[
                  "Natural conversation with AI trained on therapeutic techniques",
                  "Mood tracking to monitor your emotional wellbeing over time",
                  "Guided exercises for anxiety, stress, and mindfulness",
                  "Resource recommendations based on your conversation",
                ].map((item, index) => (
                  <HStack key={index} alignItems={"flex-start"} w={"11/12"}>
                    <Icon
                      as={IoMdCheckmark}
                      color="teal.500"
                      size={"md"}
                      mr={"1"}
                    />
                    <Text color="gray.600">{item}</Text>
                  </HStack>
                ))}
              </VStack>
              <Button
                mt={8}
                bgColor="teal.500"
                _hover={{ bgColor: "teal.600" }}
                colorScheme="teal"
                color="white"
                fontWeight="semibold"
                py={3}
                px={8}
                rounded="full"
                onClick={() => navigate("/Companion")}
              >
                Try It Now
              </Button>
            </Box>

            {/* Right Image */}
            <Flex
              flexBasis={{ md: "50%" }}
              bgColor="gray.50"
              p={4}
              alignItems="center"
              justifyContent="center"
              h="auto"
              overflow="hidden"
            >
              <Image
                src="https://placehold.co/600x400?text=MindCare chat interface demonstration"
                alt="MindCare chat interface demonstration"
                rounded="xl"
                shadow="md"
                maxW="85%"
                maxH="85%"
                objectFit="contain"
                fallbackSrc="https://placehold.co/600x400"
              />
            </Flex>
          </Flex>
        </Box>

        {/* FAQ Section */}
        <VStack mt={20}>
          {/* FAQ Header */}
          <Box textAlign="center" mb={12}>
            <Heading
              as="h3"
              fontSize="2xl"
              fontWeight="bold"
              color="gray.800"
              mb={4}
            >
              FAQ
            </Heading>
            <Text color="gray.600">Common questions about MindCare</Text>
          </Box>

          {/* FAQ Items */}
          <Accordion.Root multiple variant={"plain"} w={"10/12"}>
            {faq.map(({ question, answer }, i) => (
              <Accordion.Item key={i} mb={4} value={i}>
                <Accordion.ItemTrigger
                  // _expanded={{ bg: "teal.100", color: "teal.800" }}
                  px={4}
                  py={3}
                  borderRadius="md"
                  boxShadow="sm"
                  bg={"white"}
                >
                  <Box flex="1" textAlign="left" fontWeight="semibold">
                    {question}
                  </Box>
                  <Accordion.ItemIndicator />
                </Accordion.ItemTrigger>
                <Accordion.ItemContent>
                  <Accordion.ItemBody px={4} py={3}>
                    {answer}
                  </Accordion.ItemBody>
                </Accordion.ItemContent>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </VStack>
      </Container>
    </Box>
  );
}
