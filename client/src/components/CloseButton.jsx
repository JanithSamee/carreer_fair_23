import { Box, IconButton } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

function CloseButton({ interveiw, interveiwList, setInterveiwList }) {
	function handleClose() {
		const filteredList = interveiwList.filter(
			(int) => int.company !== interveiw.company
		);
		setInterveiwList(filteredList);
	}

	return (
		<Box>
			<span hidden={interveiw.company === undefined}>
				<IconButton
					variant="ghost"
					icon={<CloseIcon fontSize="8px" />}
					size="35px"
					m={1}
					colorScheme="red"
					onClick={handleClose}
				></IconButton>
			</span>
		</Box>
	);
}

export default CloseButton;
