import {
  Box,
  Flex,
  Text,
  Input,
  IconButton,
  VStack,
  HStack,
  Avatar,
  Icon,
} from "@chakra-ui/react";
import { useState } from "react";
import { FiSend, FiMessageSquare } from "react-icons/fi";

const messages = [
  {
    sender: "bot",
    text: "Hello! I'm your MindCare wellness assistant. How are you feeling today?",
    time: "10:30 AM",
  },
  {
    sender: "user",
    text: "I'm feeling a bit anxious about my presentation tomorrow.",
    time: "10:31 AM",
  },
  {
    sender: "bot",
    text: "I understand how presentations can cause anxiety. Would you like to try a quick breathing exercise or would you prefer some tips for presentation preparation?",
    time: "10:32 AM",
  },
  {
    sender: "user",
    text: "A breathing exercise sounds good.",
    time: "10:33 AM",
  },
  {
    sender: "bot",
    text: "Great! Let's do a quick 4-7-8 breathing exercise. Inhale for 4 seconds, hold for 7 seconds, and exhale for 8 seconds. Ready?",
    time: "10:34 AM",
  },
  {
    sender: "user",
    text: "Yes, let's do it.",
    time: "10:35 AM",
  },
];

export default function Chat() {
  const [input, setInput] = useState("");

  return (
    <Box bg="white" p={4} rounded="15px" shadow="md" h={"full"}>
      <Flex
        direction="column"
        h={"full"}
        border="1px solid"
        borderColor="gray.200"
        rounded="10px"
        overflow="hidden"
      >
        {/* Header */}
        <Flex bg="#C9E4CA" p={3} align="center">
          <Avatar.Root>
            <Avatar.Fallback
              icon={
                <Icon>
                  <FiMessageSquare />
                </Icon>
              }
            />
            <Avatar.Image size="sm" bg="white" mr={3} />
          </Avatar.Root>

          <Box>
            <Text fontWeight="medium" color="#333">
              MindCare Assistant
            </Text>
            <Text fontSize="xs" color="#555">
              Online • Responds instantly
            </Text>
          </Box>
        </Flex>

        {/* Messages */}
        <VStack
          flex="1"
          spacing={4}
          align="stretch"
          overflowY="auto"
          bg="gray.50"
          p={4}
        >
          {messages.map((msg, i) =>
            msg.sender === "bot" ? (
              <HStack align="start" key={i}>
                <Avatar.Root>
                  <Avatar.Fallback name="Segun Adebayo" />
                  <Avatar.Image
                    size="sm"
                    name="MC"
                    bg="#C9E4CA"
                    color="black"
                    fontSize="xs"
                  />
                </Avatar.Root>

                <Box
                  bg="white"
                  p={3}
                  rounded="lg"
                  roundedTopLeft="0"
                  shadow="sm"
                  maxW="80%"
                >
                  <Text fontSize="sm" color="#333">
                    {msg.text}
                  </Text>
                  <Text fontSize="xs" color="gray.400" mt={1}>
                    {msg.time}
                  </Text>
                </Box>
              </HStack>
            ) : (
              <HStack align="start" justify="flex-end" key={i}>
                <Box
                  bg="#E6F4F1"
                  p={3}
                  rounded="lg"
                  roundedTopRight="0"
                  shadow="sm"
                  maxW="80%"
                >
                  <Text fontSize="sm" color="#333">
                    {msg.text}
                  </Text>
                  <Text fontSize="xs" color="gray.400" mt={1}>
                    {msg.time}
                  </Text>
                </Box>
                <Avatar.Root>
                  <Avatar.Fallback name="Segun Adebayo" />
                  <Avatar.Image
                    size="sm"
                    name="You"
                    bg="#FFD8D8"
                    color="black"
                    fontSize="xs"
                  />
                </Avatar.Root>
              </HStack>
            )
          )}
        </VStack>

        {/* Input */}
        <Flex p={3} borderTop="1px solid" borderColor="gray.200" bg="white">
          <Input
            placeholder="Type your message here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            size="sm"
            rounded="full"
            mr={2}
            focusBorderColor="#C9E4CA"
          />
          <IconButton
            aria-label="Send"
            bg="#C9E4CA"
            _hover={{ bg: "#b2d6b9" }}
            rounded="full"
            size="sm"
          >
            <FiSend />
          </IconButton>
        </Flex>
      </Flex>
    </Box>
  );
}
