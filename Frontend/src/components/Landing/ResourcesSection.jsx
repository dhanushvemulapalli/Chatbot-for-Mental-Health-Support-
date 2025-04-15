import { useState } from "react";
import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Heading,
  HStack,
  Image,
  Input,
  Stack,
  Text,
  Tag,
  VStack,
  Wrap,
  WrapItem,
  InputGroup,
  Grid,
  GridItem,
  Avatar,
  Icon,
} from "@chakra-ui/react";

import {
  FiSearch,
  FiArrowRight,
  FiPlay,
  FiRadio,
  FiBook,
  FiHeadphones,
  FiMoon,
  FiEdit,
} from "react-icons/fi";

const ResourcesSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All Resources");

  const filters = [
    "All Resources",
    "Stress Management",
    "Anxiety Relief",
    "Meditation",
    "Sleep Better",
  ];

  const gradients = {
    blue: "linear-gradient(to bottom right, #EFF6FF, #DBEAFE)",
    green: "linear-gradient(to bottom right, #ECFDF5, #D1FAE5)",
    purple: "linear-gradient(to bottom right, #F5F3FF, #EDE9FE)",
    yellow: "linear-gradient(to bottom right, #FFFBEB, #FEF3C7)",
    red: "linear-gradient(to bottom right, #FEF2F2, #FEE2E2)",
    teal: "linear-gradient(to bottom right, #F0FDFA, #CCFBF1)",
  };

  return (
    <Box as="section" py="20" bg="white" px="6">
      <Container maxW="6xl">
        {/* Header */}
        <VStack textAlign="center" mb="16">
          <Heading as="h2" size="4xl" color="gray.800" mb="4" fontWeight={"medium"}>
            Self-Help Resources
          </Heading>
          <Text color="gray.600" maxW="2xl" mx="auto">
            Explore our collection of tools and articles designed to support
            your mental wellness journey.
          </Text>
        </VStack>

        {/* Search Bar */}
        <Box maxW="2xl" mx="auto" mb="16">
          <InputGroup
            size="lg"
            endElement={
              <Button
                h="8"
                w="8"
                p="2"
                colorScheme="teal"
                rounded="full"
                aria-label="Search"
              >
                <FiSearch />
              </Button>
            }
          >
            <Input
              placeholder="Search for resources..."
              rounded="full"
              borderColor="gray.300"
              _focus={{
                ring: 2,
                ringColor: "teal.500",
                borderColor: "transparent",
              }}
              shadow="sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </InputGroup>
        </Box>

        {/* Filters */}
        <Wrap spacing="4" justify="center" mb="12">
          {filters.map((filter) => (
            <WrapItem key={filter}>
              <Button
                colorScheme={activeFilter === filter ? "teal" : "gray"}
                variant={activeFilter === filter ? "solid" : "outline"}
                rounded="full"
                shadow="md"
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </Button>
            </WrapItem>
          ))}
        </Wrap>

        {/* Resources Grid */}
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          }}
          gap="8"
          mb="16"
        >
          {/* Card 1 - Breathing Techniques */}
          <ResourceCard
            bgGradient={gradients.blue}
            imageSrc="/api/placeholder/600/400"
            imageAlt="Breathing exercises for anxiety relief"
            tag="Anxiety"
            tagColor="blue"
            meta="5 min read"
            title="Breathing Techniques for Anxiety Relief"
            description="Learn simple breathing exercises that can help calm your mind and reduce anxiety in just minutes."
            actionText="Read More"
            actionIcon={<FiArrowRight />}
            icon={<FiRadio />}
          />

          {/* Card 2 - Mindfulness Meditation */}
          <ResourceCard
            bgGradient={gradients.green}
            imageSrc="/api/placeholder/600/400"
            imageAlt="Mindfulness meditation guide"
            tag="Meditation"
            tagColor="green"
            meta="10 min activity"
            title="5-Minute Mindfulness Meditation"
            description="A guided meditation practice to help you center yourself and find calm during stressful moments."
            actionText="Start Practice"
            actionIcon={<FiPlay />}
            icon={<FiHeadphones />}
          />

          {/* Card 3 - Sleep Habits */}
          <ResourceCard
            bgGradient={gradients.purple}
            imageSrc="/api/placeholder/600/400"
            imageAlt="Sleep improvement strategies"
            tag="Sleep"
            tagColor="purple"
            meta="7 min read"
            title="Better Sleep Habits for Mental Wellness"
            description="Discover practical tips to improve your sleep quality and how it impacts your mental health."
            actionText="Read More"
            actionIcon={<FiArrowRight />}
            icon={<FiMoon />}
          />

          {/* Card 4 - Journaling Prompts */}
          <ResourceCard
            bgGradient={gradients.yellow}
            imageSrc="/api/placeholder/600/400"
            imageAlt="Journal prompts for self-reflection"
            tag="Self-Reflection"
            tagColor="yellow"
            meta="Interactive"
            title="Guided Journaling Prompts"
            description="Thoughtful questions to help you process emotions and gain insights through writing."
            actionText="Start Journaling"
            actionIcon={<FiArrowRight />}
            icon={<FiEdit />}
          />

          {/* Card 5 - Stress Reduction */}
          <ResourceCard
            bgGradient={gradients.red}
            imageSrc="/api/placeholder/600/400"
            imageAlt="Stress management techniques"
            tag="Stress"
            tagColor="red"
            meta="8 min read"
            title="Stress Reduction Strategies"
            description="Practical techniques to help you manage stress in your daily life and prevent burnout."
            actionText="Read More"
            actionIcon={<FiArrowRight />}
            icon={<FiBook />}
          />

          {/* Card 6 - Visualization Exercise */}
          <ResourceCard
            bgGradient={gradients.teal}
            imageSrc="https://picsum.photos/200"
            imageAlt="Guided visualization exercise"
            tag="Relaxation"
            tagColor="teal"
            meta="6 min audio"
            title="Calming Visualization Exercise"
            description="A guided audio experience to help you relax and create a mental sanctuary for peace."
            actionText="Listen Now"
            actionIcon={<FiPlay />}
            icon={<FiHeadphones />}
          />
        </Grid>
      </Container>
    </Box>
  );
};

