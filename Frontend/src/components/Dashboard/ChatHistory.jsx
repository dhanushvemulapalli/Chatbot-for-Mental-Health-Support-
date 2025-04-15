import {
  Box,
  Flex,
  Heading,
  Input,
  Icon,
  Text,
  VStack,
  HStack,
  Avatar,
  // Collapse,
  Button,
  Badge,
} from "@chakra-ui/react";
import {
  AiOutlineSearch,
  AiOutlineDown,
  AiOutlineLeft,
  AiOutlineRight,
  AiOutlineMessage,
} from "react-icons/ai";
import { useState } from "react";

export default function ChatHistory() {
  const [openThread, setOpenThread] = useState("anxiety");

  const threads = [
    {
      id: "anxiety",
      title: "Anxiety Management Techniques",
      date: "Started May 15, 2023",
      open: true,
      messages: [
        {
          sender: "JS",
          time: "10:32 AM",
          text: "I've been feeling really anxious lately, especially at work. Do you have any techniques that might help?",
        },
        {
          sender: "bot",
          time: "10:34 AM",
          text: "I'm sorry to hear you're feeling anxious. There are several techniques that might help you manage workplace anxiety:",
          list: [
            "Deep breathing exercises (4-7-8 method)",
            "Short mindfulness breaks",
            "Progressive muscle relaxation",
            "Setting realistic daily goals",
          ],
        },
        {
          sender: "JS",
          time: "10:36 AM",
          text: "Yes, could you tell me more about the deep breathing technique?",
        },
      ],
    },
    {
      id: "sleep",
      title: "Sleep Improvement Strategies",
      date: "Started May 10, 2023",
      unread: true,
      open: false,
    },
    {
      id: "stress",
      title: "Stress Management Plan",
      date: "Started April 28, 2023",
      open: false,
    },
  ];

  return (
    <Box px={{ base: 4, lg: 6 }} py={36} maxW="5xl" mx="auto">
      {/* Header */}
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align={{ base: "start", md: "center" }}
        mb={6}
        p={3}
        position="sticky"
        top={0}
        zIndex={10}
        bg="whiteAlpha.900"
        backdropFilter="blur(6px)"
        rounded="lg"
        boxShadow="sm"
      >
        <Heading size="lg" mb={{ base: 3, md: 0 }} color="#2C3E50">
          Chat History
        </Heading>

        <Flex w={{ base: "full", md: "auto" }} position="relative">
          <Input
            placeholder="Search conversations..."
            pl="2.5rem"
            w={{ base: "full", md: "16rem" }}
            borderColor="#C9E4CA"
            focusBorderColor="#A7C5A6"
            size="sm"
          />
          <Icon
            as={AiOutlineSearch}
            position="absolute"
            left={3}
            top="50%"
            transform="translateY(-50%)"
            color="gray.400"
          />
        </Flex>
      </Flex>

      {/* Threads */}
      <VStack spacing={6} align="stretch">
        {threads.map((thread) => (
          <Box
            key={thread.id}
            rounded="lg"
            boxShadow="md"
            overflow="hidden"
            bg="white"
          >
            <Flex
              p={4}
              justify="space-between"
              align="center"
              css={{
                backgroundImage: "linear-gradient(to bottom right, #ebf8ff, #f0fff4)",
              }}
              cursor="pointer"
              onClick={() =>
                setOpenThread(thread.id === openThread ? null : thread.id)
              }
            >
              <HStack spacing={3}>
                <Text fontWeight="medium" color="#2C3E50">
                  {thread.title}
                </Text>
                <Text fontSize="xs" color="#2C3E50" opacity={0.75}>
                  {thread.date}
                </Text>
                {thread.unread && (
                  <Badge
                    variant="solid"
                    colorScheme="red"
                    borderRadius="full"
                    px={2}
                  >
                    New
                  </Badge>
                )}
              </HStack>
              <Icon
                as={AiOutlineDown}
                transform={
                  openThread === thread.id ? "rotate(180deg)" : "rotate(0)"
                }
                transition="transform 0.2s"
                color="#2C3E50"
              />
            </Flex>

            {/* <Collapse in={openThread === thread.id}>
                <Box p={4}>
                  {thread.messages ? (
                    <VStack align="stretch" spacing={4}>
                      {thread.messages.map((msg, idx) => (
                        <HStack align="start" key={idx}>
                          {msg.sender === "bot" ? (
                            <Avatar src="https://avatar.iran.liara.run/public" name="Bot" size="sm" />
                          ) : (
                            <Avatar bg="#FFD8D8" color="#2C3E50" name="JS" size="sm" />
                          )}
                          <Box
                            bg={msg.sender === "bot" ? "#E6F4F1" : "gray.100"}
                            p={3}
                            rounded="lg"
                            maxW="80%"
                            color="#2C3E50"
                          >
                            <Text fontSize="sm">{msg.text}</Text>
                            {msg.list && (
                              <Box as="ul" pl={4} pt={2} color="#2C3E50" fontSize="sm" listStyleType="disc">
                                {msg.list.map((item, i) => (
                                  <li key={i}>{item}</li>
                                ))}
                              </Box>
                            )}
                            <Text fontSize="xs" color="gray.500" mt={1}>
                              {msg.time}
                            </Text>
                          </Box>
                        </HStack>
                      ))}
                    </VStack>
                  ) : (
                    <Text fontSize="sm" color="gray.500" fontStyle="italic" textAlign="center">
                      Click to expand conversation
                    </Text>
                  )}
                </Box>
              </Collapse> */}
          </Box>
        ))}
      </VStack>

      {/* Pagination */}
      <Flex justify="center" mt={8} gap={2}>
        <Button size="sm" variant="ghost">
          <AiOutlineLeft />
        </Button>
        <Button
          size="sm"
          color="#2C3E50"
          bg="#C9E4CA"
          _hover={{ bg: "#A7C5A6" }}
        >
          1
        </Button>
        <Button size="sm" variant="ghost">
          2
        </Button>
        <Button size="sm" variant="ghost">
          3
        </Button>
        <Button size="sm" variant="ghost">
          <AiOutlineRight />
        </Button>
      </Flex>

      {/* Notification Toast */}
      <Flex
        position="fixed"
        bottom={4}
        right={4}
        bg="white"
        boxShadow="lg"
        rounded="lg"
        p={4}
        maxW="xs"
        align="start"
        display="none" // Change to 'flex' when showing
      >
        <Box bg="#C9E4CA" rounded="full" p={2} mr={3}>
          <Icon as={AiOutlineMessage} boxSize={6} color="#2C3E50" />
        </Box>
        <Box>
          <Text fontWeight="medium" color="#2C3E50">
            New Message
          </Text>
          <Text fontSize="sm" color="gray.600">
            MindCare has responded to your question about sleep improvement.
          </Text>
          <HStack mt={2}>
            <Button
              size="xs"
              bg="#E6F4F1"
              _hover={{ bg: "#C9E4CA" }}
              color="#2C3E50"
            >
              View
            </Button>
            <Button size="xs" variant="ghost" color="gray.500">
              Dismiss
            </Button>
          </HStack>
        </Box>
      </Flex>
    </Box>
  );
}
