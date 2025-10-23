"use client";
import { QRCodeSVG } from "qrcode.react";

export default function QRGenerator({ value, className }) {
    return <QRCodeSVG className={className} value={value} size={256} />;
}
