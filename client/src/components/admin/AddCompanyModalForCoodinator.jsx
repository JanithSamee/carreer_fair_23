import React, { useEffect, useState } from "react";
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Text,
    Stack,
    Box,
    Select,
    Tag,
    Avatar,
    TagLabel,
    TagCloseButton,
    useToast,
} from "@chakra-ui/react";
import { getAllCompanies } from "../../utils/api/company.api";
import { assignCompaniesForCoordinators } from "../../utils/api/coordinator.api";

export function AddCompanyModalForCoodinator({
    isOpen,
    onClose,
    user,
    onChange,
    // onSubmit,
}) {
    const toast = useToast();
    const [loadingCompanies, setloadingCompanies] = useState(false);
    const [companies, setcompanies] = useState([]);
    const [selectedCompanies, setSelectedCompanies] = useState([]);

    // function to add a company to the list of selected companies
    const addCompany = (companyId) => {
        // check if the company is already in the list of selected companies
        if (companyId) {
            if (!selectedCompanies.find((c) => c.companyId === companyId)) {
                const _company = companies.find(
                    (c) => c.companyId === companyId
                );
                setSelectedCompanies([
                    ...selectedCompanies,
                    { companyId: _company.companyId, name: _company.name },
                ]);
            }
        }
    };

    // function to remove a company from the list of selected companies
    const removeCompany = (companyId) => {
        setSelectedCompanies(
            selectedCompanies.filter((c) => c.companyId !== companyId)
        );
    };

    const handleSubmit = async () => {
        setloadingCompanies(true);
        const _res = await assignCompaniesForCoordinators({
            companies: selectedCompanies,
            coordinatorId: user.coordinatorId,
        });
        setloadingCompanies(false);
        if (_res.error) {
            return toast({
                title: "An error occurred.",
                description: _res.data,
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
        onChange && onChange((prev) => !prev);
        setSelectedCompanies([]);
        onClose();
    };

    useEffect(() => {
        //console.count("PreferenceSelectionModal");
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
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    Add Company
                    <Text color={"GrayText"} fontStyle={"oblique"}>
                        {user && user.name}
                    </Text>
                </ModalHeader>
                <ModalBody>
                    <Stack spacing={4}>
                        {loadingCompanies && <Text>Loading Companies...</Text>}
                        <FormControl id="company" isDisabled={loadingCompanies}>
                            <FormLabel>Select copanies </FormLabel>
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
                                        (company && company.companyId) || index
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
                        colorScheme="blue"
                        mr={3}
                        onClick={handleSubmit}
                        isLoading={loadingCompanies}
                        loadingText={"Loading..."}
                    >
                        Save
                    </Button>
                    <Button variant="ghost" onClick={onClose}>
                        Cancel
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
