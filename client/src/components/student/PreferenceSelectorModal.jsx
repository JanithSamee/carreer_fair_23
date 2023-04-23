import { useEffect, useState } from "react";
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Input,
    Avatar,
    Tag,
    TagCloseButton,
    TagLabel,
    Select,
    Stack,
    useDisclosure,
    Text,
    Badge,
    IconButton,
    AvatarBadge,
    useToast,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { getAllCompanies } from "../../utils/api/company.api";
import { updateStudentpreferences } from "../../utils/api/student.api";

export default function PreferenceSelectorModal({ userData, setUserData }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const [selectedCompanies, setSelectedCompanies] = useState([]);
    const [companies, setcompanies] = useState([]);
    const [loadingCompanies, setloadingCompanies] = useState(false);
    const [loadingSubmit, setloadingSubmit] = useState(false);

    // function to add a company to the list of selected companies
    const addCompany = (companyId) => {
        // check if the company is already in the list of selected companies
        if (companyId) {
            if (!selectedCompanies.find((c) => c.companyId === companyId)) {
                const _company = companies.find(
                    (c) => c.companyId === companyId
                );
                setSelectedCompanies([...selectedCompanies, _company]);
            }
        }
    };

    // function to remove a company from the list of selected companies
    const removeCompany = (companyId) => {
        setSelectedCompanies(
            selectedCompanies.filter((c) => c.companyId !== companyId)
        );
    };

    // function to handle the "Save" button click
    const handleSaveClick = async () => {
        // save the selected companies to the database or do other necessary actions
        // console.log(selectedCompanies);
        const formData = selectedCompanies.map((element) => element.companyId);
        const newPrefList = selectedCompanies.map((element) => ({
            name: element.companyId,
        }));
        setloadingSubmit(true);
        const _res = await updateStudentpreferences({ preferences: formData });
        setloadingSubmit(false);
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

        setUserData({ ...userData, preferenceList: newPrefList });
        onClose();
    };

    useEffect(() => {
        async function getData() {
            setloadingCompanies(true);
            const _res = await getAllCompanies();
            setloadingCompanies(false);
            if (_res.error) {
                return toast({
                    title: "An error occurred.",
                    description: _res.data,
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                });
            }
            Array.isArray(_res.data) && setcompanies(_res.data);
        }
        getData();
    }, []);
    return (
        <>
            <Button colorScheme="green" mt={4} w={"100%"} onClick={onOpen}>
                Add Preference
            </Button>
            <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Select companies</ModalHeader>
                    <ModalBody>
                        <Stack spacing={4}>
                            <Box>
                                <Text color={"GrayText"}>
                                    Current Selection
                                </Text>
                                {userData &&
                                    Array.isArray(userData.preferenceList) &&
                                    userData.preferenceList.map(
                                        (element, index) => (
                                            <Tag
                                                key={
                                                    (element && element.name) ||
                                                    index
                                                }
                                                size="lg"
                                                variant="outline"
                                                m={1}
                                                p={2}
                                                // boxShadow={"sm"}
                                            >
                                                <Text>{index + 1 + ". "}</Text>
                                                <Avatar
                                                    size="sm"
                                                    name={
                                                        element && element.name
                                                    }
                                                    m={2}
                                                />
                                                <TagLabel>
                                                    {element && element.name}
                                                </TagLabel>
                                            </Tag>
                                        )
                                    )}
                            </Box>
                            {loadingCompanies && (
                                <Text>Loading Companies...</Text>
                            )}
                            <FormControl
                                id="company"
                                isDisabled={loadingCompanies}
                            >
                                <FormLabel>
                                    Select your new Preferences{" "}
                                </FormLabel>
                                <Select
                                    placeholder="Select a company"
                                    onChange={(e) => {
                                        addCompany(e.target.value);
                                    }}
                                >
                                    {companies.map((company) => (
                                        <option
                                            key={company && company.companyId}
                                            value={company && company.companyId}
                                        >
                                            {company && company.name}
                                        </option>
                                    ))}
                                </Select>
                            </FormControl>
                            <Box>
                                {selectedCompanies.map((company, index) => (
                                    <Tag
                                        key={
                                            (company && company.companyId) ||
                                            index
                                        }
                                        size="lg"
                                        variant="outline"
                                        m={1}
                                        p={2}
                                        // boxShadow={"sm"}
                                    >
                                        <Text>{index + 1 + ". "}</Text>
                                        <Avatar
                                            size="sm"
                                            name={company && company.name}
                                            m={2}
                                        />
                                        <TagLabel>
                                            {company && company.name}
                                        </TagLabel>
                                        <TagCloseButton
                                            onClick={() =>
                                                company &&
                                                removeCompany(company.companyId)
                                            }
                                        />
                                    </Tag>
                                ))}
                            </Box>
                        </Stack>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            colorScheme="green"
                            onClick={handleSaveClick}
                            isLoading={loadingSubmit}
                        >
                            Save
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
