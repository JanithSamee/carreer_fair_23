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
	Avatar,
	Box,
	FormControl,
	FormLabel,
	Input,
	NumberInputField,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper,
	NumberInput,
	Textarea,
	Center,
	Text,
	Stack,
} from "@chakra-ui/react";
function CompanyModal({
	isOpen,
	onClose,
	title,
	companyName,
	companyDes,
	email,
	vacancies,
	img_url,
}) {
	return (
		<Modal isOpen={isOpen} onClose={onClose} size={["xs", "xs", "lg"]}>
			<ModalOverlay />
			<ModalContent w={{ sm: "90%" }}>
				<ModalHeader size="xs">{title}</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<Center>
						<Stack align="center">
							<Avatar
								name={companyName}
								size="lg"
								src={img_url}
							></Avatar>
							<Text>{companyName}</Text>
							<Text>{email}</Text>
							<Text fontSize="xs">
								{vacancies} Vacancies Available
							</Text>
							<Text fontSize="xs">{companyDes}</Text>
						</Stack>
					</Center>
				</ModalBody>

				<ModalFooter></ModalFooter>
			</ModalContent>
		</Modal>
	);
}

export default CompanyModal;
