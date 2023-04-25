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
} from "@chakra-ui/react";
import { AddCompanyModalForCoodinator } from "./AddCompanyModalForCoodinator";
import { getGlobalParams, setGlobalParams } from "../../utils/api/global.api";

const AdminManagement = () => {
    const [eventDate, seteventDate] = useState("");
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
        const _res = await setGlobalParams({
            eventDate,
            registrationDeadLine,
            preferenceUpdateDeadLine,
            preferenceUpdateStart,
        });
        if (_res.error) {
            //TODO: add toast
            return;
        }
    }

    const handleAddCompany = (user, company) => {
        const updatedUsers = users.map((u) =>
            u.id === user.id
                ? { ...u, companies: [...u.companies, company] }
                : u
        );
        setUsers(updatedUsers);
    };

    // useEffect(() => {
    //     async function getData() {
    //         const _res = await getGlobalParams();
    //         if (_res.error) {
    //             //TODO: add toast
    //             return;
    //         }
    //         console.log(_res);
    //         seteventDate(new Date(_res.data.eventDate));
    //     }
    //     getData();
    // }, []);

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
                            value={eventDate}
                            onChange={(event) => {
                                const date = new Date(event.target.value);
                                const etcTime = date.toLocaleString("en-US", {
                                    timeZone: "America/New_York",
                                });
                                seteventDate(etcTime);
                            }}
                        />
                    </FormControl>
                    <FormControl id="eventEndTime" m={4}>
                        <FormLabel>Sign Up DeadLine For Student</FormLabel>
                        <Input
                            type="datetime-local"
                            value={registrationDeadLine}
                            onChange={(event) =>
                                setregistrationDeadLine(event.target.value)
                            }
                        />
                    </FormControl>
                </Center>
                <Center ml={4}>
                    <FormControl id="eventStartTime">
                        <FormLabel>Preference Update Start Time</FormLabel>
                        <Input
                            type="datetime-local"
                            value={preferenceUpdateStart}
                            onChange={(event) =>
                                setpreferenceUpdateStart(event.target.value)
                            }
                        />
                    </FormControl>
                    <FormControl id="eventEndTime" m={4}>
                        <FormLabel>Preference Update Close Time</FormLabel>
                        <Input
                            type="datetime-local"
                            value={preferenceUpdateDeadLine}
                            onChange={(event) =>
                                setpreferenceUpdateDeadLine(event.target.value)
                            }
                        />
                    </FormControl>
                </Center>
                <Button colorScheme="facebook">Save Params</Button>
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
