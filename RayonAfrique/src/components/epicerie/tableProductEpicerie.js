import React, { useState, useEffect, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import { Link as MuiLink} from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import hostname from "../../hostname";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Close } from "@material-ui/icons";
import { Grid } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { styled } from "@mui/material/styles";

const Link = styled(MuiLink)(({ theme }) => ({
  color: "inherit",
  textDecoration: "none",
}));

export function createData(
  id,
  nom,
  marque,
  prix,
  disponibilité,
  catégorie,
  origine
) {
  return {
    id,
    nom,
    marque,
    prix,
    disponibilité,
    catégorie,
    origine,
  };
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "nom",
    numeric: false,
    disablePadding: true,
    label: "Nom",
  },
  {
    id: "marque",
    numeric: true,
    disablePadding: false,
    label: "Marque",
  },
  {
    id: "prix",
    numeric: true,
    disablePadding: false,
    label: "Prix en €",
  },
  {
    id: "disponibilité",
    numeric: true,
    disablePadding: false,
    label: "Disponibilité",
  },
  {
    id: "catégorie",
    numeric: false,
    disablePadding: false,
    label: "Catégorie",
  },
  {
    id: "origine",
    numeric: false,
    disablePadding: false,
    label: "Origine",
  },
];

function EnhancedTableHead(props) {
  const {
    order,
    orderBy,
    onRequestSort,
    onSelectAllClick,
    numSelected,
    rowCount,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="left"
            width="200px"
            padding="normal"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected, handleDelete } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} sélectionnés
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Vos produits
        </Typography>
      )}

      {numSelected > 0 ? (
        <>
          <Tooltip title="Supprimer">
            <IconButton onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
      ) : null}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable() {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("marque");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selected, setSelected] = useState([]);
  const [formData, setFormData] = useState([]);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const redirectToLogin = () => {
    localStorage.removeItem("accessToken");
    
    window.location.href = "/connexion";
  };

  const handleRefreshToken = useCallback(async () => {
    try {
      const response = await fetch(`${hostname}/api/v1/epicerie/auth/refresh`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        const { accessToken } = await response.json();
        localStorage.setItem("accessToken", accessToken);
        return accessToken;
      } else {
        const data = await response.json();
        if (data.message) {
          toast.error(data.message);
        } else {
          toast("Erreur d'authentification");
        }
        redirectToLogin();
      }
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      redirectToLogin();
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) {
          setError("Access token is missing");
          redirectToLogin();
          return;
        }

        let response = await fetch(
          `${hostname}/api/v1/epicerie/productEpicerie/read`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.status === 401 || response.status === 403) {
          // Token expired or unauthorized, attempt to refresh token
          const newAccessToken = await handleRefreshToken();

          if (newAccessToken) {
            // Retry fetching data with the new access token
            response = await fetch(
              `${hostname}/api/v1/epicerie/productEpicerie/read`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${newAccessToken}`,
                },
              }
            );
          } else {
            throw new Error("Failed to refresh token");
          }
        }

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message);
        }

        const formData = await response.json();
        setFormData(formData);
        setError(null);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data. Please try again later.");
      }
    };

    fetchData();
  }, [handleRefreshToken]);

  // Calcul des lignes après la récupération des données
  if (formData && formData.length > 0) {
    var rows = formData.map((produit) => {
      return createData(
        produit.idEpicerieProduct,
        produit.name,
        produit.label,
        parseFloat(produit.price),
        produit.available ? "Oui" : "Non",
        produit.category,
        produit.country
      );
    });
  } else {
    rows = [];
  }

  const visibleRows = useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [rows, order, orderBy, page, rowsPerPage]
  );

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.nom);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, nom) => {
    const selectedIndex = selected.indexOf(nom);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, nom);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleDelete = () => {
    setOpenDialog(true);
  };

  const handleDeleteList = async (event) => {
    event.preventDefault();

    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      toast("Access token is missing");
      return;
    }

    try {
      const response = await fetch(
        `${hostname}/api/v1/epicerie/productEpicerie/delete/listproduct`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json", // Ajoutez le type de contenu JSON
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ productNameList: selected }), // Convertissez les données en JSON
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.message) {
          toast.success(data.message);
        }
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        const data = await response.json();
        if (data.message) {
          toast.error(data.message);
        } else {
          toast.error("Erreur lors de la suppression");
        }
      }
    } catch (error) {
      console.log("Erreur lors de la suppression :", error);
    }
  };

  const isSelected = (nom) => selected.indexOf(nom) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box
      sx={{
        width: "100%",
        paddingLeft: { xs: "20px", md: "50px" },
        paddingRight: { xs: "20px", md: "50px" },
        marginTop: "20px",
        marginBottom: "20px",
        xs: { paddingLeft: "20px", paddingRight: "20px" },
      }}
    >
      <Paper sx={{ width: "100%" }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          handleDelete={handleDelete}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={"medium"}
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              onSelectAllClick={handleSelectAllClick}
              numSelected={selected.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.nom);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow tabIndex={-1} key={row.nom}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        onClick={(event) => handleClick(event, row.nom)}
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell width="200px" align="left">
                      <Link to={`update/${row.id}`}>{row.nom}</Link>
                    </TableCell>
                    <TableCell width="200px" align="left">
                      {" "}
                      {row.marque}{" "}
                    </TableCell>
                    <TableCell width="200px" align="left">
                      {" "}
                      {row.prix}{" "}
                    </TableCell>
                    <TableCell width="200px" align="left">
                      {" "}
                      {row.disponibilité}{" "}
                    </TableCell>
                    <TableCell width="200px" align="left">
                      {" "}
                      {row.catégorie}{" "}
                    </TableCell>
                    <TableCell width="200px" align="left">
                      {" "}
                      {row.origine}{" "}
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={5} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 20, 30]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Dialog onClose={handleCloseDialog} open={openDialog}>
        <DialogTitle>Voulez-vous supprimer ces produits ?</DialogTitle>
        <List>
          {selected.map((item, index) => (
            <ListItem key={index}>
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>
        <Grid
          display="flex"
          flexDirection="row"
          justifyContent="space-evenly"
          marginBottom="30px"
        >
          <Tooltip title="supprimer">
            <IconButton onClick={handleDeleteList} aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="annuler">
            <IconButton
              onClick={handleCloseDialog}
              aria-label="close"
              sx={{
                bgcolor: "#922B21",
                color: "white",
                "&:hover": { bgcolor: "white", color: "#922B21" },
              }}
            >
              <Close />
            </IconButton>
          </Tooltip>
        </Grid>
      </Dialog>
      <div>
        <ToastContainer theme="colored" />
      </div>

      <div>
        {/* Render your component content here */}
        {error && <p> {error}</p>}
      </div>
    </Box>
  );
}
