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
} from "@chakra-ui/react";
import { getAllCompanies } from "../../utils/api/company.api";

export default function PreferenceSelectorModal() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [selectedCompanies, setSelectedCompanies] = useState([]);
    const [companies, setcompanies] = useState([]);
    const [loadingCompanies, setloadingCompanies] = useState(false);

    // function to add a company to the list of selected companies
    const addCompany = (companyId) => {
        // check if the company is already in the list of selected companies
        if (!selectedCompanies.find((c) => c.companyId === companyId)) {
            const _company = companies.find((c) => c.companyId === companyId);
            setSelectedCompanies([...selectedCompanies, _company]);
        }
    };

    // function to remove a company from the list of selected companies
    const removeCompany = (companyId) => {
        setSelectedCompanies(
            selectedCompanies.filter((c) => c.companyId !== companyId)
        );
    };

    // function to handle the "Save" button click
    const handleSaveClick = () => {
        // save the selected companies to the database or do other necessary actions
        console.log(selectedCompanies);
        // onClose();
    };

    useEffect(() => {
        async function getData() {
            setloadingCompanies(true);
            const _res = await getAllCompanies();
            setloadingCompanies(false);
            if (_res.error) {
                console.log(error);
                return; //TODO:add toast
            }
            console.log(_res.data);
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
                            {loadingCompanies && (
                                <Text>Loading Companies...</Text>
                            )}
                            <FormControl
                                id="company"
                                isDisabled={loadingCompanies}
                            >
                                <FormLabel>Select a company</FormLabel>
                                <Select
                                    placeholder="Select a company"
                                    onChange={(e) => {
                                        console.log(e.target.value);
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
                                        key={company.companyId || index}
                                        size="lg"
                                        variant="solid"
                                        colorScheme="teal"
                                        m={1}
                                        p={2}
                                    >
                                        <Text>{index + 1 + ". "}</Text>
                                        <Avatar size="sm" name={company.name} />
                                        <TagLabel>{company.name}</TagLabel>
                                        <TagCloseButton
                                            onClick={() =>
                                                removeCompany(company.companyId)
                                            }
                                        />
                                    </Tag>
                                ))}
                            </Box>
                        </Stack>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="green" onClick={handleSaveClick}>
                            Save
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
