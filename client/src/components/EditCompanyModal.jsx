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
} from "@chakra-ui/react";
function EditCompanyModal({
	isOpen,
	onClose,
	title,
	setFormInputs,
	formInputs,
	handleSubmit,
	email,
	formError,
	loading,
}) {
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader size="xs">{title}</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<Box align="center">
						<FormControl>
							<Avatar name={formInputs.name}></Avatar>
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
						</FormControl>
					</Box>
					<FormControl
						isRequired
						isInvalid={formError != undefined && formError.error}
					>
						<FormLabel fontSize="xs" mb={0.5}>
							Company Name
						</FormLabel>
						<Input
							size="xs"
							fontSize="xs"
							placeholder={"Company Name"}
							value={formInputs.name}
							w={200}
							onChange={(e) =>
								setFormInputs({
									...formInputs,
									name: e.target.value,
								})
							}
						></Input>
					</FormControl>
					<FormControl
						isRequired
						isInvalid={formError != undefined && formError.error}
					>
						<FormLabel fontSize="xs" mb={0.5}>
							Email
						</FormLabel>
						<Input
							size="xs"
							fontSize="xs"
							placeholder={email}
							value={formInputs.email}
							w={200}
							onChange={(e) =>
								setFormInputs({
									...formInputs,
									email: e.target.value,
								})
							}
						></Input>
					</FormControl>
					<FormControl
						isRequired
						isInvalid={formError != undefined && formError.error}
					>
						<FormLabel fontSize="xs" mb={0.5}>
							No. of Vacancies
						</FormLabel>
						<NumberInput
							max={30}
							min={1}
							size="xs"
							w={55}
							placeholder="0"
							value={formInputs.maximumInterviews}
							onChange={(e) =>
								setFormInputs({
									...formInputs,
									maximumInterviews: parseInt(e),
								})
							}
						>
							<NumberInputField />
							<NumberInputStepper>
								<NumberIncrementStepper />
								<NumberDecrementStepper />
							</NumberInputStepper>
						</NumberInput>
					</FormControl>
					<FormControl
						isRequired
						isInvalid={formError != undefined && formError.error}
					>
						<FormLabel fontSize="xs" mb={0.5}>
							Description
						</FormLabel>
						<Textarea
							size="xs"
							placeholder={"Company Description"}
							value={formInputs.requirements}
							onChange={(e) =>
								setFormInputs({
									...formInputs,
									requirements: e.target.value,
								})
							}
						></Textarea>
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
					<Button
						size="xs"
						colorScheme="green"
						isLoading={loading}
						loadingText="Saving"
						onClick={() => handleSubmit()}
					>
						Save
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}

export default EditCompanyModal;
