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
    AvatarBadge,
    Center,
    Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { handleFileUpload } from "../utils/firebase/firebaseUtils";
import { useEffect } from "react";
import { MdAdd } from "react-icons/md";
import { updateCompanyProfilePicture } from "../utils/api/company.api";

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
    const [imageLoading, setimageLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        if (formInputs && formInputs.profilePhoto) {
            setImageUrl(formInputs.profilePhoto);
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
                    "company/profile-pictures/",
                    formInputs.companyId
                );
                if (res.error) {
                    //TODO: add toast
                    setimageLoading(false);
                } else {
                    const __res = await updateCompanyProfilePicture({
                        companyId: formInputs.companyId,
                        imageUrl: res.data,
                    });
                    if (__res.error) {
                        //TODO: add toast
                        setimageLoading(false);
                    }
                }
                setimageLoading(false);
            };
            reader.readAsDataURL(file);
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader size="xs">{title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Box align="center">
                        <FormControl>
                            <label>
                                <Avatar size="xl" src={imageUrl}>
                                    <AvatarBadge boxSize="0.9em" bg="green.500">
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
                            {imageLoading && (
                                <Center mt={2}>
                                    <Text fontSize="xl">Uploading...</Text>
                                </Center>
                            )}
                        </FormControl>
                    </Box>
                    <FormControl
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
                            readOnly
                            w={200}
                        ></Input>
                    </FormControl>
                    <FormControl
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
                            readOnly
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
                            value={formInputs.maximumInterviews || 0}
                            onChange={(e) => {
                                if (e) {
                                    const _num = parseInt(e) || 0;
                                    setFormInputs({
                                        ...formInputs,
                                        maximumInterviews: _num,
                                    });
                                }
                            }}
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
                        loadingText="Updating"
                        onClick={() => handleSubmit()}
                    >
                        Update
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default EditCompanyModal;
