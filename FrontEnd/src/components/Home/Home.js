import * as React from "react";
import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AnnouncmentService from "../../services/AnnouncmentService";
import BaseUrl from "../../services/BaseUrl";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Textarea from "@mui/joy/Textarea";
import { Button } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "./Home.css";

const Home = () => {
  const [announcments, setAnnouncments] = useState([]);

  const [similar, setSimilar] = useState([]);

  const [selected, setSelected] = useState();

  const [title, setTitle] = useState({});

  const [description, setDescription] = useState({});

  const [date, setDate] = useState({});

  useEffect(() => {
    async function getAnnouncments() {
      let response = await axios
        .get(BaseUrl() + "api/announcment/all")
        .then((res) => {
          return res.data;
        });
      setAnnouncments(response);
    }
    getAnnouncments();
  }, []);

  function addAnnouncment() {
    const announcment = {
      Title: title,
      Description: description,
      DateAdded: date,
    };//console.log(res.data.id)
    AnnouncmentService.addAnnouncmnet(announcment).then((res) => {setAnnouncments([...announcments, res.data])});
  }

  function deleteAnnouncment() {
    AnnouncmentService.deleteAnnouncmnet(selected).then(() => {setAnnouncments(announcments.filter(obj => obj.id !== selected))});
  }

  function updateAnnouncment() {
    const announcment = {
      Id: selected,
      Title: title,
      Description: description,
      DateAdded: date,
    };
    AnnouncmentService.updateAnnouncmnet(announcment).then((res) => {
        let announce = announcments[announcments.findIndex(el => el.id === selected)];
        announce.title = title;
        announce.description = description;
        // new Date().toDateString
        announce.dateAdded = date.toDateString();
        let temp = announcments;
        console.log(temp);
        temp[temp.findIndex(el => el.id === selected)] = announce;
        setAnnouncments([...temp]);
    });
  }

  function getAnnouncment(id) {
    AnnouncmentService.getAnnouncmnet(id).then(res => {setSimilar(res.data.similarAnnouncments)});
  }

  return (
    <div>
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell align="right">Title</TableCell>
                <TableCell align="right">Description</TableCell>
                <TableCell align="right">Date added</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {announcments.map((announcment, ind) => (
                <TableRow
                  onClick={() => {
                    setSelected(announcments[ind].id);
                    getAnnouncment(announcments[ind].id);
                  }}
                  key={announcment.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {announcment.id}
                  </TableCell>
                  <TableCell align="right">{announcment.title}</TableCell>
                  <TableCell align="right">{announcment.description}</TableCell>
                  <TableCell align="right">{new Date(announcment.dateAdded).toDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className="button-table">
        <div className="add-elements">
          <div className="add-elements add-button">
            <Button
              className="add-button"
              variant="contained"
              color="success"
              onClick={() => addAnnouncment()}
            >
              Add
            </Button>
          </div>
          <div className="add-elements add-button">
            <Button
              className="add-button"
              variant="contained"
              color="error"
              onClick={() => deleteAnnouncment()}
            >
              Delete
            </Button>
          </div>
          <div className="add-elements add-button">
            <Button
              className="add-button"
              variant="contained"
              color="warning"
              onClick={() => updateAnnouncment()}
            >
              Update
            </Button>
          </div>
          <div style={{position: 'absolute'}} className="add-elements">
            <p>Selected with id: {selected}</p>
            <h1>Similar announcments</h1>
            <div >
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Id</TableCell>
                      <TableCell align="right">Title</TableCell>
                      <TableCell align="right">Description</TableCell>
                      <TableCell align="right">Date added</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {similar.map((announcment) => (
                      <TableRow
                        key={announcment.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {announcment.id}
                        </TableCell>
                        <TableCell align="right">{announcment.title}</TableCell>
                        <TableCell align="right">
                          {announcment.description}
                        </TableCell>
                        <TableCell align="right">
                          {new Date(announcment.dateAdded).toDateString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
          <div className="area">
            <TextField
              onChange={(e) => setTitle(e.target.value)}
              sx={{ width: "33vh" }}
              id="outlined-basic"
              label="Title"
              variant="outlined"
            />
          </div>
          <div className="area">
            <Textarea
              onChange={(e) => setDescription(e.target.value)}
              sx={{ width: "33vh" }}
              name="Outlined"
              placeholder="Description"
              variant="outlined"
            />
          </div>
          <div className="area">
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  onChange={(e) => setDate(e.toDate())}
                  label="Date added"
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
