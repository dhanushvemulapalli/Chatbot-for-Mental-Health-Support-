import React, { createContext, useContext, useState } from "react";
import { Alert, Box, VStack, Spinner } from "@chakra-ui/react";

const AlertContext = createContext(null);

export const AlertProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([]);

  const addAlert = (
    type = "info",
    message = "",
    time = 2000,
    spinner = false
  ) => {
    const id = Date.now();
    setAlerts((prev) => {
      const newAlerts = [...prev, { id, type, message, spinner }];
      return newAlerts.slice(-3); // Keep last 3 alerts
    });

    if (time !== null) {
      setTimeout(() => {
        setAlerts((prev) => prev.filter((alert) => alert.id !== id));
      }, time);
    }

    return id;
  };

  const removeAlert = (id) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

  return (
    <AlertContext.Provider value={{ addAlert, removeAlert }}>
      {children}
      <AlertStack alerts={alerts} />
    </AlertContext.Provider>
  );
};

const AlertStack = ({ alerts }) => {
  return (
    <Box
      position="fixed"
      top="20px"
      left="50%"
      transform="translateX(-50%)"
      zIndex="1000"
    >
      <VStack gap={3} width="400px">
        {alerts.map((alert) => (
          <Alert.Root key={alert.id} status={alert.type}>
            {alert.spinner ? (
              <Alert.Indicator>
                <Spinner size="sm" />
              </Alert.Indicator>
            ) : (
              <Alert.Indicator />
            )}

            <Alert.Content>
              <Alert.Title>{alert.message}</Alert.Title>
            </Alert.Content>
          </Alert.Root>
        ))}
      </VStack>
    </Box>
  );
};

export const useAlert = () => {
  return useContext(AlertContext);
};
