import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import ErrorPage from "../components/ErrorPage";
import AvailableFoods from "../pages/AvailableFoods";
import AddFood from "../pages/AddFood";
import ManageFoods from "../pages/ManageFoods";
import FoodRequest from "../pages/FoodRequest";

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
                path: "/addfood",
                element: <AddFood></AddFood>,
            },
            {
                path: "/managefood",
                element: <ManageFoods></ManageFoods>,
            },
            {
                path: "/foodrequest",
                element: <FoodRequest></FoodRequest>,
            },
        ]
    },
]);

export default router;