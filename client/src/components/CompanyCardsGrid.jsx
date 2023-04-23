import { Grid, GridItem, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import CompanyCard from "./CompanyCard";
import AddCompany from "./AddCompany";
import { getAllCompanies } from "../utils/api/company.api";

function CompanyCardsGrid() {
    //states
    const [data, setData] = useState([]);
    const toast = useToast();
    const [addedCount, setAddedCount] = useState(0);
    //APIs
    useEffect(() => {
        async function getCompanies() {
            const _res = await getAllCompanies();
            if (_res.error) {
                toast({
                    title: "An error occured !",
                    description: _res.data,
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                });
            } else {
                setData(_res.data);
            }
        }
        if (addedCount >= 0) {
            getCompanies();
        }
    }, [addedCount]);
    const companyCards = data.map((company, idx) => (
        <GridItem key={idx}>
            <CompanyCard
                name={company.name}
                img_url={company.profilePhoto}
                companyID={company.companyId}
                email={company.email}
            ></CompanyCard>
        </GridItem>
    ));
    return (
        <>
            <Grid templateColumns="repeat(7	, 2fr)" gap={12} alignItems="center">
                {companyCards}
                <GridItem>
                    <AddCompany
                        setAddedCount={setAddedCount}
                        addedCount={addedCount}
                    ></AddCompany>
                </GridItem>
            </Grid>
        </>
    );
}

export default CompanyCardsGrid;
