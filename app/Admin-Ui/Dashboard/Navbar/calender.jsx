"use client"
import React from "react";
import {Calendar} from "@nextui-org/react";
import {parseDate} from '@internationalized/date';

export default function CalenderApp() {
  return (
    <div className="flex gap-x-4">
      <Calendar aria-label="Date (No Selection)" />
      <Calendar aria-label="Date (Uncontrolled)" defaultValue={parseDate("2020-02-03")} />
    </div>
  );
}
