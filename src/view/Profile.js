import React, { useState } from "react";
// import { Button, FormControl } from "react-bootstrap";
import { useRequireAuth } from "../hooks/use-require-auth";
import { useNavigate } from "react-router-dom";
import { TextField, Button, IconButton, Box, Avatar } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import EditOffIcon from "@mui/icons-material/EditOff";
import API from "../client/api";

function Profile() {
  const navigate = useNavigate();
  const auth = useRequireAuth();
  const [userEdit, setuserEdit] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  console.log("user", auth.user);
  console.log(imageFile);

  function toggleEdit() {
    setuserEdit(!userEdit);
  }

  let imageURL = "";

  if (imageFile) {
    imageURL = URL.createObjectURL(imageFile);
  }

  function profileSubmit() {
    console.log(`profile submit clicked`);

    API.uploadImage(imageFile);
  }

  return (
    <div>
      Profile
      <div>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            auth.logout();
            navigate("/login");
          }}
        >
          Logout
        </Button>
        <Button onClick={() => navigate("/")}>To Chat</Button>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="username"
            label="UserName"
            defaultValue={auth.user.username}
            InputProps={{
              readOnly: !userEdit,
            }}
            variant="standard"
          />
          <TextField
            id="bio"
            label="Bio"
            defaultValue={auth.user.bio}
            InputProps={{
              readOnly: !userEdit,
            }}
            variant="standard"
          />

          <TextField
            id="username"
            label="Change Password"
            defaultValue={""}
            InputProps={{
              readOnly: !userEdit,
            }}
            variant="standard"
          />
          <Avatar
            alt="Remy Sharp"
            src={imageURL}
            sx={{ width: 56, height: 56 }}
          />
          <Button variant="contained" component="label">
            Upload
            <input
              hidden
              accept="image/*"
              multiple
              type="file"
              onChange={(e) =>
                setImageFile(
                  new Blob([e.target.files[0]], { type: "image/jpeg" })
                )
              }
            />
          </Button>
          <Button onClick={profileSubmit}>Submit Changes</Button>
        </Box>
        <IconButton aria-label="toggle editability" onClick={toggleEdit}>
          {userEdit ? <EditIcon /> : <EditOffIcon />}
        </IconButton>
      </div>
    </div>
  );
}

export default Profile;
