import { Avatar, Stack, Text, useToast } from "@chakra-ui/react";
import CompanyList from "./CompanyList";
import AddPrefComp from "./AddPrefComp";
import { useEffect, useState } from "react";
import { getStudent } from "../utils/api/student.api";

function StudentModalContent({
    name,
    img_url,
    name_initial,
    index_number,
    interviewsList,
}) {
    const toast = useToast();
    const [isLoading, setisLoading] = useState(false);
    const [studentData, setstudentData] = useState({});

    useEffect(() => {
        async function getData() {
            setisLoading(true);
            const _res = await getStudent(index_number);
            setisLoading(false);
            // console.log(_res);
            if (_res && !_res.error) {
                setstudentData(_res.data);
            } else {
                toast({
                    title: "An error occurred.",
                    description: _res.data,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            }
        }
        getData();
    }, []);
    return (
        <div>
            <Stack align="center" spacing={0.5}>
                <Avatar name={name} size="lg" src={img_url}></Avatar>
                <Text>{index_number}</Text>
                <Text>{name_initial}</Text>
                <CompanyList
                    type="pref"
                    isLoading={isLoading}
                    companyList={studentData.preferenceList}
                ></CompanyList>
                <CompanyList
                    isLoading={isLoading}
                    companyList={studentData.interviewsList}
                ></CompanyList>
                <AddPrefComp
                    index_number={index_number}
                    interviewsList={studentData.interviewsList}
                ></AddPrefComp>
            </Stack>
        </div>
    );
}

export default StudentModalContent;
