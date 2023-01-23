import styles from "@/styles/Home.module.css";
import HomeComponent from "@/components/main/HomeComponent";
import ProductCompinents from "@/components/main/ProductCompinents";
import TeamComponent from "@/components/main/TeamComponent";
import CardComponent from "@/components/main/CardComponent";
import ContactComponent from "@/components/main/ContactComponent";
import { Button } from "@nextui-org/react";
import NavbarComponent from "@/components/layout/Navbar";

export default function Home() {
  return (
    <div>
      <NavbarComponent />
      <HomeComponent />
      <ProductCompinents />
      <TeamComponent />
      <ContactComponent />
    </div>
  );
}
