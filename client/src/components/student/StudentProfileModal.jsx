import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
	FormControl,
	FormLabel,
	Input,
	Button,
	Box,
	Center,
	Avatar,
	AvatarBadge,
	Text,
	FormErrorMessage,
	useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import {
	updateStudent,
	updateStudentProfilePicture,
} from "../../utils/api/student.api";
import { handleFileUpload } from "../../utils/firebase/firebaseUtils";
import useAuth from "../../utils/providers/AuthProvider";
import { auth, updatePassword } from "../../utils/firebase/firebaseConfig";

export default function StudentProfileModal({ isOpen, onClose, studentData }) {
	const toast = useToast();
	const { user, setuser } = useAuth();
	const [loading, setloading] = useState(false);
	const [imageLoading, setimageLoading] = useState(false);
	const [showUpdatePassword, setshowUpdatePassword] = useState(false);
	const [formErrorUpdatePW, setformErrorUpdatePW] = useState("");
	const [formInput, setFormInput] = useState({
		firstName: "",
		lastName: "",
		password: "",
		confirmPassword: "",
	});
	const [formInputUpdatePW, setFormInputUpdatePW] = useState({
		currentPassword: "",
		newPassword: "",
		confirmPassword: "",
	});
	const handleInputChangeUpdatePW = (event) => {
		const { name, value } = event.target;
		setFormInputUpdatePW((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSubmitUpdatePW = async (event) => {
		event.preventDefault();
		setloading(true);
		if (
			formInputUpdatePW.newPassword !== formInputUpdatePW.confirmPassword
		) {
			setloading(false);

			return setformErrorUpdatePW("Password Does not Match!");
		}
		if (
			!formInputUpdatePW.newPassword ||
			!formInputUpdatePW.confirmPassword
			// !formInputUpdatePW.newPassword
		) {
			setloading(false);

			return setformErrorUpdatePW("Invalid Inputs");
		}

		try {
			// Reauthenticate user with current password

			// Update password
			// console.log(formInputUpdatePW);
			await updatePassword(
				auth.currentUser,
				formInputUpdatePW.newPassword
			);
			setloading(false);
			onClose();
			toast({
				title: "Password updated!",
				description: "Your password has been updated successfully.",
				status: "success",
				duration: 5000,
				isClosable: true,
			});
		} catch (error) {
			setloading(false);
			toast({
				title: "Error",
				description: error.message,
				status: "error",
				duration: 5000,
				isClosable: true,
			});
		}
	};
	const handleInputChange = (event) => {
		const { name, value, files } = event.target;
		setFormInput((prevState) => ({
			...prevState,
			[name]: files ? files[0] : value,
		}));
	};

	const handleSubmit = async (event) => {
		setloading(true);
		event.preventDefault();
		const _res = await updateStudent(formInput);
		if (_res.error) {
			console.log(_res.data);
			return toast({
				title: "An error occurred.",
				description: _res.data,
				status: "error",
				duration: 9000,
				isClosable: true,
			});
		}
		toast({
			title: "Success",
			description: "Successfully Saved!",
			status: "success",
			duration: 9000,
			isClosable: true,
		});
		setloading(false);
	};
	const [imageUrl, setImageUrl] = useState("");

	useEffect(() => {
		console.count("StudentProfileModal");
		if (studentData && studentData.profilePhoto) {
			setImageUrl(studentData.profilePhoto);
		}
	}, []);

	function handleImageUpload(e) {
		setimageLoading(true);
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = async () => {
				setImageUrl(reader.result);
				const res = await handleFileUpload(
					file,
					"student/profile-pictures/",
					studentData.indexNumber
				);
				if (res.error) {
					setimageLoading(false);
					return toast({
						title: "An error occurred.",
						description: res.data,
						status: "error",
						duration: 9000,
						isClosable: true,
					});
				} else {
					const __res = await updateStudentProfilePicture(res.data);
					setuser({ ...user, photoURL: res.data });
					if (__res.error) {
						setimageLoading(false);
						return toast({
							title: "An error occurred.",
							description: __res.data,
							status: "error",
							duration: 9000,
							isClosable: true,
						});
					}
				}
				setimageLoading(false);
			};
			reader.readAsDataURL(file);
		} else {
			setimageLoading(false);
			return toast({
				title: "Invalid Inputs!",
				description: "Please Select a Photo to upload",
				status: "warning",
				duration: 9000,
				isClosable: true,
			});
		}
	}

	return (
		<>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Profile</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						{showUpdatePassword ? (
							<>
								<form onSubmit={handleSubmitUpdatePW}>
									{/* <FormControl id="currentPassword" mb="2">
                                        <FormLabel>Current Password</FormLabel>
                                        <Input
                                            type="password"
                                            name="currentPassword"
                                            value={
                                                formInputUpdatePW.currentPassword
                                            }
                                            onChange={handleInputChangeUpdatePW}
                                        />
                                    </FormControl> */}
									<FormControl
										id="newPassword"
										mb="2"
										isInvalid={formErrorUpdatePW}
									>
										<FormLabel>New Password</FormLabel>
										<Input
											type="password"
											name="newPassword"
											value={
												formInputUpdatePW.newPassword
											}
											onChange={handleInputChangeUpdatePW}
										/>
									</FormControl>
									<FormControl
										id="confirmPassword"
										mb="2"
										isInvalid={formErrorUpdatePW}
									>
										<FormLabel>Confirm Password</FormLabel>
										<Input
											type="password"
											name="confirmPassword"
											value={
												formInputUpdatePW.confirmPassword
											}
											onChange={handleInputChangeUpdatePW}
										/>
										{formErrorUpdatePW && (
											<FormErrorMessage>
												{formErrorUpdatePW}
											</FormErrorMessage>
										)}
									</FormControl>
									<Button
										type="submit"
										colorScheme="blue"
										isLoading={loading}
										loadingText="Updating..."
									>
										Update Password
									</Button>
									<Button
										type="submit"
										colorScheme="red"
										ml={4}
										onClick={() =>
											setshowUpdatePassword(false)
										}
									>
										Change Profile
									</Button>
								</form>
							</>
						) : (
							<>
								<Center>
									<label>
										<Avatar size="xl" src={imageUrl}>
											<AvatarBadge
												boxSize="0.9em"
												bg="green.500"
											>
												<MdAdd
													style={{ margin: 0 }}
													color="white"
													size={30}
												></MdAdd>
											</AvatarBadge>
											<input
												type="file"
												style={{ display: "none" }}
												onChange={handleImageUpload}
											/>
										</Avatar>
									</label>
								</Center>
								{imageLoading && (
									<Center mt={2}>
										<Text fontSize="xl">Uploading...</Text>
									</Center>
								)}
								<form onSubmit={handleSubmit}>
									<FormControl id="firstName" mb="2">
										<FormLabel>First Name</FormLabel>
										<Input
											type="text"
											name="firstName"
											value={formInput.firstName}
											placeholder={studentData.firstName}
											onChange={handleInputChange}
										/>
									</FormControl>
									<FormControl id="lastName" mb="2">
										<FormLabel>Last Name</FormLabel>
										<Input
											type="text"
											name="lastName"
											value={formInput.lastName}
											placeholder={studentData.lastName}
											onChange={handleInputChange}
										/>
									</FormControl>

									<Button
										type="submit"
										colorScheme="blue"
										isLoading={loading}
										loadingText="Submiting..."
									>
										Submit
									</Button>
									<Button
										type="submit"
										colorScheme="red"
										ml={4}
										onClick={() =>
											setshowUpdatePassword(true)
										}
									>
										Update Password
									</Button>
								</form>
							</>
						)}
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
}
