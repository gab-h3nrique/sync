import React from "react";
import { BrowserRouter, Routes, Route, Link } from 'react-router'
import "./globals.css";
import HomePage from "./screens/HomePage";
import Tab from "./components/elements/Tab";
import Content from "./components/elements/Content";
import ProjectPage from "./screens/ProjectPage";
import ProjectsPage from "./screens/ProjectsPage";

export default function App() {
  return (

    <BrowserRouter>

      <Content className='flex w-full h-full flex-col bg-background-1'>

        <Tab />

        <main className='flex w-full h-full overflow-hidden relative'>

          <Routes>

            <Route path="/" element={<ProjectsPage />} />

            <Route path="/projects" element={<ProjectsPage />} />

            <Route path="projects/project" element={<ProjectPage />} />

          </Routes>

        </main>

        <Tab />

      </Content>

    </BrowserRouter>

  );
}