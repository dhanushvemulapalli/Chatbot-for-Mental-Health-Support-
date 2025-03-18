import { useState } from "react";
import {
  Box,
  Input,
  Checkbox,
  Button,
  Text,
  VStack,
  HStack,
  IconButton,
  Center,
  Image,
  Stack,
  Separator,
  Tabs,
  Group,
  Avatar,
} from "@chakra-ui/react";
import { LuFolder,  LuUser } from "react-icons/lu";
import { FcGoogle } from "react-icons/fc";
import { signInWithGoogle } from "../Firebase/firebase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Center minH="100vh">
      <Box w="400px" p={6} rounded="lg" shadow="md">
        <Center mb={4}>
            <Image src=".\src\assets\Logo.png" alt="MindCare" h={"14"}/>
        </Center>
        <Text fontSize="xl" fontWeight="bold" textAlign="center">
          Welcome to MindCare
        </Text>
        <Text fontSize="sm" textAlign="center" mb={5}>
          Sign in to continue your journey
        </Text>

        <Tabs.Root defaultValue="Sign_In" size={"md"}>
          <Tabs.List>
            <Tabs.Trigger value="Sign_In">
              <LuUser />
              Sign In
            </Tabs.Trigger>
            <Tabs.Trigger value="Create_Account">
              <LuFolder />
              Create Account
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="Sign_In">
            <VStack gap={4}>
              <Stack gap={1} w="full">
                <Text fontSize="sm" fontWeight="medium">
                  Email Address
                </Text>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Stack>

              <Stack gap={1} w="full">
                <HStack justify="space-between">
                  <Text fontSize="sm" fontWeight="medium">
                    Password
                  </Text>
                  <Text fontSize="sm" cursor="pointer">
                    Forgot password?
                  </Text>
                </HStack>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Stack>

              <HStack justify="space-between" w="full">
                <Checkbox.Root>
                  <Checkbox.HiddenInput />
                  <Checkbox.Control />
                  <Checkbox.Label>Remember me for 30 days</Checkbox.Label>
                </Checkbox.Root>
              </HStack>

              <Button colorScheme="purple" w="full">
                Sign In
              </Button>
            </VStack>
          </Tabs.Content>

          <Tabs.Content value="Create_Account">
            <VStack gap={4}>
              <Stack gap={1} w="full">
                <Text fontSize="sm" fontWeight="medium">
                  Full Name
                </Text>
                <Input type="text" placeholder="John Doe" />
              </Stack>
              <Stack gap={1} w="full">
                <Text fontSize="sm" fontWeight="medium">
                  Email Address
                </Text>
                <Input type="email" placeholder="your@email.com" />
              </Stack>
              <Stack gap={1} w="full">
                <Text fontSize="sm" fontWeight="medium">
                  Password
                </Text>
                <Input type="password" placeholder="••••••••" />
              </Stack>
              <Button colorScheme="purple" w="full">
                Create Account
              </Button>
            </VStack>
          </Tabs.Content>
        </Tabs.Root>

        <HStack my={4} gap={2} align="center">
          <Separator />
          <Text fontSize="sm" color="gray.500">
            Or continue with
          </Text>
          <Separator />
        </HStack>

        <HStack gap={4} justify="center">
          <IconButton
            aria-label="Sign in with Google"
            variant="outline"
            w={"full"}
            onClick={signInWithGoogle}
          >
            <FcGoogle />
            <Text>Google</Text>
          </IconButton>
        </HStack>
      </Box>
    </Center>
  );
}
