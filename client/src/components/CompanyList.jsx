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

function CompanyList({ companyList, type, isLoading }) {
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
            {isLoading ? (
                <Text fontSize={"small"} color={"GrayText"}>
                    Updating...
                </Text>
            ) : (
                <>
                    <Grid templateColumns="repeat(6, 1fr)" gap={1}>
                        {listComponent}
                    </Grid>
                    <Divider mt={5} />
                </>
            )}
            <Text fontSize={12}>
                {type === "pref" ? "Preferences List" : "Final Selected List"}
            </Text>
        </div>
    );
}

export default CompanyList;