// Resource Card Component using Chakra UI v3 Card
const ResourceCard = ({
  bgGradient,
//   imageSrc,
//   imageAlt,
  tag,
  tagColor,
  meta,
  title,
  description,
  actionText,
  actionIcon,
}) => {
  return (
    <Card.Root
      css={{ backgroundImage: bgGradient }}
      rounded="2xl"
      overflow="hidden"
      shadow="md"
      transition="transform 0.3s"
      border={"none"}
      _hover={{ transform: "translateY(-8px)" }}
    >
      <Box h="48" overflow="hidden">
        <Image
          src="https://placehold.co/600x600?text=Friendly AI mental health chatbot illustration"
          alt="Friendly AI mental health chatbot illustration"
          w="full"
          h="auto"
          borderRadius="lg"
          objectFit={"cover"}
          fallbackSrc="https://placehold.co/500x500"
        />
      </Box>
      <Card.Body p="6" gap="1">
        <Flex justify="space-between" align="center" mb="3">
          <Tag.Root
            colorPalette={tagColor}
            variant={"surface"}
            rounded={"full"}
          >
            <Tag.Label size="sm" variant="subtle" rounded="full" px="3" py="1">
              {tag}
            </Tag.Label>
          </Tag.Root>
          <Text fontSize="sm" color="gray.500">
            {meta}
          </Text>
        </Flex>
        <Card.Title fontSize="xl" fontWeight="bold" color="gray.800" mb="3">
          {title}
        </Card.Title>
        <Card.Description color="gray.600" fontSize="md">{description}</Card.Description>
        <Flex>
          <Button
            variant="ghost"
            colorPalette="teal"
            _hover={{ bg: "transparent", color: "teal.700" }}
            p="0"
            fontWeight="semibold"
          >
            {actionText}
            <Icon size={"sm"}>{actionIcon}</Icon>
          </Button>
        </Flex>
      </Card.Body>
    </Card.Root>
  );
};

export default ResourcesSection;
