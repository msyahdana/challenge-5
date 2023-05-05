import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import NavbarComponent from "../../components/Header/NavbarComponent";

function Dashboard() {
  const [user, setUser] = useState("");

  useEffect(() => {
    const getMe = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(`${process.env.REACT_APP_API}/v1/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data.data;

        setUser(data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          // If not valid token
          if (error.response.status === 401) {
            localStorage.removeItem("token");

            return (window.location.href = "/");
          }

          toast.error(error.response.data.message);
          return;
        }
        toast.error(error.message);
      }
    };

    getMe();
  }, []);

  return (
    <>
      <NavbarComponent />
      <Container className="p-5 vh-100 mt-5">
        <h1 className="text-center text-light">
          Name: {user?.name} <br />
          Email: {user?.email}
        </h1>
        <h1 className="text-center text-light">This page only can be accessed by user having login</h1>
      </Container>
    </>
  );
}

export default Dashboard;
