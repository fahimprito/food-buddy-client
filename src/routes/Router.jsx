import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import ErrorPage from "../components/ErrorPage";
import AvailableFoods from "../pages/AvailableFoods";
import AddFood from "../pages/AddFood";
import ManageFoods from "../pages/ManageFoods";
import FoodRequest from "../pages/FoodRequest";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import PrivateRoute from "./PrivateRoute";
import FoodDetails from "../pages/FoodDetails";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "/",
                element: <Home></Home>,
            },
            {
                path: "/availablefoods",
                element: <AvailableFoods></AvailableFoods>,
            },
            {
                path: "/food/:id",
                element: <PrivateRoute><FoodDetails></FoodDetails></PrivateRoute>,
                loader: ({ params }) => fetch(`http://localhost:5000/foods/${params.id}`),
            },
            {
                path: "/addfood",
                element: <PrivateRoute><AddFood></AddFood></PrivateRoute>,
            },
            {
                path: "/managefood",
                element: <PrivateRoute><ManageFoods></ManageFoods></PrivateRoute>,
            },
            {
                path: "/foodrequest",
                element: <PrivateRoute><FoodRequest></FoodRequest></PrivateRoute>,
            },
            {
                path: "/login",
                element: <Login></Login>,
            },
            {
                path: "/signup",
                element: <Signup></Signup>,
            },
        ]
    },
]);

export default router;