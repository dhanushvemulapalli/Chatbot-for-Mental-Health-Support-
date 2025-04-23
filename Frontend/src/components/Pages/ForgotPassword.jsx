//jahnavi
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
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa6";
import { PasswordInput } from "../ui/password-input";
import { IoMdCheckmark } from "react-icons/io";
import { encryptData } from "../Authentication/cryptoUtils";
import PrivacyPolicy from "../Landing/PrivacyPolicy";
import { Link } from "react-router-dom";
import { useAlert } from "../AlertProvider";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("    ");
  const [newPassword, setNewPassword] = useState("");
  const [currentStep, setCurrentStep] = useState(0); // Track the current step
  const [open, setOpen] = useState(false);
  const { addAlert, removeAlert } = useAlert(); // Assuming you have a custom hook for alerts
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const validatePassword = (password) => {
    const regex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;
    return regex.test(password);
  };
  const handleStepComplete = () => {
    console.log("Step", currentStep, "completed ✅");
    setCurrentStep((prev) => Math.min(prev + 1, steps.length)); // prevent going out of bounds
  };

  const handleEmailSubmit = async (e) => {
    const Alerid = addAlert("info", "Sending OTP...", null, true); // Show loading alert
    e.preventDefault();
    const response = await fetch("http://127.0.0.1:8000/api/send-otp/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    console.log(response.ok);
    if (response.ok) {
      removeAlert(Alerid); // Remove loading alert
      setTimeout(() => {
        addAlert("success", "OTP Sent successfully", 2000); // Show success alert
      }, 1000); // Delay to show loading alert before success

      handleStepComplete(); // Move to verify OTP step
    } else {
      removeAlert(Alerid); // Remove loading alert
      setTimeout(() => {
        addAlert("error", data.error || "Something went wrong.", 2000); // Show success alert
      }, 1000); // Delay to show loading alert before success
    }
  };

  const handleResendOtp = async (e) => {
    const Alerid = addAlert("info", "Sending OTP...", null, true); // Show loading alert
    e.preventDefault();
    const response = await fetch("http://127.0.0.1:8000/api/resend_otp/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    console.log(response.ok);
    if (response.ok) {
      removeAlert(Alerid); // Remove loading alert
      setTimeout(() => {
        addAlert("success", "New OTP Sent successfully", 2000); // Show success alert
      }, 1000); // Delay to show loading alert before success
    } else {
      removeAlert(Alerid); // Remove loading alert
      setTimeout(() => {
        addAlert("error", data.error || "Something went wrong.", 2000); // Show success alert
      }, 1000); // Delay to show loading alert before success
    }
  };

  const handleOtpSubmit = async (e) => {
    const Alerid = addAlert("info", "Sending OTP...", null, true); // Show loading alert
    e.preventDefault();
    const response = await fetch("http://127.0.0.1:8000/api/verify-otp/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, otp }),
    });
    console.log(email, otp);

    const data = await response.json();
    if (response.ok) {
      removeAlert(Alerid); // Remove loading alert
      setTimeout(() => {
        addAlert("success", "OTP verified Successfully", 2000); // Show success alert
      }, 1000); // Delay to show loading alert before success

      setCurrentStep(2); // Move to set new password step
    } else {
      removeAlert(Alerid); // Remove loading alert
      setTimeout(() => {
        addAlert("error", data.error || "Invalid OTP.", 2000); // Show success alert
      }, 1000); // Delay to show loading alert before success
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!validatePassword(newPassword)) {
      setError(
        "Password must be 8–16 characters, include at least one uppercase letter, one number, and one special character."
      );
      return;
    }

    setError(""); // Clear error message

    const Alerid = addAlert("info", "Updating Password...", null, true); // Show loading alert
    const response = await fetch(
      "http://127.0.0.1:8000/api/set-new-password/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, new_password: encryptData(newPassword) }),
      }
    );

    const data = await response.json();
    console.log(response);
    if (response.ok) {
      removeAlert(Alerid); // Remove loading alert
      setTimeout(() => {
        addAlert("success", "Password Changed Successful", 2000); // Show success alert
      }, 1000); // Delay to show loading alert before success

      setCurrentStep(3); // Password reset successful, show confirmation
    } else {
      removeAlert(Alerid); // Remove loading alert
      setTimeout(() => {
        addAlert("error", data.error || "Something went wrong.", 2000); // Show success alert
      }, 1000); // Delay to show loading alert before success
    }
  };

  const steps = [
    {
      title: "Email",
      Heading: "Step 1: Enter Your Email",
      description:
        "Please enter the email address associated with your account.",
      value: (
        <form onSubmit={handleEmailSubmit}>
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
        <form onSubmit={handleOtpSubmit}>
          <Field.Root>
            <HStack justifyContent={"space-between"} w={"full"}>
              <Field.Label pb={"2"} fontWeight="medium" color={"gray.700"}>
                Enter OTP
              </Field.Label>
              <Button variant={"plain"} onClick={handleResendOtp}>Didn't receive the OTP? </Button>
            </HStack>
            <PinInput.Root w={"full"}>
              <PinInput.HiddenInput />
              <PinInput.Control
                w={"-webkit-fill-available"}
                justifyContent={"space-around"}
              >
                {[0, 1, 2, 3].map((index) => (
                  <PinInput.Input
                    key={index}
                    index={index}
                    borderColor={"gray.300"}
                    onChange={(e) => {
                      const value = e.target.value;
                      setOtp((prev) => {
                        const updated = prev.split("");
                        updated[index] = value;
                        return updated.join("");
                      });
                    }}
                  />
                ))}
              </PinInput.Control>
            </PinInput.Root>

            <Button
              type="submit"
              colorScheme="indigo"
              w="full"
              rounded={"lg"}
              mt={6}
            >
              Verify
            </Button>
          </Field.Root>
        </form>
      ),
    },
    {
      title: "Reset",
      Heading: "Step 3: Create New Password",
      description: "Please create a new password for your account.",
      value: (
        <form onSubmit={handlePasswordSubmit}>
          <VStack gap={6} w={"full"} alignItems={"flex-start"}>
            <Field.Root>
              <Field.Label fontWeight={"normal"}>New Password</Field.Label>
              <PasswordInput
                startelement={<Icon as={FaLock} color="gray.400" />}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </Field.Root>

            <Field.Root>
              <Field.Label fontWeight={"normal"}>
                Confirm New Password
              </Field.Label>
              <PasswordInput
                startelement={<Icon as={FaLock} color="gray.400" />}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Field.Root>
            {error && (
              <Text color="red.500" fontSize="sm">
                {error}
              </Text>
            )}
            <Button type="submit" colorScheme="indigo" w="full" rounded={"lg"}>
              Reset Password
            </Button>
          </VStack>
        </form>
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
      h={"100vh"}
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
          <Steps.Root
            count={steps.length}
            colorPalette={"teal"}
            gap={0}
            step={currentStep}
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
            <Steps.List pt={10} pb={6}>
              {steps.map((step, index) => (
                <Steps.Item key={index} index={index} title={step.title}>
                  <Steps.Indicator />
                  <Steps.Title>{step.title}</Steps.Title>
                  <Steps.Separator />
                </Steps.Item>
              ))}
            </Steps.List>
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
                  Your password has been reset successfully. You can now log in
                  with your new password.
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
          </Steps.Root>
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
};

export default ForgotPassword;
