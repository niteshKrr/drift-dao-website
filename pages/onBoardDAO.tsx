import React from 'react'
import Footer from '@/components/layout/Footer';
import NavbarComponent from '@/components/layout/Navbar';
import OnBoardDAO from '@/components/onBoardYourDAO/OnBoardDAO'

export default function onBoardDAO  () {
  return (
    <div className="bg-[url('/images/bg/bg1.jpg')]  bg-fixed" >
      <NavbarComponent/>
      <OnBoardDAO />
      <Footer />
    </div>
  );
}

