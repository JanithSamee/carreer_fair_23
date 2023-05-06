import {
    Grid,
    GridItem,
    Text,
    Box,
    FormControl,
    FormLabel,
    Select,
    Button,
    Spacer,
    Flex,
    useToast,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import CloseButton from "./CloseButton";
import axios from "axios";
import { getAllCompanies } from "../utils/api/company.api";
import { getCompanyName } from "../utils/helpers/formatter";
import { assigneInterview } from "../utils/api/interview.api";

function AddPrefComp({ index_number }) {
    const toast = useToast();
    //states
    const [company, setCompany] = useState("undefined");
    const [loading, setloading] = useState(false);
    const [time, setTime] = useState();
    const [error, setError] = useState();
    const [interveiwList, setInterveiwList] = useState([]);
    const [companyList, setCompanyList] = useState([{}]);
    //APIs

    async function handleSave() {
        const checkSameTime = interveiwList.filter((obj, index, arr) =>
            arr.slice(index + 1).some((otherObj) => otherObj.time === obj.time)
        );

        if (checkSameTime.length > 0) {
            return toast({
                title: "An error occurred.",
                description:
                    "Interviews must be separated from time slots. Duplicate time slots found!",
                status: "error",
                duration: 9000,
                isClosable: true,
            });
        }
        setloading(true);

        const _res = await assigneInterview({
            indexNumber: index_number,
            interviews: interveiwList,
        });
        setloading(false);

        if (_res.error) {
            toast({
                title: "An error occurred.",
                description: _res.data,
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        } else {
            toast({
                title: "Done",
                description: "Interview Assigened Successfully!",
                status: "success",
                duration: 2000,
                isClosable: true,
            });
            // setAddedCount(addedCount + 1);
        }
    }

    useEffect(() => {
        async function getData() {
            // setloadingCompanies(true);
            setloading(true);
            const _res = await getAllCompanies();
            setloading(false);
            // setloadingCompanies(false);
            if (_res.error) {
                return toast({
                    title: "An error occurred.",
                    description: _res.data,
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                });
            }
            Array.isArray(_res.data) && setCompanyList(_res.data);
        }

        getData();
    }, []);

    // useEffect(() => {
    //     interviewsList && setInterveiwList(interviewsList);
    // }, [interviewsList]);

    //event handling
    const handleChangeCompany = (e) => setCompany(e.target.value);
    const handleChangeTime = (e) => setTime(e.target.value);
    function handleAssign() {
        if (
            company === undefined ||
            time === undefined ||
            company === "" ||
            time === ""
        ) {
            setError("Required !");
        } else {
            const isAdded = interveiwList.find((u) => u.company === company);
            if (!isAdded) {
                const newList = interveiwList.concat({
                    company,
                    time,
                    name: company,
                });
                setInterveiwList(newList);
            }
        }
    }
    const assignedInterveiws = () =>
        interveiwList.map((interveiw, idx) => (
            <Flex
                boxShadow="sm"
                px={1}
                hidden={interveiw.company === undefined}
                justify="center"
                align="center"
                key={idx}
            >
                <Box>
                    <Text fontSize="xs">
                        {interveiw.company && getCompanyName(interveiw.company)}
                    </Text>
                </Box>
                <Spacer></Spacer>
                <CloseButton
                    interveiw={interveiw}
                    interveiwList={interveiwList}
                    setInterveiwList={setInterveiwList}
                ></CloseButton>
            </Flex>
        ));
    const companies = () =>
        companyList.map((com, idx) => (
            <option key={idx} value={com.companyId}>
                {com.companyId && getCompanyName(com.companyId)}
            </option>
        ));

    const OptionsList = () => {
        const _lst = [];
        for (let hour = 8; hour <= 22; hour++) {
            // Loop to generate 4 quarter-hour options for each hour
            for (let minute = 0; minute <= 45; minute += 15) {
                // Format the hour and minute values as "hh.mm"
                let time = `${hour.toString().padStart(2, "0")}.${minute
                    .toString()
                    .padStart(2, "0")}`;
                // Create an option element with the formatted time value

                _lst.push(<option value={time}>{time}</option>);
            }
        }
        return _lst;
    };

    return (
        <div>
            <Grid
                templateColumns="repeat(2, 2fr)"
                gap={8}
                opacity={loading ? "0.8" : "1"}
            >
                <GridItem justify="center">
                    <Box boxShadow="md" p={5} mt={2}>
                        <FormControl>
                            <FormLabel fontSize="xs">Company</FormLabel>
                            <Select
                                size="xs"
                                placeholder="Select Company"
                                mb={3}
                                required
                                onChange={handleChangeCompany}
                            >
                                {companies()}
                            </Select>
                            <FormLabel fontSize="xs">Time Slot</FormLabel>
                            <Select
                                size="xs"
                                placeholder=" Time Slot"
                                required
                                onChange={handleChangeTime}
                            >
                                {OptionsList()}
                            </Select>
                        </FormControl>
                        <Button
                            rightIcon={<ArrowForwardIcon />}
                            mt={3}
                            size="xs"
                            bg="teal.300"
                            onClick={handleAssign}
                            isDisabled={
                                time === undefined || company === undefined
                            }
                        >
                            Assign Interveiw
                        </Button>
                    </Box>
                </GridItem>
                <GridItem justify="center">
                    <Box boxShadow="md" p={5} mt={2} minH={190}>
                        {interveiwList.map((interveiw, idx) => (
                            <Flex
                                boxShadow="sm"
                                px={1}
                                hidden={interveiw.company === undefined}
                                justify="center"
                                align="center"
                                key={idx}
                            >
                                <Box>
                                    <Text fontSize="xs">
                                        {interveiw.company &&
                                            getCompanyName(interveiw.company)}
                                    </Text>
                                </Box>
                                <Spacer></Spacer>
                                <CloseButton
                                    interveiw={interveiw}
                                    interveiwList={interveiwList}
                                    setInterveiwList={setInterveiwList}
                                ></CloseButton>
                            </Flex>
                        ))}
                    </Box>
                </GridItem>
            </Grid>
            <Button
                mt={2}
                onClick={handleSave}
                isLoading={loading}
                loadingText={"Loading..."}
            >
                save
            </Button>
        </div>
    );
}

export default AddPrefComp;
