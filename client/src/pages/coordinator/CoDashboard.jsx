import {
    Avatar,
    Box,
    Button,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text,
    useBreakpointValue,
    useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useAuth from "../../utils/providers/AuthProvider";
import { getCoordinator } from "../../utils/api/coordinator.api";
import CoordinatorCompanyModal from "../../components/Coordinator/CoordinatorCompanyModal";

function CoDashboard() {
    const toast = useToast();
    const { logout, user } = useAuth();
    // console.log(user);

    const [selectedCompany, setSelectedCompany] = useState(null);
    const [ongoing, setOngoing] = useState(null);
    const [completedList, setCompletedList] = useState([]);

    const fontSize = useBreakpointValue({ base: "lg", sm: "md", lg: "xl" });

    const handleCardClick = (company) => {
        setSelectedCompany(company);
    };

    const handleModalClose = () => {
        setSelectedCompany(null);
    };

    const handleComplete = (student) => {
        setCompletedList((pre) => [...pre, student]);
        setOngoing(null);
    };

    const [userData, setuserData] = useState([]);

    useEffect(() => {
        //console.count("Dashboard");
        async function getData() {
            const _res = await getCoordinator();
            if (_res.error) {
                return toast({
                    title: "An error occurred.",
                    description: _res.data,
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                });
            } else {
                setuserData(_res.data);
            }
        }
        if (user && user.uid) {
            getData();
        }
    }, []);

    return (
        <Box p={6}>
            <Box
                w="100%"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
            >
                <Box textAlign={"left"}>
                    <Text
                        color="blackAlpha.500"
                        fontStyle="oblique"
                        fontSize={"lg"}
                        fontWeight="bold"
                        m={4}
                        mb={0}
                    >
                        Co-Ordinator Panel
                    </Text>
                    <Text mb={4}>{user && user.email}</Text>
                </Box>
                <Menu>
                    <MenuButton>
                        {/* <Text>{user?.displayName}</Text> */}
                        <Avatar
                            name={user?.displayName}
                            src={user?.photoURL}
                            size={"md"}
                        />
                    </MenuButton>
                    <MenuList>
                        <MenuItem size="sm" onClick={logout}>
                            Logout
                        </MenuItem>
                    </MenuList>
                </Menu>
            </Box>
            <Box
                w="100%"
                display="flex"
                flexWrap="wrap"
                alignItems="center"
                justifyContent="center"
            >
                {userData &&
                    userData.companies &&
                    userData.companies.map((_, index) => (
                        <Box
                            key={index}
                            w="200px"
                            borderWidth="1px"
                            borderRadius="md"
                            overflow="hidden"
                            m={3}
                            display="flex"
                            flexDirection="column"
                            cursor="pointer"
                            onClick={() => handleCardClick(_ && _.companyId)}
                        >
                            <Avatar
                                name={_ && _.name}
                                alt={_ && _.name}
                                mx="auto"
                                mt={5}
                                size="lg"
                            />
                            <Box p={2}>
                                <Text
                                    fontWeight="bold"
                                    fontSize="lg"
                                    mb={2}
                                    textAlign="center"
                                >
                                    {_ && _.name}
                                </Text>
                            </Box>
                        </Box>
                    ))}
            </Box>
            {selectedCompany && (
                <CoordinatorCompanyModal
                    selectedCompany={selectedCompany}
                    handleModalClose={handleModalClose}
                    setOngoing={setOngoing}
                    ongoing={ongoing}
                    completedList={completedList}
                    handleComplete={handleComplete}
                />
            )}
        </Box>
    );
}

export default CoDashboard;
