import {
	useDisclosure,
	Modal,
	ModalBody,
	ModalOverlay,
	Button,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalCloseButton,
} from "@chakra-ui/react";
function CompanyModal({ isOpen, onClose, onOpen, title }) {
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader size="xs">{title}</ModalHeader>
				<ModalCloseButton />
				<ModalBody>TBA</ModalBody>

				<ModalFooter>
					<Button
						colorScheme="red"
						mr={3}
						onClick={onClose}
						size="xs"
					>
						Close
					</Button>
					<Button size="xs" colorScheme="green">
						Save
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}

export default CompanyModal;
