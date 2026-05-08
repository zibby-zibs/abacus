import { WHATSAPP_URL } from "@/components/landing/constants";
import { redirect } from "next/navigation";
import React from "react";

const WHATSAPP_SUPPORT_URL =
	"https://wa.me/23489092179152?text=I%20need%20support";
type Props = {};

const page = (props: Props) => {
	redirect(WHATSAPP_SUPPORT_URL);
};

export default page;
