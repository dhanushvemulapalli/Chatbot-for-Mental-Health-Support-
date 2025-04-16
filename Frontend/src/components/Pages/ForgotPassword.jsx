import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Field,
  Flex,
  Heading,
  HStack,
  Icon,
  Input,
  InputGroup,
  PinInput,
  Steps,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { MdEmail, MdSecurity } from "react-icons/md";
import { Link } from "react-router-dom";
import PrivacyPolicy from "../Landing/PrivacyPolicy";
import { FaLock } from "react-icons/fa6";
import { PasswordInput } from "../ui/password-input";
import { IoMdCheckmark } from "react-icons/io";

const ForgotPassword = () => {
  const [open, setOpen] = useState(false);
  const steps = [
    {
      title: "Email",
      Heading: "Step 1: Enter Your Email",
      description:
        "Please enter the email address associated with your account.",
      value: (
        <form>
          <Field.Root required mb={6}>
            <Field.Label fontWeight="medium" mb={1} color={"gray.700"}>
              Email <Field.RequiredIndicator />
            </Field.Label>
            <InputGroup
              startelement={<Icon as={MdEmail} color="gray.400" size={"md"} />}
            >
              <Input
                placeholder="Enter your email"
                size="xl"
                borderColor={"gray.300"}
              />
            </InputGroup>
          </Field.Root>

          <Button type="submit" colorScheme="indigo" w="full" rounded={"lg"}>
            Send OTP
          </Button>
        </form>
      ),
    },
    {
      title: "Verify",
      Heading: "Step 2: Verify OTP",
      description:
        "We've sent a one-time password to your email. Please enter it below.",
      value: (
        <Field.Root>
          <Field.Label pb={"2"} fontWeight="medium" color={"gray.700"}>
            Enter otp
          </Field.Label>
          <PinInput.Root w={"full"}>
            <PinInput.HiddenInput />
            <PinInput.Control
              w={"-webkit-fill-available"}
              justifyContent={"space-around"}
            >
              <PinInput.Input index={0} borderColor={"gray.300"} />
              <PinInput.Input index={1} borderColor={"gray.300"} />
              <PinInput.Input index={2} borderColor={"gray.300"} />
              <PinInput.Input index={3} borderColor={"gray.300"} />
            </PinInput.Control>
          </PinInput.Root>
          <HStack justifyContent={"space-between"} w={"full"} mt={2} mb={6}>
            <Text color="gray.500" fontSize={"sm"}>
              Didn't receive the code?
            </Text>
            <Button variant="plain" colorPalette="teal" size="sm">
              Resend OTP
            </Button>
          </HStack>

          <Button type="submit" colorScheme="indigo" w="full" rounded={"lg"}>
            Verify
          </Button>
        </Field.Root>
      ),
    },
    {
      title: "Reset",
      Heading: "Step 3: Create New Password",
      description: "Please create a new password for your account.",
      value: (
        <VStack gap={6} w={"full"} alignItems={"flex-start"}>
          <Field.Root>
            <Field.Label fontWeight={"normal"}>New Password</Field.Label>
            <PasswordInput
              startelement={<Icon as={FaLock} color="gray.400" />}
            />
            <Text fontSize={"sm"} color={"gray.500"} mt={1}>
              Password must be at least 8 characters long and include a mix of
              letters, numbers, and symbols.
            </Text>
          </Field.Root>

          <Field.Root>
            <Field.Label fontWeight={"normal"}>
              Confirm New Password
            </Field.Label>
            <PasswordInput />
          </Field.Root>
          <Button type="submit" colorScheme="indigo" w="full" rounded={"lg"}>
            Reset Password
          </Button>
        </VStack>
      ),
    },
  ];
  return (
    <Box
      py={20}
      px={6}
      css={{
        backgroundImage: "linear-gradient(to bottom right, #eef2ff, #faf5ff)",
      }}
        h={"full"}
    >
      <Container maxW="lg" centerContent>
        <Box textAlign="center" mb={10}>
          <Heading
            fontSize={{ base: "3xl", md: "4xl" }}
            fontWeight="bold"
            color="gray.800"
            my={4}
          >
            Forgot Password
          </Heading>
          <Text color="gray.600" maxW="2xl" mx="auto">
            Reset your password in a few simple steps.
          </Text>
        </Box>
        <Box bg="white" rounded="2xl" shadow="lg" p={{ base: 8, md: 10 }}>
          <Box>
            <Steps.Root
              defaultStep={1}
              count={steps.length}
              colorPalette={"teal"}
              gap={0}
            >
              {steps.map((step, index) => (
                <Steps.Content key={index} index={index}>
                  <Box>
                    <Heading
                      fontSize="xl"
                      fontWeight="semibold"
                      color="gray.800"
                      mb={6}
                    >
                      {step.Heading}
                    </Heading>
                    <Text color="gray.600" mb={6}>
                      {step.description}
                    </Text>
                    {step.value}
                  </Box>
                </Steps.Content>
              ))}
              <Steps.CompletedContent>
                <Box textAlign="center" py={10}>
                  <Box
                    mb={4}
                    display="inline-flex"
                    alignItems="center"
                    justifyContent="center"
                    w={16}
                    h={16}
                    rounded="full"
                    bg="green.100"
                  >
                    <Icon color="green.500">
                        <IoMdCheckmark size={24} />
                    </Icon>
                  </Box>
                  <Heading
                    fontSize="xl"
                    fontWeight="semibold"
                    color="gray.800"
                    mb={2}
                  >
                    Password Reset Successful!
                  </Heading>
                  <Text color="gray.600" mb={6}>
                    Your password has been reset successfully. You can now log
                    in with your new password.
                  </Text>
                  <Button
                    as="a"
                    href="/login"
                    bg="indigo.600"
                    _hover={{ bg: "indigo.700" }}
                    color="white"
                    fontWeight="medium"
                    py={3}
                    px={6}
                    rounded="lg"
                    transition="all 0.2s"
                    _focus={{
                      outline: "none",
                      ring: 2,
                      ringOffset: 2,
                      ringColor: "indigo.500",
                    }}
                  >
                    Go to Login
                  </Button>
                </Box>
              </Steps.CompletedContent>
              <Steps.List
                borderTopWidth={1}
                borderColor="gray.200"
                pt={5}
                mt={5}
              >
                {steps.map((step, index) => (
                  <Steps.Item key={index} index={index} title={step.title}>
                    <VStack>
                      <Steps.Indicator />
                      <Steps.Title>{step.title}</Steps.Title>
                    </VStack>
                    <Steps.Separator />
                  </Steps.Item>
                ))}
              </Steps.List>

              <HStack justifyContent={"center"} mt={6}>
                <ButtonGroup size="sm" variant="outline" gap={4}>
                  <Steps.PrevTrigger asChild>
                    <Button>Prev</Button>
                  </Steps.PrevTrigger>
                  <Steps.NextTrigger asChild>
                    <Button>Next</Button>
                  </Steps.NextTrigger>
                </ButtonGroup>
              </HStack>
            </Steps.Root>
          </Box>
        </Box>{" "}
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
};

export default ForgotPassword;
