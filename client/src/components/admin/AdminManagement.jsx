import React, { useEffect, useState } from "react";
import {
    Avatar,
    Box,
    Button,
    Center,
    FormControl,
    FormLabel,
    Input,
    Table,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useToast,
} from "@chakra-ui/react";
import { AddCompanyModalForCoodinator } from "./AddCompanyModalForCoodinator";
import {
    getGlobalParams,
    updateGlobalParams,
} from "../../utils/api/global.api";
import { ISOtimestringLocalTimeString } from "../../utils/helpers/formatter";

const AdminManagement = () => {
    const [eventDate, seteventDate] = useState("");
    const [loadingParams, setloadingParams] = useState(false);
    const toast = useToast();
    const [registrationDeadLine, setregistrationDeadLine] = useState("");
    const [preferenceUpdateDeadLine, setpreferenceUpdateDeadLine] =
        useState("");
    const [preferenceUpdateStart, setpreferenceUpdateStart] = useState("");
    // const [eventEndTime, setEventEndTime] = useState("");
    const [users, setUsers] = useState([
        { id: 1, name: "User 1", companies: [] },
        { id: 2, name: "User 2", companies: [] },
        { id: 3, name: "User 3", companies: [] },
        { id: 4, name: "User 3", companies: [] },
        { id: 5, name: "User 3", companies: [] },
    ]);
    const [isAddingCompany, setIsAddingCompany] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    async function updateParams() {
        setloadingParams(true);
        const _res = await updateGlobalParams({
            eventDate,
            registrationDeadLine,
            preferenceUpdateDeadLine,
            preferenceUpdateStart,
        });
        setloadingParams(false);

        if (_res.error) {
            toast({
                title: "An error occurred.",
                description: _res.data,
                status: "error",
                duration: 9000,
                isClosable: true,
            });
            return;
        }
        toast({
            title: "Updated Succesfully!",
            description: "",
            status: "success",
            duration: 4000,
            isClosable: true,
        });
    }

    const handleAddCompany = (user, company) => {
        const updatedUsers = users.map((u) =>
            u.id === user.id
                ? { ...u, companies: [...u.companies, company] }
                : u
        );
        setUsers(updatedUsers);
    };

    useEffect(() => {
        async function getData() {
            setloadingParams(true);
            const _res = await getGlobalParams();
            setloadingParams(false);

            if (_res.error) {
                toast({
                    title: "An error occurred.",
                    description: _res.data,
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                });
                return;
            }
            _res.data.eventDate && seteventDate(_res.data.eventDate);
            _res.data.registrationDeadLine &&
                setregistrationDeadLine(_res.data.registrationDeadLine);
            _res.data.preferenceUpdateStart &&
                setpreferenceUpdateStart(_res.data.preferenceUpdateStart);
            _res.data.preferenceUpdateDeadLine &&
                setpreferenceUpdateDeadLine(_res.data.preferenceUpdateDeadLine);
        }
        getData();
    }, []);

    return (
        <Box>
            <Text
                color={"GrayText"}
                fontStyle={"oblique"}
                fontSize={"xl"}
                fontWeight={"bold"}
            >
                Global Parameters
            </Text>
            <Box ml={4}>
                <Center>
                    <FormControl id="eventDate" m={4}>
                        <FormLabel>Event Date</FormLabel>
                        <Input
                            type="datetime-local"
                            value={ISOtimestringLocalTimeString(eventDate)}
                            onChange={(event) => {
                                const date = new Date(event.target.value);
                                seteventDate(date.toISOString());
                            }}
                        />
                    </FormControl>
                    <FormControl id="eventEndTime" m={4}>
                        <FormLabel>Sign Up DeadLine For Student</FormLabel>
                        <Input
                            type="datetime-local"
                            value={ISOtimestringLocalTimeString(
                                registrationDeadLine
                            )}
                            onChange={(event) => {
                                const date = new Date(event.target.value);
                                setregistrationDeadLine(date.toISOString());
                            }}
                        />
                    </FormControl>
                </Center>
                <Center ml={4}>
                    <FormControl id="eventStartTime">
                        <FormLabel>Preference Update Start Time</FormLabel>
                        <Input
                            type="datetime-local"
                            value={ISOtimestringLocalTimeString(
                                preferenceUpdateStart
                            )}
                            onChange={(event) => {
                                const date = new Date(event.target.value);
                                setpreferenceUpdateStart(date.toISOString());
                            }}
                        />
                    </FormControl>
                    <FormControl id="eventEndTime" m={4}>
                        <FormLabel>Preference Update Close Time</FormLabel>
                        <Input
                            type="datetime-local"
                            value={ISOtimestringLocalTimeString(
                                preferenceUpdateDeadLine
                            )}
                            onChange={(event) => {
                                const date = new Date(event.target.value);
                                setpreferenceUpdateDeadLine(date.toISOString());
                            }}
                        />
                    </FormControl>
                </Center>
                <Button
                    colorScheme="facebook"
                    onClick={updateParams}
                    isLoading={loadingParams}
                    loadingText={"Loading..."}
                >
                    Save Params
                </Button>
            </Box>
            <Text
                color={"GrayText"}
                fontStyle={"oblique"}
                fontSize={"xl"}
                fontWeight={"bold"}
                mt={4}
            >
                Coordinators
            </Text>
            <Button colorScheme="teal" m={5}>
                Add A Coordinator
            </Button>

            <Table ml={4}>
                <Thead>
                    <Tr>
                        <Th>Name</Th>
                        <Th>Phone</Th>
                        <Th>Companies</Th>
                        <Th>Selected</Th>
                        <Th>Function</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {users.map((user) => (
                        <Tr key={user.id}>
                            <Td>
                                {user.name + "\n "} <br />
                                <span style={{ color: "grey" }}>
                                    coordinator@gmail.com
                                </span>
                            </Td>

                            <Td>{"+94768898978"}</Td>
                            <Td>
                                {user.companies.map((company) => (
                                    <Text key={company}>{company}</Text>
                                ))}
                                <Button
                                    size="sm"
                                    colorScheme="facebook"
                                    ml={2}
                                    onClick={() => {
                                        setSelectedUser(user);
                                        setIsAddingCompany(true);
                                    }}
                                >
                                    Add Company
                                </Button>
                            </Td>
                            <Td>
                                <Avatar name="ajs s" size={"sm"} m={2}></Avatar>
                                <Avatar name="ajs s" size={"sm"} m={2}></Avatar>
                                <Avatar name="ajs s" size={"sm"} m={2}></Avatar>
                            </Td>
                            <Td>
                                <Button colorScheme="orange">Disable</Button>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>

            {selectedUser && (
                <AddCompanyModalForCoodinator
                    isOpen={isAddingCompany}
                    onClose={() => setIsAddingCompany(false)}
                    user={selectedUser}
                    onSubmit={handleAddCompany}
                />
            )}
        </Box>
    );
};

export default AdminManagement;
