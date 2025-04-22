//jahnavi
import { Button, CloseButton, Dialog, Portal, Text } from "@chakra-ui/react";

export default function TermsOfServices({ open, setOpen }) {
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
              <Dialog.Title>Terms and Conditions</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Text fontSize="sm" color="gray.600" pt={2}>
                By using the Mind Care System, users agree to provide accurate
                and truthful information during registration and while using the
                platform's services. The system is intended solely for mental
                health support and related purposes; misuse of the platform for
                any unlawful, harmful, or deceptive activity is strictly
                prohibited. Users are responsible for maintaining the
                confidentiality of their login credentials and for all
                activities that occur under their account.
              </Text>
              <Text fontSize="sm" color="gray.600" pt={2}>
                The Mind Care System reserves the right to modify or discontinue
                services, temporarily or permanently, with or without notice,
                for maintenance or improvement purposes. While the platform
                strives to ensure continuous availability, it does not guarantee
                uninterrupted access at all times. Any violation of these terms
                may result in suspension or termination of access to the system
                without prior notice.
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
