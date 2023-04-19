import { memo, useState } from "react";
import {
    Box,
    Flex,
    Button,
    Text,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Avatar,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import useAuth from "../../utils/providers/AuthProvider";

function Navbar() {
    const { user, logout } = useAuth();
    const [show, setShow] = useState(false);
    const handleToggle = () => setShow(!show);

    return true ? (
        <Flex
            as="nav"
            align="center"
            justify="space-between"
            wrap="wrap"
            w="100%"
            p={3}
            bg="Background"
            color="white"
            // h={"72px"}
            // position={"fixed"}
            // top={0}
            // left={0}
        >
            <Flex align="center">
                <img
                    src={"https://i.ibb.co/pwJvMbG/EE-spire-logo.png"}
                    alt="Logo"
                    width="96px"
                    height="96px"
                />
            </Flex>

            <Box
                display={{ base: "block", md: "none" }}
                color={"ButtonText"}
                onClick={handleToggle}
            >
                <FaBars />
            </Box>

            <Box
                display={{ base: show ? "flex" : "none", md: "flex" }}
                width={{ base: "full", md: "auto" }}
                alignItems="center"
                w={"100%"}
                justifyContent={"center"}
                color={"ButtonText"}
                flexGrow={1}
                mt={{ base: 4, md: 0 }}
            >
                <Button
                    as={Link}
                    to="/"
                    variant="ghost"
                    mr={{ base: 0, md: 4 }}
                >
                    Home
                </Button>
                <Button
                    as={Link}
                    to="/about"
                    variant="ghost"
                    mr={{ base: 0, md: 4 }}
                >
                    About
                </Button>
                <Button
                    as={Link}
                    to="/signup"
                    variant="ghost"
                    mr={{ base: 0, md: 4 }}
                >
                    Sign Up
                </Button>
            </Box>

            <Box display={{ base: "none", md: "flex" }} alignItems="center">
                <Menu>
                    <MenuButton
                        as={Button}
                        rounded="full"
                        variant="link"
                        cursor="pointer"
                        minW={0}
                    >
                        <Avatar
                            name={user?.displayName}
                            src={user?.photoURL}
                            size={"md"}
                        />
                    </MenuButton>
                    <MenuList color={"ButtonText"}>
                        <MenuItem
                            as={Link}
                            to={user && user.role + "/dashboard"}
                        >
                            Dashboard
                        </MenuItem>
                        <MenuItem onClick={logout}>Logout</MenuItem>
                    </MenuList>
                </Menu>
            </Box>
        </Flex>
    ) : (
        <></>
    );
}

export default memo(Navbar);
