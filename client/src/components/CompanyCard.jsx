import {
    Card,
    CardBody,
    Avatar,
    Stack,
    Heading,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import EditCompanyModal from "./EditCompanyModal";

function CompanyCard({ name, img_url, companyID, email }) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <div>
            <Card
                minH={135}
                minW={135}
                justify="center"
                onClick={onOpen}
                cursor={"pointer"}
            >
                <CardBody>
                    <Stack align={"center"}>
                        <Avatar name={name} src={img_url} size="lg"></Avatar>
                        <Heading size="xs" textAlign={"center"}>
                            {name}
                        </Heading>
                    </Stack>
                </CardBody>
            </Card>
            {isOpen && (
                <EditCompanyModal
                    isOpen={isOpen}
                    onClose={onClose}
                    title={"Edit Company"}
                    companyDes={"Add Description "}
                    companyName=""
                    imgUrl={img_url}
                    email={email}
                    companyId={companyID}
                />
            )}
        </div>
    );
}

export default CompanyCard;
