import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";

function Google({ buttonText }) {
  const registerLoginWithGoogleActiom = async (accessToken) => {
    try {
      let data = JSON.stringify({
        access_token: accessToken,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_API}/v1/auth/google`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      const response = await axios.request(config);
      const { token } = response.data.data;

      localStorage.setItem("token", token);
      window.location.href = "/";
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response.data.message);
        return;
      }
      toast.error(error.message);
    }
  };

  const logginWithGoggle = useGoogleLogin({
    onSuccess: (responseGoogle) =>
      registerLoginWithGoogleActiom(responseGoogle.access_token),
  });

  return (
    <Button
      className="w-25"
      variant="primary"
      onClick={() => logginWithGoggle()}
    >
      {buttonText}
    </Button>
  );
}

export default Google;
