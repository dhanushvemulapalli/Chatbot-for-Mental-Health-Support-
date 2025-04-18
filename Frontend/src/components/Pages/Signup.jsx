import {
  Box,
  Button,
  Container,
  Field,
  Fieldset,
  Input,
  InputGroup,
  Link,
  NativeSelect,
  Separator,
  Stack,
  Text,
  Heading,
  Checkbox,
  Icon,
  Flex,
  HStack,
} from "@chakra-ui/react";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaFacebook,
  FaShieldAlt,
} from "react-icons/fa";
import { useState } from "react";
import { signInWithGoogle } from "../Authentication/firebase";
import { FcGoogle } from "react-icons/fc";
import PrivacyPolicy from "../Landing/PrivacyPolicy";
import TermsOfServices from "../Landing/TermsOfServices";
import { useForm } from "react-hook-form";
import { encryptData } from "../Authentication/cryptoUtils";
import axios from "axios";
import { useAlert } from "../AlertProvider";
import { useNavigate } from "react-router-dom";

const defaultFormValues = {
  username: "",
  emailaddress: "",
  password: "",
  confirm_password: "",
};

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const [TOSopen, setTOSOpen] = useState(false);
  const { addAlert } = useAlert(); // Assuming you have a custom hook for alerts
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({ defaultValues: defaultFormValues });
  const password = watch("password", "");
  const Navigate = useNavigate();
  const onSubmit = handleSubmit(async (data) => {
    try {
      const payload = {
        username: data.username,
        passwordhash: encryptData(data.password), // Encrypt only password
        emailaddress: data.emailaddress, // MUST match backend's expected key
      };
      console.log("Payload before sending:", payload); // Debugging line
      const response = await axios.post(
        "http://127.0.0.1:8000/api/signup/",
        payload
      );
      addAlert("success", "Signup successful!.");
      console.log("Signup successful:", response.data);
      Navigate("/login"); // Redirect to login page after successful signup
    } catch (error) {
      const errorMsg =
        error.response?.data?.error ||
        error.response?.data?.message ||
        JSON.stringify(error.response?.data) ||
        error.message;
      addAlert("error", `Signup failed. Please try again.\n${errorMsg}`);
      console.error("Signup failed:", errorMsg);
    }
  });

  return (
    <form onSubmit={onSubmit}>
      <Box
        py={20}
        px={6}
        css={{
          backgroundImage: "linear-gradient(to bottom right, #eef2ff, #faf5ff)",
        }}
      >
        <Container maxW="md" centerContent>
          <Box textAlign="center" mb={5}>
            <Heading fontSize={{ base: "3xl", md: "4xl" }} mb={4}>
              Create Account
            </Heading>
            <Text color="gray.600">
              Join MindCare today and start your wellness journey.
            </Text>
          </Box>

          <Box
            bg="white"
            rounded="2xl"
            shadow="lg"
            p={{ base: 8, md: 10 }}
            w={"md"}
          >
            <Fieldset.Root size="lg">
              <Fieldset.Content>
                <Stack gap={5}>
                  <Field.Root>
                    <Field.Label fontWeight={"normal"}>User Name</Field.Label>
                    <InputGroup
                      startElement={<Icon as={FaUser} color="gray.400" />}
                    >
                      <Input
                        placeholder="Enter your user name"
                        borderRadius={"lg"}
                        borderColor={"gray.300"}
                        {...register("username", {
                          required: "Username is required",
                        })}
                      />
                    </InputGroup>
                  </Field.Root>

                  <Field.Root>
                    <Field.Label fontWeight={"normal"}>
                      Email Address
                    </Field.Label>
                    <InputGroup
                      startElement={<Icon as={FaEnvelope} color="gray.400" />}
                    >
                      <Input
                        type="email"
                        placeholder="Enter your email address"
                        borderRadius={"lg"}
                        borderColor={"gray.300"}
                        {...register("emailaddress", {
                          required: "Email address is required",
                        })}
                      />
                    </InputGroup>
                  </Field.Root>

                  <Field.Root invalid={!!errors.password}>
                    <Field.Label fontWeight={"normal"}>Password</Field.Label>
                    <InputGroup
                      startElement={<Icon as={FaLock} color="gray.400" />}
                      endElement={
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          <Icon
                            as={showPassword ? FaEyeSlash : FaEye}
                            color="gray.400"
                          />
                        </Button>
                      }
                    >
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        borderRadius={"lg"}
                        borderColor={"gray.300"}
                        {...register("password", {
                          required: "Password is required",
                          minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters",
                          },
                        })}
                      />
                    </InputGroup>

                    <Field.ErrorText>
                      {errors.password?.message}
                    </Field.ErrorText>
                  </Field.Root>

                  <Field.Root invalid={!!errors.confirm_password}>
                    <Field.Label fontWeight={"normal"}>
                      Confirm Password
                    </Field.Label>
                    <InputGroup
                      startElement={<Icon as={FaLock} color="gray.400" />}
                    >
                      <Input
                        type="password"
                        placeholder="Confirm your password"
                        borderRadius={"lg"}
                        borderColor={"gray.300"}
                        {...register("confirm_password", {
                          required: "Confirm password is required",
                          validate: (value) =>
                            value === password || "Passwords do not match",
                        })}
                        isInvalid={errors.confirm_password}
                      />
                    </InputGroup>

                    <Field.ErrorText>
                      {errors.confirm_password?.message}
                    </Field.ErrorText>
                  </Field.Root>

                  <Flex align="center">
                    <Checkbox.Root
                      required
                      id="terms"
                      size="lg"
                      colorScheme="teal"
                      defaultChecked={false}
                    >
                      <Checkbox.HiddenInput />
                      <Checkbox.Control required />
                      <Checkbox.Label fontWeight={"normal"}>
                        <Text ml={2} fontSize="sm">
                          I agree to the{" "}
                          <Link onClick={() => setTOSOpen(true)}>
                            Terms of Service
                          </Link>
                          <TermsOfServices
                            open={TOSopen}
                            setOpen={setTOSOpen}
                          />{" "}
                          and{" "}
                          <Link onClick={() => setOpen(true)}>
                            Privacy Policy
                          </Link>
                          <PrivacyPolicy open={open} setOpen={setOpen} />
                        </Text>
                      </Checkbox.Label>
                    </Checkbox.Root>
                  </Flex>

                  <Fieldset.ErrorText>
                    Some fields are invalid. Please check them.
                  </Fieldset.ErrorText>
                  <Button type="submit" size="lg" w="full">
                    Create Account
                  </Button>
                </Stack>
              </Fieldset.Content>
            </Fieldset.Root>
            <HStack my={4} align="center" color="gray.500">
              <Separator flex="1" />
              <Text flexShrink="0">OR</Text>
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

            <Text textAlign="center" fontSize="sm" mt={6}>
              Already have an account?{" "}
              <Link href="/login" fontWeight="medium">
                Log in
              </Link>
            </Text>
          </Box>
          <Box mt={6} textAlign="center">
            <Flex
              justify="center"
              align="center"
              color="gray.500"
              fontSize="sm"
              mb={2}
            >
              <Icon as={FaShieldAlt} w={4} h={4} mr={1} />
              Secure signup with 256-bit encryption
            </Flex>
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
          </Box>
        </Container>
      </Box>
    </form>
  );
}
