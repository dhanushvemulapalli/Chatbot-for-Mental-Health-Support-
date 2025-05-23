// Shanmuka
import {
  Avatar,
  Box,
  Button,
  defineStyle,
  Drawer,
  Flex,
  HStack,
  Icon,
  IconButton,
  Separator,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaHouseChimney } from "react-icons/fa6";
import { IoChatboxEllipsesOutline, IoSettingsOutline } from "react-icons/io5";
import { GrResources } from "react-icons/gr";
import { IoIosMenu } from "react-icons/io";
import { Tooltip } from "../ui/tooltip";
import { IoIosLogOut } from "react-icons/io";
import { MdHistory } from "react-icons/md";
import axios from "axios";
import { useAlert } from "../AlertProvider";

const Sidebar = ({ checkLoginStatus }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentPage, setcurrentPage] = useState("Dashboard");
  const [isSemiMode, setIsSemiMode] = useState(true); // Semi-mode state
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // Drawer open state
  const [quote, setQuote] = useState({});
  const { addAlert } = useAlert(); // Assuming you have a custom hook for alerts

  useEffect(() => {
    setcurrentPage(location.pathname.slice(1)); // Update current page on location change
  }, [location.pathname]);

  const handleSetPage = (page) => {
    setcurrentPage(page);
    navigate("/" + page);
  };

  const items = [
    { icon: FaHouseChimney, page: "Dashboard" },
    { icon: IoChatboxEllipsesOutline, page: "Chats" },
    { icon: MdHistory, page: "History" },
    { icon: GrResources, page: "Resources" },
    { icon: IoSettingsOutline, page: "Settings" },
  ];

  useEffect(() => {
    const user = sessionStorage.getItem("user");
    if (user) {
      setQuote(JSON.parse(user)); // Update state with the parsed user data from sessionStorage
    }
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  const ringCss = defineStyle({
    outlineWidth: "2px",
    outlineColor: "white",
    outlineOffset: "2px",
    outlineStyle: "solid",
  });

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/logout/",
        {}, // No payload needed for closing session
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log("logout closed:", response); // Debugging line
      addAlert("logout success", `${response.data.message}`);
      navigate("/");
      // Small delay before updating authentication state
      setTimeout(() => {
        checkLoginStatus();
      }, 100);
      window.location.reload();
    } catch (error) {
      console.error("Error closing session:", error);
    }
  };

  return (
    <Box>
      <Stack
        w={"60px"}
        h="100%"
        color="white"
        align="center"
        css={{
          backgroundImage: "linear-gradient(to bottom right, #E6F4F1, #C9E4CA)",
        }}
        borderRadius={"lg"}
        borderRightWidth={1}
        py={4}
        gap={5}
        left={0}
        top={0}
        transition="width 0.3s"
        hidden={!isSemiMode}
      >
        <Tooltip
          content="Open Sidebar"
          positioning={{ placement: "right-end" }}
          contentProps={{ css: { "--tooltip-bg": "#18181b", color: "white" } }}
        >
          <Button
            variant="ghost"
            onClick={() => {
              setIsSemiMode((prev) => {
                const newSemiMode = !prev;
                setIsDrawerOpen(!newSemiMode); // open drawer if semi-mode is being turned off
                return newSemiMode;
              });
            }}
          >
            <IoIosMenu />
          </Button>
        </Tooltip>

        {items.map((item, index) => (
          <Tooltip
            content={item.page}
            positioning={{ placement: "right-end" }}
            key={index}
            contentProps={{
              css: {
                "--tooltip-bg": "#3f3f46",
                color: "white",
                marginLeft: "3",
              },
            }}
          >
            <Button
              key={index}
              variant="ghost"
              colorScheme={currentPage === item.page ? "blue" : "whiteAlpha"}
              p={3}
              onClick={() => handleSetPage(item.page)}
            >
              <Icon as={item.icon} />
            </Button>
          </Tooltip>
        ))}
        <Tooltip
          content="LogOut"
          positioning={{ placement: "right-end" }}
          contentProps={{
            css: { "--tooltip-bg": "#18181b", color: "white", marginLeft: "3" },
          }}
        >
          <IconButton
            size={"lg"}
            ml={3}
            color="gray.500"
            mt={"auto"}
            variant={"outline"}
            onClick={handleLogout}
          >
            <IoIosLogOut />
          </IconButton>
        </Tooltip>
      </Stack>

      {/* Full Sidebar Drawer */}
      <Drawer.Root
        open={isDrawerOpen}
        onOpenChange={({ open }) => {
          setIsDrawerOpen(open);
          if (!open) setIsSemiMode(true);
        }}
        placement="start"
        size={"xs"}
      >
        <Drawer.Backdrop />

        <Drawer.Content
          h={"100vh"}
          css={{
            backgroundImage:
              "linear-gradient(to bottom right, #E6F4F1, #C9E4CA)",
          }}
        >
          <Drawer.Header>
            <Drawer.Title>
              <HStack>
                <Avatar.Root css={ringCss} shadow={"lg"}>
                  <Avatar.Fallback name="Segun Adebayo" />
                  <Avatar.Image src="https://avatar.iran.liara.run/public" />
                </Avatar.Root>
                <Flex align={"center"}>MindCare</Flex>
              </HStack>
            </Drawer.Title>
          </Drawer.Header>

          <Drawer.Body>
            <Stack mt={3}>
              {items.map((item, index) => (
                <Button
                  variant={currentPage === item.page ? "subtle" : "ghost"}
                  key={index}
                  justifyContent={"flex-start"}
                  pl={30}
                  onClick={() => handleSetPage(item.page)}
                  borderRadius={"lg"}
                >
                  <Icon mr={3} as={item.icon} />
                  <Text>{item.page}</Text>
                </Button>
              ))}
            </Stack>
          </Drawer.Body>

          <Drawer.Footer justifyContent={"center"}>
            <>
              <Avatar.Root>
                <Avatar.Fallback name="Segun Adebayo" />
                <Avatar.Image src="https://placehold.co/600x600?text=User_Icon" />
              </Avatar.Root>
              <VStack w={"full"} alignItems={"flex-start"} ml={3}>
                <Text>{quote.username}</Text>
                <Text>{quote.email_address}</Text>
              </VStack>

              <IconButton
                size={"lg"}
                ml={3}
                color="gray.500"
                onClick={handleLogout}
                variant={"outline"}
              >
                <IoIosLogOut />
              </IconButton>
            </>
          </Drawer.Footer>
          <Drawer.CloseTrigger />
        </Drawer.Content>
      </Drawer.Root>
    </Box>
  );
};

export default Sidebar;
