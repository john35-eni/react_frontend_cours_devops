import { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import TextField from "@mui/material/TextField";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import axiosInstance from "../../service/axios";
import { useForm } from "react-hook-form";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

export default function EditComponentBook({ id, title, author, isbn, fetchBooks }) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const {
        register,
        // eslint-disable-next-line no-unused-vars
        handleSubmit,
        // eslint-disable-next-line no-unused-vars
        formState: { errors, isSubmitting },
      } = useForm();
      const onEditSubmit = async (values) => {
          try {
            await axiosInstance.put(`/books/${id}`, values);
            handleClose();
            fetchBooks();
          } catch (error) {
            alert('erreur');
          }
      };

    return (
        <>
            <IconButton aria-label="delete" size="small" onClick={handleClickOpen} color="secondary">
                <EditIcon fontSize="small" />
            </IconButton>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Modifier le livre
                </BootstrapDialogTitle>
                <form onSubmit={handleSubmit(onEditSubmit)}>
                <DialogContent dividers>
                <Container>
                        <Box
                            sx={{
                                width: 200,
                                height: 200,
                                '& .MuiTextField-root': { m: 1, width: '25ch' },
                            }}
                        >
                            <TextField
                                type="text"
                                label="titre"
                                variant="outlined"
                                id="title"
                                name="title"
                                defaultValue={title}
                                fullWidth
                                {...register("title", {
                                    required: "titre obligatoire",
                                    minLength: {
                                        value: 2,
                                        message: "titre au moin 2 caractères",
                                    },
                                    maxLength: {
                                        value: 20,
                                        message: "Titre au maximum 20 caractères",
                                    },
                                })}
                                error={Boolean(errors.titre)}
                                helperText={errors.titre?.message}
                            />
                            <TextField
                                type="text"
                                label="auteur"
                                variant="outlined"
                                id="author"
                                name="author"
                                defaultValue={author}
                                fullWidth
                                {...register("author", {
                                    required: "auteur obligatoire",
                                    minLength: {
                                        value: 2,
                                        message: "auteur au moin 2 caractères",
                                    },
                                    maxLength: {
                                        value: 20,
                                        message: "auteur au maximum 20 caractères",
                                    },
                                })}
                                error={Boolean(errors.author)}
                                helperText={errors.author?.message}
                            />
                            <TextField
                                type="number"
                                label="isbn"
                                variant="outlined"
                                id="isbn"
                                name="isbn"
                                defaultValue={isbn}
                                fullWidth
                                {...register("isbn", {
                                    required: "isbn obligatoire",
                                    min: 0,
                                  })}
                                error={Boolean(errors.isbn)}
                                helperText={errors.isbn?.message}
                            />
                        </Box>
                    </Container>
                </DialogContent>
                <DialogActions>
                    <Button type="submit">
                        Enregistrer
                    </Button>
                </DialogActions>
                </form>
            </BootstrapDialog>
        </>
    );
}