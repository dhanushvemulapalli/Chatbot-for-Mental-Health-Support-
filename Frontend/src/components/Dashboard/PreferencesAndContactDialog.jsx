import { useState } from "react";
import {
  Button,
  CloseButton,
  Dialog,
  Portal,
  Field,
  Fieldset,
  Input,
  Textarea,
  Checkbox,
  Box,
  Stack,
  Icon,
  Grid,
  RadioGroup,
  HStack,
  VStack,
  Text,
  NativeSelect,
} from "@chakra-ui/react";
import axios from "axios";
import { MdBolt, MdMenuBook } from "react-icons/md";
import { HiOutlineBolt, HiOutlineLightBulb } from "react-icons/hi2";
import { IoBookOutline } from "react-icons/io5";
import { LuMessageCircleMore } from "react-icons/lu";
import { AiOutlineAlert } from "react-icons/ai";
import { useAlert } from "../AlertProvider";

const PreferencesAndContactDialog = ({ isOpen, setIsOpen }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone_number: "",
    email_address: "",
    relationship: "",
    interaction_mode: "",
    coping_preferences: [],
    resource_preferences: [],
  });
  const {addAlert} = useAlert();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (field, value) => {
    setFormData((prev) => {
      const updatedArray = prev[field].includes(value)
        ? prev[field].filter((item) => item !== value)
        : [...prev[field], value];
      return { ...prev, [field]: updatedArray };
    });
  };

  const handleSave = async () => {
    const payload = {
      preferences: {
        interaction_mode: formData.interaction_mode,
        coping_preferences: formData.coping_preferences,
        resource_preferences: formData.resource_preferences,
      },
      emergency_contacts: [
        {
          name: formData.name,
          phone_number: formData.phone_number,
          email_address: formData.email_address,
          relationship: formData.relationship,
        },
      ],
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/update-user-profile/",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // Sends cookies (Django session)
        }
      );
      console.log("Response:", payload);
      addAlert("success", "User profile updated successfully!");
      setIsOpen(false);
    } catch (error) {
      const message =
        error.response?.data?.error ||
        "Something went wrong. Please try again.";
      alert("Error: " + message);
    }
  };

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={setIsOpen}
      size="cover"
      placement="center"
      motionPreset="slide-in-bottom"
      scrollBehavior="inside"
    >
      <Dialog.Trigger asChild>
        <Button variant="outline" size="sm" onClick={() => setIsOpen(true)}>
          Open Dialog
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header px={10}>
              <Dialog.Title
                fontWeight={"bold"}
                fontSize={"2xl"}
                color={"gray.800"}
              >
                Your Preferences
              </Dialog.Title>
            </Dialog.Header>
            <Dialog.Body px={10} pt={4}>
              <Stack gap={8}>
                {/* Coping Preferences */}
                <Fieldset.Root size="lg">
                  <VStack align="start" gap={2}>
                    <HStack align="center" mb={4} gap={4}>
                      <Box
                        w={10}
                        h={10}
                        bg="blue.100"
                        rounded="full"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Icon as={HiOutlineBolt} boxSize={6} color="blue.600" />
                      </Box>
                      <Text fontWeight={"medium"} fontSize={"xl"}>
                        Coping Preferences
                      </Text>
                    </HStack>
                    <Text color="gray.600" fontSize="md">
                      Select the coping strategies that work best for you during
                      difficult moments.
                    </Text>
                  </VStack>
                  <Fieldset.Content>
                    <Grid
                      templateColumns={{
                        base: "1fr",
                        md: "repeat(2, 1fr)",
                        lg: "repeat(3, 1fr)",
                      }}
                      gap={4}
                    >
                      {[
                        "Breathing exercises",
                        "Guided meditation",
                        "Physical activity",
                        "Journaling",
                        "Creative expression",
                        "Social connection",
                      ].map((label, idx) => (
                        <Checkbox.Root
                          colorScheme="blue"
                          size="lg"
                          key={idx}
                          rounded={"md"}
                          onCheckedChange={() =>
                            handleCheckboxChange("coping_preferences", label)
                          }
                          isChecked={formData.coping_preferences.includes(
                            label
                          )}
                          borderColor={"gray.400"}
                          borderWidth={"0.9px"}
                          p={4}
                        >
                          <Checkbox.HiddenInput />
                          <Checkbox.Control borderColor={"gray.500"} />
                          <Checkbox.Label
                            fontWeight={"normal"}
                            color="gray.600"
                          >
                            {label}
                          </Checkbox.Label>
                        </Checkbox.Root>
                      ))}
                    </Grid>
                  </Fieldset.Content>
                </Fieldset.Root>

                {/* Resource Preferences */}
                <Fieldset.Root size="lg">
                  <VStack align="start" gap={2}>
                    <HStack align="center" mb={4} gap={4}>
                      <Box
                        w={10}
                        h={10}
                        bg="green.100"
                        rounded="full"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Icon
                          as={IoBookOutline}
                          boxSize={6}
                          color="green.600"
                        />
                      </Box>
                      <Text fontWeight={"medium"} fontSize={"xl"}>
                        Resource Preferences
                      </Text>
                    </HStack>
                    <Text color="gray.600" fontSize="md">
                      What types of resources would you find most helpful?
                    </Text>
                  </VStack>

                  <Fieldset.Content>
                    <Grid
                      templateColumns={{
                        base: "1fr",
                        md: "repeat(2, 1fr)",
                        lg: "repeat(3, 1fr)",
                      }}
                      gap={4}
                    >
                      {[
                        "Educational articles",
                        "Video guides",
                        "Audio exercises",
                        "Interactive worksheets",
                        "Community forums",
                        "Professional resources",
                      ].map((label, idx) => (
                        <Checkbox.Root
                          colorScheme="blue"
                          size="lg"
                          key={idx}
                          rounded={"md"}
                          borderColor={"gray.400"}
                          borderWidth={"0.9px"}
                          p={4}
                          onCheckedChange={() =>
                            handleCheckboxChange("resource_preferences", label)
                          }
                          isChecked={formData.resource_preferences.includes(
                            label
                          )}
                        >
                          <Checkbox.HiddenInput />
                          <Checkbox.Control borderColor={"gray.500"} />
                          <Checkbox.Label
                            fontWeight={"normal"}
                            color="gray.600"
                          >
                            {label}
                          </Checkbox.Label>
                        </Checkbox.Root>
                      ))}
                    </Grid>
                  </Fieldset.Content>
                </Fieldset.Root>

                {/* Interaction Preferences */}
                <Fieldset.Root size="lg">
                  <VStack align="start" gap={2}>
                    <HStack align="center" mb={4} gap={4}>
                      <Box
                        w={10}
                        h={10}
                        bg="purple.100"
                        rounded="full"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Icon
                          as={LuMessageCircleMore}
                          boxSize={6}
                          color="purple.600"
                        />
                      </Box>
                      <Text fontWeight={"medium"} fontSize={"xl"}>
                        Interaction Preferences
                      </Text>
                    </HStack>
                    <Text color="gray.600" fontSize="md">
                      How would you prefer MindCare to communicate with you?
                    </Text>
                  </VStack>

                  <Fieldset.Content>
                    <RadioGroup.Root
                      value={formData.interaction_mode}
                      onValueChange={(e) => {
                        setFormData({ ...formData, interaction_mode: e.value });
                        console.log(e);
                      }}
                      name="interaction mode"
                    >
                      <Stack gap={4}>
                        {[
                          {
                            value: "Direct and straightforward communication",
                            label: "1",
                          },
                          {
                            value: "Warm and supportive communication",
                            label: "2",
                          },
                          {
                            value: "Coaching-oriented communication",
                            label: "3",
                          },
                          {
                            value: "Educational and informative communication",
                            label: "4",
                          },
                        ].map((item) => (
                          <RadioGroup.Item
                            value={item.value}
                            key={item.label}
                            rounded={"md"}
                            borderColor={"gray.400"}
                            borderWidth={"0.9px"}
                            p={4}
                          >
                            <RadioGroup.ItemHiddenInput />
                            <RadioGroup.ItemIndicator />
                            <RadioGroup.ItemText
                              fontWeight={"normal"}
                              color="gray.600"
                              fontSize={"md"}
                            >
                              {item.value}
                            </RadioGroup.ItemText>
                          </RadioGroup.Item>
                        ))}
                      </Stack>
                    </RadioGroup.Root>
                  </Fieldset.Content>
                </Fieldset.Root>

                {/* Emergency Contact */}
                <Fieldset.Root size="lg">
                  <VStack align="start" gap={2}>
                    <HStack align="center" mb={4} gap={4}>
                      <Box
                        w={10}
                        h={10}
                        bg="red.100"
                        rounded="full"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Icon as={AiOutlineAlert} boxSize={6} color="red.600" />
                      </Box>
                      <Text fontWeight={"medium"} fontSize={"xl"}>
                        Emergency Contact Information
                      </Text>
                    </HStack>
                    <Text color="gray.600" fontSize="md">
                      Optional but recommended: In case of emergency, MindCare
                      can help connect you with your support person.
                    </Text>
                  </VStack>

                  <Fieldset.Content>
                    <Grid
                      templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                      gap={6}
                    >
                      <Field.Root>
                        <Field.Label fontWeight={"normal"}>
                          Contact Name:
                        </Field.Label>
                        <Input
                          name="name"
                          placeholder="Full name"
                          value={formData.name}
                          onChange={handleChange}
                        />
                      </Field.Root>

                      <Field.Root>
                        <Field.Label fontWeight={"normal"}>
                          Relationship
                        </Field.Label>
                        <NativeSelect.Root>
                          <NativeSelect.Field
                            name="relationship"
                            placeholder="Select relationship"
                            value={formData.relationship}
                            onChange={handleChange}
                          >
                            {[
                              "Family member",
                              "Friend",
                              "Partner/Spouse",
                              "Therapist/Counselor",
                              "Doctor/Healthcare provider",
                              "Other",
                            ].map((item) => (
                              <option key={item} value={item}>
                                {item}
                              </option>
                            ))}
                          </NativeSelect.Field>
                          <NativeSelect.Indicator />
                        </NativeSelect.Root>
                      </Field.Root>

                      <Field.Root>
                        <Field.Label fontWeight={"normal"}>
                          Phone Number
                        </Field.Label>
                        <Input
                          type="tel"
                          name="phone_number"
                          placeholder="Phone number"
                          value={formData.phone_number}
                          onChange={handleChange}
                        />
                      </Field.Root>

                      <Field.Root>
                        <Field.Label fontWeight={"normal"}>
                          Email Address
                        </Field.Label>
                        <Input
                          type="email"
                          name="email_address"
                          placeholder="Email address"
                          value={formData.email_address}
                          onChange={handleChange}
                        />
                      </Field.Root>
                    </Grid>

                    <Text mt={6} colorScheme="red">
                      * MindCare contacting this person in case of emergency
                    </Text>
                  </Fieldset.Content>
                </Fieldset.Root>
              </Stack>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
              </Dialog.ActionTrigger>
              <Button onClick={handleSave}>Save Preferences</Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default PreferencesAndContactDialog;
