import {
  Box,
  Button,
  CloseButton,
  Flex,
  For,
  Grid,
  HStack,
  Icon,
  Portal,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Dialog } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { CiUser } from "react-icons/ci";
import { IoMdCheckmark } from "react-icons/io";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { useAlert } from "./AlertProvider";

const ChatModeDialog = ({checkLoginStatus}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const {addAlert} = useAlert();
  const AnonymusAccess = [
    "No account needed",
    "Conversations not saved",
    "Complete privacy",
  ];
  const LoggedInAccess = [
    "Personalized experience",
    "Save conversation history",
    "Track your progress",
  ];
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const endsWithCompanion = location.pathname.endsWith("/Companion");
    if (endsWithCompanion) {
      setOpen(true);
    }
  }, [location.pathname]);

  return (
    <Dialog.Root
      size="lg"
      placement="center"
      motionPreset="slide-in-bottom"
      open={open}
      onOpenChange={setOpen}
    >
      <Dialog.Trigger asChild>
        <Button variant="outline" size="sm">
          Choose Chat Mode
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content
            bg="white"
            rounded="lg"
            shadow="xl"
            mx={4}
            transition="transform 0.3s"
          >
            <Dialog.Header
              bg="teal.600"
              px={6}
              py={4}
              color="white"
              roundedTop="md"
            >
              <Flex justify="space-between" align="center">
                <Dialog.Title fontSize="xl" fontWeight="semibold">
                  Choose How to Chat
                </Dialog.Title>
                <Dialog.CloseTrigger asChild onClick={() => navigate("/")}>
                  <CloseButton
                    size="sm"
                    color={"white"}
                    _hover={{
                      color: "teal.900",
                      bg: "teal.300",
                    }}
                  />
                </Dialog.CloseTrigger>
              </Flex>
            </Dialog.Header>
            <Dialog.Body px={6} py={5}>
              <Text color="gray.600" mb={6}>
                Select how you'd like to chat with our companion:
              </Text>

              <Grid
                templateColumns={{ base: "1fr", md: "1fr 1fr" }}
                gap={4}
                mb={6}
              >
                {/* Anonymous Option */}
                <Box
                  borderWidth="1px"
                  borderColor={
                    selectedOption === "anonymous" ? "teal.400" : "gray.200"
                  }
                  rounded="lg"
                  p={4}
                  cursor="pointer"
                  _hover={{
                    borderColor: "teal.400",
                    shadow: "md",
                  }}
                  transition="all 0.3s"
                  onClick={() => setSelectedOption("anonymous")}
                  bg={selectedOption === "anonymous" ? "teal.50" : "white"}
                >
                  <HStack align="start" mb={3} alignItems={"center"}>
                    <Box
                      bg="gray.100"
                      p={2}
                      rounded="full"
                      mr={3}
                      _groupHover={{ bg: "teal.50" }}
                    >
                      <Icon
                        as={CiUser}
                        boxSize={6}
                        color="gray.500"
                        _hover={{ color: "teal.600" }}
                      />
                    </Box>
                    <Text
                      fontWeight="medium"
                      color="gray.800"
                      _hover={{ color: "teal.600" }}
                    >
                      Anonymous
                    </Text>
                  </HStack>
                  <VStack
                    spacing={1}
                    pt={2}
                    align="start"
                    fontSize="xs"
                    color="gray.500"
                  >
                    <For each={AnonymusAccess}>
                      {(item, index) => (
                        <HStack>
                          <Icon
                            as={IoMdCheckmark}
                            color="teal.500"
                            size={"md"}
                            key={index}
                          />
                          <Text fontSize="xs" color="gray.500">
                            {item}
                          </Text>
                        </HStack>
                      )}
                    </For>
                  </VStack>
                </Box>

                {/* Logged In Option */}
                <Box
                  borderWidth="1px"
                  borderColor={
                    selectedOption === "loggedIn" ? "teal.400" : "gray.200"
                  }
                  rounded="lg"
                  p={4}
                  cursor="pointer"
                  _hover={{
                    borderColor: "teal.400",
                    shadow: "md",
                  }}
                  transition="all 0.3s"
                  onClick={() => setSelectedOption("loggedIn")}
                  bg={selectedOption === "loggedIn" ? "teal.50" : "white"}
                >
                  <HStack align="start" mb={3} alignItems={"center"}>
                    <Box
                      bg="gray.100"
                      p={2}
                      rounded="full"
                      mr={3}
                      _groupHover={{ bg: "teal.50" }}
                    >
                      <Icon
                        as={IoShieldCheckmarkOutline}
                        boxSize={6}
                        color="gray.500"
                        _hover={{ color: "teal.600" }}
                      />
                    </Box>
                    <Text
                      fontWeight="medium"
                      color="gray.800"
                      _hover={{ color: "teal.600" }}
                    >
                      Logged In
                    </Text>
                  </HStack>
                  <VStack
                    spacing={1}
                    pt={2}
                    align="start"
                    fontSize="xs"
                    color="gray.500"
                  >
                    <For each={LoggedInAccess}>
                      {(item, index) => (
                        <HStack>
                          <Icon
                            as={IoMdCheckmark}
                            color="teal.500"
                            size={"md"}
                            key={index}
                          />
                          <Text fontSize="xs" color="gray.500">
                            {item}
                          </Text>
                        </HStack>
                      )}
                    </For>
                  </VStack>
                </Box>
              </Grid>

              <HStack
                pt={2}
                borderTop="1px"
                borderColor="gray.200"
                justify="flex-end"
                spacing={3}
                flexDir={{ base: "column", sm: "row" }}
              >
                <Button
                  variant="ghost"
                  colorScheme="gray"
                  onClick={() => navigate("/")}
                >
                  Cancel
                </Button>
                <Button
                  colorScheme="teal"
                  isDisabled={!selectedOption}
                  onClick={async () => {
                    if (selectedOption === "loggedIn") {
                      navigate("/login");
                    } else if (selectedOption === "anonymous") {
                      try {
                        const response = await fetch(
                          "http://127.0.0.1:8000/api/anonymous-chat/",
                          {
                            method: "GET",
                            credentials: "include", // Important to allow session cookie
                          }
                        );

                        const data = await response.json();
                        addAlert("success", "Anonymous session started successfully.");
                        await checkLoginStatus();
                        console.log("Anonymous session started:", data);
                        setOpen(false);
                        navigate("/Chats");
                      } catch (error) {
                        console.error(
                          "Failed to start anonymous session:",
                          error
                        );
                      }
                    }
                  }}
                >
                  Continue
                </Button>
              </HStack>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default ChatModeDialog;
