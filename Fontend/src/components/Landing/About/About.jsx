import {
    Box,
    Container,
    Heading,
    Text,
    Flex,
    Grid,
    GridItem,
    Image,
    Link,
    Center,
    Icon,
  } from '@chakra-ui/react'
  import { IoIosAdd  } from "react-icons/io";
  import { IoShieldCheckmarkOutline } from "react-icons/io5";

  import { HiOutlineBeaker,HiArrowRight  } from "react-icons/hi2";
  const About = () => {
    return (
      <Box as="section" id="about" py="20" bg="white" px="6">
        <Container maxW="6xl">
          <Box textAlign="center" mb="16">
            <Heading as="h2" fontSize={{ base: '3xl', md: '4xl' }} fontWeight="bold" color="gray.800" mb="4">
              About MindCare Chatbot™
            </Heading>
            <Text color="gray.600" maxW="2xl" mx="auto">
              Your compassionate AI companion for mental wellness support and guidance.
            </Text>
          </Box>
  
          <Flex direction={{ base: 'column', lg: 'row' }} align="center" gap="16">
            <Box w={{ base: 'full', lg: '1/2' }}>
              <Box 
                borderRadius="2xl" 
                shadow="lg" 
                p="2"
                css={{
                  backgroundImage: 'linear-gradient(to bottom right, var(--chakra-colors-blue-50), var(--chakra-colors-green-50))'
                }}
              >
                <Box borderRadius="xl" overflow="hidden">
                  <Image 
                    src="https://placehold.co/600x400?text=MindCare chatbot interface showing a supportive conversation" 
                    alt="MindCare chatbot interface showing a supportive conversation" 
                    w="full" 
                    h="auto"
                    fallbackSrc="https://placehold.co/600x400"
                  />
                </Box>
              </Box>
            </Box>
  
            <Box w={{ base: 'full', lg: '1/2' }}>
              <Heading as="h3" fontSize="2xl" fontWeight="bold" color="gray.800" mb="6">
                How We Help
              </Heading>
  
              <Box spacing="8">
                <Flex align="start" mb="8">
                  <Center bg="teal.100" borderRadius="full" p="3" mr="4">
                    <Icon as={IoIosAdd} boxSize="6" color="teal.600" />
                  </Center>
                  <Box>
                    <Heading as="h4" fontSize="xl" fontWeight="semibold" color="gray.800" mb="2">
                      24/7 Support
                    </Heading>
                    <Text color="gray.600">
                      Always available when you need someone to talk to, no matter the time or day.
                    </Text>
                  </Box>
                </Flex>
  
                <Flex align="start" mb="8">
                  <Center bg="blue.100" borderRadius="full" p="3" mr="4">
                    <Icon as={IoShieldCheckmarkOutline} boxSize="6" color="blue.600" />
                  </Center>
                  <Box>
                    <Heading as="h4" fontSize="xl" fontWeight="semibold" color="gray.800" mb="2">
                      Privacy-First Approach
                    </Heading>
                    <Text color="gray.600">
                      Your conversations remain private and secure with our advanced encryption.
                    </Text>
                  </Box>
                </Flex>
  
                <Flex align="start" mb="8">
                  <Center bg="green.100" borderRadius="full" p="3" mr="4">
                    <Icon as={HiOutlineBeaker} boxSize="6" color="green.600" />
                  </Center>
                  <Box>
                    <Heading as="h4" fontSize="xl" fontWeight="semibold" color="gray.800" mb="2">
                      Evidence-Based Tools
                    </Heading>
                    <Text color="gray.600">
                      Access therapeutic techniques backed by clinical research and mental health experts.
                    </Text>
                  </Box>
                </Flex>
              </Box>
  
              <Box mt="10">
                <Link 
                  href="#how-it-works" 
                  display="inline-flex" 
                  alignItems="center" 
                  color="teal.600" 
                  fontWeight="semibold" 
                  _hover={{ color: "teal.700" }}
                >
                  Learn more about our approach
                  <Icon as={HiArrowRight} boxSize="5" ml="2" />
                </Link>
              </Box>
            </Box>
          </Flex>
  
          <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' }} gap="8" mt="20">
            <GridItem bg="blue.50" borderRadius="xl" p="8" textAlign="center">
              <Text fontSize="4xl" fontWeight="bold" color="blue.500" mb="2">500K+</Text>
              <Text color="gray.700">Users Supported</Text>
            </GridItem>
            
            <GridItem bg="teal.50" borderRadius="xl" p="8" textAlign="center">
              <Text fontSize="4xl" fontWeight="bold" color="teal.500" mb="2">93%</Text>
              <Text color="gray.700">User Satisfaction</Text>
            </GridItem>
            
            <GridItem bg="green.50" borderRadius="xl" p="8" textAlign="center">
              <Text fontSize="4xl" fontWeight="bold" color="green.500" mb="2">24/7</Text>
              <Text color="gray.700">Always Available</Text>
            </GridItem>
          </Grid>
        </Container>
      </Box>
    )
  }
  
  export default About;