import { useState, useRef, useEffect } from "react";
import axiosInstance from "../../service/axios";
import AddComponentBook from "./addBook"
import EditComponentBook from "./editBook"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Container from '@mui/material/Container';
import Swal from "sweetalert2";

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

export const Book = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const isMounted = useRef(false);

    useEffect(() => {
        if (isMounted.current) return;
        fetchBooks();
        isMounted.current = true
    }, []);

    const fetchBooks = async => {
        setLoading(true);
        axiosInstance.get("/books")
            .then((res) => {
                setBooks(res.data)
                console.log(res.data)
            }).catch((error) => {
                console.error(error)
            }).finally(() => {
                setLoading(false)
            })
    }

    const rows = books;

    const deleteTodo = (id) => {
        axiosInstance
            .delete(`/books/${id}`)
            .then(() => {
                Swal.fire("Supprimé!", "", "success");
                fetchBooks();
            })
            .catch((error) => Swal.fire("Erreur", error.toString(), "error"));
    };

    function Supprimer(id) {
        Swal.fire({
            title: "Etes-vous sûre?",
            text: "Cette action est irreversible!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            cancelButtonText: "Annuler",
            confirmButtonText: "Supprimer",
        }).then((result) => {
            if (result.isConfirmed) {
                deleteTodo(id);
            }
        });
    }

    return (
        <>
            { loading ? (
                <div>
                    <p>loading...</p>
                </div>
            ):(
                <Container>
                <AddComponentBook fetchBooks={fetchBooks}  />
                <br />
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell align="right">Titre</TableCell>
                                <TableCell align="right">Auteur</TableCell>
                                <TableCell align="right">Isbn</TableCell>
                                <TableCell align="right">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.id}
                                    </TableCell>
                                    <TableCell align="right">{row.title}</TableCell>
                                    <TableCell align="right">{row.author}</TableCell>
                                    <TableCell align="right">{row.isbn}</TableCell>
                                    <TableCell align="right">
                                        <EditComponentBook id={row.id}
                                            title={row.title}
                                            author={row.author}
                                            isbn={row.isbn}
                                            fetchBooks={fetchBooks} />
                                        <IconButton aria-label="delete" size="small" color="error" onClick={() => Supprimer(row.id)} >
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
            )}

        </>


    );

}