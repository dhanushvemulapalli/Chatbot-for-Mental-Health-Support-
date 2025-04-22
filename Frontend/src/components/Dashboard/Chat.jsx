// Shanmuka
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
import axios from "axios";
import { useState, useEffect } from "react";
import { FiSend, FiMessageSquare } from "react-icons/fi";
import { useAlert } from "../AlertProvider";
import { IoMdClose } from "react-icons/io";

const messages = [];

export default function Chat() {
  const [input, setInput] = useState("");
  const [chatMessages, setChatMessages] = useState(messages);
  const [loading, setLoading] = useState(false); // To track the loading state
  const { addAlert } = useAlert(); // Assuming you have a custom hook for alerts
  const [quote, setQuote] = useState({});

  // Set quote state when component mounts
  useEffect(() => {
    const user = sessionStorage.getItem("user");
    if (user) {
      setQuote(JSON.parse(user));
    }
  }, []);

  const parseMessageText = (text)=> {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
  
    const parts = text.split(urlRegex);
  
    return parts.map((part, i) => {
      if (part.match(urlRegex)) {
        return (
          <Link
            key={i}
            href={part}
            color="teal.500"
            isExternal
            _hover={{ textDecoration: "underline" }}
          >
            {part}
          </Link>
        );
      } else {
        return <span key={i}>{part}</span>;
      }
    });
  }
  

  const handleSendMessage = async () => {
    if (input.trim() === "") return;

    const userMessage = {
      sender: "user",
      text: input,
      time: new Date().toLocaleTimeString(),
    };

    setChatMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const payload = { message: input };

      const response = await axios.post(
        "http://127.0.0.1:8000/api/start-chat-session/",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log("API response:", response);

      if (response.status === 200) {
        const data = response.data;

        const messagesToAdd = [];

        // Bot's main message
        const botMessage = {
          sender: "bot",
          text:
            data.messages.length > 0
              ? data.messages[data.messages.length - 1].content
              : "I'm here to help! Let me know if you need anything.",
          time: new Date().toLocaleTimeString(),
        };

        messagesToAdd.push(botMessage);

        // Add any recommended resources
        if (data.recommended_resources?.length > 0) {
          data.recommended_resources.forEach((resource) => {
            messagesToAdd.push({
              sender: "bot",
              text: `Resource: ${resource.title} - ${resource.link}`,
              time: new Date().toLocaleTimeString(),
            });
          });
        }

        setChatMessages((prev) => [...prev, ...messagesToAdd]);
      } else {
        console.error("API error:", response);
        setChatMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: `Sorry, something went wrong. ${response.statusText}`,
            time: new Date().toLocaleTimeString(),
          },
        ]);
      }
    } catch (error) {
      console.error("Request failed:", error);
      setChatMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Sorry, there was an issue connecting to the service. Please try again later.",
          time: new Date().toLocaleTimeString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSessions = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/end-chat-session/",
        {}, // No payload needed for closing session
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log("Session closed:", response); // Debugging line
      addAlert("success", `${response.data.message}`); // Show success alert
      if (response.data.message === "Chat session ended") {
        setChatMessages([]); // Clear chat messages on successful session closure
      }
    } catch (error) {
      console.error("Error closing session:", error);
      addAlert("error", error.message); // Show error alert
    }
  };

  return (
    <Box bg="white" p={4} rounded="15px" shadow="md" h={"95vh"} w={"100%"}>
      <Flex
        direction="column"
        h={"full"}
        border="1px solid"
        borderColor="gray.200"
        rounded="10px"
        overflow="hidden"
      >
        {/* Header */}
        <Flex bg="#C9E4CA" p={3} align="center" gap={3}>
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
          <IconButton
            ml="auto"
            alignSelf={"flex-end"}
            aria-label="Send"
            bg="#C9E4CA"
            _hover={{ bg: "#b2d6b9" }}
            size="sm"
            onClick={handleCloseSessions} // Trigger the message sending and API call
            variant={"outline"}
            borderColor={"white"}
          >
            <IoMdClose  />
          </IconButton>
        </Flex>

        {/* Messages */}
        <VStack
          flex="1"
          spacing={4}
          align="stretch"
          overflowY="auto"
          bg="gray.50"
          maxHeight="11/12" // Optional: Set a max height for the container
          p={4}
        >
          {chatMessages.map((msg, i) =>
            msg.sender === "bot" ? (
              <HStack align="start" key={i}>
                <Avatar.Root>
                  <Avatar.Fallback />
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
                    {parseMessageText(msg.text)}
                  </Text>
                  <Text fontSize="xs" color="gray.400" mt={1}>
                    {msg.time}
                  </Text>
                </Box>
                <Avatar.Root>
                  <Avatar.Fallback name={quote.username} />
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

          {/* Show loading message if waiting for bot response */}
          {loading && (
            <HStack align="start" key="loading">
              <Avatar.Root>
                <Avatar.Fallback />
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
                  Please wait... I'm processing your request.
                </Text>
              </Box>
            </HStack>
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
            onClick={handleSendMessage} // Trigger the message sending and API call
          >
            <FiSend />
          </IconButton>
        </Flex>
      </Flex>
    </Box>
  );
}
