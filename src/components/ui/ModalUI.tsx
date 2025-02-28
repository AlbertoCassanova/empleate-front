// React
import { Dispatch, FC, SetStateAction } from 'react';

// Components
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { SxProps, Theme } from '@mui/material';

type ModalUIType = {
    open: boolean,
    children: JSX.Element,
    setOpen: Dispatch<SetStateAction<boolean>>
}

const style : SxProps<Theme> = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
};

const ModalUI: FC<ModalUIType> = ({ open, children, setOpen }): JSX.Element => {
    const handleClose = () => setOpen(false);
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                {children}
            </Box>
        </Modal>
    )
}

export default ModalUI;