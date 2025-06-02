import React from "react";
import { BrowserRouter, Routes, Route, Link } from 'react-router'
import "./globals.css";
import HomePage from "./screens/HomePage";
import ProjectsPage from "./screens/ProjectsPage";
import Tab from "./components/Tab";

export default function App() {
  return (

    <BrowserRouter>

        <section className='flex w-full h-full flex-col bg-background-1'>

          <Tab />

          <main className='flex w-full h-full overflow-hidden relative'>

          <Routes>

            <Route path="/" element={<HomePage />} />

            <Route path="/projects" element={<ProjectsPage />} />

          </Routes>

          </main>

          <Tab />

        </section>

    </BrowserRouter>

  );
}