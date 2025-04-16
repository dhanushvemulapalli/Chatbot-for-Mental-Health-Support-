import {
  Box,
  Button,
  Checkbox,
  Container,
  Field,
  Fieldset,
  HStack,
  Heading,
  Icon,
  Input,
  InputGroup,
  Link,
  Separator,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";

import { useState } from "react";
import { signInWithGoogle } from "../Authentication/firebase";

import {
  IoEyeOutline,
  IoEyeOffOutline,
  IoShieldCheckmarkOutline,
} from "react-icons/io5";
import { MdMail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import PrivacyPolicy from "../Landing/PrivacyPolicy";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);
  return (
    <Box
      py={20}
      px={6}
      css={{
        backgroundImage: "linear-gradient(to bottom right, #ebf8ff, #f0fdf4)",
      }}
      h={"full"}
    >
      <Container maxW="md" centerContent>
        <VStack spacing={10} textAlign="center" my={6}>
          <Heading size="3xl" color="gray.800" fontWeight={"bold"}>
            Welcome Back
          </Heading>
          <Text color="gray.600">
            Sign in to your MindCare account to continue your journey.
          </Text>
        </VStack>

        <Box
          bg="white"
          rounded="2xl"
          shadow="lg"
          p={{ base: 8, md: 10 }}
          w={"md"}
        >
          <form>
            <Stack gap={5}>
              <Fieldset.Root size={"lg"}>
                <Fieldset.Content>
                  <Field.Root>
                    <Field.Label fontWeight="normal" mb={1} color={"gray.700"}>
                      Email or Username
                    </Field.Label>
                    <InputGroup
                      startElement={
                        <Icon size={8} color="gray.400">
                          <MdMail />
                        </Icon>
                      }
                    >
                      <Input
                        type="email"
                        placeholder="Enter your email or username"
                        focusBorderColor="teal.500"
                        borderRadius={"lg"}
                        borderColor={"gray.300"}
                      />
                    </InputGroup>
                  </Field.Root>

                  <Field.Root>
                    <HStack justify="space-between" mb={1} w={"full"}>
                      <Field.Label fontWeight="normal" color={"gray.700"}>
                        Password
                      </Field.Label>
                      <Link
                        fontSize="sm"
                        color="teal.600"
                        _hover={{ color: "teal.800" }}
                      >
                        Forgot Password?
                      </Link>
                    </HStack>
                    <InputGroup
                      startElement={
                        <Icon size={8} color="gray.400">
                          <FaLock />
                        </Icon>
                      }
                      endElement={
                        <Box
                          as="button"
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <IoEyeOffOutline />
                          ) : (
                            <IoEyeOutline />
                          )}
                        </Box>
                      }
                    >
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        focusBorderColor="teal.500"
                        borderRadius={"lg"}
                        borderColor={"gray.300"}
                      />
                    </InputGroup>
                  </Field.Root>
                </Fieldset.Content>
              </Fieldset.Root>

              <Checkbox.Root colorPalette="teal">
                <Checkbox.HiddenInput />
                <Checkbox.Control />
                <Checkbox.Label fontWeight={"normal"} color="gray.600">
                  Remember me
                </Checkbox.Label>
              </Checkbox.Root>

              <Button
                type="submit"
                colorPalette="teal"
                w="full"
                size="lg"
                fontWeight="medium"
              >
                Log In
              </Button>

              <HStack align="center" my={2}>
                <Separator flex="1" />
                <Text flexShrink="0" color="gray.400">
                  OR
                </Text>
                <Separator flex="1" />
              </HStack>

              <HStack justify="center" spacing={4}>
                <Button
                  variant="outline"
                  borderColor="gray.300"
                  _hover={{ bg: "gray.50" }}
                  onClick={signInWithGoogle}
                >
                  <FcGoogle />
                  Google
                </Button>
              </HStack>
            </Stack>
          </form>

          <Text textAlign="center" mt={6} fontSize="sm" color="gray.600">
            Don&apos;t have an account?{" "}
            <Link
              color="teal.600"
              fontWeight="medium"
              _hover={{ color: "teal.800" }}
              href="/signup"
            >
              Sign up now
            </Link>
          </Text>
        </Box>

        <VStack mt={6} spacing={2} textAlign="center">
          <HStack justify="center" fontSize="sm" color="gray.500">
            <Icon as={IoShieldCheckmarkOutline} w={4} h={4} />
            <Text>Secure login with 256-bit encryption</Text>
          </HStack>
          <Text fontSize="xs" color="gray.500">
            We take your privacy seriously. See our{" "}
            <Link
              textDecoration="underline"
              _hover={{ color: "gray.700" }}
              onClick={() => setOpen(true)}
            >
              Privacy Policy
            </Link>
            <PrivacyPolicy open={open} setOpen={setOpen} />
          </Text>
        </VStack>
      </Container>
    </Box>
  );
}
