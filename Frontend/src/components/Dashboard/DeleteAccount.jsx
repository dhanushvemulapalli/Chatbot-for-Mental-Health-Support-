import { Box, Button, Text, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { useAlert } from "../AlertProvider";

const DeleteAccount = () => {
  const [loading, setLoading] = useState(false);

  const { addAlert, removeAlert } = useAlert(); // Assuming you have a custom hook for alerts

  const handleDeleteAccount = async () => {
    setLoading(true);

    const Alerid = addAlert("info", "Deleting...", null, true); // Show loading alert

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/delete-logged-in-user/",
        {
          method: "POST",
          credentials: "include", // 👈 VERY IMPORTANT to include session cookies
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        addAlert("success", "Account deleted successfully.");
        // Optional: Redirect to login/home page
        // window.location.href = '/login';
      } else {
        addAlert("error", data.error || "Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      addAlert("error", "Network error occurred.");
    }

    setLoading(false);
    removeAlert(Alerid); // Remove loading alert
    
    window.location.reload(); // Reload the page to reflect changes
  };

  return (
    <Box h={"100%"} w={"100%"} p={4}>
      <VStack gap={4} align={"flex-start"} w="100%" h={"100%"} p={4}>
        <VStack gap={2} align={"flex-start"} w="100%">
          <Text fontSize={"2xl"} fontWeight={"medium"} color={"gray.700"}>
            Delete Your Account
          </Text>
          <Text color={"gray.500"}>
            Warning: This will permanently delete your data.
          </Text>
        </VStack>
        <Button onClick={handleDeleteAccount} disabled={loading}>
          {loading ? "Deleting..." : "Delete My Account"}
        </Button>
      </VStack>
    </Box>
  );
};

export default DeleteAccount;
