//jahnavi
import { Button, CloseButton, Dialog, Portal, Text } from "@chakra-ui/react";

export default function PrivacyPolicy({ open, setOpen }) {
  return (
    <Dialog.Root
      lazyMount
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
      placement={"center"}
    >
      {/* <Dialog.Trigger asChild>
        <Button variant="outline">Open</Button>
      </Dialog.Trigger> */}
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Privacy Policy</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Text fontSize="sm" color="gray.600" pt={2}>
                The Mind Care System is committed to maintaining the privacy,
                confidentiality, and security of all user data. This includes
                personal details, mental health records, appointment history,
                and consultation notes. To ensure this, the system uses Advanced
                Encryption Standard (AES) protocol for secure encryption of all
                sensitive data, both during transmission and while stored in the
                system. This helps prevent unauthorized access, data breaches,
                and misuse of information.
              </Text>
              <Text fontSize="sm" color="gray.600" pt={2}>
                Only authorized personnel and verified mental health
                professionals have access to user data, and such access is
                granted strictly based on necessity. The Mind Care System does
                not share any personal or health information with third parties
                without explicit user consent, unless required by law. Users
                have full rights over their data, including the ability to view,
                modify, or request deletion of their information as needed.
              </Text>
            </Dialog.Body>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
