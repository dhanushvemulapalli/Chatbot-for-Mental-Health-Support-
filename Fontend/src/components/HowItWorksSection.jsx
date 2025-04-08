import {
    Box,
    Container,
    Heading,
    Text,
    SimpleGrid,
    Flex,
    Circle,
    VStack,
    List,
    ListItem,
    Button,
    Image,
    Icon,
  } from '@chakra-ui/react';
  import { IoMdCheckmark } from "react-icons/io";
  
  // Assuming the parent component will handle the outer <element> tag logic if needed.
  // This component renders the content within that tag.
  const HowItWorksSection = () => {
    // Define colors based on light/dark mode if necessary, or use direct values

    const cardBg = "white";
    const textColor = 'gray.800';
    const secondaryTextColor = 'gray.600';
    const featureBg = 'gray.50';
  
    return (
      <Box
        as="section"
        id="how-it-works" // Preserve the original ID
        py={{ base: 16, md: 20 }} // Responsive padding
        css={{
            backgroundImage:
              "linear-gradient(to bottom right, var(--chakra-colors-blue-50), var(--chakra-colors-green-50))",
          }}
        px={6}
        data-section-id="682d5944-4f8d-4cf3-9998-4e032cdaaf6b" // Preserve data attribute
      >
        <Container maxW="6xl" mx="auto">
          <Box textAlign="center" mb={16}>
            <Heading
              as="h2"
              size={{ base: 'xl', md: '2xl' }} // Responsive heading size
              fontWeight="bold"
              color={textColor}
              mb={4}
            >
              How MindCare Works
            </Heading>
            <Text color={secondaryTextColor} maxW="2xl" mx="auto">
              Simple, intuitive, and designed with your mental wellness in mind.
            </Text>
          </Box>
  
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} mb={16}>
            {/* Card 1 */}
            <Box
              bg={cardBg}
              borderRadius="2xl"
              boxShadow="md"
              p={8}
              transition="transform 0.2s ease-in-out"
              _hover={{ transform: 'translateY(-8px)' }}
            >
              <Circle
                size="16" // 64px
                bg="blue.100"
                mb={6}
                mx="auto"
              >
                <Text color="blue.600" fontSize="2xl" fontWeight="bold">
                  1
                </Text>
              </Circle>
              <Heading as="h3" size="md" color={textColor} mb={4} textAlign="center">
                Connect with MindCare
              </Heading>
              <Text color={secondaryTextColor} textAlign="center">
                Start a conversation anytime through our secure chat interface. No registration required.
              </Text>
            </Box>
  
            {/* Card 2 */}
            <Box
              bg={cardBg}
              borderRadius="2xl"
              boxShadow="md"
              p={8}
              transition="transform 0.2s ease-in-out"
              _hover={{ transform: 'translateY(-8px)' }}
            >
              <Circle
                size="16"
                bg="teal.100"
                mb={6}
                mx="auto"
              >
                <Text color="teal.600" fontSize="2xl" fontWeight="bold">
                  2
                </Text>
              </Circle>
              <Heading as="h3" size="md" color={textColor} mb={4} textAlign="center">
                Share Your Thoughts
              </Heading>
              <Text color={secondaryTextColor} textAlign="center">
                Tell MindCare what's on your mind or use quick response buttons to express your feelings.
              </Text>
            </Box>
  
            {/* Card 3 */}
            <Box
              bg={cardBg}
              borderRadius="2xl"
              boxShadow="md"
              p={8}
              transition="transform 0.2s ease-in-out"
              _hover={{ transform: 'translateY(-8px)' }}
            >
              <Circle
                size="16"
                bg="green.100"
                mb={6}
                mx="auto"
              >
                <Text color="green.600" fontSize="2xl" fontWeight="bold">
                  3
                </Text>
              </Circle>
              <Heading as="h3" size="md" color={textColor} mb={4} textAlign="center">
                Receive Support
              </Heading>
              <Text color={secondaryTextColor} textAlign="center">
                Get personalized responses, coping strategies, and resources tailored to your needs.
              </Text>
            </Box>
          </SimpleGrid>
  
          <Box
            bg={cardBg}
            borderRadius="2xl"
            boxShadow="lg"
            overflow="hidden"
          >
            <Flex direction={{ base: 'column', md: 'row' }}>
              {/* Left Side - Text Content */}
              <Box w={{ base: 'full', md: '50%' }} p={{ base: 8, md: 12 }}>
                <Heading as="h3" size="lg" color={textColor} mb={6}>
                  Interactive Chat Experience
                </Heading>
                <List spacing={4}>
                  <ListItem>
                    <Flex align="start">
                      <Icon as={IoMdCheckmark} color="teal.500" boxSize={5} mt={1} mr={2} flexShrink={0} />
                      <Text color={secondaryTextColor}>
                        Natural conversation with AI trained on therapeutic techniques
                      </Text>
                    </Flex>
                  </ListItem>
                  <ListItem>
                     <Flex align="start">
                      <Icon as={IoMdCheckmark} color="teal.500" boxSize={5} mt={1} mr={2} flexShrink={0} />
                      <Text color={secondaryTextColor}>
                        Mood tracking to monitor your emotional wellbeing over time
                      </Text>
                    </Flex>
                  </ListItem>
                  <ListItem>
                     <Flex align="start">
                      <Icon as={IoMdCheckmark} color="teal.500" boxSize={5} mt={1} mr={2} flexShrink={0} />
                      <Text color={secondaryTextColor}>
                        Guided exercises for anxiety, stress, and mindfulness
                      </Text>
                    </Flex>
                  </ListItem>
                  <ListItem>
                     <Flex align="start">
                      <Icon as={IoMdCheckmark} color="teal.500" boxSize={5} mt={1} mr={2} flexShrink={0} />
                      <Text color={secondaryTextColor}>
                        Resource recommendations based on your conversation
                      </Text>
                    </Flex>
                  </ListItem>
                </List>
                <Box mt={8}>
                  <Button
                    as="a"
                    href="#chat"
                    bg="teal.500"
                    color="white"
                    fontWeight="semibold"
                    size="lg" // Adjust size as needed
                    px={8} // Specific padding horizontal
                    borderRadius="full"
                    transition="background-color 0.3s ease"
                    _hover={{ bg: 'teal.600' }}
                  >
                    Try It Now
                  </Button>
                </Box>
              </Box>
  
              {/* Right Side - Image */}
              <Flex
                w={{ base: 'full', md: '50%' }}
                bg={featureBg}
                p={4}
                alignItems="center"
                justifyContent="center"
              >
                <Box w="full" maxW="md">
                  <Image
                    src="https://placehold.co/600x400?text=MindCare+chat+interface+demonstration"
                    alt="MindCare chat interface demonstration"
                    width={600} // Maintain original attributes if needed for SEO/structure
                    height={400}
                    objectFit="cover" // Ensure image covers the area well
                    borderRadius="xl"
                    boxShadow="md"
                    fallbackSrc="https://placehold.co/600x400" // Fallback for broken images
                  />
                </Box>
              </Flex>
            </Flex>
          </Box>
  
          {/* FAQ Section */}
          <Box mt={20}>
            <Box textAlign="center" mb={12}>
              <Heading as="h3" size="lg" color={textColor} mb={4}>
                FAQ
              </Heading>
              <Text color={secondaryTextColor}>Common questions about MindCare</Text>
            </Box>
  
            <VStack spacing={6} maxW="3xl" mx="auto">
              <Box bg={cardBg} borderRadius="xl" boxShadow="md" p={6} w="full">
                <Heading as="h4" size="sm" fontWeight="semibold" color={textColor} mb={2}>
                  Is MindCare a replacement for therapy?
                </Heading>
                <Text color={secondaryTextColor}>
                  No, MindCare is a supportive tool but not a substitute for professional mental health treatment. We can provide coping strategies and resources, but recommend professional help when needed.
                </Text>
              </Box>
  
              <Box bg={cardBg} borderRadius="xl" boxShadow="md" p={6} w="full">
                <Heading as="h4" size="sm" fontWeight="semibold" color={textColor} mb={2}>
                  How is my data kept private?
                </Heading>
                <Text color={secondaryTextColor}>
                  Your conversations are encrypted and we don't store personally identifiable information. You can use MindCare anonymously, and we never sell your data to third parties.
                </Text>
              </Box>
  
              <Box bg={cardBg} borderRadius="xl" boxShadow="md" p={6} w="full">
                <Heading as="h4" size="sm" fontWeight="semibold" color={textColor} mb={2}>
                  Can I access MindCare on any device?
                </Heading>
                <Text color={secondaryTextColor}>
                  Yes! MindCare works on smartphones, tablets, and computers. Your conversation history syncs across devices when you create an account.
                </Text>
              </Box>
            </VStack>
          </Box>
        </Container>
      </Box>
    );
  };
  
  // Example of how to use it in an App component (optional)
  // import { ChakraProvider } from '@chakra-ui/react';
  // function App() {
  //   return (
  //     <ChakraProvider>
  //       <HowItWorksSection />
  //     </ChakraProvider>
  //   );
  // }
  
  export default HowItWorksSection; // Export the component for use