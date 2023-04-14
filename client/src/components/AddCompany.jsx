import { IconButton, useDisclosure } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import CompanyModal from "./CompanyModal";

function AddCompany() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<div>
			<IconButton
				icon={<AddIcon />}
				variant="outline"
				size="sm"
				onClick={onOpen}
			></IconButton>
			<CompanyModal
				isOpen={isOpen}
				onClose={onClose}
				title={"Add Company"}
				companyDes={"Company Description "}
			/>
		</div>
	);
}

export default AddCompany;
