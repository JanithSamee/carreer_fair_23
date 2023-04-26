import {
    Avatar,
    Box,
    List,
    ListIcon,
    ListItem,
    Text,
    useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { MdAccessTime } from "react-icons/md";
import { getGlobalParamsAsStudent } from "../../utils/api/global.api";
import {
    UTCStringToCommon,
    getTimeCounter,
} from "../../utils/helpers/formatter";

function StudentEventsSection() {
    const toast = useToast();
    const [globalParams, setglobalParams] = useState({});
    useEffect(() => {
        async function getData() {
            const _res = await getGlobalParamsAsStudent();
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
            setglobalParams(_res.data);
        }
        getData();
    }, []);

    return (
        <List spacing={3}>
            {globalParams && globalParams.registrationDeadLine && (
                <ListItem>
                    <ListIcon as={MdAccessTime} />
                    <Box flex={1}>
                        <Text fontWeight="bold">
                            Registration Closed on -
                            <span
                                style={{
                                    color: "GrayText",
                                    fontWeight: "normal",
                                    fontStyle: "italic",
                                }}
                            >
                                {getTimeCounter(
                                    globalParams.registrationDeadLine
                                )}
                            </span>
                        </Text>
                        <Text fontSize="sm" color="gray.500">
                            {UTCStringToCommon(
                                globalParams.registrationDeadLine
                            )}
                        </Text>
                    </Box>
                </ListItem>
            )}
            {globalParams && globalParams.preferenceUpdateStart && (
                <ListItem>
                    <ListIcon as={MdAccessTime} />
                    <Box flex={1}>
                        <Text fontWeight="bold">
                            Company Prefrence Submission starts on -
                            <span
                                style={{
                                    color: "GrayText",
                                    fontWeight: "normal",
                                    fontStyle: "italic",
                                }}
                            >
                                {getTimeCounter(
                                    globalParams.preferenceUpdateStart
                                )}
                            </span>
                        </Text>
                        <Text fontSize="sm" color="gray.500">
                            {UTCStringToCommon(
                                globalParams.preferenceUpdateStart
                            )}
                        </Text>
                    </Box>
                </ListItem>
            )}
            {globalParams && globalParams.preferenceUpdateDeadLine && (
                <ListItem>
                    <ListIcon as={MdAccessTime} />
                    <Box flex={1}>
                        <Text fontWeight="bold">
                            Company Prefrence Submission closed on -
                            <span
                                style={{
                                    color: "GrayText",
                                    fontWeight: "normal",
                                    fontStyle: "italic",
                                }}
                            >
                                {getTimeCounter(
                                    globalParams.preferenceUpdateDeadLine
                                )}
                            </span>
                        </Text>
                        <Text fontSize="sm" color="gray.500">
                            {UTCStringToCommon(
                                globalParams.preferenceUpdateDeadLine
                            )}
                        </Text>
                    </Box>
                </ListItem>
            )}
            {globalParams && globalParams.eventDate && (
                <ListItem>
                    <ListIcon as={MdAccessTime} />
                    <Box flex={1}>
                        <Text fontWeight="bold">
                            Career fair -
                            <span
                                style={{
                                    color: "GrayText",
                                    fontWeight: "normal",
                                    fontStyle: "italic",
                                }}
                            >
                                {getTimeCounter(globalParams.eventDate)}
                            </span>
                        </Text>

                        <Text fontSize="sm" color="gray.500">
                            {UTCStringToCommon(globalParams.eventDate)}
                        </Text>
                    </Box>
                </ListItem>
            )}
        </List>
    );
}

export default StudentEventsSection;
