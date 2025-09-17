const setBearerToken = (token: string) => {
   localStorage.setItem("token", token);
};

const getBearerToken = () => {
   return localStorage.getItem("token");
};

const removeBearerToken = () => {
   localStorage.removeItem("token");
};

export { setBearerToken, getBearerToken, removeBearerToken };
