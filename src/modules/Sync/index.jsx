import React, { useState } from "react";
import { ATOM_PERISISTENCE_KEYS } from "@/utils/constants";
import { Button, Typography } from "antd";

import styles from "./index.module.scss";

export const Sync = () => {
  const [exporting, setExporting] = useState(false);
  const [importing, setImporting] = useState(false);

  const handleExport = () => {
    setExporting(true);
    const data = {};
    Object.keys(ATOM_PERISISTENCE_KEYS).forEach((key) => {
      data[key] = localStorage.getItem(ATOM_PERISISTENCE_KEYS[key]);
    });
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `data-${new Date().toISOString().replace(/:/g, "-")}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setExporting(false);
  };

  const handleImport = (event) => {
    setImporting(true);
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = JSON.parse(event.target.result);
      Object.keys(ATOM_PERISISTENCE_KEYS).forEach((key) => {
        localStorage.setItem(ATOM_PERISISTENCE_KEYS[key], data[key]);
      });
      setImporting(false);
    };
    reader.readAsText(file);
  };

  return (
    <div className="syncContainer">
      <Typography.Title className={styles.sectionTitle} level={4}>
        Export
      </Typography.Title>
      <Button onClick={handleExport} disabled={exporting} loading={exporting}>
        Export Data
      </Button>
      <Typography.Title level={4}>Import</Typography.Title>
      <input type="file" onChange={handleImport} disabled={importing} />
      <Button className={styles.importButton} disabled={importing}>
        Import Data
      </Button>
    </div>
  );
};
