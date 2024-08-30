import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <>
    <Toaster/>
    <main>
      <Outlet/>
    </main>
    </>
  )
}