import { useEffect, useState } from "react";
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
  For,
  Pagination,
  IconButton,
  ButtonGroup,
  Link,
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
import { useAlert } from "./AlertProvider";
import { IoMdPlayCircle } from "react-icons/io";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

const ResourcesSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All Resources");
  const [Resources, setResources] = useState([]); // Initialize as an empty array
  const { addAlert, removeAlert } = useAlert();
  const [page, setPage] = useState(1); // Initialize page state
  const [filteredResources, setFilteredResources] = useState(Resources);
  const filters = [
    "All Resources",
    "stress relief",
    "mental health",
    "relaxation",
    "mindfulness",
  ];

  const gradients = {
    blue: "linear-gradient(to bottom right, #EFF6FF, #DBEAFE)",
    green: "linear-gradient(to bottom right, #ECFDF5, #D1FAE5)",
    purple: "linear-gradient(to bottom right, #F5F3FF, #EDE9FE)",
    yellow: "linear-gradient(to bottom right, #FFFBEB, #FEF3C7)",
    red: "linear-gradient(to bottom right, #FEF2F2, #FEE2E2)",
    teal: "linear-gradient(to bottom right, #F0FDFA, #CCFBF1)",
  };

  useEffect(() => {
    setFilteredResources(searchResources(Resources, searchQuery));
  }, [searchQuery, Resources]);

  const randomGradient = () => {
    const keys = Object.keys(gradients);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    return {
      color: randomKey,
      gradient: gradients[randomKey],
    };
  };

  useEffect(() => {
    const Alerid = addAlert("info", "Loading chat history...", null, true); // Show loading alert
    fetch("http://127.0.0.1:8000/api/export-resources/", {
      method: "GET",
      credentials: "include",
    })
      .then(async (res) => {
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || "Failed to load Resources");
        }
        return res.json();
      })
      .then((data) => {
        // Assuming the data object contains a 'sessions' property that is an array
        if (data && Array.isArray(data.resources)) {
          setResources(data.resources); // Set sessions from the data.sessions array
        } else {
          addAlert("error", "No Resources found", 2000);
        }
      })
      .catch((err) => {
        addAlert("error", err.message, 2000);
      })
      .finally(() => {
        removeAlert(Alerid); // Remove loading alert
      });
  }, []);

  const getResourcesWithTag = (resources) => {
    if (activeFilter === "All Resources") {
      return resources;
    } else {
      return resources.filter((resource) =>
        resource.tags?.includes(activeFilter)
      );
    }
  };
  const pageSize = 6;
  const count = getResourcesWithTag(filteredResources).length;
  const startRange = (page - 1) * pageSize;
  const endRange = startRange + pageSize;
  const visibleResources = getResourcesWithTag(filteredResources).slice(
    startRange,
    endRange
  );

  const searchResources = (Resources, query) => {
    if (!query) return Resources;

    return Resources.filter((Resource) =>
      Resource.title.toLowerCase().includes(query.toLowerCase())
    );
  };

  return (
    <Box as="section" py="20" bg="white" px="6">
      <Container maxW="6xl">
        {/* Header */}
        <VStack textAlign="center" mb="16">
          <Heading
            as="h2"
            size="4xl"
            color="gray.800"
            mb="4"
            fontWeight={"medium"}
          >
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
          {visibleResources.map((item, index) => {
            const { color, gradient } = randomGradient();
            const randomval = Math.floor(Math.random() * 5) + 1;
            return (
              <Card.Root
                key={index}
                css={{ backgroundImage: gradient }}
                rounded="2xl"
                overflow="hidden"
                shadow="md"
                transition="transform 0.3s"
                border="none"
                _hover={{ transform: "translateY(-8px)" }}
              >
                <Box h="48" overflow="hidden">
                  <Image
                    src={`/images/img${randomval}.jpg`}
                    alt={item.title}
                    w="full"
                    h="auto"
                    borderRadius="lg"
                    fit="cover"
                    fallbackSrc={`https://placehold.co/500x500?text=${randomval}`}
                  />
                </Box>
                <Card.Body p="6" gap="1">
                  <Flex justify="space-between" align="center" mb="3">
                    <Tag.Root
                      colorPalette={color}
                      variant="surface"
                      rounded="full"
                      key={index}
                    >
                      <Tag.Label
                        size="sm"
                        variant="subtle"
                        rounded="full"
                        px="3"
                        py="1"
                      >
                        {item.tags[0] || "General"}
                      </Tag.Label>
                    </Tag.Root>
                    <Text fontSize="sm" color="gray.500">
                      {item.type === "video" ? "10 mins" : "5 mins"}
                    </Text>
                  </Flex>
                  <Card.Title
                    fontSize="xl"
                    fontWeight="bold"
                    color="gray.800"
                    mb="3"
                  >
                    {item.title}
                  </Card.Title>
                  <Card.Description
                    color="gray.600"
                    fontSize="md"
                    lineClamp="3"
                  >
                    {item.description}
                  </Card.Description>
                  <Flex>
                    {item.type === "video" ? (
                      <Link href={item.link} isExternal target="_blank">
                        <Button
                          variant="ghost"
                          colorPalette="teal"
                          _hover={{ bg: "transparent", color: "teal.700" }}
                          p="0"
                          fontWeight="semibold"
                        >
                          Read More
                          <Icon as={FiArrowRight} ml="2" />
                        </Button>
                      </Link>
                    ) : (
                      <Link href={item.link} isExternal target="_blank">
                        <Button
                          variant="ghost"
                          colorPalette="teal"
                          _hover={{ bg: "transparent", color: "teal.700" }}
                          p="0"
                          fontWeight="semibold"
                        >
                          Start Practice
                          <Icon as={IoMdPlayCircle} ml="2" />
                        </Button>
                      </Link>
                    )}
                  </Flex>
                </Card.Body>
              </Card.Root>
            );
          })}
        </Grid>
        {/* Pagination */}
        <Flex justify="center" mt={8} gap={2}>
          <Pagination.Root
            count={count}
            pageSize={pageSize}
            page={page}
            onPageChange={(e) => setPage(e.page)}
          >
            <ButtonGroup variant="ghost" size="sm">
              <Pagination.PrevTrigger asChild>
                <IconButton>
                  <HiChevronLeft />
                </IconButton>
              </Pagination.PrevTrigger>

              <Pagination.Items
                render={(page) => (
                  <IconButton variant={{ base: "ghost", _selected: "outline" }}>
                    {page.value}
                  </IconButton>
                )}
              />

              <Pagination.NextTrigger asChild>
                <IconButton>
                  <HiChevronRight />
                </IconButton>
              </Pagination.NextTrigger>
            </ButtonGroup>
          </Pagination.Root>
        </Flex>
      </Container>
    </Box>
  );
};

export default ResourcesSection;
