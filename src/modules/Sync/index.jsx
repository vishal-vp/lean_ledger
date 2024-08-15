import React, { useState } from "react";
import { ATOM_PERISISTENCE_KEYS } from "@/utils/constants";
import { Button, Typography, message } from "antd";

import styles from "./index.module.scss";

export const Sync = () => {
  const [exporting, setExporting] = useState(false);
  const [importing, setImporting] = useState(false);
  const [dataToImport, setDataToImport] = useState(null);

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

  const onFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = JSON.parse(event.target.result);
      setDataToImport(data);
    };
    reader.readAsText(file);
  };

  const handleImport = () => {
    if (dataToImport) {
      setImporting(true);
      Object.keys(ATOM_PERISISTENCE_KEYS).forEach((key) => {
        localStorage.setItem(ATOM_PERISISTENCE_KEYS[key], dataToImport[key]);
      });
      setImporting(false);
      message.success("Data imported successfully!");
    } else {
      message.error("Please select a file to import");
    }
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
      <input type="file" onChange={onFileChange} disabled={importing} />
      <Button
        className={styles.importButton}
        onClick={handleImport}
        disabled={importing}
      >
        Import Data
      </Button>
    </div>
  );
};
