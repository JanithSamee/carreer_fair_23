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
	Text,
	FormControl,
	FormLabel,
	Input,
	NumberInputField,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper,
	NumberInput,
	Textarea,
} from "@chakra-ui/react";
function CompanyModal({ isOpen, onClose, title, companyName, companyDes }) {
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader size="xs">{title}</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<FormControl>
						<Box align="center">
							<Avatar name={companyName}></Avatar>
							<Input
								type="file"
								size="xs"
								zIndex={100}
								opacity={0}
								w={10}
								mt={2}
								ml={-50}
								hidden={title === "Add Company"}
							></Input>
						</Box>
						<FormLabel fontSize="xs" mb={0.5}>
							Company Name
						</FormLabel>
						<Input
							size="xs"
							fontSize="xs"
							placeholder={companyName}
							w={200}
						></Input>
						<FormLabel fontSize="xs" mb={0.5}>
							No. of Vacancies
						</FormLabel>
						<NumberInput max={30} min={1} size="xs" w={55}>
							<NumberInputField />
							<NumberInputStepper>
								<NumberIncrementStepper />
								<NumberDecrementStepper />
							</NumberInputStepper>
						</NumberInput>
						{/* <FormLabel fontSize="xs" mb={0.5}>
							Interveiw Start time
						</FormLabel>
						<Input
							size="xs"
							fontSize="xs"
							placeholder={companyName}
							w={100}
							type="time"
						></Input> */}
						<FormLabel fontSize="xs" mb={0.5}>
							Description
						</FormLabel>
						<Textarea size="xs" placeholder={companyDes}></Textarea>
					</FormControl>
				</ModalBody>

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
