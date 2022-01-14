let url = "";

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  url = "http://localhost:5000";
} else {
  url = "https://serverfoodapp.herokuapp.com";
}

export default url;