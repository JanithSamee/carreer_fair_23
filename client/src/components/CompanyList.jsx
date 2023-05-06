import {
    GridItem,
    Grid,
    Avatar,
    Text,
    Badge,
    Box,
    Divider,
} from "@chakra-ui/react";
import { getCompanyName } from "../utils/helpers/formatter";

function CompanyList({ companyList }) {
    const company_data = [
        { com_name: "WSO2", logo_url: "logo" },
        { com_name: "LSEG", logo_url: "logo" },
        { com_name: "CEB", logo_url: "logo" },
        { com_name: "RMA", logo_url: "logo" },
        { com_name: "99X", logo_url: "logo" },
        { com_name: "Wind Force", logo_url: "logo" },
    ];
    // const companyName =company && company.name && company.name.split("-")

    const listComponent = companyList ? (
        companyList.map((company, idx) => (
            <GridItem align="center" key={idx}>
                <Box>
                    <Badge
                        ml={7}
                        mb={-7}
                        zIndex="100"
                        bg="tomato"
                        borderRadius="50%"
                        px={1.5}
                    >
                        {idx + 1}
                    </Badge>
                    <Avatar
                        name={
                            company &&
                            company.name &&
                            getCompanyName(company.name)
                        }
                        src="imshb"
                        zIndex="-100"
                    ></Avatar>
                </Box>

                <Text fontSize="xs">
                    {company && company.name && getCompanyName(company.name)}
                </Text>
            </GridItem>
        ))
    ) : (
        <></>
    );
    return (
        <div>
            <Grid templateColumns="repeat(6, 1fr)" gap={1}>
                {listComponent}
            </Grid>
            <Divider mt={5} />
            <Text fontSize={12}>Final Preferences List</Text>
        </div>
    );
}

export default CompanyList;
